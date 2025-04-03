const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  quantity: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

// Convert MongoDB `_id` to a normal string & remove unnecessary fields
ItemSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString(); // Convert `_id` to string
    delete returnedObject._id; // Remove `_id`
    delete returnedObject.__v; // Remove version key (`__v`)
  },
});

// Export the Item model
module.exports = mongoose.model("Item", ItemSchema);