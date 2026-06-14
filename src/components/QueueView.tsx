import React, { useState } from 'react';
import { X, Play, Trash2, GripVertical } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { Track } from '../data/musicCatalog';

export const QueueView: React.FC = () => {
  const {
    isQueueOpen,
    toggleQueue,
    currentTrack,
    queue,
    playTrack,
    removeFromQueue,
    clearQueue,
    reorderQueue,
    setView,
    setSearchQuery,
  } = usePlayer();

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  if (!isQueueOpen) return null;

  const handlePlayQueued = (track: Track, index: number) => {
    removeFromQueue(index);
    playTrack(track);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    reorderQueue(draggedIndex, index);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleTouchStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (draggedIndex === null) return;
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    const targetItem = element?.closest('[data-queue-idx]');
    if (targetItem) {
      const hoverIndex = Number(targetItem.getAttribute('data-queue-idx'));
      if (!isNaN(hoverIndex) && hoverIndex !== draggedIndex) {
        reorderQueue(draggedIndex, hoverIndex);
        setDraggedIndex(hoverIndex);
      }
    }
  };

  const handleTouchEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <aside className="fixed inset-y-0 right-0 z-40 flex w-80 flex-col border-l border-[#282828] bg-[#121212] text-white select-none md:relative">
      {/* Backdrop for mobile */}
      <div 
        className="fixed inset-0 bg-black/50 md:hidden"
        onClick={toggleQueue}
      />
      
      {/* Queue panel */}
      <div className="relative z-10 flex h-full w-full flex-col bg-[#121212]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#282828] p-4">
          <h2 className="text-lg font-bold tracking-tight">Queue</h2>
          <button
            onClick={toggleQueue}
            className="rounded-full p-1 text-[#b3b3b3] transition-colors hover:bg-[#282828] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-4">
        {/* Now Playing */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#b3b3b3]">
            Now Playing
          </span>
          <div className="flex items-center gap-3 rounded-md bg-[#232323] p-2.5">
            <div
              className="h-11 w-11 shrink-0 rounded shadow"
              style={{ background: currentTrack.gradient }}
            />
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-bold text-[#1db954]">
                {currentTrack.title}
              </span>
              <span className="truncate text-[11px] text-[#b3b3b3]">
                {currentTrack.artist.split(',').map((a, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && ', '}
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearchQuery(a.trim());
                        setView('artist');
                        toggleQueue();
                      }}
                      className="cursor-pointer hover:underline hover:text-white"
                    >
                      {a.trim()}
                    </span>
                  </React.Fragment>
                ))}
              </span>
            </div>
            <div className="ml-auto flex items-end gap-[2px] h-3">
              <div className="w-[3px] animate-wave-1 rounded-full bg-[#1db954]" />
              <div className="w-[3px] animate-wave-2 rounded-full bg-[#1db954]" />
              <div className="w-[3px] animate-wave-3 rounded-full bg-[#1db954]" />
            </div>
          </div>
        </div>

        {/* Next Up */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#b3b3b3]">
              Next Up
            </span>
            {queue.length > 0 && (
              <button
                onClick={clearQueue}
                className="text-[11px] text-[#b3b3b3] transition-colors hover:text-white hover:underline"
              >
                Clear
              </button>
            )}
          </div>

          {queue.length === 0 ? (
            <p className="py-4 text-center text-[12px] text-[#555]">
              No tracks in the queue.
            </p>
          ) : (
            <div className="flex flex-col gap-0.5">
              {queue.map((track, idx) => (
                <div
                  key={`queue-item-${idx}`}
                  data-queue-idx={idx}
                  draggable
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDrop={(e) => handleDrop(e, idx)}
                  onDragEnd={handleDragEnd}
                  className={`group flex items-center gap-2.5 rounded-md p-2 transition-colors hover:bg-[#232323] ${draggedIndex === idx ? 'opacity-50 bg-white/5' : ''}`}
                >
                  <div 
                    className="flex cursor-grab active:cursor-grabbing items-center justify-center text-white/20 transition-colors hover:text-white md:text-transparent md:group-hover:text-[#b3b3b3] p-1 -ml-1"
                    onTouchStart={() => handleTouchStart(idx)}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{ touchAction: 'none' }}
                  >
                    <GripVertical className="h-4 w-4" />
                  </div>
                  <div
                    onClick={() => handlePlayQueued(track, idx)}
                    className="relative flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded shadow"
                    style={{ background: track.gradient }}
                  >
                    <Play className="absolute h-3.5 w-3.5 fill-white text-white opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <div onClick={() => handlePlayQueued(track, idx)} className="flex min-w-0 flex-col pr-2 cursor-pointer flex-1">
                    <span className="truncate text-[12px] font-bold text-white group-hover:text-[#1db954]">
                      {track.title}
                    </span>
                    <span className="truncate text-[10px] text-[#b3b3b3]">
                      {track.artist.split(',').map((a, i) => (
                        <React.Fragment key={i}>
                          {i > 0 && ', '}
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              setSearchQuery(a.trim());
                              setView('artist');
                              toggleQueue();
                            }}
                            className="cursor-pointer hover:underline hover:text-white"
                          >
                            {a.trim()}
                          </span>
                        </React.Fragment>
                      ))}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromQueue(idx);
                    }}
                    className="ml-auto p-1 text-[#b3b3b3] opacity-0 transition-all hover:text-red-400 group-hover:opacity-100"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      </div>
    </aside>
  );
};
