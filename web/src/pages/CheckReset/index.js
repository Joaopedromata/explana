import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'



const CheckReset = (props) => {

    const [ code, updateCode ] = useState('')

    const id = props.location.state

    const history = useHistory()

    const handleFormSubmit = (e) => {

        const data = {
            userId: id, 
            activation_code: code,
        }

        api.post('/checkreset', data).then((res) => {
            history.push('/newpass', { userId: res.data.id })
        }).catch((err) => {
            console.log(err)
        })


        e.preventDefault()
    }


    return (
        <form onSubmit={handleFormSubmit}>
            <input 
                placeholder="code"
                onChange={e => updateCode(e.target.value)}
                value={code}
            />
        </form>
    )
}

export default CheckReset