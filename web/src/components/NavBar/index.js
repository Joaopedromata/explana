import React from 'react'
import './styles.css'
import { FiMenu, FiHash } from 'react-icons/fi'

const NavBar = (props) => {
    return (
        <nav className="navbar">
            <div className="navbar__menu">
                <FiMenu size={40}/>
            </div>
            <div className="navbar__server">
                <div className="navbar__server--hash">
                    <FiHash size={28} />
                </div>
                <div className="navbar__server--title">
                    <strong>{props.value}</strong>
                </div>
            </div>

        </nav>
    )
}

export default NavBar