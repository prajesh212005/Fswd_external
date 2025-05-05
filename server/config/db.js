const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const MONGODB_URI = 'mongodb+srv://Prajesh:Prajesh%40123@cluster0.hunlbwo.mongodb.net/EmpDB_23IT054?retryWrites=true&w=majority&appName=Cluster0';
    
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.error('Check your MongoDB connection string and try again');
  }
};

module.exports = connectDB;