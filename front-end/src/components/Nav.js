import React from 'react'
import { useHistory } from 'react-router-dom'
import jwt from 'jsonwebtoken';

import './Nav.css'

import logo from './../img/icon-left-font-monochrome-white.svg';

export default function Nav({ page }) {

    const token = localStorage.getItem('TOKEN');
    const tokenDecoded = jwt.verify(token, 'LTWNHGKXTJSSRMPGDEWVUUXGP')
    const userId = tokenDecoded.userId;
    const role = tokenDecoded.privilege;

    const history = useHistory()

    function handleClickLogout() {
        localStorage.removeItem('TOKEN')
        history.push("/")
    }
    function handleClickProfil() {
        history.push(`/user/${userId}`)
    }
    function handleClickHome() {
        history.push("/home")
    }

    return (
        <nav>
            <img src={logo} alt="logo" onClick={handleClickHome} />
            {page === 'home' ? (

                role === 'admin' ? (
                    [<span
                        onClick={handleClickProfil}
                        key='1'
                    >Gestion des profils</span>,
                    <span
                        onClick={handleClickLogout}
                        key='2'
                    >Déconnexion</span>]
                ) : (
                    [<span
                        onClick={handleClickProfil}
                        key='1'
                    >Profil</span>,
                    <span
                        onClick={handleClickLogout}
                        key='2'
                    >Déconnexion</span>]
                )
            ) : (
                [<span
                    onClick={handleClickHome}
                    key='1'
                >Accueil</span>,
                <span
                    onClick={handleClickLogout}
                    key='2'
                >Déconnexion</span>]
            )}
        </nav>
    )
}