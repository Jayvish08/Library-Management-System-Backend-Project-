const express = require("express");
const router  = express.Router({mergeParams: true});
const reviewController = require("../controllers/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview,validateBookForReview,validateUserMiddleware} = require("../middleware/review.js");
//Routes

router.route("/")
    .get(wrapAsync(reviewController.index))    //Index Route
    .post(
        validateReview,
        validateBookForReview,
        validateUserMiddleware,
        wrapAsync(reviewController.createReview)
    ); 

router.route("/:id")
    .put(
        validateReview,
        validateBookForReview,
        validateUserMiddleware,
        wrapAsync( reviewController.updateReview)
    )     //Update Route
    .delete(
        wrapAsync(reviewController.destroyReview)
   );

module.exports = router;