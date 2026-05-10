// 1. import package
const express = require("express");
const cors = require("cors");
// 2. env
require("dotenv").config();
// 3. local files
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
// 4. app logic
const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://my-portfolio-v2-bgyg.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => { // if people go to / execute this function below 
  res.send("Portfolio V2 backend running success"); // send to user and end request cycle
});

// Project routes
app.use("/api/projects", projectRoutes); // if people open api/projects, run projectRoutes
app.use("/api/auth", authRoutes); // for auth/login and auth/register

module.exports = app;
