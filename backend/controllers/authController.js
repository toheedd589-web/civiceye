const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const supabase = require("../config/supabase");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    // Validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Check if user already exists
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (fetchError) {
      return res.status(500).json({
        success: false,
        message: fetchError.message,
      });
    }

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          id: uuidv4(),
          name,
          email,
          password_hash: passwordHash,
          role,
          phone,
        },
      ])
      .select();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: data[0],
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};