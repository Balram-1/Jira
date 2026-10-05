# Jira-Like Application

A simplified, secure, and scalable Jira-like project management tool built with the MERN stack (MongoDB, Express, React, Node.js). This project was created as a learning exercise focusing on robust architecture, security, and best practices.

## Features

- **Global Exception Handling**: Consistent error responses across the API.
- **Swagger UI**: Interactive API documentation.
- **Role-Based Access Control (RBAC)**: Distinct permissions for Admin, Manager, Developer, Tester, and Viewer roles.
- **Audit Logging**: Tracking who did what, when, and from where.
- **Rate Limiting & Security**: IP-based rate limiting, input validation using Zod, secure JWT handling.

## Technology Stack

- **Frontend**: React, Vite, React Router, Axios
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Security**: bcryptjs, jsonwebtoken, helmet, cors, express-rate-limit, zod
- **Documentation**: swagger-jsdoc, swagger-ui-express
- **Logging**: winston

## Screenshots

![Dashboard](screenshots/dashboard.png)
*Jira Clone Dashboard showing projects and user roles.*

![Terminal](screenshots/terminal.png)
*Vite frontend running successfully.*

## Project Structure

- `/backend`: Node.js/Express API.
- `/frontend`: React frontend application.

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (running locally or a MongoDB Atlas cluster)

### Environment Variables

You'll need a `.env` file in the `backend/` directory. See `backend/.env.example` for required keys.

### Running the App

1. **Start Backend**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Start Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Documentation

- Check the API docs locally at `http://localhost:5000/api-docs` once the backend is running.
