import React, { useMemo, useState } from 'react';
import { Send, Music, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePlayer } from '../../context/PlayerContext';

const parseSongs = (raw: string): string[] => {
  return raw
    .split('\n')
    .flatMap((line) => line.split(','))
    .map((s) => s.trim())
    .filter(Boolean);
};

export const RequestSongView: React.FC = () => {
  const { user, requestSong } = useAuth();
  const { setView } = usePlayer();

  const [rawSongs, setRawSongs] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const songs = useMemo(() => parseSongs(rawSongs), [rawSongs]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!user) {
      setLocalError('Please log in to request songs.');
      return;
    }
    if (!songs.length) {
      setLocalError('Enter at least one song (comma-separated or new lines).');
      return;
    }

    try {
      setSubmitting(true);
      await requestSong(songs);
      setRawSongs('');
      setView('home');
    } catch (err: any) {
      setLocalError(err?.message || 'Failed to send request');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 px-4 py-8 max-w-2xl mx-auto text-white">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-[#1db954]/10">
            <Music className="text-[#1db954] w-5 h-5" />
          </div>
          <h1 className="text-3xl font-bold">Request a song</h1>
        </div>

        <button
          onClick={() => setView('profile')}
          className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#b3b3b3] font-bold hover:bg-white/10 transition"
        >
          Back
        </button>
      </div>

      <div className="p-5 rounded-2xl bg-[#181818] border border-[#292929]">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <label className="text-sm font-bold text-[#b3b3b3]">
            Song titles (comma-separated or one per line)
          </label>

          <textarea
            value={rawSongs}
            onChange={(e) => setRawSongs(e.target.value)}
            placeholder={'Example:\nLove Yourself\nBohemian Rhapsody, Queen - Radio Ga Ga'}
            className="w-full min-h-[120px] resize-y rounded-xl bg-[#121212] border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#1db954]"
          />

          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-[#727272]">
              {songs.length ? `${songs.length} song(s) parsed` : 'Nothing parsed yet'}
            </p>

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 rounded-full bg-[#1db954] text-black px-5 py-2 text-sm font-bold disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] transition"
            >
              <Send className="w-4 h-4" />
              {submitting ? 'Sending...' : 'Request'}
            </button>
          </div>

          {localError && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5" />
              <span>{localError}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
