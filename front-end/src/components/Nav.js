import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Nav.css'

import logo from './../img/icon-left-font-monochrome-white.svg';

class Nav extends Component {

    render() {
        return (
            <nav>
                <img src={logo} alt="logo" />
                <Link to="/">
                    <span>Déconnexion</span>
                </Link>
            </nav>
        )
    }
}

export default Nav;