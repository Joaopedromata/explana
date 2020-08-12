require('dotenv').config()
if(process.env.NODE_ENV == 'production'){
    module.exports = {mongoURI: process.env.MONGO}
}else{
    module.exports = {mongoURI: 'mongodb://localhost/explana'}
}