import { useState } from 'react';
import { TextInput, Button } from '@mantine/core';
import { supabase } from '../../api/supabase';
import styles from './GetPasswordReset.module.css';

export const GetPasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async () => {
    setMessage('');
    setError('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw error;
      }

      setMessage('Email sent. Please check your inbox.');
    } catch (err) {
      setError(err.message || 'Error sending reset password email.');
    }
  };

  return (
    <div className={styles.getPasswordResetWrapper}>
      <h1>Request Password Reset</h1>
      <p>Enter your email to receive a password reset link:</p>

      <TextInput
        placeholder="youremail@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {message && <p className={styles.successMessage}>{message}</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}

      <Button fullWidth className={styles.resetButton} onClick={handleResetPassword}>
        Send Reset Email
      </Button>
    </div>
  );
};
