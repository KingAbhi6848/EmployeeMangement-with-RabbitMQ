import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
const mongoDBURI = process.env.MONGODB_URI;
mongoose.connect(mongoDBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to the MongoDB database successfully');
});

export default db;
