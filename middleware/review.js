const {reviewSchema} = require("../utils/schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Book = require("../models/book.js");
const User = require("../models/user.js");

module.exports.validateReview = (req,res,next) =>{
    let {error} = reviewSchema.validate(req.body);
    console.log(error);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};


module.exports.validateBookForReview = async (req, res, next) => {
    try {
        let book = req.params.bookId;
        console.log(book);
        if (!book) {
            return res.status(400).json({ error: "Book ID is required" });
        }

        // Check if the user exists
        let bookExists = await Book.findById(book);
        if (!bookExists) {
            return res.status(400).json({ error: "Invalid book ID" });
        }
        next(); // If valid, move to the next middleware/controller
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports.validateUserMiddleware = async (req, res, next) => {
    try {
        let { user } = req.body;

        if (!user) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // Check if the user exists
        let userExists = await User.findById(user);
        if (!userExists) {
            return res.status(400).json({ error: "Invalid User ID" });
        }

        next(); // If valid, move to the next middleware/controller
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};