import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'


const ResetPass = () => {

    const history = useHistory()

    const [ mobile_number , updateMobile_number ] = useState('')


    const handleFormSubmit = (e) => {
        e.preventDefault()

        api.post('/reset', { mobile_number }).then((res) => {
            history.push('/checkreset', res.data.id)
            
        }).catch((err) => {
            console.log(err)
        })

    }

    return (
        <form onSubmit={handleFormSubmit}>
            <input 
                placeholder="número de telefone"
                onChange={e => updateMobile_number(e.target.value)}
                value={mobile_number}
            />
        </form>
    )
}

export default ResetPass