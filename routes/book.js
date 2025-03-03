const express = require("express");
const router  = express.Router();
const bookController = require("../controllers/book.js");
const wrapAsync = require("../utils/wrapAsync.js");

//Routes

router.route("/")
    .get(wrapAsync(bookController.index))    //Index Route
    .post(
        wrapAsync(bookController.createBook)
    ); 

//New Route
// router.get("/new",
//     isLoggedIn,
//     listingController.renderNewForm
// );

// router.route("/:id")
//     .get( wrapAsync(listingController.showListing))  //Show Route
//     .put(
//         isLoggedIn,
//         isOwner,
//         upload.single("listing[image]"),
//         validateListing,
//         wrapAsync( listingController.updateListing)
//     )     //Update Route
//     .delete(
//         isLoggedIn,
//         isOwner,
//         wrapAsync(listingController.destroyListing)
//     );

// //Edit Route 
// router.get("/:id/edit",
//     isLoggedIn,
//     isOwner,
//     wrapAsync(listingController.renderEditForm)
// );

module.exports = router;