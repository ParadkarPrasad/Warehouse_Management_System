const express = require('express')
const router = express.Router()
const Item = require('../models/Item')
const { verifyToken, isAdmin } = require('../middleware/authMiddleware')

// Get all items (Admin & Staff)
router.get('/', verifyToken, async (req, res) => {
  try {
    const items = await Item.find()
    res.json(items)
  } catch (error) {
    res.status(500).json({ message: "Error fetching items" });
  }
})

// GET single item (Admin & Staff)
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
    if (!item) {
      return res.status(404).json({ message: "Item not found" })
    }
    res.json(item)
  } catch (error) {
    res.status(500).json({ message: "Error fetching item" });
  }
})

// POST a new item (Admin access only)

router.post("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const { name, description, quantity, category } = req.body

    if (!name || !quantity || !category) {
      return res.status(400).json({ message: "Missing required fields" })
    }
    const newItem = new Item({ name, description, quantity, category })
    await newItem.save()
    res.status(201).json(newItem)
  } catch (error) {
    res.status(500).json({ message: "Error adding new item" });
  }
})

// UPDATE an item (Admin only)

router.put("/:id", verifyToken, async (req, res) => {
  try {

    // if user is staff member restriction to only update quantity
    if (req.user.role === "staff") {
      const { name, description, category } = req.body

      if (name || description || category) {
        return res.status(403).json({ message: "Staff cannot update item details. Only quantity is allowed." });
      }
    }
    // Find and update the item
    const updateItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updateItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(updateItem)
  } catch (error) {
    res.status(500).json({ message: "Error updating item" });
  }
})

// Delete an item (Admin only)

router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const deleteItem = await Item.findByIdAndDelete(req.params.id)
    if (!deleteItem) {
      return res.status(404).json({ message: "Item not found" })
    }
    res.json({ message: "Item deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error deleting item" })
  }
})

module.exports = router;