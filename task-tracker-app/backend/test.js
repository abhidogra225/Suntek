// Simple test script to verify backend setup
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function testConnection() {
  try {
    console.log('Testing database connection...');
    console.log('MONGO_URI:', process.env.MONGO_URI);
    console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not set');
    console.log('PORT:', process.env.PORT);
    
    // Test mongoose connection
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Database connection successful!');
    
    // Test models
    const User = require('./models/User');
    const Task = require('./models/Task');
    const TimeLog = require('./models/TimeLog');
    
    console.log('✅ All models loaded successfully!');
    
    await mongoose.disconnect();
    console.log('✅ Database disconnected successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testConnection();
