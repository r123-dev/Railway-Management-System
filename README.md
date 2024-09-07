# Railway Management System Backend

This is a Node.js and MySQL backend application for managing train bookings. It provides user registration, login, and allows admins to manage train details such as adding and updating trains.

## Prerequisites

- Node.js
- MySQL

## Setup Instructions

1. Clone the repository and install dependencies using `npm install`.
2. Set up a MySQL database and create the necessary tables.
3. Configure your `.env` file with your MySQL credentials.
4. Run the application using `node app.js`.

## API Endpoints

- **User Registration**: `POST /auth/register`
- **User Login**: `POST /auth/login`
- **Add Train (Admin)**: `POST /trains/`
- **Update Train (Admin)**: `PUT /trains/seats`
- **Get Train Availability**: `GET /trains/:source/:destination`
- **Book Train**: `POST /bookings`
- **Get Booking Details**: `GET /bookings/:id`

The application runs on `http://localhost:8000`.
