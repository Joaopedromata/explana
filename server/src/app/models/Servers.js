const mongoose = require('../../database')

const ServerSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Server = mongoose.model('servers', ServerSchema)


module.exports = Server