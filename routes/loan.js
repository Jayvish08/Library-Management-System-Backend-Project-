const express = require("express");
const router  = express.Router();
const loanController = require("../controllers/loan.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {validateLoan,validateBooksForLoan,validateUserMiddleware} = require("../middleware/loan.js");

//Routes

router.route("/")
    .get(wrapAsync(loanController.index))    //Index Route
    .post(
        validateLoan,
        validateBooksForLoan,
        validateUserMiddleware,
        wrapAsync(loanController.createLoan)
    ); 

router.route("/:id")
    .put(
        validateLoan,
        validateBooksForLoan,
        validateUserMiddleware,
        wrapAsync( loanController.updateLoan)
    )     //Update Route
    .delete(
        wrapAsync(loanController.destroyLoan)
   );

module.exports = router;