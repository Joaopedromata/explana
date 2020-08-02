import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import api from '../../services/api'
import './styles.css'


const CheckCode = (props) => {

    const [ codeSMS, updateCodeSMS ] = useState(0)

    const history = useHistory()

    const data = {
        username: props.location.state.username,
        age: props.location.state.age,
        mobile_number: props.location.state.mobile_number,
        password: props.location.state.password,
        activation_code: codeSMS
    }

    const handleFormSubmit = (e) => {
        console.log(data.activation_code)

        api.post('/check', data).then((res) => {
            history.push('/server', res.data)
        })
        // if(codeSMS === code.toString()){
        //    
        // }

        
        // updateCodeSMS('')

        e.preventDefault()
    }


    return (
        <form className="form-code" onSubmit={handleFormSubmit}>
        <input 
            className="form__field--code"
            placeholder="Digite seu código"
            onChange={e => updateCodeSMS(e.target.value)}
            value={codeSMS}
        />
    </form>
    )
}


export default CheckCode