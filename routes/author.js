const express = require("express");
const router  = express.Router();
const authorController = require("../controllers/author.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {validateAuthor} = require("../middleware/author.js");

//Routes

router.route("/")
    .get(wrapAsync(authorController.index))    //Index Route
    .post(
        validateAuthor,
        wrapAsync(authorController.createAuthor)
    ); 

router.route("/:id")
    .get( wrapAsync(authorController.showAuthor)) //Show Route
    .put(
        validateAuthor,
        wrapAsync( authorController.updateAuthor)
    )     //Update Route
    .delete(
        wrapAsync(authorController.destroyAuthor)
   );

module.exports = router;