# Hotel Booking App

Welcome to the Hotel Booking App, a full-stack application for managing hotel bookings. This repository contains both the frontend and backend code for the application.

## Features

- User authentication and authorization system
- Search and filter hotels based on criteria
- Booking functionality with checkout process
- Admin dashboard for managing hotels, bookings, and users

## Technologies Used

- Frontend:
  - ReactJS
  - Redux (for state management)
  - Tailwind CSS (for styling)
- Backend:
  - Node.js
  - Express.js
  - MongoDB (using Mongoose for database interaction)
  - JWT (JSON Web Tokens) for authentication
- Deployment:
  - Frontend deployed on Netlify
  - Backend deployed on Heroku
- Other tools:
  - Axios (for API requests)
  - Formik and Yup (for form handling and validation)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sarth-akvaish/Hotel_Booking_App.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Hotel_Booking_App
   ```
3. Install dependencies for frontend and backend:
   - Frontend:
     ```bash
     cd frontend && npm install
     ```
   - Backend:
     ```bash
     cd backend && npm install
     ```
4. Create a `.env` file in the `backend` directory and add the following environment variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
   Replace `your_mongodb_connection_string` with your actual MongoDB connection string and `your_jwt_secret` with a secret key for JWT.
5. Start the development servers:
   - Frontend:
     ```bash
     cd frontend && npm start
     ```
   - Backend:
     ```bash
     cd backend && npm start
     ```

## Backend API Routes

### Authentication Routes

- **POST /api/users/register**
  - Register a new user.
  - Request Body: `{ username, email, password }`
  - Response: `{ success: true, message: 'User registered successfully' }`

- **POST /api/users/login**
  - Log in an existing user.
  - Request Body: `{ email, password }`
  - Response: `{ success: true, token: 'jwt_token_here' }`

### Hotel Routes

- **GET /api/hotels**
  - Get all hotels.
  - Response: Array of hotel objects.

- **GET /api/hotels/:id**
  - Get a specific hotel by ID.
  - Response: Hotel object.

- **POST /api/hotels**
  - Add a new hotel (admin only).
  - Request Body: `{ name, location, description, pricePerNight }`
  - Response: Newly added hotel object.

- **PUT /api/hotels/:id**
  - Update a hotel by ID (admin only).
  - Request Body: Updated hotel fields.
  - Response: Updated hotel object.

- **DELETE /api/hotels/:id**
  - Delete a hotel by ID (admin only).
  - Response: `{ success: true, message: 'Hotel deleted successfully' }`

### Booking Routes

- **POST /api/bookings**
  - Make a new booking.
  - Request Body: `{ hotelId, checkInDate, checkOutDate, guestCount }`
  - Response: Newly created booking object.

- **GET /api/bookings/user**
  - Get bookings for the logged-in user.
  - Response: Array of booking objects.

### Admin Routes

- **GET /api/admin/users**
  - Get all users (admin only).
  - Response: Array of user objects.

- **PUT /api/admin/users/:id**
  - Update user details (admin only).
  - Request Body: Updated user fields.
  - Response: Updated user object.

- **DELETE /api/admin/users/:id**
  - Delete a user by ID (admin only).
  - Response: `{ success: true, message: 'User deleted successfully' }`

## Usage

1. Register a new user or log in with existing credentials.
2. Browse hotels, search/filter based on criteria, and view hotel details.
3. Book a hotel by selecting check-in and check-out dates and specifying guest count.
4. View and manage bookings in the user dashboard.
5. Admins can access the admin dashboard to manage hotels, users, and bookings.

## Contributing

Contributions are welcome! Fork the repository, create a new branch for your feature or bug fix, and submit a pull request with detailed information about the changes.


You can customize the backend API routes section with specific details about each route, including request/response formats, authentication requirements, and any other relevant information.
