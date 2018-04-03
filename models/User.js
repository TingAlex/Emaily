const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
  githubId: String,
  credits: { type: Number, default: 0 }
});
//A new collection named users
mongoose.model("users", userSchema);
