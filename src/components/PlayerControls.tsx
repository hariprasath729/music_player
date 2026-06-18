import React, { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Heart,
  Mic2,
  ListMusic,
  Volume2,
  VolumeX,
  Volume1,
  Maximize2,
  Radio,
  Download,
  CheckCircle2,
} from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { MarqueeText } from './MarqueeText';

export const PlayerControls: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    currentView,
    likedTracks,
    isQueueOpen,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    setVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
    setAddToPlaylistTrack,
    setView,
    setSearchQuery,
    toggleQueue,
    toggleFullScreen,
    downloadedTracks,
    toggleDownload,
  } = usePlayer();

  const isLiked = likedTracks.includes(currentTrack.id);
  const isDownloaded = downloadedTracks.includes(currentTrack.id);

  const formatTime = (s: number) => {
    if (isNaN(s)) return '0:00';
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  };

  const VolumeIcon = isMuted || volume === 0 ? VolumeX : volume < 0.4 ? Volume1 : Volume2;

  return (
    <footer className="hidden h-[90px] items-center justify-between border-t border-[#282828] bg-black px-4 select-none md:flex">
      {/* LEFT — now playing */}
      <div className="flex w-[30%] min-w-[180px] items-center gap-3.5 overflow-hidden pr-2">
        <div
          onClick={toggleFullScreen}
          className="group relative h-14 w-14 shrink-0 cursor-pointer overflow-hidden rounded shadow-md"
          style={{ background: currentTrack.gradient }}
        >
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <Maximize2 className="h-5 w-5 text-white" />
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <MarqueeText
            onClick={toggleFullScreen}
            className="cursor-pointer text-sm font-medium text-white hover:underline"
          >
            {currentTrack.title}
          </MarqueeText>
          <MarqueeText className="text-[11px] text-[#b3b3b3]">
            {currentTrack.artist.split(',').map((a, i) => (
              <React.Fragment key={i}>
                {i > 0 && ', '}
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchQuery(a.trim());
                    setView('artist');
                  }}
                  className="cursor-pointer hover:underline hover:text-white"
                >
                  {a.trim()}
                </span>
              </React.Fragment>
            ))}
          </MarqueeText>
        </div>
        <button
          onClick={() => setAddToPlaylistTrack(currentTrack)}
          className={`ml-2 shrink-0 transition-transform hover:scale-110 ${isLiked ? 'text-[#1db954]' : 'text-[#b3b3b3] hover:text-white'}`}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-[#1db954]' : ''}`} />
        </button>
        <button
          onClick={() => toggleDownload(currentTrack)}
          className={`shrink-0 transition-transform hover:scale-110 ${isDownloaded ? 'text-[#1db954]' : 'text-[#b3b3b3] hover:text-white'}`}
          title={isDownloaded ? 'Remove download' : 'Download'}
        >
          {isDownloaded ? <CheckCircle2 className="h-4 w-4 text-[#1db954]" /> : <Download className="h-4 w-4" />}
        </button>
      </div>

      {/* CENTER — transport + progress */}
      <div className="flex max-w-[722px] flex-1 flex-col items-center gap-1.5">
        <div className="flex items-center gap-5">
          <button
            onClick={() => toggleShuffle()}
            className={`relative transition hover:scale-105 ${isShuffle ? 'text-[#1db954]' : 'text-[#b3b3b3] hover:text-white'}`}
          >
            <Shuffle className="h-4 w-4" />
            {isShuffle && <span className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#1db954]" />}
          </button>
          <button onClick={() => prevTrack()} className="text-[#b3b3b3] hover:text-white">
            <SkipBack className="h-4 w-4 fill-current" />
          </button>
          <button
            onClick={() => togglePlay()}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white transition-transform hover:scale-105"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 fill-black text-black" />
            ) : (
              <Play className="h-4 w-4 translate-x-[1px] fill-black text-black" />
            )}
          </button>
          <button onClick={() => nextTrack()} className="text-[#b3b3b3] hover:text-white">
            <SkipForward className="h-4 w-4 fill-current" />
          </button>
          <button
            onClick={() => toggleRepeat()}
            className={`relative transition hover:scale-105 ${repeatMode !== 'off' ? 'text-[#1db954]' : 'text-[#b3b3b3] hover:text-white'}`}
          >
            <Repeat className="h-4 w-4" />
            {repeatMode !== 'off' && <span className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#1db954]" />}
            {repeatMode === 'one' && (
              <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-[#1db954] text-[7px] font-extrabold text-black">
                1
              </span>
            )}
          </button>
        </div>

        <div className="flex w-full items-center gap-2 text-[11px] text-[#b3b3b3]">
          <span className="w-10 text-right tabular-nums">{formatTime(currentTime)}</span>
          <div className="group/bar relative flex h-3 flex-1 cursor-pointer items-center">
            <input
              type="range"
              min={0}
              max={duration || 1}
              value={currentTime}
              onChange={(e) => seek(parseFloat(e.target.value))}
              className="absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none opacity-0"
            />
            <div className="h-1 w-full overflow-hidden rounded-full bg-[#4d4d4d]">
              <div
                className="h-full bg-white transition-colors group-hover/bar:bg-[#1db954]"
                style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
              />
            </div>
            <div
              className="absolute h-3 w-3 rounded-full bg-white opacity-0 shadow transition-opacity group-hover/bar:opacity-100"
              style={{ left: `calc(${(currentTime / (duration || 1)) * 100}% - 6px)` }}
            />
          </div>
          <span className="w-10 tabular-nums">{formatTime(duration)}</span>
        </div>
      </div>

      {/* RIGHT — secondary controls */}
      <div className="flex w-[30%] min-w-[180px] items-center justify-end gap-3">
        <button
          onClick={() => setView('lyrics')}
          className={`transition hover:scale-110 ${currentView === 'lyrics' ? 'text-[#1db954]' : 'text-[#b3b3b3] hover:text-white'}`}
        >
          <Mic2 className="h-4 w-4" />
        </button>
        <button
          onClick={() => setView('visualizer')}
          className={`transition hover:scale-110 ${currentView === 'visualizer' ? 'text-[#1db954]' : 'text-[#b3b3b3] hover:text-white'}`}
        >
          <Radio className="h-4 w-4" />
        </button>
        <button
          onClick={toggleQueue}
          className={`relative transition hover:scale-110 ${isQueueOpen ? 'text-[#1db954]' : 'text-[#b3b3b3] hover:text-white'}`}
        >
          <ListMusic className="h-4 w-4" />
          {isQueueOpen && <span className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#1db954]" />}
        </button>
        <div className="group/vol flex items-center gap-1.5">
          <button onClick={toggleMute} className="text-[#b3b3b3] hover:text-white">
            <VolumeIcon className="h-4 w-4" />
          </button>
          <div className="relative flex h-3 w-[93px] cursor-pointer items-center">
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none opacity-0"
            />
            <div className="h-1 w-full overflow-hidden rounded-full bg-[#4d4d4d]">
              <div
                className="h-full bg-white transition-colors group-hover/vol:bg-[#1db954]"
                style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
              />
            </div>
            <div
              className="absolute h-3 w-3 rounded-full bg-white opacity-0 shadow transition-opacity group-hover/vol:opacity-100"
              style={{ left: `calc(${(isMuted ? 0 : volume) * 100}% - 6px)` }}
            />
          </div>
        </div>
        <button
          onClick={toggleFullScreen}
          className="text-[#b3b3b3] transition hover:scale-110 hover:text-white"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>
    </footer>
  );
};
