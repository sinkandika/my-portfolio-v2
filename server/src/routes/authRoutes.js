const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { registerAdmin, 
  loginAdmin,
} = require("../controllers/authController");

// register admin
router.post("/register", registerAdmin);

// login admin
router.post("/login", loginAdmin);


// test route
router.get("/", (req, res) => {
  res.send("Auth route working");
});

module.exports = router;