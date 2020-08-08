import React, { useState } from 'react'
import api from '../../services/api'
import { useHistory } from 'react-router-dom'

const NewPass = (props) => {

    
    const history = useHistory()

    const [ password, updatePassword ] = useState('')
    const [ confirmPassword, updateConfirmPassword ] = useState('')

    const userId = props.location.state.id

    const data = {
            userId,
            password
        }

    const handleFormSubmit = async (e) => {
  
        if(password !== confirmPassword){
            alert('sennha incompatível')
        }
             

        api.post('/newpass', data).then(() => {
            history.push('/')
        }).catch((err) => {
            console.log(err)
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