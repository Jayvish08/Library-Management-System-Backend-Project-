const {loanSchema} = require("../utils/schema");
const ExpressError = require("../utils/ExpressError.js");
const Book = require("../models/book.js");
const User = require("../models/user.js");
module.exports.validateLoan = (req,res,next) =>{
    let {error} = loanSchema.validate(req.body);
    console.log(error);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

module.exports.validateBooksForLoan = async (req, res, next) => {
    let books = req.body.books;
    if (books && books.length > 0) {
        let uniqueBookIds = [...new Set(books)];
        let validBooks = await Book.find({ _id: { $in: uniqueBookIds } }).select("_id");
        let validBookIds = validBooks.map(book => book._id.toString());

        // Find invalid book IDs
        let invalidBookIds = books.filter(bookId => !validBookIds.includes(bookId));

        if (invalidBookIds.length > 0) {
            return res.status(400).json({
                error: "Some book IDs are invalid",
                invalidBookIds
            });
        }
        // Attach validated book IDs to request
        req.validBooks = validBookIds;
    }
    next();
};

module.exports.validateUserMiddleware = async (req, res, next) => {
    try {
        let { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // Check if the user exists
        let userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(400).json({ error: "Invalid User ID" });
        }

        next(); // If valid, move to the next middleware/controller
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};