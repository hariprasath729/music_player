import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export const MagicLoginPage: React.FC<{ token: string; onBackToLogin: () => void }> = ({
  token,
  onBackToLogin,
}) => {
  const { magicLogin, isLoading, error, clearError } = useAuth();
  const [done, setDone] = useState(false);
  const [localError, setLocalError] = useState('');

  const displayError = useMemo(() => localError || error || '', [localError, error]);

  useEffect(() => {
    (async () => {
      setLocalError('');
      clearError();

      if (!token) {
        setLocalError('Missing magic login token.');
        return;
      }

      try {
        await magicLogin(token);
        setDone(true);
        // After successful login, redirect to home page
        window.location.replace('/');
      } catch (err: any) {
        setLocalError(err?.message || 'Magic login failed.');
      }
    })();
  }, [token, magicLogin, clearError]);

  return (
    <div className="music-player-login-page">
      <style>{`
        .music-player-login-page *,.music-player-login-page *::before,.music-player-login-page *::after{box-sizing:border-box;margin:0;padding:0}
        .music-player-login-page{--green:#ff0000;--green-hover:#ff3333;--bg:#121212;--bg-card:#181818;--border:rgba(255,255,255,0.08);--text-primary:#fff;--text-secondary:#b3b3b3;--text-muted:#727272;height:100vh;width:100%;display:flex;align-items:center;justify-content:center;overflow:hidden;background:transparent;pointer-events:none;font-family:Nunito,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:var(--text-primary);-webkit-font-smoothing:antialiased}
        .card{background:rgba(24, 24, 24, 0.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.08);border-radius:10px;width:100%;max-width:460px;padding:24px;box-shadow:0 8px 32px 0 rgba(0,0,0,0.37);pointer-events:auto}
        .title{font-size:24px;font-weight:900;text-align:center;margin-bottom:16px}
        .hint{font-size:13px;color:var(--text-secondary);text-align:center;margin-bottom:18px;line-height:1.6}
        .error{background:rgba(255,77,109,.12);border:1px solid rgba(255,77,109,.35);color:#ffb3bf;border-radius:8px;padding:10px 12px;font-size:12px;margin-bottom:12px;text-align:center}
        .success{background:rgba(29,185,84,.12);border:1px solid rgba(29,185,84,.35);color:#92ffb9;border-radius:8px;padding:10px 12px;font-size:12px;margin-bottom:12px;text-align:center}
        .btn{display:block;width:100%;padding:12px;border:none;border-radius:500px;font-family:inherit;font-size:14px;font-weight:900;letter-spacing:.06em;cursor:pointer;transition:transform .1s, background .15s}
        .btn-primary{background:var(--green);color:#000}
        .btn-primary:hover{background:var(--green-hover);transform:scale(1.02)}
        .btn-ghost{background:rgba(255,255,255,0.02);color:#fff;border:1px solid rgba(255,255,255,0.08)}
        .btn-ghost:hover{background:rgba(255,255,255,0.06);border-color:rgba(255,255,255,0.2)}
      `}</style>

      <div className="card">
        <div className="title">Signing you in…</div>
        <div className="hint">Completing secure one-time login.</div>

        {done && <div className="success">Login successful.</div>}
        {!done && displayError && <div className="error">{displayError}</div>}

        <div style={{ marginTop: 14 }}>
          <button className="btn btn-ghost" type="button" onClick={onBackToLogin} disabled={isLoading}>
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};
