# Quick Setup Guide

## 🚀 Quick Start

1. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

2. **Start both servers:**
   ```bash
   npm run dev
   ```

3. **Or use the startup script:**
   ```bash
   ./start.sh
   ```

## 📋 Prerequisites

- **MongoDB**: Make sure MongoDB is running locally or update the MONGO_URI in `backend/.env`
- **Node.js**: Version 14 or higher
- **npm**: For package management

## 🔧 Configuration

### Backend Environment Variables
Create `backend/.env` file:
```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/task-tracker
JWT_SECRET=your_secret_key_here
```

### Frontend Configuration
The frontend is configured to connect to `http://localhost:5001` by default.

## 🧪 Testing

Test the backend setup:
```bash
npm run test-backend
```

## 📱 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **API Documentation**: See README.md for endpoints

## 🛠️ Development

- **Backend**: `cd backend && npm run dev`
- **Frontend**: `cd frontend && npm start`
- **Both**: `npm run dev` (from root)

## 🚨 Troubleshooting

### Backend Issues
1. Check MongoDB connection
2. Verify environment variables
3. Check port availability

### Frontend Issues
1. Ensure backend is running
2. Check browser console for errors
3. Verify API endpoints

## 📚 Next Steps

1. **Customize**: Modify the UI and functionality
2. **Deploy**: Follow deployment instructions in README.md
3. **Enhance**: Add features like project management, team collaboration, etc.
