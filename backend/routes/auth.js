import express from 'express';
import { sendOtp, verifyOtpAndSignup, login, googleLogin, approveUser, rejectUser, contactAdmin, getMe, logout } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtpAndSignup);
router.post('/login', login);
router.post('/google', googleLogin);
router.get('/approve', approveUser); // Admin clicking link from email
router.get('/reject', rejectUser); // Admin clicking link from email
router.post('/contact-admin', contactAdmin);
router.get('/me', protect, getMe);
router.post('/logout', logout);

export default router;