/**
 * Database Query Protection
 * ---------------------------
 * Global Mongoose plugin to enforce query time limits and pagination caps.
 */

import mongoose from 'mongoose';

const MAX_QUERY_TIME_MS = parseInt(process.env.MAX_QUERY_TIME_MS) || 5000; // 5 seconds
const MAX_PAGE_SIZE = parseInt(process.env.MAX_PAGE_SIZE) || 100;

/**
 * Mongoose plugin: set maxTimeMS on all queries.
 */
function queryTimeoutPlugin(schema) {
  // Pre-hook for find, findOne, findOneAndUpdate, etc.
  const queryTypes = ['find', 'findOne', 'findOneAndUpdate', 'findOneAndDelete', 'countDocuments', 'aggregate'];

  for (const type of queryTypes) {
    schema.pre(type, function () {
      if (!this.getOptions().maxTimeMS) {
        this.maxTimeMS(MAX_QUERY_TIME_MS);
      }
    });
  }
}

/**
 * Apply global query protection to all Mongoose schemas.
 */
export function applyQueryProtection() {
  mongoose.plugin(queryTimeoutPlugin);
}

/**
 * Sanitize and cap pagination parameters.
 * @param {object} query - req.query
 * @returns {{ limit: number, skip: number, page: number }}
 */
export function sanitizePagination(query = {}) {
  let limit = parseInt(query.limit) || 20;
  let page = parseInt(query.page) || 1;

  // Cap values
  limit = Math.max(1, Math.min(limit, MAX_PAGE_SIZE));
  page = Math.max(1, Math.min(page, 1000)); // Prevent absurd page numbers

  const skip = (page - 1) * limit;

  return { limit, skip, page };
}

/**
 * Cap a user-provided limit value.
 * @param {number|string} value
 * @param {number} [defaultValue=20]
 * @param {number} [maxValue=100]
 * @returns {number}
 */
export function capLimit(value, defaultValue = 20, maxValue = MAX_PAGE_SIZE) {
  const parsed = parseInt(value) || defaultValue;
  return Math.max(1, Math.min(parsed, maxValue));
}

export { MAX_QUERY_TIME_MS, MAX_PAGE_SIZE };
