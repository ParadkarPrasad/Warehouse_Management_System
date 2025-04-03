const jwt = require('jsonwebtoken')
const User = require("../models/User")

// Middleware to verify user token

const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "")

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select("-password")
    console.log(req.user)
    next()
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" })
  }
}

// Middleware to check if user is an admin

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied. Admins only." });

  }
  next()

}
module.exports = { verifyToken, isAdmin }