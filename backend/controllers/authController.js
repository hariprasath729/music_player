import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import OTP from '../models/OTP.js';
import ApprovalToken from '../models/ApprovalToken.js';
import SongRequest from '../models/SongRequest.js';
import Notification from '../models/Notification.js';
import BlacklistedToken from '../models/BlacklistedToken.js';
import { JWT_SECRET } from '../utils/jwtSecret.js';
import { log, securityEvent, SECURITY_EVENTS } from '../utils/logger.js';
import { recordAudit, AUDIT_ACTIONS } from '../utils/auditTrail.js';
import { escapeHtml } from '../utils/sanitizeHtml.js';
import { validatePasswordStrength } from '../middleware/validate.js';
import { recordFailedAttempt, resetAttempts } from '../middleware/bruteForce.js';
import { addThreatScore } from '../middleware/ipBlacklist.js';
import { getClientIP } from '../utils/logger.js';
import {
  sendOtpEmail,
  sendAdminApprovalEmail,
  sendApprovedNotificationEmail,
  sendRejectedNotificationEmail,
  sendMessageToAdminEmail,
  sendPasswordAccessEmail,
  sendSongRequestToAdminEmail
} from '../utils/sendEmail.js';

const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS) || 12;

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      tokenVersion: user.tokenVersion || 0,
    },
    JWT_SECRET,
    {
      expiresIn: '30d',
      issuer: 'music-player',
    }
  );
};

// Private helper: Checks if token is active, otherwise generates a new 10 min token and emails admin
const triggerAdminApproval = async (user, req) => {
  let tokenRecord = await ApprovalToken.findOne({ email: user.email });

  if (tokenRecord && tokenRecord.expiresAt > new Date()) {
    return; // A valid unexpired token already exists, don't spam the admin!
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  await ApprovalToken.findOneAndUpdate({ email: user.email }, { token, expiresAt }, { upsert: true, new: true });

  const protocol = req && (req.secure || req.headers['x-forwarded-proto'] === 'https') ? 'https' : 'http';
  const host = req ? req.get('host') : 'localhost:5000';
  const baseUrl = req ? `${protocol}://${host}` : (process.env.APP_URL || 'https://music-player-z1db.onrender.com');

  log('info', `New user signup requiring approval: ${user.email}`);

  sendAdminApprovalEmail(user.email, user.name, token, baseUrl);
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, error: 'Email is required' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await OTP.findOneAndUpdate({ email }, { otp, expiresAt }, { upsert: true, new: true });

    // Only log OTP in development — NEVER in production
    if (process.env.NODE_ENV !== 'production') {
      log('debug', `[DEV] OTP for ${email}: ${otp}`);
    }

    sendOtpEmail(email, otp);

    res.json({ success: true, message: 'OTP sent to email' });
  } catch (error) {
    log('error', 'sendOtp failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
};

export const verifyOtpAndSignup = async (req, res) => {
  try {
    const { email, otp, name, password } = req.body;

    const record = await OTP.findOne({ email });
    if (!record || record.otp !== otp || record.expiresAt < new Date()) {
      return res.status(400).json({ success: false, error: 'Invalid or expired OTP' });
    }

    // Password strength validation for new signups
    if (password && !validatePasswordStrength(password)) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters',
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      const hashed = await bcrypt.hash(password, BCRYPT_ROUNDS);
      user = await User.create({ name: name || 'User', email, password: hashed, isVerified: true, authType: 'email' });
      await recordAudit({ userId: user._id, action: AUDIT_ACTIONS.REGISTER, req });
    } else {
      user.isVerified = true;
      if (password) {
        const hashed = await bcrypt.hash(password, BCRYPT_ROUNDS);
        user.password = hashed; // Overwrite if recovering
      }
      await user.save();
    }
    await OTP.deleteOne({ email }); // Single use OTP

    if (!user.isApproved) {
      await triggerAdminApproval(user, req);
      return res.status(403).json({ success: false, error: 'Waiting for admin approval', isPending: true });
    }

    const token = generateToken(user);
    securityEvent(SECURITY_EVENTS.AUTH_SUCCESS, req, { userId: String(user._id) });
    res.json({ success: true, data: { token, user: { id: user._id, name: user.name, email: user.email, profilePic: user.profilePic } } });
  } catch (error) {
    log('error', 'verifyOtpAndSignup failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Something went wrong' });
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
    if (!userInfo.email) {
      securityEvent(SECURITY_EVENTS.AUTH_FAILURE, req, { details: 'Invalid Google token' });
      return res.status(400).json({ success: false, error: 'Invalid Google Token' });
    }

    let user = await User.findOne({ email: userInfo.email });
    if (!user) {
      user = await User.create({ email: userInfo.email, name: userInfo.name, profilePic: userInfo.picture, isVerified: true, authType: 'google' });
      await recordAudit({ userId: user._id, action: AUDIT_ACTIONS.REGISTER, req, metadata: { authType: 'google' } });
    } else {
      user.isVerified = true;
      await user.save();
    }

    if (!user.isApproved) {
      await triggerAdminApproval(user, req);
      return res.status(403).json({ success: false, error: 'Waiting for admin approval', isPending: true });
    }

    const token = generateToken(user);
    securityEvent(SECURITY_EVENTS.OAUTH_LOGIN, req, { userId: String(user._id) });
    await recordAudit({ userId: user._id, action: AUDIT_ACTIONS.OAUTH_LOGIN, req });
    res.json({ success: true, data: { token, user: { id: user._id, name: user.name, email: user.email, profilePic: user.profilePic } } });
  } catch (error) {
    log('error', 'googleLogin failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Generic error for all authentication failures — prevents account enumeration
    const genericError = { success: false, error: 'Invalid email or password' };

    if (!user) {
      // Don't reveal that the user doesn't exist
      recordFailedAttempt(email, req);
      securityEvent(SECURITY_EVENTS.AUTH_FAILURE, req, { details: 'Login attempt for non-existent account' });
      return res.status(401).json(genericError);
    }

    // Check account lockout
    if (user.lockUntil && user.lockUntil > new Date()) {
      securityEvent(SECURITY_EVENTS.BRUTE_FORCE, req, { details: 'Login attempt on locked account' });
      return res.status(429).json({ success: false, error: 'Account temporarily locked. Please try again later.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      recordFailedAttempt(email, req);
      addThreatScore(getClientIP(req), 'brute_force', req);

      // Update DB-level failed attempts
      user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
      if (user.failedLoginAttempts >= 5) {
        user.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 min lock
        securityEvent(SECURITY_EVENTS.ACCOUNT_LOCKED, req, { userId: String(user._id) });
        await recordAudit({ userId: user._id, action: AUDIT_ACTIONS.ACCOUNT_LOCKED, req });
      }
      await user.save();

      return res.status(401).json(genericError);
    }

    if (!user.isVerified) {
      return res.status(403).json({ success: false, error: 'Email not verified' });
    }

    if (!user.isApproved) {
      await triggerAdminApproval(user, req);
      return res.status(403).json({ success: false, error: 'Waiting for admin approval', isPending: true });
    }

    // Successful login — reset failed attempts
    if (user.failedLoginAttempts > 0 || user.lockUntil) {
      user.failedLoginAttempts = 0;
      user.lockUntil = null;
      await user.save();
    }
    resetAttempts(email);

    const token = generateToken(user);
    securityEvent(SECURITY_EVENTS.AUTH_SUCCESS, req, { userId: String(user._id) });
    await recordAudit({ userId: user._id, action: AUDIT_ACTIONS.LOGIN, req });
    res.json({ success: true, data: { token, user: { id: user._id, name: user.name, email: user.email, profilePic: user.profilePic } } });
  } catch (error) {
    log('error', 'login failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
};

export const approveUser = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token || typeof token !== 'string') {
      return res.status(400).send('<h1 style="text-align:center; padding: 50px; font-family: sans-serif; color: #ff0000;">Invalid request.</h1>');
    }

    const record = await ApprovalToken.findOne({ token });

    if (!record || record.expiresAt < new Date()) {
      return res.status(400).send('<h1 style="text-align:center; padding: 50px; font-family: sans-serif; color: #ff0000;">Approval link is invalid or expired.</h1>');
    }

    const user = await User.findOneAndUpdate({ email: record.email }, { isApproved: true });
    if (user) sendApprovedNotificationEmail(user.email, user.name);

    await ApprovalToken.deleteOne({ _id: record._id });
    res.send('<h1 style="text-align:center; padding: 50px; font-family: sans-serif; color: #1db954;">User approved successfully!</h1><p style="text-align:center; font-family: sans-serif;">The user has been notified via email and can now log in.</p>');
  } catch (error) {
    log('error', 'approveUser failed', { details: error.message });
    res.status(500).send('Server Error');
  }
};

export const rejectUser = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token || typeof token !== 'string') {
      return res.status(400).send('<h1 style="text-align:center; padding: 50px; font-family: sans-serif; color: #ff0000;">Invalid request.</h1>');
    }

    const record = await ApprovalToken.findOne({ token });

    if (!record || record.expiresAt < new Date()) {
      return res.status(400).send('<h1 style="text-align:center; padding: 50px; font-family: sans-serif; color: #ff0000;">Approval link is invalid or expired.</h1>');
    }

    const user = await User.findOne({ email: record.email });
    if (user) sendRejectedNotificationEmail(user.email, user.name);

    await ApprovalToken.deleteOne({ _id: record._id });
    res.send('<h1 style="text-align:center; padding: 50px; font-family: sans-serif; color: #e53935;">User rejected.</h1><p style="text-align:center; font-family: sans-serif;">The user has been notified via email.</p>');
  } catch (error) {
    log('error', 'rejectUser failed', { details: error.message });
    res.status(500).send('Server Error');
  }
};

export const contactAdmin = async (req, res) => {
  try {
    const { email, name, message } = req.body;
    if (!email || !message) return res.status(400).json({ success: false, error: 'Email and message are required' });

    log('info', `Contact message from ${name || 'User'}`);

    sendMessageToAdminEmail(email, name || 'User', message);

    res.json({ success: true, message: 'Message sent to admin successfully' });
  } catch (error) {
    log('error', 'contactAdmin failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Something went wrong' });
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

    const songsArray = Array.isArray(songs)
      ? songs.map(s => typeof s === 'string' ? s.trim().substring(0, 200) : '').filter(Boolean).slice(0, 20)
      : String(songs || '')
          .split(',')
          .map(s => s.trim().substring(0, 200))
          .filter(Boolean)
          .slice(0, 20);

    const token = crypto.randomBytes(32).toString('hex');

    await SongRequest.create({
      userId: req.user.id,
      songs: songsArray,
      token
    });

    const protocol = req.secure || req.headers['x-forwarded-proto'] === 'https' ? 'https' : 'http';
    const host = req.get('host');
    const baseUrl = `${protocol}://${host}`;

    // Ensure admin email is NOT revealed in response
    await sendSongRequestToAdminEmail(userEmail, userName, songsArray, token, baseUrl);

    return res.json({ success: true, message: 'Song request sent to admin' });
  } catch (error) {
    log('error', 'requestSongInSetting failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
};

export const completeSongRequest = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token || typeof token !== 'string' || token.length > 256) {
      return res.status(400).send(`
        <div style="font-family: sans-serif; text-align: center; padding: 50px; background-color: #0f0f0f; color: white; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <h1 style="color: #ff0000; font-size: 32px; margin-bottom: 20px;">Invalid Link</h1>
          <p style="color: #aaa; font-size: 18px;">Token is missing from the request.</p>
        </div>
      `);
    }

    const songRequest = await SongRequest.findOne({ token, isCompleted: false });
    if (!songRequest) {
      return res.status(404).send(`
        <div style="font-family: sans-serif; text-align: center; padding: 50px; background-color: #0f0f0f; color: white; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <h1 style="color: #ff0000; font-size: 32px; margin-bottom: 20px;">Expired or Completed Link</h1>
          <p style="color: #aaa; font-size: 18px;">This request has already been completed, or the link has expired.</p>
        </div>
      `);
    }

    // Mark request completed
    songRequest.isCompleted = true;
    await songRequest.save();

    // Create in-app notification for the user
    await Notification.create({
      userId: songRequest.userId,
      message: 'the requested song added'
    });

    return res.send(`
      <div style="font-family: sans-serif; text-align: center; padding: 50px; background-color: #0f0f0f; color: white; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <div style="background: #1c1c1c; padding: 40px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.5); max-width: 450px;">
          <h1 style="color: #1db954; font-size: 32px; margin-bottom: 20px;">Success!</h1>
          <p style="color: #bbb; font-size: 18px; line-height: 1.5; margin-bottom: 0;">
            The requested song has been marked as added, and the user has been notified inside the app.
          </p>
        </div>
      </div>
    `);
  } catch (error) {
    log('error', 'completeSongRequest failed', { details: error.message });
    return res.status(500).send(`
      <div style="font-family: sans-serif; text-align: center; padding: 50px; background-color: #0f0f0f; color: white; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h1 style="color: #ff0000; font-size: 32px; margin-bottom: 20px;">Server Error</h1>
        <p style="color: #aaa; font-size: 18px;">An error occurred while marking the song request as done.</p>
      </div>
    `);
  }
};

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50);
    return res.json({ success: true, data: notifications });
  } catch (error) {
    log('error', 'getNotifications failed', { details: error.message });
    return res.status(500).json({ success: false, error: 'Something went wrong' });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!notification) {
      return res.status(404).json({ success: false, error: 'Notification not found' });
    }
    return res.json({ success: true, message: 'Notification dismissed' });
  } catch (error) {
    log('error', 'deleteNotification failed', { details: error.message });
    return res.status(500).json({ success: false, error: 'Something went wrong' });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -resetToken -resetTokenExpiry -tokenVersion -failedLoginAttempts -lockUntil -__v');
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.json({ success: true, user: { id: user._id, name: user.name, email: user.email, profilePic: user.profilePic } });
  } catch (error) {
    log('error', 'getMe failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
};

export const logout = async (req, res) => {
  try {
    // Blacklist the current token so it can't be reused
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const decoded = jwt.decode(token);
        if (decoded?.exp) {
          const expiresAt = new Date(decoded.exp * 1000);
          await BlacklistedToken.create({ token, expiresAt });
        }
      } catch (e) {
        // Token decode failed — that's fine, it's already invalid
      }
    }

    if (req.user?.id) {
      await recordAudit({ userId: req.user.id, action: AUDIT_ACTIONS.LOGOUT, req });
    }

    res.json({ success: true });
  } catch (error) {
    log('error', 'logout failed', { details: error.message });
    res.json({ success: true }); // Still return success — logout should always "succeed"
  }
};

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

    // ALWAYS return the same generic response — prevents email enumeration
    const genericMsg = { success: true, message: 'If this email exists, a reset link has been sent' };

    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal that the account doesn't exist
      return res.json(genericMsg);
    }

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
    await recordAudit({ userId: user._id, action: AUDIT_ACTIONS.PASSWORD_RESET_REQUEST, req });

    return res.json(genericMsg);
  } catch (error) {
    log('error', 'forgotPassword failed', { details: error.message });
    return res.status(500).json({ success: false, error: 'Something went wrong' });
  }
};

export const magicLogin = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token || typeof token !== 'string' || token.length > 256) {
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

    const appToken = generateToken(user);

    // Delete one-time reset token immediately after successful usage
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    securityEvent(SECURITY_EVENTS.MAGIC_LOGIN, req, { userId: String(user._id) });
    await recordAudit({ userId: user._id, action: AUDIT_ACTIONS.MAGIC_LOGIN, req });

    const redirectUrl = `${getFrontendUrl()}/?token=${encodeURIComponent(appToken)}`;
    const acceptsHtml = (req.headers.accept || '').includes('text/html');

    // If this was opened in the browser as a navigation, redirect so user lands on the app.
    // If this was called via fetch from the frontend, return JSON so the app can parse it.
    if (acceptsHtml || req.query.redirect === '1') {
      return res.redirect(302, redirectUrl);
    }

    // Default: JSON response — return only safe user fields
    return res.json({
      success: true,
      token: appToken,
      user: { id: user._id, name: user.name, email: user.email, profilePic: user.profilePic },
      redirectUrl,
    });
  } catch (error) {
    log('error', 'magicLogin failed', { details: error.message });
    return res.status(500).json({ success: false, error: 'Something went wrong' });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token || typeof token !== 'string' || token.length > 256) {
      return res.status(400).json({ success: false, error: 'Token is required' });
    }

    const tokenHash = hashToken(token);

    const user = await User.findOne({
      resetToken: tokenHash,
      resetTokenExpiry: { $gt: new Date() }
    });

    return res.json({ success: true, valid: !!user });
  } catch (error) {
    log('error', 'verifyToken failed', { details: error.message });
    return res.status(500).json({ success: false, error: 'Something went wrong' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || typeof token !== 'string' || token.length > 256) {
      return res.status(400).json({ success: false, error: 'Token is required' });
    }

    // Password strength validation
    if (!validatePasswordStrength(newPassword)) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters',
      });
    }

    const tokenHash = hashToken(token);

    const user = await User.findOne({
      resetToken: tokenHash,
      resetTokenExpiry: { $gt: new Date() }
    });

    if (!user) return res.status(400).json({ success: false, error: 'Invalid or expired token' });

    const passwordHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);

    user.password = passwordHash;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    // Increment tokenVersion to invalidate ALL existing JWTs for this user
    user.tokenVersion = (user.tokenVersion || 0) + 1;
    // Reset failed login attempts
    user.failedLoginAttempts = 0;
    user.lockUntil = null;
    await user.save();

    securityEvent(SECURITY_EVENTS.PASSWORD_RESET, req, { userId: String(user._id) });
    await recordAudit({ userId: user._id, action: AUDIT_ACTIONS.PASSWORD_RESET_COMPLETE, req });

    return res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    log('error', 'resetPassword failed', { details: error.message });
    return res.status(500).json({ success: false, error: 'Something went wrong' });
  }
};
