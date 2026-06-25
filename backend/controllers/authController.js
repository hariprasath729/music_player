import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import OTP from '../models/OTP.js';
import ApprovalToken from '../models/ApprovalToken.js';
import {
  sendOtpEmail,
  sendAdminApprovalEmail,
  sendApprovedNotificationEmail,
  sendRejectedNotificationEmail,
  sendMessageToAdminEmail,
  sendPasswordAccessEmail,
  sendSongRequestToAdminEmail
} from '../utils/sendEmail.js';

const generateToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET || 'dev_jwt_secret_change_me', { expiresIn: '30d' });
};

// Private helper: Checks if token is active, otherwise generates a new 10 min token and emails admin
const triggerAdminApproval = async (user) => {
  let tokenRecord = await ApprovalToken.findOne({ email: user.email });

  if (tokenRecord && tokenRecord.expiresAt > new Date()) {
    return; // A valid unexpired token already exists, don't spam the admin!
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  await ApprovalToken.findOneAndUpdate({ email: user.email }, { token, expiresAt }, { upsert: true, new: true });

  console.log(`\n🚨 [ADMIN ACTION REQUIRED] New user signup: ${user.email}`);
  console.log(`✅ APPROVE: ${process.env.APP_URL || 'https://music-player-z1db.onrender.com'}/api/auth/approve?token=${token}`);
  console.log(`❌ REJECT:  ${process.env.APP_URL || 'https://music-player-z1db.onrender.com'}/api/auth/reject?token=${token}\n`);

  sendAdminApprovalEmail(user.email, user.name, token);
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, error: 'Email is required' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await OTP.findOneAndUpdate({ email }, { otp, expiresAt }, { upsert: true, new: true });

    console.log(`\n🔑 [DEV MODE] OTP for ${email}: ${otp}\n`);

    sendOtpEmail(email, otp);

    res.json({ success: true, message: 'OTP sent to email' });
  } catch (error) {
    console.error('❌ sendOtp Error:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to send OTP' });
  }
};

export const verifyOtpAndSignup = async (req, res) => {
  try {
    const { email, otp, name, password } = req.body;

    const record = await OTP.findOne({ email });
    if (!record || record.otp !== otp || record.expiresAt < new Date()) {
      return res.status(400).json({ success: false, error: 'Invalid or expired OTP' });
    }

    let user = await User.findOne({ email });
    if (!user) {
      const hashed = await bcrypt.hash(password, 10);
      user = await User.create({ name: name || 'User', email, password: hashed, isVerified: true, authType: 'email' });
    } else {
      user.isVerified = true;
      if (password) {
        const hashed = await bcrypt.hash(password, 10);
        user.password = hashed; // Overwrite if recovering
      }
      await user.save();
    }
    await OTP.deleteOne({ email }); // Single use OTP

    if (!user.isApproved) {
      await triggerAdminApproval(user);
      return res.status(403).json({ success: false, error: 'Waiting for admin approval', isPending: true });
    }

    const token = generateToken(user._id, user.email);
    res.json({ success: true, data: { token, user: { id: user._id, name: user.name, email: user.email, profilePic: user.profilePic } } });
  } catch (error) {
    console.error('❌ verifyOtpAndSignup Error:', error);
    res.status(500).json({ success: false, error: error.message || 'Signup failed' });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;
    // Decode Google JWT via Google's userinfo endpoint
    const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${credential}` }
    });
    const userInfo = await userInfoRes.json();
    if (!userInfo.email) return res.status(400).json({ success: false, error: 'Invalid Google Token' });

    let user = await User.findOne({ email: userInfo.email });
    if (!user) {
      user = await User.create({ email: userInfo.email, name: userInfo.name, profilePic: userInfo.picture, isVerified: true, authType: 'google' });
    } else {
      user.isVerified = true;
      await user.save();
    }

    if (!user.isApproved) {
      await triggerAdminApproval(user);
      return res.status(403).json({ success: false, error: 'Waiting for admin approval', isPending: true });
    }

    const token = generateToken(user._id, user.email);
    res.json({ success: true, data: { token, user: { id: user._id, name: user.name, email: user.email, profilePic: user.profilePic } } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || 'Login failed' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, error: 'No user exists' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Wrong password' });
    }
    if (!user.isVerified) {
      return res.status(403).json({ success: false, error: 'Email not verified' });
    }

    if (!user.isApproved) {
      await triggerAdminApproval(user);
      return res.status(403).json({ success: false, error: 'Waiting for admin approval', isPending: true });
    }

    const token = generateToken(user._id, user.email);
    res.json({ success: true, data: { token, user: { id: user._id, name: user.name, email: user.email, profilePic: user.profilePic } } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || 'Login failed' });
  }
};

export const approveUser = async (req, res) => {
  try {
    const { token } = req.query;
    const record = await ApprovalToken.findOne({ token });

    if (!record || record.expiresAt < new Date()) {
      return res.status(400).send('<h1 style="text-align:center; padding: 50px; font-family: sans-serif; color: #ff0000;">Approval link is invalid or expired.</h1>');
    }

    const user = await User.findOneAndUpdate({ email: record.email }, { isApproved: true });
    if (user) sendApprovedNotificationEmail(user.email, user.name);

    await ApprovalToken.deleteOne({ _id: record._id });
    res.send('<h1 style="text-align:center; padding: 50px; font-family: sans-serif; color: #1db954;">User approved successfully!</h1><p style="text-align:center; font-family: sans-serif;">The user has been notified via email and can now log in.</p>');
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

export const rejectUser = async (req, res) => {
  try {
    const { token } = req.query;
    const record = await ApprovalToken.findOne({ token });

    if (!record || record.expiresAt < new Date()) {
      return res.status(400).send('<h1 style="text-align:center; padding: 50px; font-family: sans-serif; color: #ff0000;">Approval link is invalid or expired.</h1>');
    }

    const user = await User.findOne({ email: record.email });
    if (user) sendRejectedNotificationEmail(user.email, user.name);

    await ApprovalToken.deleteOne({ _id: record._id });
    res.send('<h1 style="text-align:center; padding: 50px; font-family: sans-serif; color: #e53935;">User rejected.</h1><p style="text-align:center; font-family: sans-serif;">The user has been notified via email.</p>');
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

export const contactAdmin = async (req, res) => {
  try {
    const { email, name, message } = req.body;
    if (!email || !message) return res.status(400).json({ success: false, error: 'Email and message are required' });

    console.log(`\n✉️ [MESSAGE TO ADMIN] From: ${name} (${email})\nMessage: ${message}\n`);

    sendMessageToAdminEmail(email, name || 'User', message);

    res.json({ success: true, message: 'Message sent to admin successfully' });
  } catch (error) {
    console.error('❌ contactAdmin Error:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to send message' });
  }
};

export const requestSongInSetting = async (req, res) => {
  try {
    const { songs } = req.body;

    if (!songs || (Array.isArray(songs) && songs.length === 0)) {
      return res.status(400).json({ success: false, error: 'Songs are required' });
    }

    // protect middleware only sets id/email, so fetch name from DB
    const dbUser = await User.findById(req.user.id).select('name email');
    if (!dbUser) return res.status(404).json({ success: false, error: 'User not found' });

    const userEmail = dbUser.email;
    const userName = dbUser.name || 'User';

    // Ensure admin email is NOT revealed in response
    await sendSongRequestToAdminEmail(userEmail, userName, songs);

    return res.json({ success: true, message: 'Song request sent to admin' });
  } catch (error) {
    console.error('❌ requestSongInSetting Error:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to send song request' });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.json({ success: true, user: { id: user._id, name: user.name, email: user.email, profilePic: user.profilePic } });
  } catch (error) {
    console.error('❌ getMe Error:', error);
    res.status(500).json({ success: false, error: error.message || 'Server error' });
  }
};

export const logout = async (req, res) => res.json({ success: true });

const hashToken = (token) => {
  // Never store raw token in DB; store SHA256 hash instead.
  return crypto.createHash('sha256').update(token).digest('hex');
};

const getFrontendUrl = () => {
  // Prefer FRONTEND_URL env var (e.g., http://localhost:5173) for local development,
  // otherwise fall back to the production Vercel frontend URL.
  return process.env.FRONTEND_URL || 'https://music-player-psi-sepia.vercel.app';
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, error: 'Email is required' });

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: 'Account not found' });
    }

    const genericMsg = { success: true, message: 'If this email exists, a reset link has been sent' };

    // Only allow for approved users (matches existing login logic)
    if (!user.isApproved) return res.json(genericMsg);

    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = hashToken(token);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    user.resetToken = tokenHash;
    user.resetTokenExpiry = expiresAt;
    await user.save();

    // Construct links pointing to the frontend SPA routes
    const frontendBase = getFrontendUrl();
    const magicLink = `${frontendBase}/magic-login?token=${encodeURIComponent(token)}`;
    const resetLink = `${frontendBase}/reset-password?token=${encodeURIComponent(token)}`;

    await sendPasswordAccessEmail(user.email, user.name, magicLink, resetLink);

    return res.json(genericMsg);
  } catch (error) {
    console.error('❌ forgotPassword Error:', error);
    return res.status(500).json({ success: false, error: error.message || 'Failed to send reset email' });
  }
};

export const magicLogin = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token || typeof token !== 'string') {
      return res.status(400).json({ success: false, error: 'Token is required' });
    }

    const tokenHash = hashToken(token);
    const user = await User.findOne({
      resetToken: tokenHash,
      resetTokenExpiry: { $gt: new Date() }
    });

    // One-time use: only allow when valid; delete on success
    if (!user) {
      const acceptsHtml = (req.headers.accept || '').includes('text/html');
      if (acceptsHtml || req.query.redirect === '1') {
        return res.status(400).send('<h1 style="text-align:center; padding: 50px; font-family: sans-serif; color: #ff0000;">This link is invalid or has expired.</h1>');
      }
      return res.status(400).json({ success: false, error: 'Invalid or expired token' });
    }

    const appToken = generateToken(user._id, user.email);

    // Delete one-time reset token immediately after successful usage
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    const redirectUrl = `${getFrontendUrl()}/?token=${encodeURIComponent(appToken)}`;
    const acceptsHtml = (req.headers.accept || '').includes('text/html');

    // If this was opened in the browser as a navigation, redirect so user lands on the app.
    // If this was called via fetch from the frontend, return JSON so the app can parse it.
    if (acceptsHtml || req.query.redirect === '1') {
      return res.redirect(302, redirectUrl);
    }

    // Default: JSON response (used by frontend fetch flow)
    return res.json({ success: true, token: appToken, user, redirectUrl });
  } catch (error) {
    console.error('❌ magicLogin Error:', error);
    return res.status(500).json({ success: false, error: error.message || 'Magic login failed' });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token || typeof token !== 'string') return res.status(400).json({ success: false, error: 'Token is required' });

    const tokenHash = hashToken(token);

    const user = await User.findOne({
      resetToken: tokenHash,
      resetTokenExpiry: { $gt: new Date() }
    });

    return res.json({ success: true, valid: !!user });
  } catch (error) {
    console.error('❌ verifyToken Error:', error);
    return res.status(500).json({ success: false, error: error.message || 'Token verification failed' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || typeof token !== 'string') return res.status(400).json({ success: false, error: 'Token is required' });
    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
      return res.status(400).json({ success: false, error: 'New password must be at least 6 characters' });
    }

    const tokenHash = hashToken(token);

    const user = await User.findOne({
      resetToken: tokenHash,
      resetTokenExpiry: { $gt: new Date() }
    });

    if (!user) return res.status(400).json({ success: false, error: 'Invalid or expired token' });

    const passwordHash = await bcrypt.hash(newPassword, 10);

    user.password = passwordHash;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    return res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('❌ resetPassword Error:', error);
    return res.status(500).json({ success: false, error: error.message || 'Reset password failed' });
  }
};
