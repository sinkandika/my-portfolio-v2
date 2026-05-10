const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register admin (SQL)
const registerAdminService = async (adminData) => {
  const { name, email, password } = adminData;

  // check existing email
  const existingUser = await pool.query(
    "SELECT * FROM admin_users WHERE email = $1",
    [email]
  );

  if (existingUser.rows.length > 0) {
    throw new Error("Email already registered");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // insert admin
  const result = await pool.query(
    `
    INSERT INTO admin_users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email, role
    `,
    [name, email, hashedPassword]
  );

  return result.rows[0];
};

// Login admin (SQL)
const loginAdminService = async (loginData) => {
  const { email, password } = loginData;

  // find admin by email
  const result = await pool.query(
    "SELECT * FROM admin_users WHERE email=$1",
    [email]
  );

  if (result.rows.length === 0) {
    throw new Error ("Invalid email or password");
  }

  const admin = result.rows[0];

  // compare password
  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    throw new Error ("Invalid email or password");
  }

  // generate JWT
  const token = jwt.sign(
    {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  };
};

module.exports = {
  registerAdminService,
  loginAdminService,
};
