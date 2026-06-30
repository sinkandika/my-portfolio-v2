import express from "express";

import {
  registerAdmin,
  loginAdmin,
} from "../controllers/authController.js";

const router = express.Router();

// Register admin
router.post("/register", registerAdmin);

// Login admin
router.post("/login", loginAdmin);

// Test route
router.get("/", (req, res) => {
  res.send("Auth route working");
});

export default router;