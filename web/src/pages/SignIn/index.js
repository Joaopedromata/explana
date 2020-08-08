import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'
import './styles.css'
import logo from '../../assets/logo-explana.svg'
import FlashMessages from '../../components/FlashMessages'

const SignIn = () => {

    const history = useHistory()

    const [ username, updateUsername ] = useState('')
    const [ password, updatePassword ] = useState('')
    const [ error, updateError ] = useState(false)
    const [ valueError, updateValueError ] = useState(false)

    const handleFormSubmit = (e) => {

        const userPassNull = () => {
            updateValueError('Preencha todos os campos')
            updateError(true)
        }

        e.preventDefault()

        if(username === '' || username == null || typeof username == undefined)
          return userPassNull()
        
        if(password === '' || password == null || typeof password == undefined)
          return userPassNull()
        

        const data = {
            username,
            password
        }

        api.post('/signin', data)
            .then((res) => {
               history.push('/server', res.data)
            })
            .catch(() => {
                updateValueError('Erro no método de entrada')
                
                updateError(true)
            })
        
    }

    return (
        <section className="container__signin">
            <form className="form-signin" onSubmit={handleFormSubmit}>
                <img src={logo} alt="explana" className="logo" />
                    <FlashMessages 
                        init={error}
                        text={valueError}
                    />
                <div className="input__group--signin">
                    <label className="input__label">USUÁRIO</label>
                    <input 
                        className="form__field--signin"
                        onChange={e => updateUsername(e.target.value)}
                        value={username}
                    />
                    <label className="input__label">SENHA</label>
                    <input 
                        autoComplete="current-password"
                        className="form__field--signin"
                        type="password"
                        onChange={e => updatePassword(e.target.value)}
                        value={password}
                    />
                </div>
                <div className="button__group--signin"> 
                    <button className="button--messages" type="submit">EXPLANAR</button>
                    <Link 
                        className="link__button--signup"
                        to="/signup"
                    >
                        REGISTRAR
                    </Link>
                </div>
                <Link 
                    className="link--forgot"
                    to="/reset"
                >
                    Esqueci minha senha
                </Link>
            </form>
        </section>
    )
}

export default SignIn