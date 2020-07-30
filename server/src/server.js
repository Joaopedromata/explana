require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const totalvoice = require('totalvoice-node')
const jwt = require('jsonwebtoken')
const authConfig = require('./config/auth.json')
const authMiddleware = require('./app/middlewares/auth')

app.use(express.json())

const http = require('http').createServer(app)

const io = require('socket.io')(http)

const Message = require('./app/models/Message')
const Account = require('./app/models/Account')

const client = new totalvoice(process.env.TOKEN_SMS)

app.use(cors())


const getRandomNumbers = () => {
    return Math.floor(Math.random() * (1000 - 9999) + 9999)
}

code = ''

const generateToken = (params = {}) => {
    return jwt.sign(params, authConfig.secret)

}



app.get('/teste', authMiddleware, (req, res) => {
    res.send({ ok: "alkmds", user: req.userId })
})


app.post('/account', async (req, res) => {

    const { age, mobile_number, activation_code, password } = req.body
    
    

    if(activation_code !== code)

        return res.status(400).send('[POST] Message Error => Code is not right')

    await Account.create({
        age,
        mobile_number,
        password
    }).then((data) => {
        return res.send({ 
            token: generateToken({ id: data._id }),
            id: data._id
        })
    }).catch((err) => {
        console.log('[POST] Message Error => '+err)
    })
})

app.post('/check', async (req, res) => {

    const { mobile_number } = req.body

    const checkAccount = (await Account.findOne({ mobile_number }))

    if (checkAccount)

        return res.status(400).send('[POST] Message Error => The mobile number is already exist')

    code = getRandomNumbers()
        
    // client.sms.enviar(mobile_number,
    //     `Seu código de ativação Explana: ${code}`
    // ).then((data) => {
    //     console.log(data)
    // })
    // .catch((err) => {
    //     console.error(err)
    // })

    console.log(code)


    return res.send({ 
        code
    })

})

app.get('/messages', authMiddleware , async (req, res) => {
    const messages = await Message.find()

    return res.json(messages)
})

io.on('connection', socket => {
    console.log('[IO] Connection => Server has a new connection', socket.id)
    socket.on('chat.message', data => {
        io.emit('chat.message', data)
        app.post('/messages', async (req, res) => {            
            await Message.create(req.body).then(() => {
                return res.json(req.body)
            }).catch((err) => {
                console.log('[POST] Message Error => '+err)
            })
            
            
        })
        
    })
    socket.on('disconnect', () => {
        console.log('[SOCKET] Disconnect => A connection was disconnected')
    })
})

http.listen(3333, () => {
    console.log('Server has been connected')
})

module.exports = io

