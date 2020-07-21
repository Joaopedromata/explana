import React from 'react'
import './styles.css'

const Posts = () => {
    return (
    <>
        <main className="container">
            <ul className="list">
                <li className="list__item list__item--mine">
                    <span className="message message--mine">
                        Quero explanar o João do 5° período de matemática
                    </span>
                </li>
                <li className="list__item list__item--other">
                    <span className="message message--other">
                        O João do 5° período é comunista!!!!!! 
                    </span>
                </li>
                <li className="list__item list__item--other">
                    <span className="message message--other">
                        Passando para divulgar os salgadinhos que vendo, me procure no 6° período de Pedagogia 
                    </span>
                </li>
                <li className="list__item list__item--other">
                    <span className="message message--other">
                        Alguém pode me colocar no grupo do 1° período de Educação Física
                    </span>
                </li>
                <li className="list__item list__item--other">
                    <span className="message message--other">
                        O João do 5° período é comunista!!!!!! 
                    </span>
                </li>
                <li className="list__item list__item--other">
                    <span className="message message--other">
                        Passando para divulgar os salgadinhos que vendo, me procure no 6° período de Pedagogia 
                    </span>
                </li>
                <li className="list__item list__item--other">
                    <span className="message message--other">
                        Alguém pode me colocar no grupo do 1° período de Educação Física
                    </span>
                </li>
                <li className="list__item list__item--other">
                    <span className="message message--other">
                        O João do 5° período é comunista!!!!!! 
                    </span>
                </li>
            </ul>
        </main>
        <form className="form">
            <textarea 
                className="form__field"
                placeholder="Explane aquim"
            />
        </form>
    </>
    )
}

export default Posts