import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'
import NavBar from '../../components/NavBar'
import { FiPlus, FiSearch } from 'react-icons/fi'
import './styles.css'

const Servers = (props) => {

    const [ listServers, updateListServers ] = useState([])
    const history = useHistory()

    useEffect(() => {
        api.get('/server')
            .then((res) => updateListServers(res.data))
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const handleClickButton = (serverId, serverName) => {

        const data = {
            token: props.location.state.token,
            id: props.location.state.id,
            server: serverId,
            serverName: serverName        
        }

        history.push('/messages', data)
    }

    const sendToNewServer = () => {

        const data = {
            token: props.location.state.token,
            id: props.location.state.id,        
        }

        history.push('/newserver', data)
    }

    return (
        <>
            <div className="container--servers">
                <NavBar />
                <section className="search--servers">
                    <div className="search--above">
                        <div className="search--title">Explanatórios</div>
                        <button className="search--button" onClick={sendToNewServer}>
                            <div className="search--organization"><FiPlus size={20}/>novo</div>
                        </button>
                    </div>
                    <div className="search--group">
                        <input 
                            className="search--input"
                            placeholder="Encontre um Explanatório"
                        />
                        <FiSearch className="search--icon"/>
                    </div>
                </section>
                <ul className="ul--servers">
                    {listServers.map(servers => (
                    <li
                        className="li--servers"
                        key={servers._id}
                    >
                        <button 
                            className="button--servers"
                            onClick={() => handleClickButton(servers._id, servers.name)}
                        >
                            <img className="img--servers" src="https://images.unsplash.com/20/cambridge.JPG?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=730&q=80" />
                            <div className="text--servers">
                                <strong  className="title--servers">
                                    {servers.name}
                                </strong >
                                <p className="description--servers">
                                    Faculdade Helena Antipoff de Ibirité
                                </p>
                            </div>
                        </button>
                    </li>
                ))}
                    
                </ul>
            </div>
        </>
    )
}

export default Servers