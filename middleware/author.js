const {authorSchema} = require("../utils/schema");
const ExpressError = require("../utils/ExpressError.js");

module.exports.validateAuthor = (req,res,next) =>{
    let {error} = authorSchema.validate(req.body);
    console.log(error);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};