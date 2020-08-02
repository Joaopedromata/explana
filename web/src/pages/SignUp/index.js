import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import api from '../../services/api'
import './styles.css'

const SignIn = () => {

const history = useHistory()

const [ username, updateUsername ] = useState('')
const [ age, updateAge ] = useState('')
const [ mobile_number, updateMobile_number ] = useState('')
const [ password, updatePassword ] = useState('')

const handleFormSubmit = e => {
    e.preventDefault()

    const data = {
        username,
        age,
        mobile_number,
        password
    }

    api.post('/account', data).then((res) => {

        history.push('/check', res.data)

        updateUsername('')
        updatePassword('')
        updateAge('')
        updateMobile_number('')
        
    }).catch((err) => {
        console.log(err)
    })

    
}


return (
    <form className="form-account" onSubmit={handleFormSubmit}>
        <input 
            className="form__field--account"
            placeholder="Digite seu usuário"
            onChange={e => updateUsername(e.target.value)}
            value={username}
        />
        <input 
            className="form__field--account"
            placeholder="Digite sua idade"
            onChange={e => updateAge(e.target.value)}
            value={age}
        />
         <input 
            className="form__field--account"
            placeholder="Digite seu número"
            onChange={e => updateMobile_number(e.target.value)}
            value={mobile_number}
        />
         <input 
            className="form__field--account"
            placeholder="Digite sua senha"
            onChange={e => updatePassword(e.target.value)}
            value={password}
        />
        <button className="button" type= "submit">Cadastrar</button>
    </form>
)

}

export default SignIn