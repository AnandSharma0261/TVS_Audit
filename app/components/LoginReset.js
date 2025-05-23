'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '../login/login.module.css';
import { resetPassword } from '../utils/auth';

export default function LoginReset() {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const { email, newPassword, confirmPassword } = formData;
    
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
      setFormData({ email: '', newPassword: '', confirmPassword: '' });
    } else {
      setError('Email address not found');
      setShowErrorModal(true);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
              onError={() => setLogoError(true)}
              style={{ display: logoError ? 'none' : 'block' }}
            />
          </div>
          <div>
            <span className={styles.HeadingLogins}>Reset Password</span>
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
            <div className={styles.LoginButtonParent}>
              <button className={styles.LoginButton} type="submit">
                Reset Password
              </button>
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
              {error.includes('successfully') ? 'Close' : 'Try Again'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
