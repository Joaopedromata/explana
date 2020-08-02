require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const totalvoice = require('totalvoice-node')
const jwt = require('jsonwebtoken')
const authConfig = require('./config/auth.json')
const authMiddleware = require('./app/middlewares/auth')
const bcrypt = require('bcrypt')

app.use(express.json())

const http = require('http').createServer(app)

const io = require('socket.io')(http)

const Message = require('./app/models/Message')
const Account = require('./app/models/Account')

const client = new totalvoice(process.env.TOKEN_SMS)

const saltRounds = 15


app.use(cors())

var code = 0


const getRandomNumbers = () => {
    return Math.floor(Math.random() * (1000 - 9999) + 9999)
}

const generateToken = (params = {}) => {
    return jwt.sign(params, authConfig.secret)

}

app.post('/signin', async (req, res) => {

    const { username, password } = req.body 

    const checkUser = (await Account.findOne({ username }))

    if (!checkUser)

        return res.status(400).send('[GET] Message Error => The username is not exist')    
    
    const match = bcrypt.compareSync(password, checkUser.password)

    if (match)
    
        return res.send({ 
            token: generateToken({ id: checkUser._id  }),
            id: checkUser._id 
        })

    return res.status(400).send('[GET] Message Error => The password is wrong') 
    
})


app.post('/account', async (req, res) => {

    const { username, age, mobile_number, password } = req.body
    
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

    return res.status(200).send(req.body)
    
})

app.post('/check', async (req, res) => {

    const { username, age, mobile_number, password, activation_code } = req.body

    if(parseInt(activation_code) !== code)

        return res.status(400).send('[POST] Message Error => Code is not right')

    const hash = bcrypt.hashSync(password, saltRounds)

    await Account.create({
            username,
            age,
            mobile_number,
            password: hash
    }).then((data) => {        
        return res.send({ 
            token: generateToken({ id: data._id }),
            id: data._id,
            code
        })
    }).catch((err) => {
            console.log('[POST] Message Error => '+err)
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

