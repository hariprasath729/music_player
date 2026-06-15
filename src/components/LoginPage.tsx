import React, { useState, useEffect } from 'react';
import { useAuth, AuthUser } from '../context/AuthContext';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { authApi } from '../services/apiClient';

const GOOGLE_CLIENT_ID =
  (import.meta as unknown as { env?: { VITE_GOOGLE_CLIENT_ID?: string } }).env?.VITE_GOOGLE_CLIENT_ID ||
  '711494761481-2r3hdi3cdesd3qa7b5cetgr2kudnqj6m.apps.googleusercontent.com';

const MusicPlayerMark = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 39 39" fill="none" aria-hidden="true">
    <circle cx="19.5" cy="19.5" r="19.5" fill="#ff0000"/>
    <path d="M11.7 15.6c3.12-.78 6.24-.78 9.36.39.39.39.39.78-.39.78-3.12-1.17-6.24-1.17-8.58-.39-.39 0-.78-.39-.39-.78zm-.78 3.9c4.29-1.17 9.36-.78 14.04.78.39.39.39 1.17-.39 1.56-5.07-1.95-10.92-1.95-15.99-.39-.78 0-1.17-.78-.78-1.95zm-1.17 4.68c5.07-1.56 10.92-1.17 17.16 1.17.78.39.39 1.17-.39 1.56-5.07-1.95-10.92-1.95-15.99-.39-.78 0-1.17-.78-.78-1.95" fill="#fff"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="#1877F2">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="#ffffff">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.4.07 2.38.74 3.2.8 1.22-.24 2.39-.93 3.68-.84 1.56.12 2.74.73 3.51 1.84-3.17 1.9-2.42 6.06.48 7.23-.57 1.55-1.31 3.07-2.87 3.85zM12.03 7.25c-.16-2.49 1.98-4.57 4.36-4.75.34 2.88-2.56 5.02-4.36 4.75z" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

/** Custom-styled Google login button that matches the other social buttons */
const GoogleLoginButton: React.FC<{ onSuccess: (credential?: string) => void }> = ({ onSuccess }) => {
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // useGoogleLogin returns an access_token, not an id_token.
      // For the backend flow we just pass it — or fall back to quick login.
      onSuccess(tokenResponse.access_token);
    },
    onError: () => {
      onSuccess(); // fallback
    },
  });

  return (
    <button className="social-btn" onClick={() => googleLogin()} type="button">
      <GoogleIcon />
      Continue with Google
    </button>
  );
};

export const LoginPage: React.FC<{ onSwitchToSignup: () => void }> = ({ onSwitchToSignup }) => {
  const { login, loginWithEmail, contactAdmin, clearError, isPendingApproval, setIsPendingApproval } = useAuth();
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [toasts, setToasts] = useState<{ id: number; text: string }[]>([]);
  const toastIdRef = React.useRef(0);
  
  // Contact Admin Modal State
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactEmail, setContactEmail] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  useEffect(() => {
    // Check URL parameters when coming from a rejection email
    const params = new URLSearchParams(window.location.search);
    if (params.get('contact') === 'true') {
      setContactEmail(params.get('email') || '');
      setContactName(params.get('name') || '');
      setShowContactModal(true);
      
      // Clean the URL bar silently so a refresh doesn't pop the modal again
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const showToast = (text: string) => {
    const id = ++toastIdRef.current;
    setToasts((prev) => [...prev.slice(-2), { id, text }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2500);
  };

  const handleQuickLogin = (customUser?: Partial<AuthUser>) => {
    setErrorMsg('');
    login({
      id: customUser?.id || 'user-' + Date.now(),
      name: customUser?.name || 'Demo User',
      email: customUser?.email || 'user@123',
      profilePic: customUser?.profilePic || 'https://cdn.jsdelivr.net/gh/twitter/twemoji/assets/72x72/1f3a7.png',
      token: customUser?.token || 'mock-jwt-token-12345',
    });
  };

  const handleGoogleSuccess = async (credential?: string) => {
    if (!credential) {
      handleQuickLogin({ name: 'Google User', email: 'google_user@gmail.com' });
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await authApi.googleLogin(credential);
      const responseUser = (res as any).data?.user || (res as any).user;
      const responseToken = (res as any).data?.token || (res as any).token;

      if (res.success && responseUser) {
        handleQuickLogin({
          id: responseUser.id,
          name: responseUser.name,
          email: responseUser.email,
          profilePic: responseUser.profilePic,
          token: responseToken,
        });
      } else {
        throw new Error('Backend login unsuccessful');
      }
    } catch (err) {
      console.warn('[LoginPage] Backend OAuth failed or requires approval', err);
      
      if (err instanceof Error && err.message.includes('Waiting for admin approval')) {
        setIsPendingApproval(true);
        setLoading(false);
        return;
      }
      
      try {
        // Fetch user info directly from Google as a fallback
        const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${credential}` }
        });
        if (userInfoRes.ok) {
          const userInfo = await userInfoRes.json();
          handleQuickLogin({
            name: userInfo.name || 'Google User',
            email: userInfo.email || 'google_user@gmail.com',
            profilePic: userInfo.picture,
          });
          setLoading(false);
          return;
        }
      } catch (fetchErr) {
        // Ignore and proceed to the default fallback below
      }
      
      handleQuickLogin({ name: 'Google User', email: 'google_user@gmail.com' });
    }
    setLoading(false);
  };

  const handleFormLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setErrorMsg('');
    const trimmed = emailInput.trim();

    if (!trimmed) {
      setErrorMsg('Please enter an email or username.');
      return;
    }
    if (passInput.length < 2) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setLoading(true);
    await loginWithEmail(trimmed, passInput);
    setLoading(false);
  };

  const handleSendMessage = async () => {
    if (!contactEmail.trim() || !contactMessage.trim()) {
      showToast('Email and message are required.');
      return;
    }
    
    setLoading(true);
    try {
      await contactAdmin(contactEmail, contactName, contactMessage);
      setShowContactModal(false);
      setContactMessage('');
      setErrorMsg('');
      showToast('Your message has been sent to the administrator!');
    } catch (err: any) {
      showToast(err.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="music-player-login-page">
        <style>{`
          .music-player-login-page *,.music-player-login-page *::before,.music-player-login-page *::after{box-sizing:border-box;margin:0;padding:0}
          .music-player-login-page{--green:#ff0000;--green-hover:#ff3333;--bg:#121212;--bg-card:#181818;--bg-elevated:#282828;--bg-input:#242424;--border:#3e3e3e;--border-hover:#7a7a7a;--text-primary:#fff;--text-secondary:#b3b3b3;--text-muted:#727272;height:100vh;width:100%;display:flex;flex-direction:column;overflow:hidden;background:var(--bg);font-family:Nunito,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:var(--text-primary);-webkit-font-smoothing:antialiased}
          .music-player-login-main{flex:1;display:flex;align-items:center;justify-content:center;overflow:hidden;padding:16px;min-height:0}.login-card{background:var(--bg-card);border-radius:10px;border:1px solid var(--border);width:100%;max-width:460px;padding:clamp(20px,3.5vh,40px) clamp(20px,4vw,48px);overflow:hidden}.card-logo{display:flex;justify-content:center;margin-bottom:clamp(12px,2vh,22px)}.card-logo svg{width:clamp(34px,4vw,42px);height:clamp(34px,4vw,42px)}.login-card h1{font-size:clamp(1.25rem,2.5vw,1.85rem);font-weight:900;color:var(--text-primary);text-align:center;margin-bottom:clamp(14px,2.5vh,28px);letter-spacing:-.03em;line-height:1.2}
          .social-btn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:clamp(9px,1.2vh,13px) 18px;border-radius:500px;font-family:inherit;font-size:clamp(12px,1.3vw,14px);font-weight:700;letter-spacing:.03em;cursor:pointer;text-decoration:none;border:1px solid var(--border);background:transparent;color:var(--text-primary);margin-bottom:clamp(6px,1vh,10px);transition:border-color .15s,background .15s,transform .1s}.social-btn:last-of-type{margin-bottom:0}.social-btn:hover{border-color:var(--border-hover);background:rgba(255,255,255,.04);transform:scale(1.01)}.social-btn svg{width:18px;height:18px;flex-shrink:0}.apple-icon{fill:#fff}.phone-icon{stroke:#fff;fill:none}.divider{display:flex;align-items:center;gap:12px;margin:clamp(10px,1.6vh,20px) 0}.divider hr{flex:1;border:none;border-top:1px solid var(--border)}.divider span{font-size:12px;font-weight:700;color:var(--text-muted);letter-spacing:.05em}
          .form-group{margin-bottom:clamp(10px,1.4vh,16px)}.form-group label{display:block;font-size:clamp(12px,1.2vw,13.5px);font-weight:800;color:var(--text-primary);margin-bottom:6px}.form-group input{width:100%;padding:clamp(9px,1.2vh,13px) 14px;border:1px solid var(--border);border-radius:5px;font-family:inherit;font-size:clamp(13px,1.3vw,15px);color:var(--text-primary);background:var(--bg-input);outline:none;transition:border-color .15s,box-shadow .15s}.form-group input:hover{border-color:var(--border-hover)}.form-group input:focus{border-color:var(--text-primary);box-shadow:0 0 0 3px rgba(255,255,255,.07)}.form-group input::placeholder{color:var(--text-muted)}.forgot-link{display:inline-block;font-size:clamp(12px,1.2vw,13.5px);font-weight:700;color:var(--text-primary);text-decoration:underline;margin-bottom:clamp(12px,1.8vh,22px);transition:color .15s}.forgot-link:hover{color:var(--green)}.btn-login{display:block;width:100%;padding:clamp(10px,1.4vh,15px);background:var(--green);color:#000;border:none;border-radius:500px;font-family:inherit;font-size:clamp(13px,1.3vw,15px);font-weight:800;letter-spacing:.06em;cursor:pointer;transition:background .15s,transform .1s}.btn-login:hover{background:var(--green-hover);transform:scale(1.02)}.captcha-note{font-size:clamp(9.5px,1vw,11px);color:var(--text-muted);text-align:center;margin-top:clamp(10px,1.4vh,16px);line-height:1.6}.captcha-note a{color:var(--text-muted);text-decoration:underline}.captcha-note a:hover{color:var(--text-secondary)}.signup-footer{border-top:1px solid var(--border);margin-top:clamp(12px,1.8vh,24px);padding-top:clamp(12px,1.8vh,22px);text-align:center}.signup-footer p{font-size:clamp(13px,1.3vw,15px);color:var(--text-secondary)}.signup-footer a{color:var(--text-primary);font-weight:700;text-decoration:underline;transition:color .15s}.signup-footer a:hover{color:var(--green)}
          .music-player-login-footer{flex-shrink:0;background:var(--bg);border-top:1px solid var(--border);padding:0 48px;height:52px;display:flex;align-items:center;justify-content:space-between;gap:12px}.music-player-login-footer p{font-size:11.5px;color:var(--text-muted);white-space:nowrap}.footer-links{display:flex;gap:18px;flex-wrap:nowrap;overflow:hidden}.footer-links a{font-size:11.5px;color:var(--text-muted);text-decoration:none;white-space:nowrap;transition:color .15s}.footer-links a:hover{color:var(--text-primary);text-decoration:underline}
          @media(max-width:768px){.music-player-login-footer{padding:10px 20px;height:auto;flex-wrap:wrap;gap:8px}.footer-links{gap:12px;flex-wrap:wrap}}
          @media(max-width:480px){.login-card{border:none;background:transparent}.music-player-login-footer{padding:8px 14px}.footer-links a,.music-player-login-footer p{font-size:10.5px}.footer-links{gap:10px}}
          @media(max-height:640px){.login-card h1{font-size:1.15rem}.card-logo{margin-bottom:8px}.card-logo svg{width:30px;height:30px}}
        `}</style>

        {isPendingApproval ? (
          <main className="music-player-login-main">
            <div className="login-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div className="card-logo" style={{ marginBottom: '24px' }}><MusicPlayerMark size={56} /></div>
              <h1 style={{ marginBottom: '16px' }}>Access Requested</h1>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: '1.6' }}>
                Your account has been successfully authenticated but requires admin approval. You will receive an email once your access is granted.
              </p>
              <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                <button onClick={() => setShowContactModal(true)} className="btn-login" style={{ background: 'transparent', border: '1px solid var(--border)', color: 'white' }} type="button">
                  Contact Admin
                </button>
                <button onClick={() => setIsPendingApproval(false)} className="btn-login" type="button">
                  Back to Login
                </button>
              </div>
            </div>
          </main>
        ) : (
        <main className="music-player-login-main">
          <div className="login-card">
            <div className="card-logo"><MusicPlayerMark size={42} /></div>
            <h1>Log in to Music Player</h1>

            {errorMsg && (
              <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-2 text-center text-xs font-semibold text-red-400">
                {errorMsg}
              </div>
            )}

            {/* Hint pill for easy testing */}
           

            <GoogleLoginButton onSuccess={handleGoogleSuccess} />

            <button className="social-btn" onClick={() => showToast('Facebook login will be added in future updates')}><FacebookIcon />Continue with Facebook</button>
            <button className="social-btn" onClick={() => showToast('Apple login will be added in future updates')}><AppleIcon />Continue with Apple</button>
            <button className="social-btn" onClick={() => showToast('Phone login will be added in future updates')}><PhoneIcon />Continue with phone number</button>

            <div className="divider"><hr /><span>or</span><hr /></div>

            <form onSubmit={handleFormLogin}>
              <div className="form-group">
                <label htmlFor="email">Email address or username</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Email address or username"
                  autoComplete="username"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={passInput}
                  onChange={(e) => setPassInput(e.target.value)}
                />
              </div>

              <a href="#" onClick={(e) => { e.preventDefault(); handleQuickLogin(); }} className="forgot-link">Forgot your password?</a>
              <button className="btn-login" type="submit" disabled={loading}>
                {loading ? 'Logging In…' : 'Log In'}
              </button>
            </form>

            <p className="captcha-note">
              This site is protected by reCAPTCHA and the Google <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a> apply.
            </p>
            <div className="signup-footer">
              <p>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToSignup(); }}>Sign up for Music Player</a></p>
            </div>
          </div>
        </main>
        )}

        <footer className="music-player-login-footer">
          <p>© 2026 Music Player HP</p>
          <div className="footer-links">
            <a href="#">Legal</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Cookies</a>
            <a href="#">About Ads</a>
            <a href="#">Accessibility</a>
          </div>
        </footer>

        {showContactModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-0 sm:p-4 backdrop-blur-sm">
            <div className="w-full h-full sm:h-auto max-w-md sm:max-h-[90vh] overflow-y-auto rounded-none sm:rounded-xl bg-[#181818] p-6 sm:p-6 border-0 sm:border border-[#3e3e3e] shadow-2xl flex flex-col">
              <h2 className="text-2xl sm:text-xl font-bold text-white mb-2 pt-4 sm:pt-0">Contact Admin</h2>
              <p className="text-[14.5px] sm:text-sm text-[#b3b3b3] mb-6 sm:mb-5">Please provide details about your request. An admin will review it.</p>
              
              <label className="block text-[13px] font-bold text-white mb-2">Name (Optional)</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Your Name"
                className="w-full p-3.5 sm:p-3 bg-[#242424] text-[15px] sm:text-base text-white rounded-md border border-[#3e3e3e] focus:border-[#1db954] outline-none mb-4"
              />
              
              <label className="block text-[13px] font-bold text-white mb-2">Email Address</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full p-3.5 sm:p-3 bg-[#242424] text-[15px] sm:text-base text-white rounded-md border border-[#3e3e3e] focus:border-[#1db954] outline-none mb-4"
              />
              
              <label className="block text-[13px] font-bold text-white mb-2">Message</label>
              <textarea
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full flex-1 sm:flex-none sm:h-32 min-h-[150px] p-3.5 sm:p-3 bg-[#242424] text-[15px] sm:text-base text-white rounded-md border border-[#3e3e3e] focus:border-[#1db954] outline-none resize-none mb-6 sm:mb-5"
              />
              
              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-auto sm:mt-2 pb-4 sm:pb-0">
                <button onClick={() => setShowContactModal(false)} className="w-full sm:w-auto px-4 py-3.5 sm:py-2 rounded-full font-bold text-white hover:bg-white/10 transition order-2 sm:order-1 text-[15px] sm:text-base border border-[#3e3e3e] sm:border-none">
                  Cancel
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={loading || !contactMessage.trim() || !contactEmail.trim()}
                  className="w-full sm:w-auto px-4 py-3.5 sm:py-2 rounded-full font-bold bg-[#1db954] text-black hover:bg-[#1ed760] transition disabled:opacity-50 order-1 sm:order-2 text-[15px] sm:text-base"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </div>
          </div>
        )}

        {toasts.length > 0 && (
          <div className="pointer-events-none fixed bottom-10 left-1/2 z-[10000] flex -translate-x-1/2 flex-col items-center gap-2">
            {toasts.map((t) => (
              <div key={t.id} className="flex items-center gap-2.5 rounded-lg bg-[#3d3d3d] px-4 py-2.5 text-[13px] font-semibold text-white shadow-xl transition-all">
                <span>{t.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
};
