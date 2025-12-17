const { User } = require("./user.repository");

const profile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

const getAllUsers = async (req, res) => {
  const users = await User.find().select("_id name email");
  res.json(users);
};

module.exports = {
  profile,
  getAllUsers,
};
