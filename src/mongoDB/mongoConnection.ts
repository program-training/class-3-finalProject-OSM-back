import mongoose from 'mongoose';
require("dotenv").config();
export default async function connectToDatabase() {
 try {
    const uri = `mongodb+srv://${process.env.USER_NAME_MONGODB_ATLAS}:${process.env.PASSWORD_MONGODB_ATLAS}@cluster0.lyeaoqp.mongodb.net/data?retryWrites=true&w=majority`;
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
 }
 catch (error) {
    console.error('Error connecting to MongoDB:', error);
 }
 
}
