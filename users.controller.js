const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("./constants");

async function addUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  await User.create({
    email,
    password: passwordHash,
  });
}

async function loginUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  console.log(isPasswordCorrect);
  if (!isPasswordCorrect) {
    throw new Error("worng password");
  }

  return jwt.sign({ email }, JWT_SECRET, { expiresIn: "3d" });
}

module.exports = { addUser, loginUser };