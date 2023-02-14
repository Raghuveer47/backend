const express = require('express');
const router = express.Router();

const mongoose = require("mongoose");
const UserModel = mongoose.model("UserModel");
const bcryptjs = require('bcryptjs');

router.post("/signup",(req,res)=>{
    const {fullName, email, password, profileIMG} = req.body;
    console.log(req.body)
    if(!fullName || !password || !email){
        return res.status(400).json({error: "one or more mandatory fields are empty"});
    }
    UserModel.findOne({email: email})
    .then((userInDB)=>{
        if(userInDB){
            return res.status(500).json({error: "user with this email already registerd"});

        }
        bcryptjs.hash(password,16)
        .then((hashedPassword)=>{
            const user = new UserModel({fullName, email, password: hashedPassword, profileIMG});
            user.save()
            .then((newUser)=>{
                res.status(201).json({result: "User Signed up Successfully"});
            })
        })
    })
    .catch((err)=>{
        console.log(err); 
    })

  
});

module.exports = router; 
