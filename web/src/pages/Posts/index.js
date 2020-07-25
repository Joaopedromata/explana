import React, { useState, useEffect } from 'react'
import './styles.css'
import io from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'
import api from '../../services/api'
import NavBar from '../../components/NavBar'

const myId = uuidv4()

const socket = io('http://localhost:3333')
socket.on('connect', () => console.log('[IO] Connect => A new connection has been established'))


const Posts = () => {

    const [ message, updateMessage ] = useState('')
    const [ messages, updateMessages ] = useState([])

    useEffect(() => {
        api.get('/').then(res => updateMessages([...res.data].reverse()))       
    }, [])

    useEffect(() => {
        const handleNewMessage = newMessage => 
            updateMessages([newMessage,...messages])
            socket.on('chat.message', handleNewMessage)
            return () => socket.off('chat.message', handleNewMessage)
    }, [messages])

    const handleFormSubmit = e => {
        e.preventDefault()
        
        const data = {
            id: myId,
            message
        }
        socket.emit('chat.message', data)       
        api.post('/', data).catch((err) => {
             console.log(err)
        } )
        updateMessage('')
    }

    

    return (
    <>
        <NavBar value={'UEMG Ibirité'} />
        <main className="container">
            <ul className="list">
                <li className='list__item list__item--mine'>
                    <span className='message message--mine'>
                        <strong>Desconto Zé Delivery</strong>
                        Compre com nossos colaboradores. Use nosso cupom de desconto EXPLANANOZÉ e ganhe 15% de desconto no seu primeiro pedido
                        <p>hà 16 minutos</p>
                    </span>
                </li>
                    
                {messages.map((data, index) => (
                    <li 
                        className={`list__item list__item--${data.id === myId ? 'mine' : 'other'}`}
                        key={index}
                    >
                        <span className={`message message--${data.id === myId ? 'mine' : 'other'}`}>
                            <strong>Anônimo</strong>
                            {data.message}
                            <p>hà 7 minutos</p>
                        </span>
                    </li>
                ))}
            </ul>
        </main>
        <form className="form" onSubmit={handleFormSubmit}>
            <input 
                className="form__field"
                placeholder="Explane aqui..."
                onChange={e => updateMessage(e.target.value)}
                value={message}
            />
        </form>
    </>
    )
}

export default Posts