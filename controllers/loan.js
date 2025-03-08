const Loan = require("../models/loan.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.index = async (req,res)=>{
    const allloans = await Loan.find({});
    res.send(allloans);
};

module.exports.createLoan = async (req, res, next) => {
        // Check if req.body exists
        if (!req.body || Object.keys(req.body).length === 0) {
          return res.status(400).json({ error: "Request body is missing!" });
        }
        const newLoan = new Loan(req.body); // Directly use req.body
        await newLoan.save();
        res.status(201).json(newLoan);
  };

module.exports.updateLoan = async (req,res)=>{
    let {id} = req.params;
    let newLoan = await Loan.findByIdAndUpdate(id,{...req.body});
    if(!newLoan)
        throw new ExpressError(400,"The record you want may not be present");
        await newLoan.save();
        res.send("Updated Successfully");
};

module.exports.destroyLoan = async (req,res)=>{
    let {id} = req.params;
    // console.log(id);
    let del = await Loan.findByIdAndDelete(id);
   // console.log(del);
   if(!del)
    throw new ExpressError(400,"The record you want may not be present");
   res.send("Loan Deleted")
};