const express = require('express')
const app = express()
const cors = require('cors')

const http = require('http').createServer(app)

const io = require('socket.io')(http)

const Message = require('./app/models/Message')

app.use(cors())


app.get('/', async (req, res) => {
    const messages = await Message.find()

    return res.json(messages)
})




io.on('connection', socket => {
    console.log('[IO] Connection => Server has a new connection', socket.id)
    socket.on('chat.message', data => {
        io.emit('chat.message', data)
    })
    socket.on('disconnect', () => {
        console.log('[SOCKET] Disconnect => A connection was disconnected')
    })
})

http.listen(3333, () => {
    console.log('Server has been connected')
})


