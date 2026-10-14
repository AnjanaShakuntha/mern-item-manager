import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import itemRoutes from "./routes/items.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: (origin, callback) => {
    const isLocalDevelopment = !origin || /^http:\/\/localhost:\d+$/.test(origin);
    const isConfiguredClient = origin === process.env.CLIENT_URL;
    callback(null, isLocalDevelopment || isConfiguredClient);
  }
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Item Manager API is running");
});

app.use("/api/items", itemRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
