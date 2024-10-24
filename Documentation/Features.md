# Feature Descriptions

## User Registration
**Feature Description**: The user registration feature allows new customers to create an account by providing personal details, ensuring they can securely log in and access services such as table reservations, pre-ordering, and receiving updates. This feature aims to simplify the onboarding process, validate user input, and enhance security by ensuring the uniqueness of each account.
 - Key Functionalities:
   - Input Fields: Users must provide essential details, including name, email, phone number, and password.
   - Password Validation: The system enforces password strength by requiring a combination of letters, numbers, and special characters.
   - Email Validation: The system checks for a valid email format and ensures it is not already in use.
   - Phone Number Validation: A valid phone number format is required, with optional two-factor authentication for security.
   - Unique Account Creation: The system ensures that each email and phone number is associated with only one account.
   - Confirmation: Upon successful registration, users receive a confirmation email or SMS to verify their account.
 - Acceptance Criteria:
   1. The user must be able to input their name, email, phone number, and password to register.
   2. The system should validate email and phone number formats before allowing registration.
   3. Passwords must meet strength requirements (e.g., minimum 8 characters, including numbers and symbols).
   4. Duplicate email or phone numbers should prompt an error message, preventing multiple registrations.
   5. A verification email or SMS should be sent to confirm the registration process.
   6. After successful registration, users are redirected to their account dashboard.
      ![Rapid Reservation Sign up](Pictures/RegistrationPage.jpg)

## Login Functionality
**Feature Description**: The login functionality enables registered users to securely access their accounts by entering their credentials. This feature ensures that only authorized users can access sensitive functionalities such as reservations, order management, and personal preferences. It also provides error handling for incorrect credentials and supports advanced security measures to protect user data.
 - Key Functionalities:
   - Username/Email Input: Users can log in using their registered username or email address.
   - Password Input: Users must provide a valid password to authenticate.
   - Password Encryption: User passwords are securely encrypted during storage and transmission.
   - Authentication and Authorization: The system verifies the entered credentials against stored records and grants access to the user's account upon successful login.
   - Error Handling: Displays error messages for incorrect username, email, or password, such as "Invalid email/password" or "Account not found."
     ![Rapid Reservation Login Page Incorrect Credentials !]((Pictures/InvalidLogin.jpg) "Invalid login")
   - Forgot Password Option: Users can recover or reset their password via email if forgotten, ensuring smooth account recovery.
   - Security Features:
     - Protection against brute force attacks by limiting the number of failed login attempts (e.g., account lock after multiple failures).
 - Acceptance Criteria:
   1. The user must be able to input their username/email and password.
   2. The system should authenticate the user and grant access to their account if the credentials are correct.
   3. Error messages should be displayed for invalid credentials or missing input fields.
   4. Users should have the option to reset their password if they forget it.
   5. Optional two-factor authentication should be supported for added security.
   6. After successful login, the user should be redirected to their account dashboard.
   7. Failed login attempts should result in account lock after a configurable number of tries, with a message to contact support or unlock via email.

## Reservation
**Feature Description**:The reservation feature allows customers to view available tables, select a preferred time slot, and book a table in advance at the restaurant. This feature provides a smooth and interactive experience with a visual seating layout, enabling customers to make informed decisions about their seating preferences. Additionally, the feature also customers to place order their orders in advance.
 - Key Functionalities:
   - Table Availability Display: A real-time, graphical layout of the restaurant’s seating plan shows available tables for the selected date and time.
   - Time Slot Selection: Customers can choose a specific time slot for their reservation based on availability.
   - Table Selection: Users can select their preferred table from the layout, including information about table capacity and location (e.g., near windows, outdoor seating).
   - Reservation Confirmation: After choosing a time and table, the system displays a summary of the reservation, including the date, time, and table number, for final confirmation.
   - Large Party Reservations: Customers can reserve tables for larger parties by automatically combining multiple tables to accommodate the group.
   - Special Requests: Users can enter specific requests such as dietary restrictions, seating preferences, or special occasions, which will be flagged for staff review.
   - Modification and Cancellation: Users can modify or cancel their reservations up to a specific time before their booking.
   - Order Placing: User can add their orders while making reservations up to certain party size.
 - Acceptance Criteria:
   1. The user must be able to view available tables on a visual seating layout.
   2. The system should allow users to select a time slot and reserve a specific table.
   3. After completing the reservation, the system should display a confirmation screen with all details.
   4. The system should allow users to modify or cancel their reservation.
   5. Special requests should be captured during the reservation process and flagged for staff.
