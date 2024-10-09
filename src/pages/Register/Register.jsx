import './register.css';
import { useEffect } from 'react';

export const Register = () => {
    useEffect(() => {
        // This will grab the form element
        const form = document.getElementById('registrationForm');

        // Form Submission
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            // Get the password input value
            const password = document.getElementById('password').value;

            // Check if the password meets the requirements
            if (!isValidPassword(password)) {
                // If password is invalid, show the error message
                document.getElementById('passwordError').textContent =
                    'Password must be at least 8 characters long and include letters, numbers, and special characters.';
            } else {
                // If the password is valid, clear the error message and proceed
                document.getElementById('passwordError').textContent = '';
                alert('Registration successful!');
                form.reset(); // Clear the form
            }
        });

        // Clean up the event listener
        return () => {
            form.removeEventListener('submit', () => {}); // Add appropriate cleanup if needed
        };
    }, []); // Empty dependency array ensures this runs once on mount

    // Function to check if the password meets the requirements
    function isValidPassword(password) {
        // Regular expression to check password: at least 8 characters, includes letters, numbers, and special characters
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return passwordPattern.test(password);
    }

    return (
        <div className="registrationPage">
            <form id="registrationForm">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="phone">Phone Number:</label>
                <input type="tel" id="phone" name="phone" required />

                <label htmlFor="birthday">Birthday:</label>
                <input type="date" id="birthday" name="birthday" required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
                <div id="passwordError" className="error"></div>

                <button type="submit">Register</button>
            </form>
        </div>
    );
};
