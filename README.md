# Group5-Rapid-Reservation
A web application project for the Programming Capstone Course (2024FA.CSC.289.0001) that enables fine dining restaurants to manage reservations and allow customers to place orders in advance.
## Project Overview
Rapid-Reservation is a web application designed to streamline the table reservation and ordering process for restaurants. The goal is to provide a simple, user-friendly platform for customers to make reservations, browse menus, and place orders efficiently.

## Features
- User Login: Allows customers to create accounts and log in.
- Table Reservation: Users can reserve tables by selecting available time slots.
- Menu Browsing: Users can view the restaurant menu.
- Order Placement: Customers can place orders through the app.
- Staff Notifications: Alerts staff of incoming reservations and orders.
- Confirmation Messages: Simplified approach to payment with confirmation for orders and reservations.
- Order Tracking (Optional): Users can track the status of their orders.
- Additional Features (Future): Basic user profiles, favorite items, in-app chat, and multi-language support

## Setup Supabase

First, install new packages with
```sh
npm install
```
Next create a `.env` file in the root of the project and add the Supabase url and API key
```sh
VITE_SUPABASE_URL=<supabase-url-here>
VITE_SUPABASE_ANON_KEY=<supbase-anon-key-here>
```

## Technology Stack
### Frontend:
- HTML, CSS, JavaScript: Used to build the user interface and provide a responsive design.
### Frontend Framework:
- React: A lightweight framework to manage the backend and mock server for handling reservations and orders.
### Backend Database:
- Supabase Database: Supabase databases will be used to store sample data like menus, reservations, and orders.
### Tools:
- Wireframing & Prototyping: Figma, LucidChart, or Excalidraw for UI/UX design.
- Version Control: GitHub for code collaboration and issue tracking.
- Project Management: Trello for tracking tasks and project progress.
- Communication: MS Teams for team discussions and meetings.

## Project Milestones
### Design Phase:
- Create wireframes for the user interface.
- Set up a mock database for testing reservations and orders.
  
### Development Phase:
- Implement user login, table reservation, and order placement features.
- Set up a basic backend to handle data storage and communication.

### Testing & Refinement:
- Test core functionalities (login, reservations, orders) across different devices.
- Gather feedback and refine the user interface.

### Final Presentation:
- Prepare the final demo with a walkthrough of the app’s main features.

## Roles and Responsibilities
- Frontend Developer: Responsible for building the UI with HTML, CSS, and JavaScript.
- Backend Developer: Implements backend logic, including table reservations and order handling with React.
- UI/UX Designer: Creates wireframes and prototypes to ensure an intuitive user experience.
- Documentation Specialist: Responsible for maintaining project documentation, including README, API documentation, and user guides.
- Tester: Ensures that the application meets quality standards by testing core features, functionality, and user experience across devices
- Project Manager: Oversees the project timeline, task assignments, and communication.
