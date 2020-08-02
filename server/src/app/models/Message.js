const mongoose = require('../../database')

const MessageSchema = mongoose.Schema({
    id: {
        type: String,
        require: true,
    },
    server: {
        type: String,
        require: true
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Message = mongoose.model('messages', MessageSchema)


module.exports = Message