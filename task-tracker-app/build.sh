#!/bin/bash

# Build script for Render deployment
echo "🚀 Starting build process..."

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

echo "✅ Build process completed!"
