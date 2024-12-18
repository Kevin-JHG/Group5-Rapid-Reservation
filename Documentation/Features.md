# Feature Descriptions

## User Registration
**Feature Description**: The user registration feature allows new customers to create an account by providing personal details, ensuring they can securely log in and access services such as table reservations, pre-ordering, and receiving updates. This feature aims to simplify the onboarding process, validate user input, and enhance security by ensuring the uniqueness of each account.
 - Key Functionalities:
   - Input Fields: Users must provide essential details, including name, email, phone number, and password.
   - Password Validation: The system enforces password strength by requiring a combination of letters, numbers, and special characters.
   - Email Validation: The system checks for a valid email format and ensures it is not already in use.
   - Unique Account Creation: The system ensures that each email and phone number is associated with only one account.
   - Confirmation: Upon successful registration, users receive a confirmation email or SMS to verify their account.
 - Acceptance Criteria:
   1. The user must be able to input their name, email, phone number, and password to register.
   2. The system should validate email and phone number formats before allowing registration.
   3. Passwords must meet strength requirements (e.g., minimum 8 characters, including numbers and symbols).
   4. Duplicate email or phone numbers should prompt an error message, preventing multiple registrations.
   5. A verification email or SMS should be sent to confirm the registration process.
   6. After successful registration, users are redirected to their account dashboard.
      ![Rapid Reservation Sign up](Pictures/updated-signup.jpg)

## Login Functionality
**Feature Description**: The login functionality enables registered users to securely access their accounts by entering their credentials. This feature ensures that only authorized users can access sensitive functionalities such as reservations, order management, and personal preferences. It also provides error handling for incorrect credentials and supports advanced security measures to protect user data.
![Rapid Reservation Login](Pictures/updated-login.jpg)
 - Key Functionalities:
   - Username/Email Input: Users can log in using their registered username or email address.
   - Password Input: Users must provide a valid password to authenticate.
   - Password Encryption: User passwords are securely encrypted during storage and transmission.
   - Authentication and Authorization: The system verifies the entered credentials against stored records and grants access to the user's account upon successful login.
   - Error Handling: Displays error messages for incorrect username, email, or password, such as "Invalid email/password" or "Account not found."
     ![Rapid Reservation Login Page Incorrect Credentials](Pictures/InvalidLogin.jpg) 
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
![Rapid Reservation Reservation Page](Pictures/Reservation.jpg)
 - Key Functionalities:
   - Dine-in/Take-out Availability: User will be presented with the option on a dine-in or take-out reservation.
   - Table Availability Display: A real-time, graphical layout of the restaurant’s seating plan shows available tables for the selected date and time.
   - Time Slot Selection: Customers can choose a specific time slot for their reservation based on availability.
   - Reservation Confirmation: After choosing a time, the system displays a summary of the reservation, including the date, time, and party size, for final confirmation.
     ![Rapid Reservation Summary Page](Pictures/summary-reservation-1.png)
   - Large Party Reservations: Customers can reserve tables for larger parties by automatically combining multiple tables to accommodate the group.(Party size capacity: 10)
   - Special Requests: Users can enter specific requests such as dietary restrictions, seating preferences, or special occasions, which will be flagged for staff review.
   - Order Placing: User can add their orders while making reservations up to party size of 10.
 - Acceptance Criteria:
   1. The user must be able to view available tables on a visual seating layout.
   2. The system should allow users to select a time slot and reserve a specific table.
   3. After completing the reservation, the system should display a confirmation screen with all details.
   4. The system should allow users to modify or cancel their reservation.
      ![Rapid Reservation Confirm Page](Pictures/confirm.png)
   6. Special requests should be captured during the reservation process and flagged for staff.
  
## Employee Dashboard Feature
**Feature Description**: The Employee Dashboard serves as a centralized hub for restaurant staff to manage reservations, view and track orders, update table availability, and monitor special requests. This dashboard is tailored to support various roles, including hosts, kitchen staff, and managers, by providing tools to streamline daily operations, improve service efficiency, and maintain real-time communication with customers.
![Rapid Reservation Login](Pictures/EmployeeDashMobile.jpg)
 - Key Functionalities:
   - Reservation Management: Staff can view upcoming reservations in a list or calendar format, with details including customer names, party sizes, reservation times, and assigned tables. Filters by date and time allow easy access to specific reservations.
   - Order Tracking and Status Updates: Displays all pre-orders linked to reservations, categorized by table and time. Staff can mark orders as "In Progress" or "Completed," ensuring efficient kitchen operations and timely service.
   - Table Availability Control: Managers can update table availability in real-time, closing tables for maintenance or blocking off sections for special events, ensuring accurate information for customer reservations.
   - Special Request Monitoring: Reservations flagged with special requests (e.g., dietary restrictions, seating preferences) are highlighted for quick review, allowing staff to make necessary accommodations.
   - Event and Large Party Management: The dashboard provides tools to manage large group reservations and special events, allowing staff to block off multiple tables, assign waitstaff, and review event-specific requirements.
   - Employee Roles and Permissions: The dashboard supports different access levels, ensuring that each staff role has access only to the relevant information and tools (e.g., only managers can adjust table availability).
   - Real-Time Notifications to Customers: Staff can send instant updates to customers about reservation changes (e.g., table reassignment or unavailable menu items), with notifications sent via email or SMS based on customer preference.
 - Acceptance Criteria:
   1.  Staff should be able to view reservations in a list or calendar format, filtered by date and time.
   2.  The system should allow staff to update order statuses and track their progress.
   3.  Managers should have the ability to adjust table availability instantly.
   4.  Special requests should be flagged and visible to all relevant staff.
   5.  Only authorized roles should access specific dashboard functionalities.
   6.  Staff should be able to send reservation and order updates directly to customers.
