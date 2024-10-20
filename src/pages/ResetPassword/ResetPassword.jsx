import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { TextInput, Button } from '@mantine/core';
import { supabase } from '../../api/supabase';
import styles from './ResetPassword.module.css';

export const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  // Check for the access token on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');

    if (!accessToken) {
      setIsLoading(false); // Stop loading
      return;
    }

    setIsLoading(false); // Set loading to false when accessToken is found
  }, []);

  const handleResetPassword = async () => {
    if (isLoading) return; // Prevent submission if loading

    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');

    // Reset the error message when user tries to submit the form
    setError('');

    if (!newPassword) {
      setError('Please enter a new password.'); // Show an error if no password is entered
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword }, { access_token: accessToken });

      if (error) {
        throw error;
      }

      setMessage('Password has been reset successfully. You can now log in with your new password.');
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setError(err.message || 'Error resetting password.');
    }
  };

  return (
    <div className={styles.resetPasswordWrapper}>
      <h1>Reset Your Password</h1>
      {isLoading ? ( // Show loading or the form
        <p>Loading...</p>
      ) : (
        <>
          <TextInput
            label="New Password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {message && <p className={styles.successMessage}>{message}</p>}
          {error && <p className={styles.errorMessage}>{error}</p>}
          <Button fullWidth className={styles.resetButton} onClick={handleResetPassword}>
            Reset Password
          </Button>
        </>
      )}
    </div>
  );
};
