const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishedYear: {
    type: Number,
  },
  genre: {
    type: String,
    enum: ["Fiction", "Non-Fiction", "Sci-Fi", "Fantasy", "Horror", "Biography", "History", "Other"],
    default: "Other",
  },
  price: {
    type: Number,
    required: true,
  },
  coverImage: {  // New field for storing cover image path
    type: String,
    default: null,
  }
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
