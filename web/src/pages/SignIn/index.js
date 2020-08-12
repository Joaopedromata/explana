import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'
import './styles.css'
import logo from '../../assets/logo-explana.svg'
import FlashMessages from '../../components/FlashMessages'
import { FiUser, FiLock } from 'react-icons/fi'

const SignIn = () => {

    const history = useHistory()

    const [ username, updateUsername ] = useState('')
    const [ password, updatePassword ] = useState('')
    const [ error, updateError ] = useState(false)
    const [ valueError, updateValueError ] = useState('')

    const handleFormSubmit = (e) => {

        const userValueNull = () => {
            updateValueError('Preencha todos os campos')
            updateError(true)
        }

        e.preventDefault()

        if(username === '' || username == null || typeof username == undefined)
          return userValueNull()
        
        if(password === '' || password == null || typeof password == undefined)
          return userValueNull()
        

        const data = {
            username,
            password
        }

        api.post('/signin', data)
            .then((res) => {
               history.push('/server', res.data)
            })
            .catch(() => {
                updateValueError('Usuário ou senha incorretos')
                
                updateError(true)
            })
        
    }

    return (
        <section className="container__signin">
            <form className="form-signin" onSubmit={handleFormSubmit}>
                <div className="logo--group">
                    <img src={logo} alt="explana" className="logo" />
                    <p className="logo--title">explana</p>
                </div>
                    <FlashMessages 
                        init={error}
                        text={valueError}
                    />
                <div className="input__group--signin">
                    <div className="input__group--user">
                        <input 
                            className="form__field--signin"
                            onChange={e => updateUsername(e.target.value)}
                            value={username}
                            placeholder="usuário"
                        />
                        <FiUser className="svg-fiuser" />
                    </div>
                    <div className="input__group--user">
                        <input 
                            autoComplete="current-password"
                            className="form__field--signin"
                            type="password"
                            onChange={e => updatePassword(e.target.value)}
                            value={password}
                            placeholder="senha"
                        />
                        <FiLock className="svg-fiuser" />
                    </div>
                </div>
                <div className="button__group--signin"> 
                    <button className="button--messages" type="submit">EXPLANAR</button>
                    <div className="or">
                        <hr className="line"/>
                        ou
                        <hr className="line"/>
                    </div>
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