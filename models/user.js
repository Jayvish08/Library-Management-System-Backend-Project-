const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  favoriteBooks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book"  // References books
  }],
  profilePicture: {  // New field for storing profile image path
    type: String,
    default: null,
  }
}, { timestamps: true });
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);
module.exports = User;
