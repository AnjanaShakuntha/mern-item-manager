import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Item name is required"],
      trim: true
    },
    price: {
      type: Number,
      required: [true, "Item price is required"],
      min: [0, "Price cannot be negative"]
    },
    category: {
      type: String,
      required:true,
      trim: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
