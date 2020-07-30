import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const CheckCode = (props) => {

    const [ codeSMS, updateCodeSMS ] = useState('')

    const history = useHistory()

    const code = props.location.state.code
    const mobile_number = props.location.state.mobile_number
    
    const handleFormSubmit = (e) => {
        
        if(codeSMS === code.toString()){
            history.push('/signin', { 
                mobile_number,
                code
            })
        }

        
        updateCodeSMS('')

        e.preventDefault()
    }


    return (
        <form className="form-account" onSubmit={handleFormSubmit}>
        <input 
            className="form__field"
            placeholder="Digite seu código"
            onChange={e => updateCodeSMS(e.target.value)}
            value={codeSMS}
        />
    </form>
    )
}


export default CheckCode