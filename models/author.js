const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
  },
  birthYear: {
    type: Number
  },
  nationality: {
    type: String
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book" // Reference to Book model
  }]
});

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
