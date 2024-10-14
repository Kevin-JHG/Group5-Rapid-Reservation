import { Link } from 'react-router-dom'
import { PasswordInput, TextInput, Button } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Import supabase (when other devs )
// import { supabase } from '../../api/supabase'

import './register.css'

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

    // simulate registration
    const onSubmit = async ({ email, password, firstName, lastName }) => {
        try {
            // registration process (to mimic a success response)
            const mockUserData = {
                email,
                password,
                firstName,
                lastName,
            }

            // Mimic successful registration with mock data
            console.log('Mock Registration Successful:', mockUserData)
            alert('Registration successful (mock data)')
        } catch (error) {
            // Set error manually if something doesnt work
            setError('root', {
                type: 'manual',
                message: error.message || 'Something went wrong',
            })
        }
    }

    return (
        <div>
            <div className="register-form-wrapper">
                <h1 className="register-heading">Welcome to Rapid Reservation.</h1>
                <p className="register-subheading">Signup to reserve your table today!</p>

                {/* Registration form */}
                <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                    {/* First Name input */}
                    <TextInput label="First Name" placeholder="John" {...register('firstName')} />
                    <p className="register-input-error">{errors.firstName?.message}</p>

                    {/* Last Name input */}
                    <TextInput label="Last Name" placeholder="Doe" {...register('lastName')} />
                    <p className="register-input-error">{errors.lastName?.message}</p>

                    {/* Email input */}
                    <TextInput type="email" label="Email" placeholder="johndoe@email.com" {...register('email')} />
                    <p className="register-input-error">{errors.email?.message}</p>

                    {/* Password input */}
                    <PasswordInput label="Password" placeholder="Your password" {...register('password')} />
                    <p className="register-input-error">{errors.password?.message}</p>

                    {/* Confirm Password input */}
                    <PasswordInput label="Confirm Password" placeholder="Your password" {...register('confirmPassword')} />
                    <p className="register-input-error">{errors.confirmPassword?.message}</p>

                    {/* Submit Button */}
                    <Button type="submit" fullWidth className="register-button">
                        Register
                    </Button>

                    {/* Error message for root errors */}
                    {errors.root && <p className="register-input-error">{errors.root.message}</p>}

                    {/* Link to login page */}
                    <p className="register-login-text">
                        Already have an account?{' '}
                        <Link to="/login" className="register-login-link">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
