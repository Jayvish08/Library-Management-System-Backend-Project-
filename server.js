const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ExpressError = require("./utils/ExpressError.js");

// Middleware to parse JSON request bodies
app.use(express.json());
// If using URL-encoded form data:
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
      return res.status(400).json({ error: "Invalid JSON format" });
    }
    next();
  });

const bookRouter = require("./routes/book.js");

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


app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found"))
})

app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong!"} = err;
    res.status(statusCode).send(message);
    // res.status(statusCode).send(message);
    // next();
})


app.listen("8080",(req,res)=>{
    console.log("Listening....");
})