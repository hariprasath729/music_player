import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import OTP from '../models/OTP.js';
import ApprovalToken from '../models/ApprovalToken.js';
import { sendOtpEmail, sendAdminApprovalEmail, sendApprovedNotificationEmail, sendRejectedNotificationEmail, sendMessageToAdminEmail } from '../utils/sendEmail.js';

const generateToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET || 'your_secret_here', { expiresIn: '7d' });
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
  await sendAdminApprovalEmail(user.email, user.name, token);
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, error: 'Email is required' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    
    await OTP.findOneAndUpdate({ email }, { otp, expiresAt }, { upsert: true, new: true });
    await sendOtpEmail(email, otp);
    
    res.json({ success: true, message: 'OTP sent to email' });
  } catch (error) {
    console.error('❌ sendOtp Error:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
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
      user = await User.create({ name: name || 'User', email, password, isVerified: true, authType: 'email' });
    } else {
      user.isVerified = true;
      if (password) user.password = password; // Overwrite if recovering
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
    res.status(500).json({ success: false, error: 'Server Error' });
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
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || user.password !== password) return res.status(400).json({ success: false, error: 'Invalid credentials' });
    if (!user.isVerified) return res.status(403).json({ success: false, error: 'Email not verified' });
    
    if (!user.isApproved) {
      await triggerAdminApproval(user);
      return res.status(403).json({ success: false, error: 'Waiting for admin approval', isPending: true });
    }

    const token = generateToken(user._id, user.email);
    res.json({ success: true, data: { token, user: { id: user._id, name: user.name, email: user.email, profilePic: user.profilePic } } });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
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
    if (user) await sendApprovedNotificationEmail(user.email, user.name);
    
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
    if (user) await sendRejectedNotificationEmail(user.email, user.name);
    
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
    
    await sendMessageToAdminEmail(email, name || 'User', message);
    res.json({ success: true, message: 'Message sent to admin successfully' });
  } catch (error) {
    console.error('❌ contactAdmin Error:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json({ success: true, user: { id: user._id, name: user.name, email: user.email, profilePic: user.profilePic } });
};

export const logout = async (req, res) => res.json({ success: true });