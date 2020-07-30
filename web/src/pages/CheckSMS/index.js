import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import api from '../../services/api'

const CheckSMS = () => {

    const [ mobileNumber, updateMobileNumber ] = useState('')

    const history = useHistory()
    
    const handleFormSubmit = (e) => {
        e.preventDefault()
        api.post('/check', { mobile_number: mobileNumber }).then((res) => {
            const code = res.data.code
            updateMobileNumber('')
            history.push('/code', { 
                code: code,
                mobile_number: mobileNumber
            })
        }).catch((err) => {
            console.log(err)
       } )
    }



    return (
        <form className="form-account" onSubmit={handleFormSubmit}>
            <input 
                className="form__field"
                placeholder="Digite seu número de telefone"
                onChange={e => updateMobileNumber(e.target.value)}
                value={mobileNumber}
            />
        </form>
    )
}

export default CheckSMS