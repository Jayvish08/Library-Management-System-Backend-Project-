const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book", // Reference to Book model
    required: true,
  }],
  loanDate: {
    type: Date,
    default: Date.now,
  },
  returnDate: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  },
  status: {
    type: String,
    enum: ["active", "returned"],
    default: "active",
  },
});

const Loan = mongoose.model("Loan", loanSchema);
module.exports = Loan;
