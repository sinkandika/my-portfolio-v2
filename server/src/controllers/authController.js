const { 
  registerAdminService, 
  loginAdminService 
} = require("../services/authServices");

// register admin (response)
const registerAdmin = async (req, res) => {
  try {
    const newAdmin = await registerAdminService(req.body);

    res.status(201).json({
      message: "Admin registered successfully",
      admin: newAdmin,
    });
  } catch (error) {
    console.error(error.message);

    if (error.message === "Email already registered") {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// login admin (response)
const loginAdmin = async (req, res) => {
  try {
    const loginResult = await loginAdminService(req.body);

    res.status(200).json({
      message: "Login success",
      token: loginResult.token,
      admin: loginResult.admin,
    })
  } catch (err) {
    console.error(err.message);

    if (err.message === "Invalid email or password") {
      return res.status(400).json({
        message: err.message,
      });
    }

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
};