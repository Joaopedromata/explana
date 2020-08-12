import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom';
import api from '../../services/api'
import './styles.css'
import FlashMessages from '../../components/FlashMessages'
import logo from '../../assets/logo-explana.svg'


const CheckCode = (props) => {

    const [ codeSMS, updateCodeSMS ] = useState('')
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
        <section className="container--code">
            <form className="form-code" onSubmit={handleFormSubmit}>
                <div className="logo--group">
                    <img src={logo} alt="explana" className="logo" />
                    <p className="logo--title">explana</p>
                </div>
                <FlashMessages 
                        init={error}
                        text={valueError}
                />
                <section className="form--group">
                    <input 
                        className="form__field--code"
                        placeholder="Digite seu código"
                        onChange={e => updateCodeSMS(e.target.value)}
                        value={codeSMS}
                    />
                    <button className="button--send" type="submit" >ENVIAR</button>
                </section>
                <section className="link--group">
                    <Link className="link--return">Reenviar meu código</Link>
                    <Link className="link--return">Não recebi meu código</Link>
                </section>
            </form>

        </section>
        
    )
}


export default CheckCode