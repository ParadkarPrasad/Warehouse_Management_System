const mongoose = require('mongoose');

//Define User Schema (structure of the database)

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "staff"], default: "staff" },
});


// Convert MongoDB `_id` to a normal string & remove `_id` and `__v`
UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString(); // Convert `_id` to string
    delete returnedObject._id; // Remove `_id`
    delete returnedObject.__v; // Remove version key (`__v`)
    delete returnedObject.password; // Optional: Hide password from API response
  },
});

// Export the User model
module.exports = mongoose.model("User", UserSchema);