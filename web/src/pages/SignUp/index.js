import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import api from '../../services/api'
import logo from '../../assets/logo-explana.svg'
import './styles.css'
import FlashMessages from '../../components/FlashMessages'

const SignIn = () => {

const history = useHistory()

const [ username, updateUsername ] = useState('')
const [ age, updateAge ] = useState('')
const [ mobile_number, updateMobile_number ] = useState('')
const [ password, updatePassword ] = useState('')
const [ confirmPassword, updateConfirmPassword ] = useState('')
const [ error, updateError ] = useState(false)
const [ valueError, updateValueError ] = useState('')

const handleFormSubmit = e => {
    e.preventDefault()

    const userValueNull = () => {
        updateValueError('Preencha todos os campos')
        updateError(true)
    }

    const passWrong = () => {
        updateValueError('As senhas não coincidem')
        updateError(true)
    }

    const minorAge = () => {
        updateValueError('Você deve ter no mínimo 18 anos')
        updateError(true)
    }


    if (username === '' || username == null || typeof username == undefined)
        return userValueNull()

    if (age === '' || age == null || typeof age == undefined)
        return userValueNull()
    
    if (mobile_number === '' || mobile_number == null || typeof mobile_number == undefined)
        return userValueNull()
    
    if (password === '' || password == null || typeof password == undefined)
        return userValueNull()

    if (confirmPassword === '' || confirmPassword == null || typeof confirmPassword == undefined)
        return userValueNull()

    if (password !== confirmPassword)
        return passWrong()

    if (age < 18)
        return minorAge()

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
        
    }).catch(() => {
        updateValueError('O número de telefone ou usuário já existem')
        updateError(true)
    })  
}


return (
    <section className="container__signup">
        <form className="form-signup" onSubmit={handleFormSubmit}>
            <img src={logo} alt="explana" className="logo" />
            <FlashMessages 
                init={error}
                text={valueError}
            />
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