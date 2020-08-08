import React, { useState, useEffect } from 'react'
import './styles.css'

const FlashMessages = (props) => {

    const init = props.init
    const text = props.text

    const [ response, setResponse ] = useState(false)
    const [ selected, setSelected ] = useState('flash--unselected')
    
    useEffect(() => {
        if(init === true){
            setResponse(true)
            setTimeout(() => {
                if(selected === 'flash--unselected'){
                    setSelected('flash--selected')
                }                
            }, 1)
        }
            
    }, [init])
    
return  (
        <>
            {response ? (
                <span className={selected}>
                    <strong>{text}</strong>
                </span>
            )  : null}
        </>
    )
}

export default FlashMessages