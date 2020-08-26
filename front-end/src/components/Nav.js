import React from 'react'
import { useHistory } from 'react-router-dom'
import { useAppContext } from "../libs/contextLib";

import './Nav.css'

import logo from './../img/icon-left-font-monochrome-white.svg';

export default function Nav() {
    const { userHasAuthenticated } = useAppContext();
    const history = useHistory()

    function handleClick() {
        userHasAuthenticated(false);
        localStorage.removeItem('TOKEN')
        history.push("/")
    }

    return (
        <nav>
            <img src={logo} alt="logo" />
            <span
                onClick={handleClick}
            >Déconnexion</span>
        </nav>
    )
}