import mongoose from 'mongoose';
require("dotenv").config();
export default async function connectToDatabase() {
 try {
    const uri = process.env.MONGODB_ATLAS_ORDERS as string;
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
 }
 catch (error) {
    console.error('Error connecting to MongoDB:', error);
 }
 
}
