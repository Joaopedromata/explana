import React, { useState } from 'react'
import api from '../../services/api'
import { useHistory } from 'react-router-dom'
import FlashMessages from '../../components/FlashMessages'


const NewPass = (props) => {
    
    const history = useHistory()

    const [ password, updatePassword ] = useState('')
    const [ confirmPassword, updateConfirmPassword ] = useState('')
    const [ error, updateError ] = useState(false)
    const [ valueError, updateValueError ] = useState('')

    const passValueNull = () => {
        updateValueError('Preencha todos os campos')
        updateError(true)
    }

    const passWrong = () => {
        updateValueError('As senhas não coincidem')
        updateError(true)
    }

    const invalidPass = () => {
        updateValueError('senha inválida')
        updateError(true)
    }

    const userId = props.location.state.id

    const data = {
            userId,
            password
        }

    const handleFormSubmit = async (e) => {
  
        e.preventDefault()

        if (password === '' || password == null || typeof password == undefined)
            return passValueNull()

        if (confirmPassword === '' || confirmPassword == null || typeof confirmPassword == undefined)
            return passValueNull()
    

        if(password !== confirmPassword)
            return passWrong()


        api.post('/newpass', data).then(() => {
            history.push('/')
        }).catch((err) => {
            invalidPass()
        })
       
    }


    return (
        <form onSubmit={handleFormSubmit}>
            <FlashMessages 
                init={error}
                text={valueError}
            />
            <input 
                placeholder="digite sua nova senha"
                onChange={e => updatePassword(e.target.value)}
                value={password}
                type="password"
            />
            <input 
                placeholder="confirme sua nova senha"
                onChange={e => updateConfirmPassword(e.target.value)}
                value={confirmPassword}
                type="password"
            />
            <button type="submit">done</button>
        </form>
    )  
}

export default NewPass