# Task & Time Tracker

A full-stack MERN application for tracking tasks and time spent on them.

## Features

- **User Authentication**: Sign up, login, and secure JWT-based authentication
- **Task Management**: Create, edit, delete, and update task status
- **Time Tracking**: Start/stop timers for tasks with real-time display
- **Daily Summary**: View daily statistics and time logs
- **Responsive Design**: Modern UI built with React and Tailwind CSS

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** enabled for frontend communication

### Frontend
- **React** with functional components and hooks
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API communication
- **Context API** for state management

## Project Structure

```
task-tracker-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── taskController.js
│   │   └── timeLogController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Task.js
│   │   └── TimeLog.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   │   └── timeLogRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── Timer.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── DailySummary.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your configuration:
   ```env
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/task-tracker
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000` and the backend on `http://localhost:5001`.

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get user profile (protected)

### Tasks
- `POST /api/tasks` - Create new task (protected)
- `GET /api/tasks` - Get all user tasks (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

### Time Logs
- `POST /api/timelogs/start` - Start timer for task (protected)
- `POST /api/timelogs/stop` - Stop timer for task (protected)
- `GET /api/timelogs` - Get all time logs (protected)

## Usage

1. **Sign Up/Login**: Create an account or sign in with existing credentials
2. **Create Tasks**: Add new tasks with titles and descriptions
3. **Track Time**: Start timers for tasks you're working on
4. **Monitor Progress**: Update task status as you work
5. **View Summary**: Check daily statistics and time logs

## Deployment

### Backend (Render)
1. Connect your GitHub repository
2. Set environment variables (MONGO_URI, JWT_SECRET)
3. Deploy and note the backend URL

### Frontend (Render)
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set environment variable: `REACT_APP_API_URL` to your backend URL
4. Deploy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
