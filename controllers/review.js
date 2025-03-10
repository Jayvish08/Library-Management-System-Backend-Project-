const Review = require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.index = async (req,res)=>{
    const allReview = await Review.find({});
    res.send(allReview);
};

module.exports.createReview = async (req, res, next) => {
        // Check if req.body exists
        if (!req.body || Object.keys(req.body).length === 0) {
          return res.status(400).json({ error: "Request body is missing!" });
        }
        const newReview = new Review(req.body); // Directly use req.body
        newReview.book = req.params.bookId;
        await newReview.save();
        res.status(201).json(newReview);
  };
  
module.exports.updateReview = async (req,res)=>{
    let {id} = req.params;
    let newReview = await Review.findByIdAndUpdate(id,{...req.body});
    if(!newReview)
        throw new ExpressError(400,"The record you want may not be present");
        await newReview.save();
        res.send("Updated Successfully");
};

module.exports.destroyReview = async (req,res)=>{
    let {id} = req.params;
    // console.log(id);
    let del = await Review.findByIdAndDelete(id);
   // console.log(del);
   if(!del)
    throw new ExpressError(400,"The record you want to delete may not be present");
   res.send("Review Deleted")
};