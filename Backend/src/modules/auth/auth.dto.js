exports.registerDto = ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }
  return { name, email, password };
};
