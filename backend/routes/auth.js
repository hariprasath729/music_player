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
import { authStrictLimiter, authSensitiveLimiter, contactLimiter, userWriteLimiter } from '../middleware/rateLimiter.js';
import { bruteForceGuard } from '../middleware/bruteForce.js';
import { validateBody, validateObjectId, schemas } from '../middleware/validate.js';

const router = express.Router();

// ── Public Auth (strict rate limiting) ──
router.post('/send-otp', authStrictLimiter, validateBody(schemas.sendOtp), sendOtp);
router.post('/verify-otp', authStrictLimiter, validateBody(schemas.verifyOtp), verifyOtpAndSignup);
router.post('/login', authStrictLimiter, bruteForceGuard(), validateBody(schemas.login), login);
router.post('/google', authStrictLimiter, validateBody(schemas.googleLogin), googleLogin);

// ── Admin Links (from email) ──
router.get('/approve', approveUser);
router.get('/reject', rejectUser);

// ── Contact ──
router.post('/contact-admin', contactLimiter, validateBody(schemas.contactAdmin), contactAdmin);

// ── Song Requests (authenticated) ──
router.post('/request-song', protect, userWriteLimiter, requestSongInSetting);
router.get('/song-request/done', completeSongRequest);

// ── Notifications (authenticated) ──
router.get('/notifications', protect, getNotifications);
router.delete('/notifications/:id', protect, validateObjectId('id'), deleteNotification);

// ── Password / Magic Link (sensitive rate limiting) ──
router.post('/forgot-password', authStrictLimiter, validateBody(schemas.forgotPassword), forgotPassword);
router.get('/magic-login', authSensitiveLimiter, magicLogin);
router.get('/verify-token', authSensitiveLimiter, verifyToken);
router.post('/reset-password', authSensitiveLimiter, validateBody(schemas.resetPassword), resetPassword);

// ── Session ──
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);

export default router;
