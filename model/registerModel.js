// RegisterModel.js
const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  id: Number,
  name: String,
  phone_number: String,
  username: String,
});

const Register = mongoose.model("Users", registerSchema);

module.exports = Register;
