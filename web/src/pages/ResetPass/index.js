import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'
import FlashMessages from '../../components/FlashMessages'
import logo from '../../assets/logo-explana.svg'

const ResetPass = () => {

    const history = useHistory()

    const [ mobile_number , updateMobile_number ] = useState('')
    const [ error, updateError ] = useState(false)
    const [ valueError, updateValueError ] = useState('')


    const mobile_numberValueNull = () => {
        updateValueError('Insira seu número de telefone')
        updateError(true)
    }

    const invalidMobile_number = () => {
        updateValueError('Número de telefone não encontrado')
        updateError(true)
    }

    const handleFormSubmit = (e) => {

        e.preventDefault()

        if (mobile_number === '' || mobile_number == null || typeof mobile_number == undefined)
            return mobile_numberValueNull()

        api.post('/reset', { mobile_number }).then((res) => {
            history.push('/checkreset', res.data.id)
        }).catch(() => {
            invalidMobile_number()
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
                    placeholder="número de telefone"
                    onChange={e => updateMobile_number(e.target.value)}
                    value={mobile_number}
                    type="number"
                />
                <button className="button--send" type="submit" >ENVIAR</button>
            </section>
            <section className="link--group"></section>
        </form>
    </section>
    )
}

export default ResetPass