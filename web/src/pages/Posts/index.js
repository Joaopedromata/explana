import React, { useState, useEffect } from 'react'
import './styles.css'
import io from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'
import api from '../../services/api'

const myId = uuidv4()

const socket = io('http://localhost:3333')
socket.on('connect', () => console.log('[IO] Connect => A new connection has been established'))


const Posts = () => {

    const [ message, updateMessage ] = useState('')
    const [ messages, updateMessages ] = useState([])

    useEffect(() => {
        api.get('/').then(res => updateMessages([...res.data, ...messages]))       
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
        <main className="container">
            <ul className="list">
                {messages.map((data, index) => (
                    <li 
                        className={`list__item list__item--${data.id === myId ? 'mine' : 'other'}`}
                        key={index}
                    >
                        <span className={`message message--${data.id === myId ? 'mine' : 'other'}`}>
                            {data.message}
                        </span>
                 </li>
                ))}
            </ul>
        </main>
        <form className="form" onSubmit={handleFormSubmit}>
            <input 
                className="form__field"
                placeholder="Explane aquim"
                onChange={e => updateMessage(e.target.value)}
                value={message}
            />
        </form>
    </>
    )
}

export default Posts