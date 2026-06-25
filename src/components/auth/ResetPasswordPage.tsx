import React, { useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

export const ResetPasswordPage: React.FC<{ token: string; onBackToLogin: () => void }> = ({
  token,
  onBackToLogin,
}) => {
  const { resetPassword, isLoading, error, clearError } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [done, setDone] = useState(false);

  const displayError = useMemo(() => localError || error || '', [localError, error]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    if (!token) {
      setLocalError('Missing reset token.');
      return;
    }
    if (newPassword.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      return;
    }

    try {
      await resetPassword(token, newPassword);
      setDone(true);
    } catch (err: any) {
      setLocalError(err?.message || 'Failed to reset password.');
    }
  };

  return (
    <div className="music-player-login-page">
      <style>{`
        .music-player-login-page *,.music-player-login-page *::before,.music-player-login-page *::after{box-sizing:border-box;margin:0;padding:0}
        .music-player-login-page{--green:#ff0000;--green-hover:#ff3333;--bg:#121212;--bg-card:#181818;--border:#3e3e3e;--text-primary:#fff;--text-secondary:#b3b3b3;--text-muted:#727272;height:100vh;width:100%;display:flex;align-items:center;justify-content:center;overflow:hidden;background:var(--bg);font-family:Nunito,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:var(--text-primary);-webkit-font-smoothing:antialiased}
        .card{background:var(--bg-card);border:1px solid var(--border);border-radius:10px;width:100%;max-width:360px;padding:24px}
        .title{font-size:24px;font-weight:900;text-align:center;margin-bottom:16px}
        .hint{font-size:13px;color:var(--text-secondary);text-align:center;margin-bottom:18px;line-height:1.6}
        .form-group{margin-bottom:14px}
        .label{display:block;font-size:13px;font-weight:800;color:var(--text-primary);margin-bottom:6px}
        input{width:100%;padding:12px;border:1px solid var(--border);border-radius:8px;font-family:inherit;font-size:14px;color:var(--text-primary);background:#242424;outline:none}
        .password-wrapper{position:relative;width:100%}.password-wrapper input{padding-right:40px!important}.password-toggle-btn{position:absolute;top:50%;right:12px;transform:translateY(-50%);background:none;border:none;color:var(--text-muted);cursor:pointer;display:flex;align-items:center;justify-content:center;padding:4px;transition:color .15s}.password-toggle-btn:hover{color:var(--text-primary)}.password-toggle-btn svg{width:16px;height:16px}
        input:focus{border-color:var(--text-primary);box-shadow:0 0 0 3px rgba(255,255,255,.07)}
        .btn{display:block;width:100%;padding:12px;border:none;border-radius:500px;font-family:inherit;font-size:14px;font-weight:900;letter-spacing:.06em;cursor:pointer;transition:transform .1s, background .15s}
        .btn-primary{background:var(--green);color:#000}
        .btn-primary:hover{background:var(--green-hover);transform:scale(1.02)}
        .btn-ghost{background:transparent;color:#fff;border:1px solid var(--border)}
        .row{display:flex;gap:10px;align-items:center;margin-top:14px}
        .row .btn-ghost{flex:1}
        .row .btn-primary{flex:1}
        .error{background:rgba(255,77,109,.12);border:1px solid rgba(255,77,109,.35);color:#ffb3bf;border-radius:8px;padding:10px 12px;font-size:12px;margin-bottom:12px;text-align:center}
        .success{background:rgba(29,185,84,.12);border:1px solid rgba(29,185,84,.35);color:#92ffb9;border-radius:8px;padding:10px 12px;font-size:12px;margin-bottom:12px;text-align:center}
      `}</style>

      <div className="card">
        <div className="title">Reset password</div>
        <div className="hint">Choose a new password for your account.</div>

        {done && <div className="success">Password updated successfully. You can now log in.</div>}
        {!done && displayError && <div className="error">{displayError}</div>}

        {!done ? (
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label className="label" htmlFor="npw">
                New password
              </label>
              <div className="password-wrapper">
                <input
                  id="npw"
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <div className="row">
              <button className="btn btn-ghost" type="button" onClick={onBackToLogin} disabled={isLoading}>
                Back
              </button>
              <button className="btn btn-primary" type="submit" disabled={isLoading}>
                {isLoading ? 'Updating…' : 'Update password'}
              </button>
            </div>
          </form>
        ) : (
          <button className="btn btn-primary" type="button" onClick={onBackToLogin} style={{ marginTop: 14 }}>
            Go to Login
          </button>
        )}
      </div>
    </div>
  );
};
