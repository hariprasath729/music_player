import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

export const SignupPage: React.FC<{ onSwitchToLogin: () => void }> = ({ onSwitchToLogin }) => {
  const { signup, sendOtp, isLoading, error, clearError, isPendingApproval, setIsPendingApproval } = useAuth();
  const [form, setForm] = useState({ email: '', confirmEmail: '', password: '', name: '', day: '', month: '', year: '', gender: '' });

  // Rate limiting lockout state (in seconds)
  const [lockoutSecondsLeft, setLockoutSecondsLeft] = useState<number>(0);

  // Format countdown as MM:SS
  const formatLockoutTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Check for active lockout on mount
  useEffect(() => {
    try {
      const expiryStr = localStorage.getItem('auth_login_lockout_expiry');
      if (expiryStr) {
        const expiry = parseInt(expiryStr, 10);
        if (expiry > Date.now()) {
          setLockoutSecondsLeft(Math.ceil((expiry - Date.now()) / 1000));
        } else {
          localStorage.removeItem('auth_login_lockout_expiry');
        }
      }
    } catch {}
  }, []);

  // Update lockout countdown timer
  useEffect(() => {
    if (lockoutSecondsLeft <= 0) return;

    const timer = setInterval(() => {
      try {
        const expiryStr = localStorage.getItem('auth_login_lockout_expiry');
        if (expiryStr) {
          const expiry = parseInt(expiryStr, 10);
          const diff = expiry - Date.now();
          if (diff <= 0) {
            setLockoutSecondsLeft(0);
            localStorage.removeItem('auth_login_lockout_expiry');
            clearError(); // clear the rate limit error automatically when done
          } else {
            setLockoutSecondsLeft(Math.ceil(diff / 1000));
          }
        } else {
          setLockoutSecondsLeft(0);
        }
      } catch {
        setLockoutSecondsLeft(0);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [lockoutSecondsLeft, clearError]);

  // Sync state if context throws rate limit error
  useEffect(() => {
    if (error && (error.includes('Too many authentication attempts') || error.includes('Too many requests') || error.includes('rate limit'))) {
      try {
        const currentExpiry = localStorage.getItem('auth_login_lockout_expiry');
        if (!currentExpiry || parseInt(currentExpiry, 10) < Date.now()) {
          const expiry = Date.now() + 15 * 60 * 1000; // 15 minutes lockout
          localStorage.setItem('auth_login_lockout_expiry', expiry.toString());
          setLockoutSecondsLeft(15 * 60);
        }
      } catch {}
    }
  }, [error]);
  const [termsChecked, setTermsChecked] = useState(false);
  const [localError, setLocalError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(''));
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    if (form.email !== form.confirmEmail) {
      setLocalError('Email addresses do not match');
      return;
    }
    if (form.password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }
    if (!termsChecked) {
      setLocalError('Please agree to the Terms and Conditions');
      return;
    }

    if (!otpSent) {
      try {
        await sendOtp(form.email);
        setOtpSent(true);
        setLocalError('');
      } catch (err: any) {
        setLocalError(err.message || 'Failed to send OTP. Please try again.');
      }
    } else {
      const currentOtp = otpValues.join('');
      if (currentOtp.length < 6) {
        setLocalError('Please enter the 6-digit code sent to your email.');
        return;
      }
      await signup({
        email: form.email,
        password: form.password,
        name: form.name || 'User',
        otp: currentOtp
      });
    }
  };

  const autoSubmitOtp = async (otp: string) => {
    setLocalError('');
    clearError();
    await signup({
      email: form.email,
      password: form.password,
      name: form.name || 'User',
      otp: otp
    });
  };

  const handleOtpChange = (index: number, value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, '');
    if (!cleanValue && value !== '') return; // Ignore non-numeric input

    const singleChar = cleanValue.slice(-1);
    const newOtpValues = [...otpValues];
    newOtpValues[index] = singleChar;
    setOtpValues(newOtpValues);

    if (singleChar !== '' && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    const combined = newOtpValues.join('');
    if (combined.length === 6) autoSubmitOtp(combined);
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      otpRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6).split('');
    if (pastedData.length === 0) return;

    const newOtpValues = [...otpValues];
    for (let i = 0; i < pastedData.length; i++) newOtpValues[i] = pastedData[i];
    setOtpValues(newOtpValues);
    
    const focusIndex = Math.min(pastedData.length, 5);
    otpRefs.current[focusIndex]?.focus();

    const combined = newOtpValues.join('');
    if (combined.length === 6) autoSubmitOtp(combined);
  };

  const displayError = localError || error;

  return (
    <div className="music-player-signup-page">
      <style>{`
        .music-player-signup-page *,.music-player-signup-page *::before,.music-player-signup-page *::after{box-sizing:border-box;margin:0;padding:0}
        .music-player-signup-page{--green:#ff0000;--green-hover:#ff3333;--bg:#121212;--bg-card:#181818;--bg-elevated:#282828;--bg-input:rgba(0,0,0,0.25);--border:rgba(255,255,255,0.08);--border-hover:rgba(255,255,255,0.2);--text-primary:#fff;--text-secondary:#b3b3b3;--text-muted:#727272;--font:'Nunito',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;height:100vh;width:100%;display:flex;flex-direction:column;background:transparent;pointer-events:none;font-family:var(--font);color:var(--text-primary);-webkit-font-smoothing:antialiased}
        .signup-header{flex-shrink:0;display:flex;align-items:center;justify-content:space-between;padding:0 48px;height:64px;border-bottom:1px solid rgba(255,255,255,0.05);background:transparent;pointer-events:auto}
        .logo{display:flex;align-items:center;gap:9px;text-decoration:none}.logo-text{font-size:21px;font-weight:900;color:var(--text-primary);letter-spacing:-.3px}
        .header-nav{display:flex;gap:24px;align-items:center}.header-nav a{font-size:13.5px;font-weight:700;color:var(--text-secondary);text-decoration:none;transition:color .15s}.header-nav a:hover{color:var(--text-primary)}.nav-divider{color:var(--border);font-size:18px}.btn-header-pill{background:var(--text-primary);color:var(--bg);font-family:var(--font);font-size:13.5px;font-weight:800;letter-spacing:.04em;padding:10px 28px;border:none;border-radius:500px;cursor:pointer;text-decoration:none;transition:background .15s,transform .1s;white-space:nowrap}.btn-header-pill:hover{background:#e0e0e0;transform:scale(1.03)}
        .hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:6px;background:none;border:none}.hamburger span{display:block;width:22px;height:2px;background:var(--text-primary);border-radius:2px;transition:transform .25s,opacity .2s}.hamburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg)}.hamburger.open span:nth-child(2){opacity:0}.hamburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
        .mobile-nav{display:none;flex-direction:column;background:var(--bg-card);border-bottom:1px solid var(--border);position:absolute;top:64px;left:0;right:0;z-index:200}.mobile-nav.open{display:flex}.mobile-nav a,.mobile-nav button{font-size:14px;font-weight:700;color:var(--text-secondary);text-decoration:none;padding:14px 20px;border:0;border-bottom:1px solid var(--border);background:transparent;text-align:left;transition:color .15s,background .15s;cursor:pointer}.mobile-nav a:hover,.mobile-nav button:hover{color:var(--text-primary);background:var(--bg-elevated)}.mobile-nav .mob-cta{background:var(--green);color:#000;border-radius:500px;text-align:center;padding:12px;font-size:14px;border-bottom:none;font-weight:800}.mobile-nav .mob-cta:hover{background:var(--green-hover)}
        .signup-main{flex:1;overflow-y:auto;min-height:0;padding:24px 16px;display:flex;justify-content:center}
        .signup-card{background:rgba(24, 24, 24, 0.45);backdrop-filter:blur(24px);border-radius:10px;border:1px solid rgba(255,255,255,0.08);box-shadow:0 8px 32px 0 rgba(0,0,0,0.37);pointer-events:auto;width:100%;max-width:480px;padding:24px 20px 32px;margin-bottom:24px;height:fit-content}
        .card-logo{display:flex;justify-content:center;margin-bottom:16px}.card-logo svg{width:38px;height:38px}
        .signup-card h1{font-size:1.4rem;font-weight:900;text-align:center;margin-bottom:20px;letter-spacing:-.03em;line-height:1.2}
        .section-label{font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--text-muted);margin:20px 0 12px;display:flex;align-items:center;gap:12px}.section-label::after{content:'';flex:1;height:1px;background:var(--border)}
        .form-group{margin-bottom:16px}.form-group label{display:block;font-size:13px;font-weight:800;color:var(--text-primary);margin-bottom:6px}.form-group .hint{font-size:11.5px;color:var(--text-muted);font-weight:400;margin-top:5px;line-height:1.5}.form-group input{width:100%;padding:11px 12px;border:1px solid var(--border);border-radius:5px;font-family:var(--font);font-size:14px;color:var(--text-primary);background:var(--bg-input);outline:none;transition:border-color .15s,box-shadow .15s}.form-group input:hover{border-color:var(--border-hover)}.form-group input:focus{border-color:rgba(255,255,255,0.4);box-shadow:0 0 0 3px rgba(255,255,255,.03)}.form-group input::placeholder{color:var(--text-muted)}
        .password-wrapper{position:relative;width:100%}.password-wrapper input{padding-right:40px!important}.password-toggle-btn{position:absolute;top:50%;right:12px;transform:translateY(-50%);background:none;border:none;color:var(--text-muted);cursor:pointer;display:flex;align-items:center;justify-content:center;padding:4px;transition:color .15s}.password-toggle-btn:hover{color:var(--text-primary)}.password-toggle-btn svg{width:16px;height:16px}
        .dob-row{display:grid;grid-template-columns:1fr 1.4fr 1fr;gap:10px}.form-group select{width:100%;padding:11px 12px;border:1px solid var(--border);border-radius:5px;font-family:var(--font);font-size:14px;color:var(--text-primary);background:var(--bg-input);outline:none;cursor:pointer;transition:border-color .15s,box-shadow .15s;appearance:none;-webkit-appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23b3b3b3' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;background-size:16px;padding-right:36px}.form-group select:hover{border-color:var(--border-hover)}.form-group select:focus{border-color:rgba(255,255,255,0.4);box-shadow:0 0 0 3px rgba(255,255,255,0.03)}.form-group select option{background:var(--bg-elevated);color:var(--text-primary)}
        .gender-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.gender-grid.row2{grid-template-columns:repeat(2,1fr);margin-top:10px}.gender-option{position:relative}.gender-option input{position:absolute;opacity:0;pointer-events:none}.gender-option label{display:flex;align-items:center;justify-content:center;padding:10px 8px;border:1px solid var(--border);border-radius:5px;font-size:12.5px;font-weight:700;color:var(--text-secondary);cursor:pointer;text-align:center;transition:border-color .15s,color .15s,background .15s;margin-bottom:0}.gender-option input:checked + label{border-color:var(--text-primary);color:var(--text-primary);background:rgba(255,255,255,0.06)}.gender-option label:hover{border-color:var(--border-hover)}
        .checkbox-group{display:flex;gap:10px;margin-bottom:16px;align-items:flex-start}.checkbox-group input[type="checkbox"]{width:17px;height:17px;flex-shrink:0;margin-top:2px;accent-color:var(--green);cursor:pointer}.checkbox-group label,.checkbox-group p{font-size:12px;color:var(--text-secondary);line-height:1.5;cursor:pointer}.checkbox-group a{color:var(--text-primary);text-decoration:underline}.checkbox-group a:hover{color:var(--green)}
        .btn-signup{display:block;width:100%;padding:13px;background:var(--green);color:#000;border:none;border-radius:500px;font-family:var(--font);font-size:14px;font-weight:800;letter-spacing:.06em;cursor:pointer;margin-top:6px;transition:background .15s,transform .1s}.btn-signup:hover:not(:disabled){background:var(--green-hover);transform:scale(1.02)}.btn-signup:disabled{opacity:.6;cursor:not-allowed}
        .login-footer{border-top:1px solid rgba(255,255,255,0.08);margin-top:24px;padding-top:20px;text-align:center}.login-footer p{font-size:13px;color:var(--text-secondary)}.login-footer a{color:var(--text-primary);font-weight:700;text-decoration:underline;transition:color .15s}.login-footer a:hover{color:var(--green)}
        .signup-footer-bar{flex-shrink:0;background:transparent;border-top:1px solid rgba(255,255,255,0.05);padding:12px 48px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;pointer-events:auto}.signup-footer-bar p{font-size:11px;color:var(--text-muted);white-space:nowrap}
        .spinner{display:inline-block;width:16px;height:16px;border:3px solid rgba(0,0,0,.25);border-top-color:#000;border-radius:50%;animation:spin .7s linear infinite;vertical-align:middle}
        @keyframes spin{to{transform:rotate(360deg)}}
        .error-box{background:rgba(255,77,109,.12);border:1px solid rgba(255,77,109,.35);color:#ffb3bf;border-radius:8px;padding:9px 12px;font-size:12px;margin-bottom:14px;text-align:center}
        .otp-container{display:flex;gap:10px;justify-content:center;margin-top:10px;margin-bottom:10px}
        .otp-input{width:clamp(40px, 12vw, 55px)!important;height:clamp(45px, 14vw, 65px);text-align:center;font-size:1.5rem!important;font-weight:700;padding:0!important;border-radius:8px!important;outline:none;}
        @media(max-width:768px){.signup-header{padding:0 20px}.header-nav{display:none}.hamburger{display:flex}.signup-footer-bar{padding:10px 20px;justify-content:flex-start}}
        @media(max-width:480px){.signup-header{padding:0 14px}.signup-main{padding:16px 12px}.signup-card{border:none;background:transparent;padding:8px 4px 20px}.dob-row{grid-template-columns:1fr;gap:8px}.gender-grid{grid-template-columns:repeat(2,1fr)}.gender-grid.row2{grid-template-columns:repeat(2,1fr)}.signup-footer-bar{padding:8px 14px}}
      `}</style>

   
      
      {isPendingApproval ? (
        <main className="signup-main">
          <div className="signup-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div className="card-logo" style={{ marginBottom: '24px' }}>
              <svg width="56" height="56" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="50" fill="#ff0000"/>
                <path d="M30 40c8-2 16-2 24 1 1 1 1 2-1 2-8-3-16-3-22-1-1 0-2-1-1-2 zm-2 10c11-3 24-2 36 2 1 1 1 3-1 4-13-5-28-5-41-2-2 0-3-2-2-5" fill="#fff"/>
              </svg>
            </div>
            <h1 style={{ marginBottom: '16px', fontSize: '1.8rem' }}>Access Requested</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: '1.6' }}>
              Your email is verified but your account requires admin approval. You will receive an email once your access is granted.
            </p>
            <button onClick={() => { setIsPendingApproval(false); onSwitchToLogin(); }} className="btn-signup" type="button">
              Back to Login
            </button>
          </div>
        </main>
      ) : (
      <main className="signup-main">
        <div className="signup-card">
          <div className="card-logo">
            <svg width="38" height="38" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="50" fill="#ff0000"/>
              <path d="M30 40c8-2 16-2 24 1 1 1 1 2-1 2-8-3-16-3-22-1-1 0-2-1-1-2
zm-2 10c11-3 24-2 36 2 1 1 1 3-1 3-11-4-23-4-34-1-1 1-2-1-1-4
zm-3 12c13-4 28-3 44 3 2 1 1 3-1 4-13-5-28-5-41-2-2 0-3-2-2-5" fill="#fff"/>
            </svg>
          </div>

          <h1>Sign up to start listening</h1>

          {displayError && <div className="error-box">{displayError}</div>}

          {!otpSent ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" id="email" placeholder="name@domain.com" value={form.email} onChange={e => update('email', e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="confirmEmail">Confirm your email address</label>
              <input type="email" id="confirmEmail" placeholder="name@domain.com" value={form.confirmEmail} onChange={e => update('confirmEmail', e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Create a password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={e => update('password', e.target.value)}
                  minLength={6}
                  required
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

            <div className="section-label">Tell us about yourself</div>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="This name will appear on your profile" value={form.name} onChange={e => update('name', e.target.value)} required />
              <p className="hint">This name will appear on your profile</p>
            </div>

            <div className="form-group">
              <label>Date of birth</label>
              <div className="dob-row">
                <select aria-label="Day" value={form.day} onChange={e => update('day', e.target.value)}>
                  <option value="">DD</option>
                  {Array.from({length:31}, (_,i) => i+1).map(d => <option key={d}>{d.toString().padStart(2,'0')}</option>)}
                </select>
                <select aria-label="Month" value={form.month} onChange={e => update('month', e.target.value)}>
                  <option value="">Month</option>
                  {['January','February','March','April','May','June','July','August','September','October','November','December'].map(m => <option key={m}>{m}</option>)}
                </select>
                <select aria-label="Year" value={form.year} onChange={e => update('year', e.target.value)}>
                  <option value="">YYYY</option>
                  {Array.from({length:100}, (_,i) => 2012-i).map(y => <option key={y}>{y}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Gender</label>
              <p className="hint" style={{marginTop:0,marginBottom:8}}>We use your gender to help personalize our content recommendations and ads for you.</p>
              <div className="gender-grid">
                {['Man','Woman','Non-binary'].map(g => (
                  <div className="gender-option" key={g}>
                    <input type="radio" name="gender" id={`g-${g}`} value={g} onChange={e => update('gender', e.target.value)} />
                    <label htmlFor={`g-${g}`}>{g}</label>
                  </div>
                ))}
              </div>
              <div className="gender-grid row2">
                {['Something else','Prefer not to say'].map(g => (
                  <div className="gender-option" key={g}>
                    <input type="radio" name="gender" id={`g-${g}`} value={g} onChange={e => update('gender', e.target.value)} />
                    <label htmlFor={`g-${g}`}>{g}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="checkbox-group">
              <input type="checkbox" id="marketing" />
              <label htmlFor="marketing">Share my registration data with Music Player's content providers for marketing purposes.</label>
            </div>

            <div className="checkbox-group">
              <input type="checkbox" id="terms" checked={termsChecked} onChange={e => setTermsChecked(e.target.checked)} />
              <p>
                By clicking on sign-up, you agree to Music Player's <a href="#">Terms and Conditions of Use</a>.
                To learn more about how Music Player collects, uses, shares and protects your personal data, please see
                <a href="#">Music Player's Privacy Policy</a>.
              </p>
            </div>

            <button
              type="submit"
              className="btn-signup"
              disabled={isLoading || lockoutSecondsLeft > 0}
              style={lockoutSecondsLeft > 0 ? {
                opacity: 0.5,
                cursor: 'not-allowed',
                background: '#282828',
                color: '#727272'
              } : {}}
            >
              {lockoutSecondsLeft > 0
                ? `Locked out (${formatLockoutTime(lockoutSecondsLeft)})`
                : isLoading
                  ? <span className="spinner" />
                  : 'Send OTP'}
            </button>
          </form>
          ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Enter Verification Code</label>
              <p className="hint mb-2">We sent a 6-digit code to {form.email}.</p>
              <div className="otp-container">
                {otpValues.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength={2}
                    ref={el => { otpRefs.current[index] = el; }}
                    value={digit}
                    onChange={e => handleOtpChange(index, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="otp-input"
                    required={index === 0}
                  />
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="btn-signup"
              disabled={isLoading || lockoutSecondsLeft > 0}
              style={lockoutSecondsLeft > 0 ? {
                opacity: 0.5,
                cursor: 'not-allowed',
                background: '#282828',
                color: '#727272'
              } : {}}
            >
              {lockoutSecondsLeft > 0
                ? `Locked out (${formatLockoutTime(lockoutSecondsLeft)})`
                : isLoading
                  ? <span className="spinner" />
                  : 'Verify & Sign up'}
            </button>
            <button type="button" onClick={() => setOtpSent(false)} className="btn-signup" style={{ background: 'transparent', border: '1px solid #3e3e3e', color: '#fff', marginTop: '10px' }} disabled={isLoading}>
              Edit Details
            </button>
          </form>
          )}

          <div className="login-footer">
            <p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>Log in here</a></p>
          </div>
        </div>
      </main>
      )}

      <footer className="signup-footer-bar">
        <p>© 2026 Music Player HP</p>
      </footer>
    </div>
  );
};
