import './register.css'

export const Register = () => {
  return <h1>Register</h1>
}
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Page</title>
    <style>
        /* Just some basic styling if we wanted to use it. No problem if not just figured id add it in */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        form {
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        input[type="text"],
        input[type="email"],
        input[type="password"],
        input[type="tel"],
        input[type="date"] {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        button {
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        button:hover {
            background-color: #45a049;
        }

        .error {
            color: red;
            font-size: 14px;
        }
    </style>
</head>

<body>
    <!-- The start of a simple registration form -->
    <form id="registrationForm">
        <!-- This part will be all the input fields for user details. Jason L. suggested the input fields that are included. If there are any more you think I should add in feel free to make a suggestion! -->
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>

        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>

        <label for="phone">Phone Number:</label>
        <input type="tel" id="phone" name="phone" required>

        <label for="birthday">Birthday:</label>
        <input type="date" id="birthday" name="birthday" required>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <div id="passwordError" class="error"></div>

        <button type="submit">Register</button>
    </form>

    <script>
        // This will grabb the form element
        const form = document.getElementById('registrationForm');

        // Form Submission
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            // Get the password input value
            const password = document.getElementById('password').value;

            // Check if the password meets the requirements that Jason L. suggested
            if (!isValidPassword(password)) {
                // If password is invalid, it will show the following error message
                document.getElementById('passwordError').textContent =
                    'Password must be at least 8 characters long and include letters, numbers, and special characters.';
            } else {
                // If the password is valid, clear the error message and proceed
                document.getElementById('passwordError').textContent = '';
                alert('Registration successful!');
                form.reset(); // Clear the form
            }
        });

        // Function to check if the password meets the requirements
        function isValidPassword(password) {
            // Regular expression to check password: at least 8 characters, includes letters, numbers, and special characters
            const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            return passwordPattern.test(password);
        }
    </script>
</body>

</html>
