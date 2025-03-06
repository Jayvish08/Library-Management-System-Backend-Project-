const express = require("express");
const router  = express.Router();
const bookController = require("../controllers/book.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {validateBook} = require("../middleware/book.js");
const upload = require("../middleware/uploadMiddleware.js");

//Routes
router.route("/")
    .get(wrapAsync(bookController.index))    //Index Route
    .post(
        validateBook,
        wrapAsync(bookController.createBook)
    ); 

router.route("/:id")
    .get( wrapAsync(bookController.showBook)) //Show Route
    .put(
        validateBook,
        wrapAsync( bookController.updateBook)
    )     //Update Route
    .delete(
        wrapAsync(bookController.destroyBook)
   );

router.route("/:id/upload-cover")
    .post(
        upload.single("coverImage"),
        wrapAsync( bookController.addCover)
    )

module.exports = router;