const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findByEmail } = require("../user/user.repository");

const register = async ({ name, email, password }) => {
  const exists = await findByEmail(email);
  if (exists) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  return require("../user/user.repository").createUser({
    name,
    email,
    password: hashedPassword,
  });
};

const login = async ({ email, password }) => {
  // 🔴 email MUST be string
  const user = await findByEmail(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { user, token };
};

module.exports = { register, login };
