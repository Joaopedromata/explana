import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'
import FlashMessages from '../../components/FlashMessages'

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
        <form onSubmit={handleFormSubmit}>
            <FlashMessages 
                init={error}
                text={valueError}
            />
            <input 
                placeholder="número de telefone"
                onChange={e => updateMobile_number(e.target.value)}
                value={mobile_number}
                type="number"
            />
        </form>
    )
}

export default ResetPass