import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'
import FlashMessages from '../../components/FlashMessages'


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
        <form onSubmit={handleFormSubmit}>
            <FlashMessages 
                init={error}
                text={valueError}
            />
            <input 
                placeholder="code"
                onChange={e => updateCode(e.target.value)}
                value={code}
            />
        </form>
    )
}

export default CheckReset