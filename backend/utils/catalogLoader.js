import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let cachedSongs = null;

/**
 * Parses and loads the song metadata array directly from the frontend's
 * src/data/musicCatalog.ts file. This keeps the frontend file as the single
 * source of truth for metadata, avoiding duplicate JSON files.
 *
 * Uses a robust bracket-counting algorithm to extract the RAW_SONGS array.
 */
export async function loadSongsFromCatalog() {
  if (cachedSongs) return cachedSongs;

  try {
    const tsPath = path.resolve(__dirname, '../../src/data/musicCatalog.ts');
    const content = await fs.readFile(tsPath, 'utf-8');

    const startIndex = content.indexOf('const RAW_SONGS');
    if (startIndex === -1) {
      throw new Error('Could not find RAW_SONGS assignment in musicCatalog.ts');
    }

    const eqIndex = content.indexOf('=', startIndex);
    if (eqIndex === -1) {
      throw new Error('Could not find = assignment in musicCatalog.ts');
    }

    const arrayStart = content.indexOf('[', eqIndex);
    if (arrayStart === -1) {
      throw new Error('Could not find array start [ in musicCatalog.ts');
    }
    let bracketCount = 0;
    let arrayEndIndex = -1;

    for (let i = arrayStart; i < content.length; i++) {
      const char = content[i];
      if (char === '[') bracketCount++;
      else if (char === ']') {
        bracketCount--;
        if (bracketCount === 0) {
          arrayEndIndex = i + 1;
          break;
        }
      }
    }

    if (arrayEndIndex === -1) {
      throw new Error('Could not find matching closing bracket for RAW_SONGS');
    }

    const jsonText = content.substring(arrayStart, arrayEndIndex);
    cachedSongs = JSON.parse(jsonText);
    console.log(`[catalogLoader] ✅ Loaded ${cachedSongs.length} songs from musicCatalog.ts`);
    return cachedSongs;
  } catch (error) {
    console.error('[catalogLoader] Failed to load from musicCatalog.ts:', error.message);
    throw error;
  }
}

/**
 * Returns the cached songs catalog or throws if not loaded yet.
 */
export function getSongsCatalog() {
  if (!cachedSongs) {
    throw new Error('Songs catalog has not been loaded. Call loadSongsFromCatalog() first.');
  }
  return cachedSongs;
}
