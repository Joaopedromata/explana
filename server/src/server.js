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
const Server = require('./app/models/Servers')

const client = new totalvoice(process.env.TOKEN_SMS)

const saltRounds = 10


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

        return res.status(401).send('[GET] Message Error => The username is not exist')    
    
    const match = bcrypt.compareSync(password, checkUser.password)

    if (match)

        return res.send({ 
            token: generateToken({ id: checkUser._id  }),
            id: checkUser._id 
        })

    return res.status(401).send('[GET] Message Error => The password is wrong') 
    
})


app.post('/account', async (req, res) => {

    const { username, age, mobile_number, password } = req.body
    
    const checkUser = (await Account.findOne({ username }))

    if (checkUser)

        return res.status(400).send('[POST] Message Error => The username is already exist')

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

app.post('/reset', async (req, res) => {
    const { mobile_number } = req.body

    const checkUser = (await Account.findOne({ mobile_number }))

    if(!checkUser)
        return res.status(400).send('[POST] Message Error => Mobile number not found')


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

    return res.status(200).send({ id: checkUser._id })
})

app.post('/checkreset', async (req, res) => {
    const { userId, activation_code } = req.body

    if(parseInt(activation_code) !== code)

        return res.status(400).send('[POST] Message Error => Code is not right')
      
    return res.status(200).send({ id: userId })
   
})

app.post('/newpass', async (req, res) => {
    
    const { userId, password } = req.body

    const hash = bcrypt.hashSync(password, saltRounds)

    await Account.findOne({ _id: userId }).then((data) => {
        data.password = hash
        data.save().then(() => {
            return res.status(200).send('[PUT] Message Success => The Password was changed')
        })
       
    }).catch((err) => {
        console.log(err)
    })

})

app.get('/server', async (req, res) => {

    const servers = await Server.find()

    return res.json(servers)

})

app.post('/server', async (req,res) => {

    await Server.create(req.body)
    .then((data) => {
        return res.json(data)
    }).catch((err) => {
        console.log('[POST] Message Error => '+err)
    })
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
        return res.status(200).send('[POST] Message Success => The user was created')
    }).catch((err) => {
            console.log('[POST] Message Error => '+err)
    })

})

app.get('/messages', authMiddleware , async (req, res) => {

    const server = req.headers.servers

    const messages = await Message.find({ server: server })

    return res.json(messages)
})


io.on('connection', socket => {
    socket.on('joinRoom', (server) => {
        socket.join(server)
    })

    socket.on('chatMessage', data => {
        io.to(data.server).emit('chatMessage', data)
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

