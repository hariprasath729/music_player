import 'dotenv/config';
/**
 * JWT Secret Management
 * ----------------------
 * Validates JWT_SECRET on import. Refuses to let the app run with weak or default secrets.
 * Provides a helper to generate secure secrets for documentation.
 */

import crypto from 'crypto';

const KNOWN_WEAK_SECRETS = [
  'dev_jwt_secret_change_me',
  'your_secret_here',
  'your_super_secret_jwt_key_here_change_this',
  'secret',
  'jwt_secret',
  'changeme',
  'password',
  'test',
];

const MIN_SECRET_LENGTH = 32;

/**
 * Generate a cryptographically secure random secret.
 * @param {number} [length=64] - Character length of the secret
 * @returns {string}
 */
export function generateSecureSecret(length = 64) {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

/**
 * Validate the JWT secret from environment. Throws on startup if invalid.
 */
function validateSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error('🔴 FATAL: JWT_SECRET environment variable is not set.');
    console.error(`   Generate one with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`);
    process.exit(1);
  }

  if (KNOWN_WEAK_SECRETS.includes(secret.toLowerCase())) {
    console.error('🔴 FATAL: JWT_SECRET is using a known default/weak value. This is a critical security vulnerability.');
    console.error(`   Generate a secure secret with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`);
    process.exit(1);
  }

  if (secret.length < MIN_SECRET_LENGTH) {
    console.error(`🔴 FATAL: JWT_SECRET must be at least ${MIN_SECRET_LENGTH} characters (currently ${secret.length}).`);
    console.error(`   Generate a secure secret with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`);
    process.exit(1);
  }

  return secret;
}

// Validate on import — server won't start with a weak secret
const JWT_SECRET = validateSecret();

export { JWT_SECRET };
