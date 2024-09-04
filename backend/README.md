# Fitness Tracking App Backend

## Table of Contents

1. [Introduction](#introduction)
2. [Architecture](#architecture)
3. [Setup](#setup)
4. [API Endpoints](#api-endpoints)
5. [Database Models](#database-models)
6. [Authentication](#authentication)
7. [File Upload](#file-upload)
8. [Data Seeding](#data-seeding)
9. [Error Handling](#error-handling)
10. [Environment Variables](#environment-variables)
11. [Testing](#testing)
12. [Development Tools](#development-tools)
13. [Deployment](#deployment)
14. [Dependencies](#dependencies)
15. [JavaScript Configuration](#javascript-configuration)
16. [Scripts](#scripts)

## Introduction

This is the backend for a Fitness Tracking application built with Node.js, Express, and MongoDB. It provides APIs for user management, exercise tracking, routine creation, and training history recording. The application is designed to help users track their fitness progress, create workout routines, and log their training sessions.

## Architecture

The backend follows a typical MVC (Model-View-Controller) architecture:

- **Models**: Defined in the `models/` directory, these represent the data structures and interact with the MongoDB database. Models include User, Exercise, MuscleType, Routine, and TrainingHistory.
- **Controllers**: Located in the `controllers/` directory, they handle the business logic and act as an intermediary between routes and models. Controllers are implemented for users, exercises, routines, and training history.
- **Routes**: Found in the `api/` directory, they define the API endpoints and connect them to the appropriate controllers.

Additional components:

- **Middleware**: Custom middleware for authentication and error handling.
- **Config**: Database connection setup using Mongoose.
- **Validation**: Input validation schemas using Joi.
- **Services**: A service layer for complex business logic, separating it from the controllers.
- **Utils**: Utility functions and classes, including custom error handling and logging.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see [Environment Variables](#environment-variables))
4. Run the server:
   - For production: `npm start`
   - For development with hot-reloading: `npm run dev`

## API Endpoints

### Users

- POST `/api/users/register`: Register a new user
- POST `/api/users/login`: Login user
- GET `/api/users/info`: Get user info (protected)
- PUT `/api/users/update`: Update user info (protected)
- POST `/api/users/upload-photo`: Upload user photo (protected)
- GET `/api/users/photo`: Get user photo (protected)

### Exercises

- GET `/api/exercises`: Get all exercises
- GET `/api/exercises/:id`: Get exercise by ID
- GET `/api/exercises/muscle-types`: Get all muscle types
- GET `/api/exercises/muscle-type/:muscleTypeId`: Get exercises by muscle type

### Routines

- POST `/api/routines`: Create a new routine (protected)
- GET `/api/routines`: Get all routines for a user (protected)
- PUT `/api/routines/:id`: Update a routine (protected)
- DELETE `/api/routines/:id`: Delete a routine (protected)

### Training History

- POST `/api/history`: Record a training session (protected)
- GET `/api/history`: Get all training sessions for a user (protected)
- GET `/api/history/:id`: Get a specific training session (protected)

## Database Models

- **User**: Stores user information including email, password (hashed), personal info, address, and photo URL.
- **Exercise**: Represents individual exercises with details like name, description, GIF URL, default sets and reps, and associated muscle type.
- **MuscleType**: Categorizes exercises by muscle groups.
- **Routine**: Represents user-created workout routines, including a list of exercises with custom sets and reps.
- **TrainingHistory**: Records completed workout sessions, including date and exercises performed.

## Authentication

The authentication system uses JSON Web Tokens (JWT) for secure user authentication. bcrypt is used for password hashing. Protected routes require a valid JWT to be included in the request header.

## File Upload

User photo upload is handled using Multer for local storage during development. For production, the application is set up to use Vercel Blob for cloud storage, providing better scalability and reliability.

## Data Seeding

Seed scripts are provided for populating the database with initial data:

- `seedExercises.js`: Populates exercises and muscle types
- `seedTrainingHistory.js`: Adds sample training history data
- `seedUser.js`: Creates sample user accounts

Run these scripts using Node.js, e.g., `node seedExercises.js`

## Error Handling

The application uses a custom error handling middleware for consistent error responses across the API. A custom `CustomError` class is used to create structured error objects. Winston is used for logging errors and important events.

## Environment Variables

Required environment variables:

- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT
- `PORT`: Server port number (default: 5000)

## Testing

Currently, there are no automated tests. It's recommended to implement unit and integration tests for the API endpoints and database operations.

## Development Tools

- **Nodemon**: Used for automatic server restarts during development.
- **ESLint**: JavaScript linting tool for identifying and reporting on patterns in JavaScript.

## Deployment

The backend is configured for deployment on Vercel, as indicated by the presence of `@vercel/node` in the dependencies. Vercel provides serverless deployment, which can automatically scale based on demand.

## Dependencies

Main dependencies include:

- Express: Web application framework
- Mongoose: MongoDB object modeling tool
- Joi: Object schema validation
- bcrypt: Password hashing
- jsonwebtoken: JWT implementation
- cors: Cross-Origin Resource Sharing middleware
- multer: Middleware for handling multipart/form-data
- @vercel/blob: Vercel's Blob storage solution
- dotenv: Loads environment variables from a .env file
- body-parser: Parses incoming request bodies

Dev dependencies:

- ESLint: For code linting
- Nodemon: For development server with hot reloading

## JavaScript Configuration

The project uses a `jsconfig.json` file with the following settings:

- `checkJs`: Enables type checking on JavaScript files.
- `allowSyntheticDefaultImports`: Allows default imports from modules with no default export.
- `exclude`: Excludes the `node_modules` directory from type checking.

## Scripts

- `npm start`: Starts the server using Node.js
- `npm run dev`: Starts the server using Nodemon for development

---

This backend provides a solid foundation for a fitness tracking application. It offers user management, exercise cataloging, routine creation, and workout logging functionalities. The modular architecture allows for easy expansion and maintenance of the codebase. As the project evolves, remember to keep this README updated with any new features, dependencies, or architectural changes.
