# Bulking Sensei Frontend

## Overview

Bulking Sensei is a React-based web application designed to help users track their fitness progress, manage workout routines, and monitor water intake. This frontend application provides an intuitive user interface for interacting with the Bulking Sensei backend API.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Setup](#setup)
3. [Key Features](#key-features)
4. [Architecture](#architecture)
5. [Technologies Used](#technologies-used)
6. [Contributing](#contributing)

## Project Structure

```
src/
├── api/
│   └── index.api.js
├── components/
│   ├── CreateRoutineForm.jsx
│   ├── DashboardProfile.jsx
│   ├── EditTrainingPopup.jsx
│   ├── ExerciseList.jsx
│   ├── ForgotPassword.jsx
│   ├── Logo.jsx
│   ├── MusclesList.jsx
│   ├── ProgressBar.jsx
│   ├── ProtectedRoute.jsx
│   ├── Sidebar.jsx
│   ├── StatisticsPreview.jsx
│   ├── UserInformation.jsx
│   └── WaterIntake.jsx
├── context/
│   └── AuthContext.js
├── hooks/
│   ├── useAuth.js
│   ├── useExercises.js
│   ├── useRoutines.js
│   ├── useTrainingHistory.js
│   └── useUserInfo.js
├── pages/
│   ├── HomePage.jsx
│   ├── Login.jsx
│   ├── MyPlan.jsx
│   ├── Profile.jsx
│   ├── Signup.jsx
│   └── TrainingRecord.jsx
├── styles/
│   └── theme.js
└── index.js
```

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. The application will be available at `http://localhost:3000`

## Key Features

- User authentication (login, signup, forgot password)
- Dashboard with water intake tracker and recent training statistics
- Workout plan management
- Exercise library
- Training record tracking
- User profile management

## Architecture

The frontend is built using a component-based architecture with React. Key architectural decisions include:

1. **State Management**:

   - React Query for server state management
   - React Context for global state (e.g., authentication)
   - Local state for component-specific data

2. **Routing**:

   - React Router for navigation
   - Protected routes for authenticated users

3. **API Integration**:

   - Axios for HTTP requests
   - Centralized API functions in `api/index.api.js`

4. **Custom Hooks**:

   - Encapsulation of complex logic and state management
   - Reusable hooks for auth, exercises, routines, and user info

5. **UI Components**:

   - Material-UI (MUI) for consistent design and pre-built components
   - Custom styled components for specific UI needs

6. **Responsive Design**:
   - MUI's responsive utilities
   - Custom media queries for complex layouts

## Technologies Used

- React 18
- React Router 6
- React Query
- Material-UI (MUI)
- Axios
- PropTypes

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

Please ensure your code adheres to the existing style conventions and passes all tests before submitting a pull request.
