import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import api from '../../services/api'
import './styles.css'
import FlashMessages from '../../components/FlashMessages'


const CheckCode = (props) => {

    const [ codeSMS, updateCodeSMS ] = useState(0)
    const [ error, updateError ] = useState(false)
    const [ valueError, updateValueError ] = useState('')

    const history = useHistory()

    const data = {
        username: props.location.state.username,
        age: props.location.state.age,
        mobile_number: props.location.state.mobile_number,
        password: props.location.state.password,
        activation_code: codeSMS
    }

    const checkCodeTrue = () => {
        updateValueError('O código está errado')
        updateError(true)
    }

    const checkCodeEmpty = () => {
        updateValueError('Este campo deverá ser preenchido')
        updateError(true)
    }


    const handleFormSubmit = (e) => {

        e.preventDefault()

        if (codeSMS === '' || codeSMS == null || typeof codeSMS == undefined)
            return checkCodeEmpty()


        api.post('/check', data).then((res) => {
            history.push('/')
        }).catch(() => {
            checkCodeTrue()
        })
        
    }


    return (
        <form className="form-code" onSubmit={handleFormSubmit}>
        <FlashMessages 
                init={error}
                text={valueError}
        />
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