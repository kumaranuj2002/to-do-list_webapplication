const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // Check existing user
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already in use" });

  // Hash password
  const hashed = await bcrypt.hash(password, 10);

  // Create user
  await User.create({
    name,
    email,
    passwordHash: hashed
  });

  res.status(201).json({ message: "User registered successfully" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Find user
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid email or password" });

  // Compare password
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid)
    return res.status(400).json({ message: "Invalid email or password" });

  // Generate token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token });
};
