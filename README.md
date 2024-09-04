# Bulking Sensei

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Architecture](#architecture)
4. [Technologies Used](#technologies-used)
5. [Getting Started](#getting-started)
6. [Frontend](#frontend)
7. [Backend](#backend)
8. [API Endpoints](#api-endpoints)
9. [Database Models](#database-models)
10. [Authentication](#authentication)
11. [Deployment](#deployment)
12. [Contributing](#contributing)

## Introduction

Bulking Sensei is a comprehensive fitness tracking application designed to help users monitor their fitness progress, create workout routines, and log their training sessions. The application consists of a React-based frontend and a Node.js backend with MongoDB as the database.

Visit the live application: [https://bulkingsensei.vercel.app/](https://bulkingsensei.vercel.app/)

## Features

-   User authentication (register, login, forgot password)
-   User profile management with photo upload
-   Exercise library with categorization by muscle groups
-   Custom workout routine creation
-   Training session logging and history tracking
-   Water intake monitoring
-   Dashboard with recent training statistics
-   Responsive design for various devices

## Architecture

The application follows a client-server architecture:

### Frontend

-   React-based single-page application (SPA)
-   Component-based structure with custom hooks for logic separation
-   State management using React Query and React Context
-   Routing with React Router, including protected routes

### Backend

-   Node.js with Express.js framework
-   MVC (Model-View-Controller) architecture
-   RESTful API design
-   MongoDB database with Mongoose ODM
-   JWT-based authentication

## Technologies Used

### Frontend

-   React 18
-   React Router 6
-   React Query
-   Material-UI (MUI)
-   Axios
-   PropTypes

### Backend

-   Node.js
-   Express.js
-   MongoDB with Mongoose
-   JSON Web Tokens (JWT)
-   bcrypt
-   Joi (for validation)
-   Multer (for file uploads)
-   Winston (for logging)

## Getting Started

1. Clone the repository
2. Set up the backend:
    ```
    cd backend
    npm install
    ```
3. Set up the frontend:
    ```
    cd frontend
    npm install
    ```
4. Configure environment variables (see Backend section for details)
5. Start the backend server:
    ```
    npm run dev
    ```
6. Start the frontend development server:
    ```
    npm start
    ```

## Frontend

### Project Structure

```
src/
├── api/
├── components/
├── context/
├── hooks/
├── pages/
├── styles/
└── index.js
```

### Key Components

-   Dashboard with water intake tracker and training statistics
-   Workout plan management interface
-   Exercise library browser
-   Training record logging and viewing
-   User profile management

## Backend

### Project Structure

```
backend/
├── api/
├── controllers/
├── models/
├── middleware/
├── config/
├── services/
├── utils/
└── server.js
```

### Environment Variables

Required environment variables:

-   `MONGO_URI`: MongoDB connection string
-   `JWT_SECRET`: Secret key for JWT
-   `PORT`: Server port number (default: 5000)

### Data Seeding

Seed scripts are provided for populating the database with initial data:

-   `seedExercises.js`: Populates exercises and muscle types
-   `seedTrainingHistory.js`: Adds sample training history data
-   `seedUser.js`: Creates sample user accounts

## API Endpoints

### Users

-   POST `/api/users/register`: Register a new user
-   POST `/api/users/login`: Login user
-   GET `/api/users/info`: Get user info (protected)
-   PUT `/api/users/update`: Update user info (protected)
-   POST `/api/users/upload-photo`: Upload user photo (protected)
-   GET `/api/users/photo`: Get user photo (protected)

### Exercises

-   GET `/api/exercises`: Get all exercises
-   GET `/api/exercises/:id`: Get exercise by ID
-   GET `/api/exercises/muscle-types`: Get all muscle types
-   GET `/api/exercises/muscle-type/:muscleTypeId`: Get exercises by muscle type

### Routines

-   POST `/api/routines`: Create a new routine (protected)
-   GET `/api/routines`: Get all routines for a user (protected)
-   PUT `/api/routines/:id`: Update a routine (protected)
-   DELETE `/api/routines/:id`: Delete a routine (protected)

### Training History

-   POST `/api/history`: Record a training session (protected)
-   GET `/api/history`: Get all training sessions for a user (protected)
-   GET `/api/history/:id`: Get a specific training session (protected)

## Database Models

-   **User**: Stores user information including email, password (hashed), personal info, address, and photo URL.
-   **Exercise**: Represents individual exercises with details like name, description, GIF URL, default sets and reps, and associated muscle type.
-   **MuscleType**: Categorizes exercises by muscle groups.
-   **Routine**: Represents user-created workout routines, including a list of exercises with custom sets and reps.
-   **TrainingHistory**: Records completed workout sessions, including date and exercises performed.

## Authentication

The application uses JSON Web Tokens (JWT) for secure user authentication. Protected routes require a valid JWT to be included in the request header. Passwords are hashed using bcrypt before storage.

## Deployment

The application is deployed on Vercel:

-   Frontend: Deployed as a static site
-   Backend: Utilizes Vercel's serverless functions
-   Database: MongoDB Atlas cloud database
-   File Storage: Vercel Blob for user photo uploads

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

Please ensure your code adheres to the existing style conventions and passes all tests before submitting a pull request.

---

Bulking Sensei provides a comprehensive solution for fitness enthusiasts to track their progress, manage workouts, and stay motivated. With its user-friendly interface and robust backend, it offers a seamless experience for users to achieve their fitness goals.
