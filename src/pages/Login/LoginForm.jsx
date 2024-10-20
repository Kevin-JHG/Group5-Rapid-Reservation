// LoginForm.jsx
import { Link } from 'react-router-dom';
import { PasswordInput, TextInput, Button } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import styles from './Login.module.css';

// schema for login form validation
const schema = yup
  .object({
    email: yup.string().email('Invalid email format').required('Email is required.'),
    password: yup.string().required('Password is required.'),
  })
  .required();

export const LoginForm = ({ onSubmit, errors }) => {
  const {
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className={styles.loginFormWrapper}>
      <h1 className={styles.loginHeading}>Login to Rapid Reservation</h1>

      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <TextInput label="Email" placeholder="youremail@email.com" {...register('email')} />
        <p className={styles.loginInputError}>{errors.email?.message}</p>

        <PasswordInput label="Password" placeholder="Your password" {...register('password')} />
        <p className={styles.loginInputError}>{errors.password?.message}</p>

        <Button type="submit" fullWidth className={styles.loginButton}>
          Log in
        </Button>

        {errors.root && <p className={styles.loginInputError}>{errors.root.message}</p>}

        <p className={styles.loginRegisterText}>
          Don’t have an account?{' '}
          <Link to="/register" className={styles.loginRegisterLink}>
            Sign up
          </Link>
          <br />
          <Link to="/get-password-reset" className={styles.loginRegisterLink}>
            Forgot password?
          </Link>
        </p>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};
