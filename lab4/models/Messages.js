const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    nickname: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    roomName: {
        type: String,
        required: true
    },
    timestamp: { 
        type: Date,
        default: Date.now
    }
});

module.exports = Item = mongoose.model('messages', MessageSchema);