const mongoose = require('mongoose');
const validate = require('validator');
const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true,
    },
    lname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(!validate.isEmail(value)){
                throw new Error("Invalid Email");
                
            }
        }
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        trim: true
    }    
})

const users = new mongoose.model("users", userSchema);
module.exports = users;
