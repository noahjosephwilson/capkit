"use client";

import React, { useState, useEffect } from 'react';
import './LogInPage.css';
import { 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail 
} from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LogInPage = () => {
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [error, setError]               = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // States for password reset
  const [resetEmail, setResetEmail]     = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);

  const router = useRouter();

  // Hide the navbar on this page.
  useEffect(() => {
    document.body.classList.add('no-navbar');
    return () => document.body.classList.remove('no-navbar');
  }, []);

  // Handle email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/company');
    } catch (err) {
      console.error('Error during email log in:', err);
      setError(err.message);
    }
  };

  // Handle password reset
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage('Password reset email sent. Please check your inbox.');
    } catch (err) {
      console.error('Error during password reset:', err);
      setResetMessage(err.message);
    }
  };

  return (
    <div className="login-page-container">
      {/* Back arrow navigates to home */}
      <button className="back-arrow" onClick={() => router.push('/')}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div className="login-card">
        {/* Replace text title with capkit logo image */}
        <img src="/assets/capkitlogo.png" alt="capkit logo" className="signup-logo" />
        <p className="welcome-text">Welcome back</p>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label htmlFor="email" className="input-label">Email</label>
            <input
              type="email"
              id="email"
              className="input-field"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <div className="password-field-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="input-field"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  // Eye-off icon (password is visible)
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a10.05 10.05 0 012.293-3.366" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                  </svg>
                ) : (
                  // Eye icon (password is hidden)
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button type="submit" className="login-btn">Log In</button>
        </form>

        <div className="forgot-password-inline">
          <button 
            type="button" 
            className="forgot-password-link" 
            onClick={() => setShowResetForm(!showResetForm)}
          >
            Forgot Password?
          </button>
        </div>

        {showResetForm && (
          <form onSubmit={handleForgotPassword} className="reset-form">
            <div className="input-group">
              <label htmlFor="resetEmail" className="input-label">Enter your email</label>
              <input
                type="email"
                id="resetEmail"
                className="input-field"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-btn">Send Reset Email</button>
            {resetMessage && <div className="reset-message">{resetMessage}</div>}
          </form>
        )}

        <div className="create-account-container">
          <p>
            Don't have an account?{' '}
            <Link href="/home/registration/signup">
              <span className="create-account-link">Create Account</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
