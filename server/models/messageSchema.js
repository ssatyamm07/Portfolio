// models/messageSchema.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
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
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
