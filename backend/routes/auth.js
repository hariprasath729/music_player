import express from 'express';
import {
  sendOtp,
  verifyOtpAndSignup,
  login,
  googleLogin,
  approveUser,
  rejectUser,
  contactAdmin,
  requestSongInSetting,
  completeSongRequest,
  getNotifications,
  deleteNotification,
  getMe,
  logout,
  forgotPassword,
  magicLogin,
  verifyToken,
  resetPassword
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtpAndSignup);
router.post('/login', login);
router.post('/google', googleLogin);
router.get('/approve', approveUser); // Admin clicking link from email
router.get('/reject', rejectUser); // Admin clicking link from email
router.post('/contact-admin', contactAdmin);
router.post('/request-song', protect, requestSongInSetting);
router.get('/song-request/done', completeSongRequest);
router.get('/notifications', protect, getNotifications);
router.delete('/notifications/:id', protect, deleteNotification);

router.post('/forgot-password', forgotPassword);
router.get('/magic-login', magicLogin);
router.get('/verify-token', verifyToken);
router.post('/reset-password', resetPassword);

router.get('/me', protect, getMe);
router.post('/logout', logout);

export default router;
