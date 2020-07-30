const mongoose = require('../../database')

const AccountSchema = mongoose.Schema({
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile_number: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Account = mongoose.model('accounts', AccountSchema)


module.exports = Account