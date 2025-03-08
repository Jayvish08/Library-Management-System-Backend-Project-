const Book = require("../models/book.js");
const ExpressError = require("../utils/ExpressError.js");
const path = require("path");
const fs = require("fs");

module.exports.index = async (req,res)=>{
    const allBooks = await Book.find({});
    res.send(allBooks);
};

module.exports.showBook = async (req,res)=>{
    let {id} = req.params;
    const book = await Book.findById(id);
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

module.exports.addCover = async (req, res) => {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        if (book.coverImage) {
            const oldImagePath = path.join(__dirname, "..", book.coverImage);
            
            // Delete the old image if it exists
            if (fs.existsSync(oldImagePath)) {
                console.log("deleted");
                fs.unlinkSync(oldImagePath);
            }
        }


        // Update book coverImage field in database
        book.coverImage = req.file.path;
        await book.save();

        res.status(200).json({ message: "Book cover uploaded successfully", coverImage: book.coverImage });
};