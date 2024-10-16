import { Link, useNavigate } from 'react-router-dom';
import { PasswordInput, TextInput, Button } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { supabase } from '../../api/supabase';
import './login.css';

// schema for login form validation
const schema = yup
  .object({
    email: yup.string().email('Invalid email format').required('Email is required.'),
    password: yup.string().required('Password is required.'),
  })
  .required();

export const Login = ({ setSession }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async ({ email, password }) => {
    // Redirect user to home page on login
    navigate('/');
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      // Update session state on successful login
      setSession(data.session);

    } catch (error) {
      setError('root', {
        type: 'manual',
        message: error.message || 'Login failed. Please try again.',
      });
    }
  };

  return (
    <div className="login-form-wrapper">
      <h1 className="login-heading">Login to Rapid Reservation</h1>

      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <TextInput label="Email" placeholder="youremail@email.com" {...register('email')} />
        <p className="login-input-error">{errors.email?.message}</p>

        <PasswordInput label="Password" placeholder="Your password" {...register('password')} />
        <p className="login-input-error">{errors.password?.message}</p>

        <Button type="submit" fullWidth className="login-button">
          Log in
        </Button>

        {/*Only for dev purposes*/}
        {errors.root && <p className="login-input-error">{errors.root.message}</p>}

        <p className="login-register-text">
          Don’t have an account?{' '}
          <Link to="/register" className="login-register-link">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};
