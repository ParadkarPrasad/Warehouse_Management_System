// Express framework for handling API requests
const express = require('express');
const dotenv = require('dotenv')
dotenv.config({ path: __dirname + '/.env' });
// Load environment variables
require("dotenv").config();

// Enables communication between frontend and backend
const cors = require('cors');

// Create an Express App
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to allow cross-origin requests (frontend-backend communication)
app.use(cors());

// Register routes
const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");

// Mongoose for DB connection
const mongoose = require('mongoose');

// Connect to MongoDB

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define test route
app.get('/', (req, res) => {
  res.send("Hospital WMS API is running...");
});

// Set up the server to listen on a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
