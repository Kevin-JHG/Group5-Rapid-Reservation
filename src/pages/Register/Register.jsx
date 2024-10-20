import { Link } from 'react-router-dom';
import { PasswordInput, TextInput, Button } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { supabase } from '../../api/supabase';
import classes from './register.module.css';

// schema for register form
const schema = yup.object({
  firstName: yup.string().required('First Name is required.'),
  lastName: yup.string().required('Last Name is required.'),
  email: yup.string().email('Invalid email format.').required('Email is required.'),
  password: yup.string().min(8, 'Password must be more than 8 characters.').required('Password is required.'),
  confirmPassword: yup
    .string()
    .min(8, 'Password must be more than 8 characters.')
    .required('Confirm Password is required.')
    .oneOf([yup.ref('password')], 'Passwords must match.'),
}).required();

export const Register = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ email, password, firstName, lastName }) => {
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { first_name: firstName, last_name: lastName },
        },
      });

      if (signUpError) {
        throw new Error(signUpError.message);
      }
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: error || 'Something went wrong',
      });
    }
  };

  return (
    <div>
      <div className={classes.formWrapper}>
        <h1 className={classes.heading}>Welcome to Rapid Reservation.</h1>
        <p className={classes.subheading}>Signup to reserve your table today!</p>

        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextInput label="First Name" placeholder="John" {...register('firstName')} />
          <p className={classes.inputError}>{errors.firstName?.message}</p>

          <TextInput label="Last Name" placeholder="Doe" {...register('lastName')} />
          <p className={classes.inputError}>{errors.lastName?.message}</p>

          <TextInput type="email" label="Email" placeholder="johndoe@email.com" {...register('email')} />
          <p className={classes.inputError}>{errors.email?.message}</p>

          <PasswordInput label="Password" placeholder="Your password" {...register('password')} />
          <p className={classes.inputError}>{errors.password?.message}</p>

          <PasswordInput label="Confirm Password" placeholder="Your password" {...register('confirmPassword')} />
          <p className={classes.inputError}>{errors.confirmPassword?.message}</p>

          <Button type="submit" fullWidth className={classes.button}>Register</Button>
          {errors.root && <p className={classes.inputError}>{errors.root.message}</p>}

          <p className={classes.loginText}>
            Already have an account?{' '}
            <Link to="/login" className={classes.loginLink}>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
