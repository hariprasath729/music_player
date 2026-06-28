import express from 'express';
import { protect } from '../middleware/auth.js';
import User from '../models/User.js';
import { log } from '../utils/logger.js';
import { sanitizeString } from '../utils/sanitizeHtml.js';
import { recordAudit, AUDIT_ACTIONS } from '../utils/auditTrail.js';
import { userWriteLimiter, userReadLimiter } from '../middleware/rateLimiter.js';
import validatorLib from 'validator';

const router = express.Router();

/**
 * @route   GET /api/profile
 * @desc    Get user profile (protected route example)
 * @access  Private (requires JWT)
 */
router.get('/', protect, userReadLimiter, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -resetToken -resetTokenExpiry -tokenVersion -failedLoginAttempts -lockUntil -__v');
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          profilePic: user.profilePic,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      }
    });
  } catch (error) {
    log('error', 'Profile fetch failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

/**
 * @route   PUT /api/profile
 * @desc    Update user profile
 * @access  Private (requires JWT)
 */
router.put('/', protect, userWriteLimiter, async (req, res) => {
  try {
    const { name, profilePic } = req.body;

    // Find and update user — use req.user.id (set by auth middleware)
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Validate and sanitize name
    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 50) {
        return res.status(400).json({ success: false, error: 'Name must be 2-50 characters' });
      }
      user.name = sanitizeString(name.trim(), 50);
    }

    // Validate profilePic URL
    if (profilePic !== undefined) {
      if (profilePic === '' || profilePic === null) {
        user.profilePic = null;
      } else if (typeof profilePic === 'string' && validatorLib.isURL(profilePic, { protocols: ['http', 'https'] })) {
        user.profilePic = profilePic;
      } else {
        return res.status(400).json({ success: false, error: 'Invalid profile picture URL' });
      }
    }

    await user.save();

    await recordAudit({ userId: req.user.id, action: AUDIT_ACTIONS.PROFILE_UPDATE, req });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          profilePic: user.profilePic
        }
      }
    });

  } catch (error) {
    log('error', 'Update profile failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

/**
 * @route   DELETE /api/profile
 * @desc    Delete user account
 * @access  Private (requires JWT)
 */
router.delete('/', protect, async (req, res) => {
  try {
    await recordAudit({ userId: req.user.id, action: AUDIT_ACTIONS.ACCOUNT_DELETION, req });

    await User.findByIdAndDelete(req.user.id);

    res.json({ success: true, message: 'Account deleted successfully' });

  } catch (error) {
    log('error', 'Delete profile failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

export default router;
