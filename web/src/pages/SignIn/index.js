import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'
import './styles.css'
import logo from '../../assets/Explana.png'

const SignIn = () => {

    const history = useHistory()

    const [ username, updateUsername ] = useState('')
    const [ password, updatePassword ] = useState('')

    const handleFormSubmit = (e) => {
        
        const data = {
            username,
            password
        }

        api.post('/signin', data)
            .then((res) => {
                history.push('/messages', res.data)
            })
            .catch((err) => {
                console.error(err)
            })
        e.preventDefault()
    }

    return (
        <section className="container__signin">
            <form className="form-signin" onSubmit={handleFormSubmit}>
                <img src={logo} alt="explana" className="logo" />
                <div className="input__group--signin">
                    <input 
                        className="form__field--signin"
                        onChange={e => updateUsername(e.target.value)}
                        value={username}
                    />
                    <input 
                        className="form__field--signin"
                        type="password"
                        onChange={e => updatePassword(e.target.value)}
                        value={password}
                    />
                </div>
                <div className="button__group--signin"> 
                    <button className="button--messages" type= "submit">EXPLANAR</button>
                    <Link 
                        className="link__button--signup"
                        to="/signup"
                    >
                        REGISTRAR-SE
                    </Link>
                </div>
                <Link className="link--forgot">
                    Esqueci minha senha
                </Link>
            </form>
        </section>
    )
}

export default SignIn