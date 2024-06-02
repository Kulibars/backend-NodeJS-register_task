const mongoose = require("mongoose");
const validator = require("validator");
const { required } = require("yargs");

const UserShema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email",
    },
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserShema);

module.exports = User;
