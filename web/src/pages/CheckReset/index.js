import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import api from '../../services/api'
import FlashMessages from '../../components/FlashMessages'
import logo from '../../assets/logo-explana.svg'

const CheckReset = (props) => {

    const [ code, updateCode ] = useState('')
    const [ error, updateError ] = useState(false)
    const [ valueError, updateValueError ] = useState('')

    const id = props.location.state

    const history = useHistory()

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

        if (code === '' || code == null || typeof code == undefined)
            return checkCodeEmpty()

        const data = {
            userId: id, 
            activation_code: code,
        }

        api.post('/checkreset', data).then(() => {
            history.push('/newpass', { id })
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
                        onChange={e => updateCode(e.target.value)}
                        value={code}
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

export default CheckReset