# User Stories
##	User Login
  -	As a customer, I want to securely log into my account using my credentials, so I can access my reservation and ordering options.
  -	Acceptance Criteria:
    -	The user must be able to input their username and password.
    -	Successful login grants access to the reservation system and menu.
    -	Failed login attempts display appropriate error messages.
##	Table Reservation
  -	As a customer, I want to see available tables with a seating layout and choose my preferred table, so I can reserve it for a specific time.
  -	Acceptance Criteria:
    -	The system should display a graphical representation of available tables for the selected time frame.
    -	The user must be able to select a time slot and confirm the reservation for a chosen table.
##	Menu Display
  -	As a customer, I want to browse the restaurant’s menu, complete with item images, descriptions, and prices, so I can select items to pre-order.
  -	Acceptance Criteria:
    -	The system should display a list of menu items with images, descriptions, and prices.
    -	The user must be able to add items to an initial order.
##	Order Placement
  -	As a customer, I want to place my order before arriving at the restaurant, so my food can be prepared in advance, reducing wait time.
  -	Acceptance Criteria:
    -	The user must be able to add items to their order and submit it.
    -	Confirmation of the order should be displayed after submission.
##	Reservation and Order Confirmation
  -	As a customer, I want to receive confirmation of my table reservation and order, so I know that everything is ready when I arrive.
  -	Acceptance Criteria:
    -	The system should provide a confirmation screen showing the reserved table, time, and a summary of the placed order.
    -	The confirmation should be messaged to the customer.

# Staff User Stories
##	View Reservations
  -	As a restaurant staff member, I want to view all upcoming reservations for a specific time slot, so I can prepare the dining area and ensure seating availability.
  -	Acceptance Criteria:
    -	The system should display a list of reservations for each time slot, including customer names, table assignments, and party sizes.
    -	The staff should be able to filter by date and time to see specific reservations.
##	Manage Table Availability
  -	As a restaurant manager, I want to update the table availability in real-time, so customers can only reserve tables that are actually open during their preferred time slot.
  -	Acceptance Criteria:
    -	The system should allow the staff to manually adjust table availability due to unforeseen events (e.g., maintenance or a table being closed off).
    -	Changes in availability should reflect immediately in the customer-facing reservation system.
##	View and Track Orders
  -	As a restaurant chef or kitchen staff member, I want to view all pre-orders associated with upcoming reservations, so I can prepare the food in advance to ensure timely service.
  -	Acceptance Criteria:
    -	The system should display all orders placed ahead of time, categorized by reservation time and table.
    -	The staff should be able to mark orders as "In Progress" or "Completed" to track preparation status.
##	Modify or Cancel Orders
  -	As a restaurant staff member, I want the ability to modify or cancel a customer’s pre-order if there are changes, so we can accommodate special requests or unexpected situations.
  -	Acceptance Criteria:
    -	The system should allow the staff to update the items in a customer's order or cancel the order entirely.
    -	Customers should be notified via the system of any modifications or cancellations.
##	Send Reservation and Order Updates
  -	As a restaurant staff member, I want to send updates to customers about their reservations or orders (e.g., table changes or unavailable menu items), so they are informed in real-time.
  -	Acceptance Criteria:
    -	The system should provide an option to send notifications to customers in case of changes to their reservation time, table assignment, or pre-ordered items.
    -	Notifications should be sent via email or SMS, depending on customer preference.
##	Monitor System for Special Requests
  -	As a restaurant staff member, I want to monitor the reservation system for any special requests (e.g., dietary restrictions, special seating preferences), so I can ensure the customer's needs are met.
  -	Acceptance Criteria:
    -	The system should flag reservations with special requests, allowing the staff to review and make appropriate accommodations.
    -	Special requests should be clearly displayed alongside the customer’s reservation and order details.

