import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'


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

    return (
        <>
            {listServers.map(servers => (
                <button 
                    onClick={() => handleClickButton(servers._id, servers.name)}
                    key={servers._id}
                >
                    {servers.name}
                </button>
            ))}
        
        </>
    )
}

export default Servers