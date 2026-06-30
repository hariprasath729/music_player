import React, { useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export const ForgotPasswordPage: React.FC<{ onBackToLogin: () => void }> = ({ onBackToLogin }) => {
  const { forgotPassword, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [localError, setLocalError] = useState('');
  const [sent, setSent] = useState(false);

  const displayError = useMemo(() => localError || error || '', [localError, error]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();
    const trimmed = email.trim();
    if (!trimmed) {
      setLocalError('Please enter your email.');
      return;
    }

    try {
      await forgotPassword(trimmed);
      setSent(true);
    } catch (err: any) {
      setLocalError(err?.message || 'Failed to request password reset.');
    }
  };

  return (
    <div className="music-player-login-page">
      <style>{` 
        .music-player-login-page *,.music-player-login-page *::before,.music-player-login-page *::after{box-sizing:border-box;margin:0;padding:0}
        .music-player-login-page{--green:#ff0000;--green-hover:#ff3333;--bg:#121212;--bg-card:#181818;--border:rgba(255,255,255,0.08);--text-primary:#fff;--text-secondary:#b3b3b3;--text-muted:#727272;height:100vh;width:100%;display:flex;align-items:center;justify-content:center;overflow:hidden;background:transparent;pointer-events:none;font-family:Nunito,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:var(--text-primary);-webkit-font-smoothing:antialiased}
        .card{background:rgba(24, 24, 24, 0.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.08);border-radius:10px;width:90%;max-width:460px;padding:24px;box-shadow:0 8px 32px 0 rgba(0,0,0,0.37);pointer-events:auto}
        .title{font-size:24px;font-weight:900;text-align:center;margin-bottom:16px}
        .hint{font-size:13px;color:var(--text-secondary);text-align:center;margin-bottom:18px;line-height:1.6}
        .form-group{margin-bottom:14px}
        .label{display:block;font-size:13px;font-weight:800;color:var(--text-primary);margin-bottom:6px}
        input{width:100%;height:40px;padding:12px;border:1px solid rgba(255,255,255,0.08);border-radius:8px;font-family:inherit;font-size:14px;color:var(--text-primary);background:rgba(0,0,0,0.25);outline:none}
        input:focus{border-color:rgba(255,255,255,0.4);box-shadow:0 0 0 3px rgba(255,255,255,.03)}
        .btn{display:block;width:100%;padding:12px;border:none;border-radius:500px;font-family:inherit;font-size:14px;font-weight:900;letter-spacing:.06em;cursor:pointer;transition:transform .1s, background .15s}
        .btn-primary{background:var(--green);color:#000}
        .btn-primary:hover{background:var(--green-hover);transform:scale(1.02)}
        .btn-ghost{background:rgba(255,255,255,0.02);color:#fff;border:1px solid rgba(255,255,255,0.08)}
        .btn-ghost:hover{background:rgba(255,255,255,0.06);border-color:rgba(255,255,255,0.2)}
        .row{display:flex;gap:10px;align-items:center}
        .row .btn-ghost{flex:1}
        .row .btn-primary{flex:1}
        .error{background:rgba(255,77,109,.12);border:1px solid rgba(255,77,109,.35);color:#ffb3bf;border-radius:8px;padding:10px 12px;font-size:12px;margin-bottom:12px;text-align:center}
        .success{background:rgba(29,185,84,.12);border:1px solid rgba(29,185,84,.35);color:#92ffb9;border-radius:8px;padding:10px 12px;font-size:12px;margin-bottom:12px;text-align:center}
      `}</style>

      <div className="card">
        <div className="title">Reset your password</div>
        <div className="hint">Enter your email. If an account exists, we’ll send a reset link. (No account enumeration.)</div>

        {sent && <div className="success">If this email exists, a reset link has been sent.</div>}
        {!sent && displayError && <div className="error">{displayError}</div>}

        {!sent ? (
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label className="label" htmlFor="fp-email">Email</label>
              <input
                id="fp-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="  name@domain.com"
                autoComplete="email"
              />
            </div>

            <div className="row" style={{ marginTop: 12 }}>
              <button className="btn btn-ghost" type="button" onClick={onBackToLogin}>
                Back to Login
              </button>
              <button className="btn btn-primary" type="submit" disabled={isLoading}>
                {isLoading ? 'Sending…' : 'Send reset link'}
              </button>
            </div>
          </form>
        ) : (
          <button className="btn btn-primary" type="button" onClick={onBackToLogin} style={{ marginTop: 10 }}>
            Back to Login
          </button>
        )}
      </div>
    </div>
  );
};
