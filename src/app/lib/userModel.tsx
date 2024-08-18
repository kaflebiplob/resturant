const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  city: String,
  cNumber: String,
  streetAddress: String,
});
export const userModel =
  mongoose.models.user || mongoose.model("user", userSchema);
