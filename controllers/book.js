const Book = require("../models/book.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.index = async (req,res)=>{
    const allBooks = await Book.find({});
    res.send(allBooks);
};

module.exports.showBook = async (req,res)=>{
    let {id} = req.params;
    const book = await Book.findById(id);
    // .populate({
    //     path: "reviews",
    //     populate:{
    //     path: "author",
    //     },
    // })
    // .populate("owner");
    if (!book) {
        throw new ExpressError(400,"May be you put wrong id");
    }
    res.send(book);
};

module.exports.createBook = async (req, res, next) => {
        // Check if req.body exists
        if (!req.body || Object.keys(req.body).length === 0) {
          return res.status(400).json({ error: "Request body is missing!" });
        }
        const newBook = new Book(req.body); // Directly use req.body
        await newBook.save();
        res.status(201).json(newBook);
  };

module.exports.updateBook = async (req,res)=>{
    let {id} = req.params;
    let newBook = await Book.findByIdAndUpdate(id,{...req.body});
        await newBook.save();
        res.send(newBook);
};

module.exports.destroyBook = async (req,res)=>{
    let {id} = req.params;
    // console.log(id);
    let del = await Book.findByIdAndDelete(id);
   // console.log(del);
   if(!del)
    throw new ExpressError(400,"The record you want may not be present");
   res.send("Book Deleted")
};