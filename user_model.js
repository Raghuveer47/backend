const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        require:true
    },
    email: { 
        type: String,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    profileImg:{
        type: String,
        default:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=1000&q=60"

    } 
});
const UserSchema=mongoose.model("UserModel",userSchema);

module.exports = UserSchema