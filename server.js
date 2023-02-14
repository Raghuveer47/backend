const express = require('express');
 const PORT = 4001;
 const app = express();
 const cors = require('cors');
 const mongoose = require('mongoose'); 
 const {MONGOBD_URL} = require('./config')
 const bodyParser=require("body-parser") 
 const UserModel = require("./models/user_model") 
 const bcryptjs = require('bcryptjs');
 console.log(UserModel)


mongoose.connect(MONGOBD_URL);
  
mongoose.connection.on('connected', ()=>{
    console.log("DB connected");
})
mongoose.connection.on('error',(error)=>{
    console.log("some error while connecting to DB");
})

// require('./models/user_model');
 
app.use(cors());
// app.use(express.json());
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json())

app.get("/",(req,res)=>{
    res.send("It is work")
})


//signup route 
app.post("/signup",(req,res)=>{
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

// require('./models/user_model');
// app.use(require('./routes/user_route'));
 
app.listen(PORT, ()=>{
    console.log("Server started");
 });
