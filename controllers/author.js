const Author = require("../models/author.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.index = async (req,res)=>{
    const allAuthors = await Author.find({});
    res.send(allAuthors);
};

module.exports.showAuthor = async (req,res)=>{
    let {id} = req.params;
    const author = await Author.findById(id);
    // .populate({
    //     path: "reviews",
    //     populate:{
    //     path: "author",
    //     },
    // })
    // .populate("owner");
    if (!author) {
        throw new ExpressError(400,"May be you put wrong id");
    }
    res.send(author);
};

module.exports.createAuthor = async (req, res, next) => {
        // Check if req.body exists
        if (!req.body || Object.keys(req.body).length === 0) {
          return res.status(400).json({ error: "Request body is missing!" });
        }
        const newAuthor = new Author(req.body); // Directly use req.body
        console.log(newAuthor.books);
        await newAuthor.save();
        res.status(201).json(newAuthor);
  };

module.exports.updateAuthor = async (req,res)=>{
    let {id} = req.params;
    let newAuthor = await Author.findByIdAndUpdate(id,{...req.body});
    if(!newAuthor)
        throw new ExpressError(400,"The record you want may not be present");
        await newAuthor.save();
        res.send(newAuthor);
};

module.exports.destroyAuthor = async (req,res)=>{
    let {id} = req.params;
    // console.log(id);
    let del = await Author.findByIdAndDelete(id);
   // console.log(del);
   if(!del)
    throw new ExpressError(400,"The record you want may not be present");
   res.send("Author Deleted")
};