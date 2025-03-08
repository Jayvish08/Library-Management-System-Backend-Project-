const User = require("../models/user.js");
const ExpressError = require("../utils/ExpressError.js");
const path = require("path");
const fs = require("fs");

module.exports.index = async (req, res) => {
      const users = await User.find().populate('favoriteBooks');
      res.json(users);
  };

module.exports.createUser = async (req, res) => {
        const { username, email, role, password } = req.body;
        if (!email) {
            throw new ExpressError(200,"Please enter an email id");
        }
        const user = new User({ username, email, role });
        await User.register(user, password);
        res.status(201).json(user);
  };

module.exports.showUser = async (req,res)=>{
    let {id} = req.params;
    let user = await User.findById(id);
    if (!user) {
        throw new ExpressError(400,"User not exist with this id");
    }
    res.send(user);
}

module.exports.updateUser = async (req,res)=>{
    let {id} = req.params;
    let newUser = await User.findByIdAndUpdate(id,{...req.body});
    if (!newUser) {
        throw new ExpressError(400,"User not exist with this id");
    }
        await newUser.save();
        res.send(newUser);
};

module.exports.destroyUser = async (req,res)=>{
    let {id} = req.params;
    // console.log(id);
    let del = await User.findByIdAndDelete(id);
   // console.log(del);
   if(!del)
    throw new ExpressError(400,"The record you want to delete may not be present");
   res.send("User Deleted")
};

module.exports.addProfilPicture = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    if (user.profilePicture) {
        const oldImagePath = path.join(__dirname, "..", user.profilePicture);
        
        // Delete the old image if it exists
        if (fs.existsSync(oldImagePath)) {
            console.log("deleted");
            fs.unlinkSync(oldImagePath);
        }
    }


    // Update book coverImage field in database
    user.profilePicture = req.file.path;
    await user.save();

    res.status(200).json({ message: "User profile picture uploaded successfully", profilePicture: user.profilePicture });
};