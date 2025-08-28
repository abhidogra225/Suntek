#  Deployment Guide - Render

This guide will walk you through deploying your Task & Time Tracker app on Render.

##  Prerequisites

- GitHub repository with your code
- MongoDB Atlas account (for production database)
- Render account

## 🔧 Step 1: Set Up MongoDB Atlas

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Choose "Free" tier
   - Select your preferred cloud provider and region
   - Click "Create"

3. **Set Up Database Access**
   - Go to "Database Access" → "Add New Database User"
   - Create a username and password
   - Select "Read and write to any database"
   - Click "Add User"

4. **Set Up Network Access**
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (for Render)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Clusters" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Add database name: `?retryWrites=true&w=majority&appName=task-tracker`

## 🌐 Step 2: Deploy Backend on Render

1. **Go to Render Dashboard**
   - Visit [render.com](https://render.com)
   - Sign in/Sign up

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

3. **Configure Backend Service**
   - **Name**: `task-tracker-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. **Set Environment Variables**
   - **NODE_ENV**: `production`
   - **PORT**: `10000`
   - **MONGO_URI**: `your_mongodb_atlas_connection_string`
   - **JWT_SECRET**: `your_secure_jwt_secret_key`

5. **Deploy**
   - Click "Create Web Service"
   - Wait for build to complete
   - Note your backend URL (e.g., `https://task-tracker-backend.onrender.com`)

## 🎨 Step 3: Deploy Frontend on Render

1. **Create New Static Site**
   - Click "New +" → "Static Site"
   - Connect your GitHub repository

2. **Configure Frontend Service**
   - **Name**: `task-tracker-frontend`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `build`
   - **Plan**: Free

3. **Set Environment Variables**
   - **REACT_APP_API_URL**: `https://your-backend-app.onrender.com`

4. **Deploy**
   - Click "Create Static Site"
   - Wait for build to complete
   - Note your frontend URL

##  Step 4: Update CORS and URLs

1. **Update Backend CORS**
   - In `backend/server.js`, update the CORS origin:
   ```javascript
   origin: process.env.NODE_ENV === 'production' 
     ? ['https://your-frontend-app.onrender.com']
     : ['http://localhost:3000']
   ```

2. **Update Frontend API URL**
   - In `frontend/render.yaml`, update:
   ```yaml
   - key: REACT_APP_API_URL
     value: https://your-backend-app.onrender.com
   ```

3. **Redeploy Both Services**
   - Push changes to GitHub
   - Render will automatically redeploy

##  Step 5: Test Your Deployed App

1. **Test Backend**
   - Visit your backend URL
   - Should see: `{"message": "Task & Time Tracker API"}`

2. **Test Frontend**
   - Visit your frontend URL
   - Try creating an account and using the app

3. **Test API Endpoints**
   - Use Postman or similar to test your API endpoints

## Troubleshooting

### Common Issues:

1. **Build Failures**
   - Check build logs in Render dashboard
   - Ensure all dependencies are in package.json

2. **Database Connection Issues**
   - Verify MONGO_URI is correct
   - Check MongoDB Atlas network access
   - Ensure database user has correct permissions

3. **CORS Errors**
   - Verify CORS origin URLs match exactly
   - Check frontend and backend URLs

4. **Environment Variables**
   - Double-check all environment variables are set
   - Ensure no typos in variable names

##  Security Notes

- **JWT_SECRET**: Use a strong, random string
- **MONGO_URI**: Never commit to Git
- **CORS**: Only allow necessary origins
- **Environment Variables**: Keep sensitive data in Render dashboard

##  Final URLs

After deployment, you'll have:
- **Backend API**: `https://your-backend-app.onrender.com`
- **Frontend App**: `https://your-frontend-app.onrender.com`

## Congratulations!

Your Task & Time Tracker app is now live on the internet! 🚀

##  Next Steps

- Set up custom domain (optional)
- Configure monitoring and logging
- Set up CI/CD pipeline
- Add SSL certificates
- Monitor performance and costs
