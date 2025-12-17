const { register, login } = require("./auth.service");

exports.register = async (req, res) => {
  const user = await register(req.body);
  res.status(201).json(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body; // ✅ destructure

  const { user, token } = await login({ email, password });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
  });

  res.json(user);
};

