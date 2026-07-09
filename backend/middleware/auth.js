import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/jwtSecret.js';
import BlacklistedToken from '../models/BlacklistedToken.js';
import User from '../models/User.js';
import { securityEvent, SECURITY_EVENTS } from '../utils/logger.js';
import { addThreatScore } from './ipBlacklist.js';
import { getClientIP } from '../utils/logger.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }

  try {
    // 1. Verify token with validated secret — no fallback
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'music-player',
    });

    try {
      // 2. Check if token is blacklisted (logout/password-change invalidation)
      const isBlacklisted = await BlacklistedToken.findOne({ token });
      if (isBlacklisted) {
        securityEvent(SECURITY_EVENTS.JWT_FAILURE, req, { details: 'Blacklisted token used' });
        addThreatScore(getClientIP(req), 'invalid_jwt', req);
        return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
      }

      // 3. Validate tokenVersion against user record
      const user = await User.findById(decoded.id || decoded.userId).select('tokenVersion email');
      if (!user) {
        securityEvent(SECURITY_EVENTS.JWT_FAILURE, req, { details: 'Token references non-existent user' });
        addThreatScore(getClientIP(req), 'invalid_jwt', req);
        return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
      }

      // 4. If password was changed (tokenVersion incremented), reject old tokens
      if (decoded.tokenVersion !== undefined && decoded.tokenVersion !== user.tokenVersion) {
        securityEvent(SECURITY_EVENTS.JWT_FAILURE, req, { details: 'Stale tokenVersion' });
        return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
      }

      req.user = { id: decoded.id || decoded.userId, email: decoded.email || user.email };
      next();
    } catch (dbError) {
      // Database connection/query failure - return 500 so client knows it's a connection issue, not auth failure
      securityEvent(SECURITY_EVENTS.SYSTEM_ERROR || 'SYSTEM_ERROR', req, { details: `DB query error in auth middleware: ${dbError.message}` });
      return res.status(500).json({ success: false, error: 'Database connection failure during verification' });
    }
  } catch (error) {
    if (res.headersSent) {
      return;
    }
    // Log specific JWT errors internally but return generic error to client
    if (error.name === 'TokenExpiredError') {
      securityEvent(SECURITY_EVENTS.JWT_FAILURE, req, { details: 'Expired token' });
    } else if (error.name === 'JsonWebTokenError') {
      securityEvent(SECURITY_EVENTS.JWT_FAILURE, req, { details: 'Malformed/tampered token' });
      addThreatScore(getClientIP(req), 'invalid_jwt', req);
    } else {
      securityEvent(SECURITY_EVENTS.JWT_FAILURE, req, { details: 'Token verification failed' });
    }
    return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }
};