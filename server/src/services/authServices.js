import supabase from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register admin (SQL)
const registerAdminService = async (adminData) => {
  const { name, email, password } = adminData;

  // check existing email
  const { data: existingUser, error: existingUserError } = await supabase
    .from("admin_users")
    .select("*")
    .eq("email", email);

  if (existingUserError) throw existingUserError;

  if (existingUser.length > 0) {
    throw new Error("Email already registered");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // insert to db
  const { data, error: insertError } = await supabase
    .from("admin_users")
    .insert({
      name,
      email,
      password: hashedPassword,
    })
    .select("id, name, email, role")
    .single();

  if (insertError) throw insertError;

  return data;
};



// Login admin (SQL)
const loginAdminService = async (loginData) => {
  const { email, password } = loginData;

  // find admin by email
  const { data: admin, error } = await supabase
    .from("admin_users")
    .select("id, name, email, password, role")
    .eq("email", email)
    .single();

  if (error || !admin) {
    throw new Error("Invalid email or password");
  }

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

export {
  registerAdminService,
  loginAdminService,
};
