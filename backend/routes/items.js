import express from "express";
import mongoose from "mongoose";
import Item from "../models/Item.js";

const router = express.Router();

// GET all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch items" });
  }
});

// GET one item
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch item" });
  }
});

// CREATE item
router.post("/", async (req, res) => {
  try {
    const { name, price, category } = req.body;
    if (!name?.trim() || !category?.trim() || price === "" || price === undefined || !Number.isFinite(Number(price))) {
      return res.status(400).json({ message: "Enter a name, category, and valid price" });
    }
    const item = await Item.create({ name: name.trim(), price: Number(price), category: category.trim() });
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message || "Could not create item" });
  }
});

// UPDATE item
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }
    const { name, price, category } = req.body;
    if (!name?.trim() || !category?.trim() || price === "" || price === undefined || !Number.isFinite(Number(price))) {
      return res.status(400).json({ message: "Enter a name , category, and a valid price" });
    }
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { name: name.trim(), price: Number(price), category: category.trim() },
      { new: true, runValidators: true }
    );
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message || "Could not update item" });
  }
});

// DELETE item
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Could not delete item" });
  }
});

export default router;
