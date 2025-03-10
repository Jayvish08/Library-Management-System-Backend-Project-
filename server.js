const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ExpressError = require("./utils/ExpressError.js");
const passport = require('passport');
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// Middleware to parse JSON request bodies
app.use(express.json());
// If using URL-encoded form data:
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
      return res.status(400).json({ error: "Invalid JSON format" });
    }
    next();
  });

app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());           //For Storing data in a session
passport.deserializeUser(User.deserializeUser()); 

const bookRouter = require("./routes/book.js");
const authorRouter = require("./routes/author.js");
const userRouter = require("./routes/user.js");
const loanRouter = require("./routes/loan.js");
const reviewRouter = require("./routes/review.js");

//Connection Part
const mongo_url = "mongodb://127.0.0.1:27017/lms";
const dbUrl = process.env.ATLASDB_URL;

main().then((res)=>{
    console.log("Connection Established");
}).catch((err)=>{
    console.log("Something Went Wrong :(");
})
async function main() {
    await mongoose.connect(mongo_url);
}

app.use("/books",bookRouter);
app.use("/author",authorRouter);
app.use("/user",userRouter);
app.use("/loan",loanRouter);
app.use("/books/:bookId/reviews",reviewRouter);


app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found"))
})

app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong!"} = err;
    res.status(statusCode).send(message);
    //next();
})


app.listen("8080",(req,res)=>{
    console.log("Listening....");
})