import React, { useEffect, useRef } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { HomeView } from './views/HomeView';
import { SearchView } from './views/SearchView';
import { PlaylistView } from './views/PlaylistView';
import { LibraryView } from './views/LibraryView';
import { LikedSongsView } from './views/LikedSongsView';
import { LyricsView } from './views/LyricsView';
import { VisualizerView } from './views/VisualizerView';
import { ProfileView } from './views/ProfileView';
import { AllSongsView } from './views/AllSongsView';
import { ArtistsView } from './views/ArtistsView';
import { ArtistDetailsView } from './views/ArtistDetailsView';
import { RequestSongView } from './views/RequestSongView';
import { PlayAreaView } from './views/PlayAreaView';
import { DownloadsView } from './views/DownloadsView';

export const MainContent: React.FC = () => {
  const { currentView } = usePlayer();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Scroll to top on view change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [currentView]);

  return (
    <main ref={scrollRef} id="snap-main-container" className="flex-1 overflow-y-auto bg-[#121212] relative">
      {currentView === 'home' && <HomeView />}
      {currentView === 'search' && <SearchView />}
      {currentView === 'playlist' && <PlaylistView />}
      {currentView === 'library' && <LibraryView />}
      {currentView === 'liked-songs' && <LikedSongsView />}
      {currentView === 'lyrics' && <LyricsView />}
      {currentView === 'all-songs' && <AllSongsView />}
      {currentView === 'artists' && <ArtistsView />}
      {currentView === 'artist' && <ArtistDetailsView />}
      {currentView === 'request-song' && <RequestSongView />}
      {currentView === 'play-area' && <PlayAreaView />}
      {currentView === 'downloads' && <DownloadsView />}
      
      {/* Keep VisualizerView mounted to maintain the socket connection across the app */}
      <div className={currentView === 'visualizer' ? 'block h-full w-full' : 'hidden'}>
        <VisualizerView />
      </div>
    </main>
  );
};
