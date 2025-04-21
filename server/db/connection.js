require('dotenv').config(); 
const mongoose = require('mongoose');


const DB = process.env.DATABASE || "mongodb+srv://sksatyam039:databaseconnection@satyam.zp7cahj.mongodb.net/portfolio"; // ✅ Not a string


const connectDB = async () => {
    try {
        await mongoose.connect(DB);
        console.log('✅ MongoDB connected');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

connectDB(); 