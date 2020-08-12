import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './styles.css'
import FlashMessages from '../../components/FlashMessages'
import api from '../../services/api'
import logo from '../../assets/logo-explana.svg'

const NewServer = (props) => {
    
    const data = {
        token: props.location.state.token,
        id: props.location.state.id,       
    }

    const history = useHistory()


    const [ serverName, updateServerName ] = useState('')
    const [ error, updateError ] = useState(false)
    const [ valueError, updateValueError ] = useState('')

    const serverNameValueNull = () => {
        updateValueError('Insira um nome')
        updateError(true)
    }



    const handleFormSubmit = (e) => {
        e.preventDefault()

        if (serverName === '' || serverName == null || typeof serverName == undefined)
            return serverNameValueNull()

        api.post('/server', {name: serverName}).then(() => {
            history.push('/server', data)
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
                    <input 
                        className="form__field--code"
                        placeholder="digite o nome do server"
                        onChange={e => updateServerName(e.target.value)}
                        value={serverName}
                    />
                    <button className="button--send" type="submit" >CRIAR</button>
                <section className="link--group"></section>
            </form>
        </section>
    )
}


export default NewServer