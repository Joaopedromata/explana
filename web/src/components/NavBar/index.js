import React from 'react'
import './styles.css'
import { FiMenu } from 'react-icons/fi'
import logo from '../../assets/logo-explana.svg'

const NavBar = () => {
    return (
        <>
            <nav className="navbar">
                <section className="navbar__container">
                    <div className="navbar__menu">
                        <FiMenu size={40}/>
                    </div>
                    <div className="navbar__logo">
                        <div className="navbar__logo--img">
                            <img src={logo} alt="explana" />
                        </div>
                    </div>
                    <div className="navbar__title">
                        <div className="navbar__title--text">
                            explana
                        </div>
                    </div>
                </section>
            </nav>
            <hr />
        </>
    )
}

export default NavBar