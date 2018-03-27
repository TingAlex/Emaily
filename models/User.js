const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
  githubId: String
});
//A new collection named users
mongoose.model("users", userSchema);
