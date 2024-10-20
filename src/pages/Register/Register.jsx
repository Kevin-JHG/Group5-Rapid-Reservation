import { Link } from 'react-router-dom'
import { PasswordInput, TextInput, Button } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { supabase } from '../../api/supabase'

import classes from './Register.module.css'

// schema for register form
const schema = yup
  .object({
    firstName: yup.string().required('First Name is required.'),
    lastName: yup.string().required('Last Name is required.'),
    email: yup.string().email('Invalid email format.').required('Email is required.'),
    password: yup.string().min(8, 'Password must be more than 8 characters.').required('Password is required.'),
    confirmPassword: yup
      .string()
      .min(8, 'Password must be more than 8 characters.')
      .required('Confirm Password is required.')
      .oneOf([yup.ref('password')], 'Passwords must match.'),
  })
  .required()

export const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async ({ email, password, firstName, lastName }) => {
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      })

      if (signUpError) {
        throw new Error(signUpError.message)
      }
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: error | 'Something went wrong',
      })
    }
  }

  return (
    <div>
      <div className={classes.registerFormWrapper}>
        <h1 className={classes.registerHeading}>Welcome to Rapid Reservation.</h1>
        <p className={classes.registerSubheading}>Signup to reserve your table today!</p>

        <form className={classes.registerForm} onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="First Name"
            placeholder="John"
            error={errors.firstName?.message}
            {...register('firstName')}
          />

          <TextInput label="Last Name" placeholder="Doe" error={errors.lastName?.message} {...register('lastName')} />

          <TextInput
            type="email"
            label="Email"
            placeholder="johndoe@email.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            error={errors.password?.message}
            {...register('password')}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Your password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <Button type="submit" fullWidth mt={8}>
            Register
          </Button>

          {errors.root && <p className={classes.registerError}>{errors.root.message}</p>}

          <p className={classes.registerLoginText}>
            Already have an account?{' '}
            <Link to="/login" className={classes.registerLoginLink}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
