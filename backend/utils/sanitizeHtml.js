/**
 * HTML / XSS Sanitization Utilities
 * -----------------------------------
 * Escape user-provided values before inserting into HTML (emails, responses).
 * Strip dangerous patterns from text fields.
 */

const HTML_ESCAPE_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#96;',
};

const HTML_ESCAPE_REGEX = /[&<>"'`/]/g;

/**
 * Escape HTML entities in a string to prevent XSS when inserting into HTML.
 * @param {string} str
 * @returns {string}
 */
export function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(HTML_ESCAPE_REGEX, (char) => HTML_ESCAPE_MAP[char] || char);
}

/**
 * Strip HTML tags from a string (for text-only fields like usernames).
 * @param {string} str
 * @returns {string}
 */
export function stripHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>/g, '').trim();
}

/**
 * Sanitize a general text field: strip HTML, trim, limit length.
 * @param {string} str
 * @param {number} [maxLength=500]
 * @returns {string}
 */
export function sanitizeString(str, maxLength = 500) {
  if (typeof str !== 'string') return '';
  return stripHtml(str).substring(0, maxLength).trim();
}

/**
 * Check if a string contains suspicious patterns (SQL/NoSQL/XSS).
 * @param {string} str
 * @returns {boolean}
 */
export function containsSuspiciousPatterns(str) {
  if (typeof str !== 'string') return false;
  const patterns = [
    /<script\b/i,
    /javascript:/i,
    /on\w+\s*=/i,          // onclick=, onerror=, etc.
    /\$(?:gt|lt|ne|eq|regex|where|or|and|not|nor|exists|type|mod|all|size|elemMatch)\b/i,
    /\{\s*\$\w+/,           // MongoDB operators like { $gt: ... }
    /__proto__/,
    /constructor\s*\[/,
    /prototype\s*\[/,
  ];
  return patterns.some((p) => p.test(str));
}
