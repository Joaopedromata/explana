const mongoose = require('mongoose')

mongoose.Promise = global.Promise
    mongoose.connect('mongodb://localhost/explana',
        {useNewUrlParser: true}
    )
    .then(() => {
        console.log('Database connected')
    })
    .catch((err) => {
        console.error('Error' +err)
    })

module.exports = mongoose