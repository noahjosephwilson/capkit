import React, { useState, useEffect } from 'react';
import './SignUpPage.css';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile
} from 'firebase/auth';
import { auth, db } from '../../firebase/firebaseConfig'; // Ensure db is imported
import { useNavigate } from 'react-router-dom';
import googleSymbol from "../../assets/googleSymbol.png";
// Import Firestore functions – note that we now use doc and setDoc
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const SignUpPage = () => {
  const [firstName, setFirstName]       = useState('');
  const [lastName, setLastName]         = useState('');
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [error, setError]               = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate                      = useNavigate();

  // Add a class to the body to hide the navbar on this page.
  useEffect(() => {
    document.body.classList.add('no-navbar');
    return () => {
      document.body.classList.remove('no-navbar');
    };
  }, []);

  // Handle email/password sign up
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update the user's display name with their first and last name
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`
      });

      // Save user information to Firestore using the user's UID as the document ID
      // This ensures the Firestore rules (which expect the document ID to match request.auth.uid) are met.
      await setDoc(doc(db, "users", userCredential.user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,  // Warning: Storing plaintext passwords is insecure. Avoid this in production!
        signUpTime: serverTimestamp(),
        lastLoginTime: serverTimestamp()
      });

      // Navigate to the next page after sign up
      navigate('/createaddhome');
    } catch (err) {
      console.error('Error during sign up:', err);
      setError(err.message);
    }
  };

  // Handle sign up via Google
  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/createaddhome');
    } catch (err) {
      console.error('Error during Google sign up:', err);
      setError(err.message);
    }
  };

  return (
    <div className="signup-page-container">
      {/* Back arrow always navigates to home */}
      <button className="back-arrow" onClick={() => navigate('/')}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div className="signup-card">
        <h1 className="signup-title">Orbat</h1>
        <p className="welcome-text">Create an account</p>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSignUp} className="signup-form">
          {/* Group the name and email fields together */}
          <div className="name-email-group">
            <div className="name-fields">
              <div className="input-group">
                <label htmlFor="firstName" className="input-label">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  className="input-field"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="lastName" className="input-label">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  className="input-field"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="input-group email-group">
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a10.05 10.05 0 012.293-3.366M6.175 6.175A9.955 9.955 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.05 10.05 0 01-4.105 5.454" />
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
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        <div className="divider">or</div>

        <button type="button" className="google-btn" onClick={handleGoogleSignUp}>
          <img
            src={googleSymbol}
            alt="Google Logo"
            className="google-logo"
          />
          Sign up with Google
        </button>

        <div className="login-link-container">
          <p>
            Already have an account?{' '}
            <span className="login-link" onClick={() => navigate('/signin')}>
              Log In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
