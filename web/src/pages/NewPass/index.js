import React, { useState } from 'react'
import api from '../../services/api'
import { useHistory } from 'react-router-dom'

const NewPass = (props) => {

    const userId = props.location.state.userId

    const history = useHistory()

    const [ password, updatePassword ] = useState('')
    const [ confirmPassword, updateConfirmPassword ] = useState('')

    const handleFormSubmit = (e) => {

        const data = {
            userId,
            password
        }

        if(password === confirmPassword)
            return api.post('/newpass', data).then(() => {
                history.push('/')
            })

        e.preventDefault()
    }


    return (
        <form onSubmit={handleFormSubmit}>
            <input 
                placeholder="digite sua nova senha"
                onChange={e => updatePassword(e.target.value)}
                value={password}
            />
            <input 
                placeholder="confirme sua nova senha"
                onChange={e => updateConfirmPassword(e.target.value)}
                value={confirmPassword}
            />
            <button type="submit">done</button>
        </form>
    )  
}

export default NewPass