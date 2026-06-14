import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { PlayerProvider } from './context/PlayerContext';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { MainContent } from './components/MainContent';
import { QueueView } from './components/QueueView';
import { PlayerControls } from './components/PlayerControls';
import { FullScreenPlayer } from './components/FullScreenPlayer';
import { MobileNav } from './components/MobileNav';
import { MiniPlayer } from './components/MiniPlayer';
import { Toast } from './components/Toast';

const PlayerShell: React.FC = () => (
  <PlayerProvider>
    <div className="flex h-[100dvh] w-screen flex-col overflow-hidden bg-black font-sans antialiased select-none">
      <div className="relative flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-hidden bg-[#121212] md:my-2 md:mr-2 md:rounded-lg">
          <Navbar />
          <MainContent />
        </div>
        <div className="md:my-2 md:mr-2 md:flex md:overflow-hidden md:rounded-lg">
          <QueueView />
        </div>
      </div>
      <MiniPlayer />
      <MobileNav />
      <PlayerControls />
      <FullScreenPlayer />
      <Toast />
    </div>
  </PlayerProvider>
);

const AppGate: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [view, setView] = React.useState<'login' | 'signup'>('login');

  if (isLoggedIn) return <PlayerShell />;

  return view === 'login' ? (
    <LoginPage onSwitchToSignup={() => setView('signup')} />
  ) : (
    <SignupPage onSwitchToLogin={() => setView('login')} />
  );
};

export const App: React.FC = () => (
  <AuthProvider>
    <AppGate />
  </AuthProvider>
);

export default App;
