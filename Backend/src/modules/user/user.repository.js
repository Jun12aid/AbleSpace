const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

const findByEmail = (email) => User.findOne({ email });
const findById = (id) => User.findById(id);
const createUser = (data) => User.create(data);

module.exports = { User, findByEmail, findById, createUser };
