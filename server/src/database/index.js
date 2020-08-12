const mongoose = require('mongoose')
const db = require('../config/db')

mongoose.Promise = global.Promise
    mongoose.connect(db.mongoURI,
        {useNewUrlParser: true}
    )
    .then(() => {
        console.log('Database connected')
    })
    .catch((err) => {
        console.error('Error' +err)
    })

module.exports = mongoose