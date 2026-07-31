import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Play, Search, Trash2, X, Filter, ArrowDownUp } from 'lucide-react';
import { TRACKS, type Track } from '../../data/musicCatalog';
import { historyApi, type ListeningHistoryEntry } from '../../services/apiClient';
import { usePlayer } from '../../context/PlayerContext';

const PAGE_SIZE = 100;

type SortMode = 'Newest First' | 'Oldest First' | 'Recently Played' | 'Most Played';
type TimeRange = 'All' | 'Today' | 'This Week' | 'This Month' | 'This Year';

const tracksById = new Map(TRACKS.map((track) => [String(track.id), track]));

const normalize = (value: string) => value.toLowerCase().trim();

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const isWithinRange = (playedAt: string, range: TimeRange): boolean => {
  if (range === 'All') return true;
  const date = new Date(playedAt);
  const today = startOfDay(new Date());
  const target = startOfDay(date);
  const diffDays = Math.floor((today.getTime() - target.getTime()) / 86400000);

  if (range === 'Today') return diffDays === 0;
  if (range === 'This Week') return diffDays >= 0 && diffDays < 7;
  if (range === 'This Month') return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth();
  if (range === 'This Year') return date.getFullYear() === today.getFullYear();
  return true;
};

const getDayLabel = (playedAt: string): string => {
  const date = new Date(playedAt);
  const today = startOfDay(new Date());
  const target = startOfDay(date);
  const diffDays = Math.floor((today.getTime() - target.getTime()) / 86400000);

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays >= 2 && diffDays <= 6) {
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
  }
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
};

const formatTime = (playedAt: string): string => new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
}).format(new Date(playedAt));

export const RecentlyPlayedTimeline: React.FC = () => {
  const { playTrack, currentTrack } = usePlayer();
  const [entries, setEntries] = useState<ListeningHistoryEntry[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState<SortMode>('Newest First');
  const [timeRange, setTimeRange] = useState<TimeRange>('All');
  const [artistFilter, setArtistFilter] = useState('');
  const [albumFilter, setAlbumFilter] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const loadingRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadPage = useCallback(async (nextPage: number) => {
    if (loadingRef.current) return;
    setLoading(true);
    try {
      const sort = sortMode === 'Oldest First' ? 'oldest' : 'newest';
      const res = await historyApi.list({ page: nextPage, limit: PAGE_SIZE, sort });
      setEntries((prev) => (nextPage === 1 ? res.data : [...prev, ...res.data]));
      setPage(nextPage);
      setHasMore(Boolean(res.meta?.hasMore));
    } catch (error) {
      console.error('Failed to load history', error);
    } finally {
      setLoading(false);
    }
  }, [sortMode]);

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    setEntries([]);
    setPage(1);
    setHasMore(true);
    void loadPage(1);
  }, [loadPage]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const node = sentinelRef.current;
    const observer = new IntersectionObserver((items) => {
      if (items.some((item) => item.isIntersecting) && hasMore && !loading) {
        void loadPage(page + 1);
      }
    }, { rootMargin: '240px' });

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, loading, loadPage, page]);

  useEffect(() => {
    const handleHistoryAdded = (event: Event) => {
      const detail = (event as CustomEvent<ListeningHistoryEntry>).detail;
      if (!detail?.id) return;
      setEntries((prev) => [detail, ...prev.filter((entry) => entry.id !== detail.id)]);
    };

    window.addEventListener('music-player:history-added', handleHistoryAdded as EventListener);
    return () => window.removeEventListener('music-player:history-added', handleHistoryAdded as EventListener);
  }, []);

  const enrichedEntries = useMemo(() => {
    const query = normalize(searchQuery);
    const artistQuery = normalize(artistFilter);
    const albumQuery = normalize(albumFilter);
    const genreQuery = normalize(genreFilter);

    const mapped = entries
      .map((entry) => {
        const track = tracksById.get(String(entry.songId));
        return track ? { entry, track } : null;
      })
      .filter(Boolean) as Array<{ entry: ListeningHistoryEntry; track: Track }>;

    const filtered = mapped.filter(({ entry, track }) => {
      if (!isWithinRange(entry.playedAt, timeRange)) return false;
      if (query) {
        const haystack = `${track.title} ${track.artist} ${track.album}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      if (artistQuery && !track.artist.toLowerCase().includes(artistQuery)) return false;
      if (albumQuery && !track.album.toLowerCase().includes(albumQuery)) return false;
      if (genreQuery && !String(track.genre || '').toLowerCase().includes(genreQuery)) return false;
      return true;
    });

    if (sortMode === 'Most Played') {
      const counts = new Map<string, number>();
      for (const item of filtered) {
        const key = String(item.entry.songId);
        counts.set(key, (counts.get(key) || 0) + 1);
      }
      return [...filtered].sort((a, b) => {
        const countDiff = (counts.get(String(b.entry.songId)) || 0) - (counts.get(String(a.entry.songId)) || 0);
        if (countDiff !== 0) return countDiff;
        return new Date(b.entry.playedAt).getTime() - new Date(a.entry.playedAt).getTime();
      });
    }

    return [...filtered].sort((a, b) => {
      const aTime = new Date(a.entry.playedAt).getTime();
      const bTime = new Date(b.entry.playedAt).getTime();
      return sortMode === 'Oldest First' ? aTime - bTime : bTime - aTime;
    });
  }, [albumFilter, artistFilter, entries, genreFilter, searchQuery, sortMode, timeRange]);

  const groupedEntries = useMemo(() => {
    const groups = new Map<string, Array<{ entry: ListeningHistoryEntry; track: Track }>>();
    for (const item of enrichedEntries) {
      const key = item.entry.date;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(item);
    }
    return Array.from(groups.entries()).map(([date, items]) => ({
      date,
      label: getDayLabel(items[0].entry.playedAt),
      items,
    }));
  }, [enrichedEntries]);

  const removeEntry = useCallback(async (id: string) => {
    setDeletingId(id);
    try {
      await historyApi.remove(id);
      setEntries((prev) => prev.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error('Failed to remove history entry', error);
    } finally {
      setDeletingId(null);
    }
  }, []);

  const clearAll = useCallback(async () => {
    setClearing(true);
    try {
      await historyApi.clear();
      setEntries([]);
      setPage(1);
      setHasMore(false);
      setShowClearModal(false);
    } catch (error) {
      console.error('Failed to clear history', error);
    } finally {
      setClearing(false);
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 px-4 pb-6 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Recently Played</h2>
          <p className="mt-1 text-sm text-[#b3b3b3]">Your complete listening timeline</p>
        </div>
        <button
          onClick={() => setShowClearModal(true)}
          disabled={clearing || entries.length === 0}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Trash2 className="h-4 w-4" />
          {clearing ? 'Clearing...' : 'Clear All History'}
        </button>
      </div>

      <div className="grid gap-3 rounded-2xl border border-white/10 bg-[#121212] p-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm text-white">
          <Search className="h-4 w-4 text-[#757575]" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search title, artist, album"
            className="w-full bg-transparent outline-none placeholder:text-[#757575]"
          />
        </label>
        <label className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm text-white">
          <Filter className="h-4 w-4 text-[#757575]" />
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value as TimeRange)} className="w-full bg-transparent outline-none">
            <option value="All">All Time</option>
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
            <option value="This Year">This Year</option>
          </select>
        </label>
        <label className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm text-white">
          <ArrowDownUp className="h-4 w-4 text-[#757575]" />
          <select value={sortMode} onChange={(e) => setSortMode(e.target.value as SortMode)} className="w-full bg-transparent outline-none">
            <option value="Newest First">Newest First</option>
            <option value="Oldest First">Oldest First</option>
            <option value="Recently Played">Recently Played</option>
            <option value="Most Played">Most Played</option>
          </select>
        </label>
        <label className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm text-white">
          <input
            value={artistFilter}
            onChange={(e) => setArtistFilter(e.target.value)}
            placeholder="Filter artist"
            className="w-full bg-transparent outline-none placeholder:text-[#757575]"
          />
          {artistFilter && (
            <button onClick={() => setArtistFilter('')} className="text-[#757575] hover:text-white"><X className="h-4 w-4" /></button>
          )}
        </label>
        <label className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm text-white">
          <input
            value={albumFilter}
            onChange={(e) => setAlbumFilter(e.target.value)}
            placeholder="Filter album"
            className="w-full bg-transparent outline-none placeholder:text-[#757575]"
          />
          {albumFilter && (
            <button onClick={() => setAlbumFilter('')} className="text-[#757575] hover:text-white"><X className="h-4 w-4" /></button>
          )}
        </label>
        <label className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm text-white">
          <input
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            placeholder="Filter genre"
            className="w-full bg-transparent outline-none placeholder:text-[#757575]"
          />
          {genreFilter && (
            <button onClick={() => setGenreFilter('')} className="text-[#757575] hover:text-white"><X className="h-4 w-4" /></button>
          )}
        </label>
      </div>

      <div className="flex flex-col gap-5">
        {groupedEntries.length > 0 ? groupedEntries.map((group) => (
          <section key={group.date} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-white">{group.label}</h3>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="space-y-2">
              {group.items.map(({ entry, track }) => (
                <div key={entry.id} className="flex items-center gap-3 rounded-2xl border border-white/5 bg-[#121212] px-3 py-3 transition hover:bg-white/5">
                  <button
                    onClick={() => playTrack(track as Track)}
                    className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl"
                    style={{ background: track.gradient }}
                    title={`Play ${track.title}`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{entry.time}</span>
                      {currentTrack.id === track.id && <span className="rounded-full bg-[#1db954]/20 px-2 py-0.5 text-[11px] font-semibold text-[#1db954]">Playing</span>}
                    </div>
                    <p className="truncate text-[15px] font-semibold text-white">{track.title}</p>
                    <p className="truncate text-sm text-[#b3b3b3]">{track.artist}{track.album ? ` • ${track.album}` : ''}</p>
                  </div>
                  <button
                    onClick={() => removeEntry(entry.id)}
                    disabled={deletingId === entry.id}
                    className="rounded-full p-2 text-[#b3b3b3] transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    title="Remove from history"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )) : (
          <div className="rounded-2xl border border-dashed border-white/10 bg-[#121212] px-6 py-14 text-center text-[#b3b3b3]">
            <p className="text-lg font-bold text-white">No listening history yet</p>
            <p className="mt-1 text-sm">Songs you play will appear here in chronological order</p>
          </div>
        )}

        <div ref={sentinelRef} className="h-10 w-full" />
        {loading && <p className="pb-4 text-center text-sm text-[#b3b3b3]">Loading more history...</p>}
        {!hasMore && entries.length > 0 && <p className="pb-4 text-center text-sm text-[#b3b3b3]">End of history</p>}
      </div>

      {showClearModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#121212] p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white">Clear All History</h3>
            <p className="mt-2 text-sm text-[#b3b3b3]">Are you sure? This cannot be undone.</p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowClearModal(false)}
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                disabled={clearing}
              >
                Cancel
              </button>
              <button
                onClick={clearAll}
                className="flex-1 rounded-full bg-[#1db954] px-4 py-2 text-sm font-bold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={clearing}
              >
                {clearing ? 'Clearing...' : 'Clear History'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
