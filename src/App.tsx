import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { AppBootstrap } from './components/AppBootstrap';
import { PlayerProvider } from './context/PlayerContext';
import AuthLayout from './components/auth/AuthLayout';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { MainContent } from './components/MainContent';
import { QueueView } from './components/QueueView';
import { PlayerControls } from './components/PlayerControls';
import { FullScreenPlayer } from './components/FullScreenPlayer';
import { MobileNav } from './components/MobileNav';
import { MiniPlayer } from './components/MiniPlayer';
import { Toast } from './components/Toast';
import { useBackHandler } from './hooks/useBackHandler';
import { ProfileView } from './components/views/ProfileView';

import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './components/auth/ResetPasswordPage';
import { MagicLoginPage } from './components/auth/MagicLoginPage';

const PlayerShell: React.FC = () => (
  // No changes needed here
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
      <ProfileView />
      <Toast />
    </div>
  </PlayerProvider>
);

/** Login/Signup view — shown when user is not authenticated */
const AuthPages: React.FC<{ pushScreen: (id: string) => void }> = ({ pushScreen }) => {
  const [view, setView] = React.useState<'login' | 'signup'>('login');

  // Push screen identifier whenever view changes
  React.useEffect(() => {
    pushScreen(`view:${view}`);
  }, [view]);

  const pathname = window.location.pathname;
  const search = window.location.search;
  const params = new URLSearchParams(search);

  if (pathname.endsWith('/forgot-password')) {
    return (
      <ForgotPasswordPage
        onBackToLogin={() => {
          window.location.pathname = '/';
          setView('login');
        }}
      />
    );
  }

  if (pathname.endsWith('/reset-password')) {
    const token = params.get('token') || '';
    return (
      <ResetPasswordPage
        token={token}
        onBackToLogin={() => {
          window.location.pathname = '/';
          setView('login');
        }}
      />
    );
  }

  if (pathname.endsWith('/magic-login')) {
    const token = params.get('token') || '';
    return (
      <MagicLoginPage
        token={token}
        onBackToLogin={() => {
          window.location.pathname = '/';
          setView('login');
        }}
      />
    );
  }

  return view === 'login' ? (
    <LoginPage
      onSwitchToSignup={() => setView('signup')}
    />
  ) : (
    <SignupPage onSwitchToLogin={() => setView('login')} />
  );
};

const AppGate: React.FC<{ pushScreen: (id: string) => void }> = ({ pushScreen }) => {
  const { isLoggedIn } = useAuth();

  // No cached session → hide the splash screen since there's nothing to verify
  // This runs before any conditional returns to respect React hooks rules
  React.useEffect(() => {
    if (!isLoggedIn && typeof (window as any).hideSplashScreen === 'function') {
      (window as any).hideSplashScreen();
    }
  }, [isLoggedIn]);

  // User has a cached session → run through AppBootstrap
  // (verifies with backend, manages splash/skeleton/timeout)
  if (isLoggedIn) {
    return (
      <AppBootstrap
        loginFallback={<AuthLayout><AuthPages pushScreen={pushScreen} /></AuthLayout>}
      >
        <PlayerShell />
      </AppBootstrap>
    );
  }

  // No cached session → show login directly
  return <AuthLayout><AuthPages pushScreen={pushScreen} /></AuthLayout>;
};

export const App: React.FC = () => {
  const pathname = window.location.pathname;
  const search = window.location.search;
  const params = new URLSearchParams(search);

  // Initialize back handler with custom logic
  const { pushScreen } = useBackHandler({
    customBackHandler: (stack) => {
      // If no more app history, signal exit (native wrapper can handle)
      if (stack.length === 0) {
        return 'EXIT_APP';
      }
      // Otherwise, UI state updates are handled elsewhere
    },
  });

  React.useEffect(() => {
    // If we are on one of the auth-subpages, ensure the splash screen is hidden
    const path = window.location.pathname;
    if (
      path.includes('forgot-password') ||
      path.includes('reset-password') ||
      path.includes('magic-login')
    ) {
      if (typeof (window as any).hideSplashScreen === 'function') {
        (window as any).hideSplashScreen();
      }
    }
  }, []);

  // Render auth-subpages without the logged-in/player shell,
  // but keep AuthProvider so useAuth() functions exist.
  if (pathname.endsWith('/forgot-password')) {
    return (
      <AuthProvider>
        <AuthLayout>
          <ForgotPasswordPage
            onBackToLogin={() => {
              window.location.pathname = '/';
            }}
          />
        </AuthLayout>
      </AuthProvider>
    );
  }

  if (pathname.endsWith('/reset-password')) {
    const token = params.get('token') || '';
    return (
      <AuthProvider>
        <AuthLayout>
          <ResetPasswordPage
            token={token}
            onBackToLogin={() => {
              window.location.pathname = '/';
            }}
          />
        </AuthLayout>
      </AuthProvider>
    );
  }

  if (pathname.endsWith('/magic-login')) {
    const token = params.get('token') || '';
    return (
      <AuthProvider>
        <AuthLayout>
          <MagicLoginPage
            token={token}
            onBackToLogin={() => {
              window.location.pathname = '/';
            }}
          />
        </AuthLayout>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      {/* Pass pushScreen to AppGate for navigation tracking */}
      <AppGate pushScreen={pushScreen} />
    </AuthProvider>
  );
};

export default App;
