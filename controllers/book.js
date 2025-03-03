const Book = require("../models/book.js");

module.exports.index = async (req,res)=>{
    const allBooks = await Book.find({});
    res.send(allBooks);
};

// module.exports.showListing = async (req,res)=>{
//     let {id} = req.params;
//     const listing = await Listing.findById(id)
//     .populate({
//         path: "reviews",
//         populate:{
//         path: "author",
//         },
//     })
//     .populate("owner");
//     if (!listing) {
//         req.flash("error","Listing you requested for does not exist!");
//         res.redirect("/listings");
//     }
//     res.render("listings/show.ejs",{listing});
// };

module.exports.createBook = async (req, res, next) => {
        // Check if req.body exists
        if (!req.body || Object.keys(req.body).length === 0) {
          return res.status(400).json({ error: "Request body is missing!" });
        }
        const newBook = new Book(req.body); // Directly use req.body
        await newBook.save();
        res.status(201).json(newBook);
  };

// module.exports.renderEditForm = async (req,res)=>{
//     let {id} = req.params;
//     const listing = await Listing.findById(id);
//     if (!listing) {
//         req.flash("error","Listing you requested for does not exist!");
//         res.redirect("/listings");
//     }
//     let originalImageUrl = listing.image.url;
//     originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
//     res.render("listings/edit.ejs", {listing,originalImageUrl});
// };

// module.exports.updateListing = async (req,res)=>{
//     let {id} = req.params;
//     let newListing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

//     if (typeof req.file!=="undefined") {
//         let url = req.file.path;
//         let filename = req.file.filename;
//         newListing.image = {url,filename};
//         await newListing.save();
//     }

//     req.flash("success","Listing Updated!");
//     res.redirect(`/listings/${id}`);
// };

// module.exports.destroyListing = async (req,res)=>{
//     let {id} = req.params;
//     // console.log(id);
//     let del = await Listing.findByIdAndDelete(id);
//    // console.log(del);
//     req.flash("success","Listing Deleted!");
//     res.redirect("/listings");
// };