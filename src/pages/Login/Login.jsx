import { useNavigate } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { supabase } from '../../api/supabase';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const Login = ({ setSession }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const onSubmit = async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      setSession(data.session);
      navigate('/');
    } catch (error) {
      setErrors({
        ...errors,
        root: error.message || 'Login failed. Please try again.',
      });
    }
  };

  return <LoginForm onSubmit={onSubmit} errors={errors} />;
};

Login.propTypes = {
  setSession: PropTypes.func.isRequired, // This prop is required
};
