// Express framework for handling API requests
const express = require('express');

// Load environment variables
require("dotenv").config();
console.log("MONGO_URI:", process.env.MONGO_URI);
// Enables communication between frontend and backend
const cors = require('cors');

// Create an Express App
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to allow cross-origin requests (frontend-backend communication)
app.use(cors());

// Mongoose for DB connection
const mongoose = require('mongoose');

// Check if MongoDB URI is set
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error("Error: MONGO_URI is not defined. Check your .env file.");
  process.exit(1);
}

// Connect to MongoDB

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// console.log("MONGO_URI:", process.env.MONGO_URI);  // Debugging

// Define test route
app.get('/', (req, res) => {
  res.send("Hospital WMS API is running...");
});

// Set up the server to listen on a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
