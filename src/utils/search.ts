import type { Track, Playlist } from '../data/musicCatalog';

/**
 * Token-based ranking search algorithm
 * 
 * Features:
 * - Splits query into tokens (words)
 * - Uses AND logic: all tokens must match somewhere
 * - Scores matches by relevance:
 *   1. Exact title match (1000 pts)
 *   2. Title starts with query (800 pts)
 *   3. Title contains full query (600 pts)
 *   4. Individual token matches in title (50 pts each)
 *   5. Artist contains query (400 pts)
 *   6. Individual token matches in artist (30 pts each)
 *   7. Album contains query (200 pts)
 *   8. Individual token matches in album (20 pts each)
 * - Returns results sorted by score (highest first)
 */

function collapseRepeats(input: string): string {
  // Collapses repeated characters: "raawadi" -> "rawadi"
  // Keep it lightweight (no full edit-distance).
  return input.toLowerCase().replace(/([a-z0-9])\1+/g, '$1');
}

function scoreTrack(track: Track, query: string): number {
  const q = query.toLowerCase().trim();
  const title = track.title.toLowerCase();
  const artist = track.artist.toLowerCase();
  const album = track.album.toLowerCase();

  const titleN = collapseRepeats(title);
  const artistN = collapseRepeats(artist);
  const albumN = collapseRepeats(album);
  const qN = collapseRepeats(q);

  const tokens = q.split(/\s+/).filter(t => t.length > 0);
  const tokensN = qN.split(/\s+/).filter(t => t.length > 0);

  // Check if ALL tokens match somewhere (AND logic)
  const allTokensMatch = tokens.every((token, idx) => {
    const tokenN = tokensN[idx] ?? collapseRepeats(token);
    return (
      title.includes(token) ||
      artist.includes(token) ||
      album.includes(token) ||
      titleN.includes(tokenN) ||
      artistN.includes(tokenN) ||
      albumN.includes(tokenN)
    );
  });

  if (!allTokensMatch) return -1;

  let score = 0;

  // Exact title match (highest priority)
  if (title === q) {
    score += 1000;
  }
  // Exact collapsed match
  else if (titleN === qN) {
    score += 900;
  }
  // Title starts with query
  else if (title.startsWith(q)) {
    score += 800;
  }
  // Collapsed prefix match
  else if (titleN.startsWith(qN)) {
    score += 700;
  }
  // Title contains full query
  else if (title.includes(q)) {
    score += 600;
  }
  // Collapsed contains full query
  else if (titleN.includes(qN)) {
    score += 520;
  }

  // Title contains individual tokens (partial match)
  const titleTokenMatches = tokens.filter(t => title.includes(t)).length;
  const titleTokenMatchesN = tokensN.filter(t => titleN.includes(t)).length;
  score += (titleTokenMatches + titleTokenMatchesN) * 25;

  // Artist contains full query
  if (artist.includes(q)) {
    score += 400;
  }
  if (artistN.includes(qN)) {
    score += 300;
  }
  const artistTokenMatches = tokens.filter(t => artist.includes(t)).length;
  const artistTokenMatchesN = tokensN.filter(t => artistN.includes(t)).length;
  score += (artistTokenMatches * 30) + (artistTokenMatchesN * 20);

  // Album contains full query
  if (album.includes(q)) {
    score += 200;
  }
  if (albumN.includes(qN)) {
    score += 150;
  }
  const albumTokenMatches = tokens.filter(t => album.includes(t)).length;
  const albumTokenMatchesN = tokensN.filter(t => albumN.includes(t)).length;
  score += (albumTokenMatches * 20) + (albumTokenMatchesN * 15);

  return score;
}

function scorePlaylist(playlist: Playlist, query: string): number {
  const q = query.toLowerCase().trim();
  const title = playlist.title.toLowerCase();
  const description = playlist.description.toLowerCase();

  const titleN = collapseRepeats(title);
  const descriptionN = collapseRepeats(description);
  const qN = collapseRepeats(q);

  const tokens = q.split(/\s+/).filter(t => t.length > 0);
  const tokensN = qN.split(/\s+/).filter(t => t.length > 0);

  // Check if ALL tokens match somewhere
  const allTokensMatch = tokens.every((token, idx) => {
    const tokenN = tokensN[idx] ?? collapseRepeats(token);
    return (
      title.includes(token) ||
      description.includes(token) ||
      titleN.includes(tokenN) ||
      descriptionN.includes(tokenN)
    );
  });

  if (!allTokensMatch) return -1;

  let score = 0;

  // Exact title match
  if (title === q) {
    score += 1000;
  } else if (titleN === qN) {
    score += 900;
  }
  // Title starts with query
  else if (title.startsWith(q)) {
    score += 800;
  } else if (titleN.startsWith(qN)) {
    score += 700;
  }
  // Title contains full query
  else if (title.includes(q)) {
    score += 600;
  } else if (titleN.includes(qN)) {
    score += 520;
  }

  // Title contains individual tokens
  const titleTokenMatches = tokens.filter(t => title.includes(t)).length;
  const titleTokenMatchesN = tokensN.filter(t => titleN.includes(t)).length;
  score += (titleTokenMatches + titleTokenMatchesN) * 25;

  // Description contains full query
  if (description.includes(q)) {
    score += 200;
  }
  if (descriptionN.includes(qN)) {
    score += 150;
  }
  const descTokenMatches = tokens.filter(t => description.includes(t)).length;
  const descTokenMatchesN = tokensN.filter(t => descriptionN.includes(t)).length;
  score += (descTokenMatches * 20) + (descTokenMatchesN * 15);

  return score;
}

export function searchTracks(tracks: Track[], query: string): Track[] {
  if (!query.trim()) return [];
  
  const results = tracks
    .map(track => ({ track, score: scoreTrack(track, query) }))
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(r => r.track);
  
  return results;
}

export function searchPlaylists(playlists: Playlist[], query: string): Playlist[] {
  if (!query.trim()) return [];
  
  const results = playlists
    .map(playlist => ({ playlist, score: scorePlaylist(playlist, query) }))
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(r => r.playlist);
  
  return results;
}
