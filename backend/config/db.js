require('dotenv').config();
const mongoose = require('mongoose');
const { secret } = require('./secret');

// mongoose.set("strictQuery", false);

// local url
const DB_URL = process.env.MONGO_URI;
// mongodb url
// const MONGO_URI = secret.db_url;

/**
 * Connect to MongoDB using the provided URI. If no URI is supplied, this
 * function falls back to `process.env.MONGODB_URI_TEST` when defined or the
 * default `MONGO_URI` from the environment.
 *
 * @param {string} [uri] - MongoDB connection string
 */
const connectDB = async (uri) => {
  const mongoUri = uri || process.env.MONGODB_URI_TEST || DB_URL;
  try {
    await mongoose.connect(mongoUri);
  } catch (err) {
    console.error('mongodb connection failed!', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
