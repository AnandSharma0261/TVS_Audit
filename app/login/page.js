'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './login.module.css';
import { authenticate, isAuthenticated, resetPassword } from '../utils/auth';

export default function Login() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check authentication after component mounts
    if (isAuthenticated()) {
      router.replace('/');
    }
  }, [router]);

  if (!isClient) {
    return (
      <div className={styles.LoginContainer}>
        <div className={styles.loginMainParent}>      <div className={styles.loginMain}>
            <div className={styles.logoContainer}>
              <Image
                src="/tvs_logo.svg"
                alt="TVS Logo"
                width={150}
                height={50}
                priority
                onError={() => setLogoError(true)}
                style={{ display: logoError ? 'none' : 'block' }}
              />
            </div>
            <div className={styles.HeadingLogins}>Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const { email, password, newPassword, confirmPassword } = formData;
    
    if (isResetMode) {
      if (!email) {
        setError('Please enter your email address');
        setShowErrorModal(true);
        return;
      }
      if (newPassword !== confirmPassword) {
        setError('New passwords do not match');
        setShowErrorModal(true);
        return;
      }
      if (newPassword.length < 8) {
        setError('Password must be at least 8 characters long');
        setShowErrorModal(true);
        return;
      }

      if (resetPassword(email, newPassword)) {
        setError('Password has been reset successfully');
        setShowErrorModal(true);
        setIsResetMode(false);
        setFormData({ email: '', password: '', newPassword: '', confirmPassword: '' });
      } else {
        setError('Email address not found');
        setShowErrorModal(true);
      }
    } else {
      if (authenticate(email, password)) {
        router.replace('/');
      } else {
        setError('Invalid email or password');
        setShowErrorModal(true);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleResetMode = () => {
    setIsResetMode(!isResetMode);
    setFormData({ email: '', password: '', newPassword: '', confirmPassword: '' });
    setError('');
    setShowErrorModal(false);
  };

  return (
    <div className={styles.LoginContainer}>
      <div className={styles.loginMainParent}>
        <div className={styles.loginMain}>
          <div className={styles.logoContainer}>
            <Image
              src="/tvs_logo.svg"
              alt="TVS Logo"
              width={150}
              height={50}
              priority
            />
          </div>            <div>
              <span className={styles.HeadingLogins}>
                {isResetMode ? 'Reset Password' : 'TVS QLQD Admin Login'}
              </span>
            </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.LoginEmails}>
              <input
                className={styles.LoginEmailInput}
                type="email"
                placeholder="Enter Your Email*"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            {isResetMode ? (
              <>
                <div className={styles.LoginEmails}>
                  <input
                    className={styles.LoginEmailInput}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="New Password*"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                  />
                  <span 
                    className={styles.passIcon}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </span>
                </div>
                <div className={styles.LoginEmails}>
                  <input
                    className={styles.LoginEmailInput}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm New Password*"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </>
            ) : (
              <div className={styles.LoginEmails}>
                <input
                  className={styles.LoginEmailInput}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Your Password*"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span 
                  className={styles.passIcon}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </span>
              </div>
            )}

            <div className={styles.LoginButtonParent}>
              <button className={styles.LoginButton} type="submit">
                {isResetMode ? 'Reset Password' : 'Login'}
              </button>
            </div>
            <div className={styles.LoginButtonParent}>
              <span 
                className={styles.forgetPassword}
                onClick={toggleResetMode}
              >
                {isResetMode ? 'Back to Login' : 'Forgot Password?'}
              </span>
            </div>
          </form>
        </div>
      </div>

      {showErrorModal && (
        <>
          <div className={styles.modalOverlay} onClick={() => setShowErrorModal(false)} />
          <div className={styles.errorModal}>
            <div className={styles.errorIcon}>
              {error.includes('successfully') ? '✅' : error.includes('not found') ? '❌' : '⚠️'}
            </div>
            <div className={styles.errorTitle}>
              {error.includes('successfully') ? 'Success' : 'Error'}
            </div>
            <div className={styles.errorMessage}>{error}</div>
            <button 
              className={styles.closeButton}
              onClick={() => setShowErrorModal(false)}
            >
              {error.includes('successfully') ? 'Login Now' : 'Try Again'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
