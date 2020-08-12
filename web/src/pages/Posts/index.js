import React, { useState, useEffect } from 'react'
import './styles.css'
import io from 'socket.io-client'
import api from '../../services/api'
import NavBar from '../../components/NavBar'
import { FiSend, FiPlus } from 'react-icons/fi'

const socket = io('http://localhost:3333')
socket.on('connect', () => console.log('[IO] Connect => A new connection has been established'))

const Posts = (props) => {

    const token = props.location.state.token
    const myId = props.location.state.id
    const server = props.location.state.server
    const serverName = props.location.state.serverName

    const [ message, updateMessage ] = useState('')
    const [ messages, updateMessages ] = useState([])

    const data = {
        id: myId,
        server,
        message
    }

    useEffect(() => {
        socket.emit('joinRoom', data.server)
        api.get('/messages', {
            headers: {
                Authorization: `Bearer ${token}`,
                Servers: server
            }
        }).then(res => updateMessages([...res.data].reverse()))       
    }, [token, server])

    useEffect(() => {
        
        const handleNewMessage = newMessage => 
            updateMessages([newMessage,...messages])
            socket.on('chatMessage', handleNewMessage)

            return () => socket.off('chatMessage', handleNewMessage)
    }, [messages])

    const handleFormSubmit = e => {
        e.preventDefault()
        
        
        
        socket.emit('joinRoom', data.server)
        socket.emit('chatMessage', data)       
        api.post('/messages', data).catch((err) => {
             console.log(err)
        } )
        updateMessage('')
    }

    

    return (
    <>
        <main className="container">
            <NavBar />
            <section className="message--servers">
                <div className="message--above">
                    <div className="message--title">{serverName}</div>
                    <button className="message--button">
                        <div className="message--organization"><FiPlus size={20}/>participar</div>
                    </button>
                </div>
            </section>
            <ul className="list">                    
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
            <form className="form" onSubmit={handleFormSubmit}>
            <div className="post--message">
                <textarea
                    className="form__field"
                    placeholder="Explane aqui..."
                    onChange={e => updateMessage(e.target.value)}
                    value={message}
                />
                <button type="submit" className="button--message"><FiSend size={20}/></button>
            </div>
        </form>
        </main>
    </>
    )
}

export default Posts