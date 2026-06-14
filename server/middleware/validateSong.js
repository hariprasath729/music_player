/**
 * Validation middleware for song create/update payloads.
 * Rules:
 *   - title must not be empty
 *   - file_url must be a valid URL ending in .mp3
 *   - cover_url (if provided) must be a valid URL ending in .jpg / .jpeg / .png
 *   - duration (if provided) must be a positive number
 */

function isValidUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

function isMp3Url(value) {
  return isValidUrl(value) && /\.mp3(\?.*)?$/i.test(value);
}

function isImageUrl(value) {
  return isValidUrl(value) && /\.(jpg|jpeg|png)(\?.*)?$/i.test(value);
}

/** Validates a full payload (used for POST /songs). */
export function validateCreate(req, res, next) {
  const { title, file_url, cover_url, url, cover, duration } = req.body || {};
  const audioUrl = file_url || url;
  const imageUrl = cover_url || cover;
  const errors = [];

  if (typeof title !== 'string' || title.trim() === '') {
    errors.push('title is required and must not be empty');
  }
  if (typeof audioUrl !== 'string' || !isMp3Url(audioUrl)) {
    errors.push('file_url/url must be a valid URL ending in .mp3');
  }
  if (imageUrl !== undefined && imageUrl !== null && !isImageUrl(imageUrl)) {
    errors.push('cover_url/cover must be a valid image URL ending in .jpg, .jpeg, or .png');
  }
  if (duration !== undefined && (typeof duration !== 'number' || duration < 0)) {
    errors.push('duration must be a positive number (seconds)');
  }

  if (errors.length) return res.status(400).json({ error: 'Validation failed', details: errors });
  next();
}

/** Validates a partial payload (used for PUT /songs/:id). */
export function validateUpdate(req, res, next) {
  const { title, file_url, cover_url, url, cover, duration } = req.body || {};
  const audioUrl = file_url || url;
  const imageUrl = cover_url || cover;
  const errors = [];

  if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
    errors.push('title must not be empty');
  }
  if (audioUrl !== undefined && !isMp3Url(audioUrl)) {
    errors.push('file_url/url must be a valid URL ending in .mp3');
  }
  if (imageUrl !== undefined && imageUrl !== null && !isImageUrl(imageUrl)) {
    errors.push('cover_url/cover must be a valid image URL ending in .jpg, .jpeg, or .png');
  }
  if (duration !== undefined && (typeof duration !== 'number' || duration < 0)) {
    errors.push('duration must be a positive number (seconds)');
  }

  if (errors.length) return res.status(400).json({ error: 'Validation failed', details: errors });
  next();
}

/** Validates that :id is a positive integer. */
export function validateId(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'Invalid id', details: ['id must be a positive integer'] });
  }
  req.songId = id;
  next();
}
