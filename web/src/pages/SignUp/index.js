import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import api from '../../services/api'
import logo from '../../assets/logo-explana.svg'
import './styles.css'

const SignIn = () => {

const history = useHistory()

const [ username, updateUsername ] = useState('')
const [ age, updateAge ] = useState('')
const [ mobile_number, updateMobile_number ] = useState('')
const [ password, updatePassword ] = useState('')
const [ confirmPassword, updateConfirmPassword ] = useState('')

const handleFormSubmit = e => {
    e.preventDefault()

    if (password !== confirmPassword)
        return console.log('As senhas não coincidem')

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
    <section className="container__signup">
        <form className="form-signup" onSubmit={handleFormSubmit}>
            <img src={logo} alt="explana" className="logo" />
            <div className="input__group--signup">
                <label className="input__label">USUÁRIO</label>
                <input 
                    className="form__field--signup"
                    onChange={e => updateUsername(e.target.value)}
                    value={username}
                />
                <label className="input__label">IDADE</label>
                <input 
                    className="form__field--signup"
                    onChange={e => updateAge(e.target.value)}
                    value={age}
                />
                <label className="input__label">CELULAR</label>
                <input 
                    className="form__field--signup"
                    onChange={e => updateMobile_number(e.target.value)}
                    value={mobile_number}
                />
                <label className="input__label">SENHA</label>
                <input 
                    className="form__field--signup"
                    onChange={e => updatePassword(e.target.value)}
                    type="password"
                    value={password}
                />
                <label className="input__label">CONFIRME SUA SENHA</label>
                <input 
                    className="form__field--signup"
                    onChange={e => updateConfirmPassword(e.target.value)}
                    type="password"
                    value={confirmPassword}
                />
            </div>
            <button className="button--register" type="submit" >REGISTRAR</button>
        </form>
    </section>
)

}

export default SignIn