import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import api from '../../services/api'
import './styles.css'

const SignIn = (props) => {

const mobile_number = props.location.state.mobile_number    
const activation_code = props.location.state.code 

const history = useHistory()

const [ age, updateAge ] = useState('')
const [ password, updatePassword ] = useState('')

const handleFormSubmit = e => {
    e.preventDefault()

    const data = {
        age,
        activation_code,
        mobile_number,
        password
    }

    api.post('/account', data).then((res) => {
        
        const token = res.data.token
        const id = res.data.id

        history.push('/messages', { 
            token,
            id
        })

        updatePassword('')
        updateAge('')
    }).catch((err) => {
        console.log(err)
    })

    
}


return (
    <form className="form-account" onSubmit={handleFormSubmit}>
        <input 
            className="form__field"
            placeholder="Digite sua idade"
            onChange={e => updateAge(e.target.value)}
            value={age}
        />
         <input 
            className="form__field"
            value={mobile_number}
        />
         <input 
            className="form__field"
            placeholder="Digite sua senha"
            onChange={e => updatePassword(e.target.value)}
            value={password}
        />
        <button className="button" type= "submit">Cadastrar</button>
    </form>
)

}

export default SignIn