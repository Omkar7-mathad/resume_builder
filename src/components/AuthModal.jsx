import React, { useState } from 'react';
import { X, Mail, Lock, User, LogIn, UserPlus, AlertCircle, CheckCircle2, LockKeyhole } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';

export const AuthModal = ({ isOpen, onClose, onSuccess, initialMode = 'signin' }) => {
  const [mode, setMode] = useState(initialMode); // 'signin' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName || 'User'
            }
          }
        });

        if (error) throw error;

        if (data.session) {
          setSuccessMsg('Account created successfully!');
          setTimeout(() => {
            onSuccess(data.session.user);
          }, 800);
        } else {
          // Email confirmation required or auto signed up
          setSuccessMsg('Registration submitted! If email confirmation is enabled, please check your inbox.');
          setTimeout(() => {
            if (data.user) {
              onSuccess(data.user);
            } else {
              onClose();
            }
          }, 1500);
        }
      } else {
        // Sign In
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;

        setSuccessMsg('Welcome back! Downloading your resume...');
        setTimeout(() => {
          onSuccess(data.user);
        }, 800);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal-card">
        {/* Close Button */}
        <button className="auth-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Modal Header Icon */}
        <div className="auth-header-icon-wrapper">
          <LockKeyhole size={28} />
        </div>

        <h2 className="auth-modal-title">
          {mode === 'signin' ? 'Sign In to Download' : 'Create Free Account'}
        </h2>
        <p className="auth-modal-subtitle">
          Please sign in or sign up to download your high-quality PDF resume.
        </p>

        {/* Auth Mode Tabs */}
        <div className="auth-tabs">
          <button
            className={`auth-tab-btn ${mode === 'signin' ? 'active' : ''}`}
            onClick={() => { setMode('signin'); setErrorMsg(null); setSuccessMsg(null); }}
          >
            <LogIn size={15} />
            <span>Sign In</span>
          </button>
          <button
            className={`auth-tab-btn ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => { setMode('signup'); setErrorMsg(null); setSuccessMsg(null); }}
          >
            <UserPlus size={15} />
            <span>Sign Up</span>
          </button>
        </div>

        {/* Alerts */}
        {errorMsg && (
          <div className="auth-alert auth-alert-error">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="auth-alert auth-alert-success">
            <CheckCircle2 size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <div className="auth-input-group">
              <label>Full Name</label>
              <div className="input-with-icon">
                <User size={16} className="input-icon" />
                <input
                  type="text"
                  placeholder="Jane Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="auth-input-group">
            <label>Email Address *</label>
            <div className="input-with-icon">
              <Mail size={16} className="input-icon" />
              <input
                type="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="auth-input-group">
            <label>Password *</label>
            <div className="input-with-icon">
              <Lock size={16} className="input-icon" />
              <input
                type="password"
                placeholder="••••••••"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block auth-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <span>Processing...</span>
            ) : mode === 'signin' ? (
              <>
                <LogIn size={16} />
                <span>Sign In & Download PDF</span>
              </>
            ) : (
              <>
                <UserPlus size={16} />
                <span>Create Account & Download</span>
              </>
            )}
          </button>
        </form>

        <div className="auth-footer-text">
          {mode === 'signin' ? (
            <p>Don't have an account yet? <button type="button" onClick={() => setMode('signup')}>Sign up for free</button></p>
          ) : (
            <p>Already registered? <button type="button" onClick={() => setMode('signin')}>Sign in here</button></p>
          )}
        </div>
      </div>
    </div>
  );
};
