const express = require("express");
const router  = express.Router({mergeParams: true});
const userController = require("../controllers/user");
const wrapAsync = require("../utils/wrapAsync.js");
const upload = require("../middleware/uploadMiddleware.js");


//Routes
router.route("/")
    .get(wrapAsync(userController.index))    //Index Route
    .post(
        wrapAsync(userController.createUser)
    ); 

router.route("/:id")
    .get( wrapAsync(userController.showUser)) //Show Route
    .put(
        wrapAsync( userController.updateUser)
    )     //Update Route
    .delete(
        wrapAsync(userController.destroyUser)
   );

router.route("/:id/upload-profile-picture")
    .post(
        upload.single("profilePicture"),
        wrapAsync( userController.addProfilPicture)
    )

module.exports = router;