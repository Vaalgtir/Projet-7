import React, { useState } from 'react'
import axios from 'axios'
import { useAppContext } from "../libs/contextLib";
import { useHistory } from 'react-router-dom';

import './Login.css'

import logo from './../img/icon-above-font.svg';


export default function Login() {
    const [userId, setUserId] = useState("")
    const [pwd, setPwd] = useState("")
    const [warningFeedback, setWarning] = useState()

    const { userHasAuthenticated } = useAppContext();
    const history = useHistory();

    function handleSubmit(event) {
        event.preventDefault()

        axios.post('http://localhost:5000/api/auth/login', {
            username: userId,
            password: pwd
        })
            .then(res => {
                userHasAuthenticated(true);
                localStorage.setItem('TOKEN', res.data.accessToken)
                history.push("/home")
            })
            .catch(error => {
                setWarning("Mot de passe incorrect ou Utilisateur inconnu")
            })
    }

    return (
        <div className="Login">
            <img src={logo} alt="Logo" className="logo" />

            <form
                className="formContainer"
                onSubmit={handleSubmit}
            >
                <span>Connectez Vous</span>
                <div className="wrapperInput">
                    <span className="warningMessage">{warningFeedback}</span>
                    <label htmlFor="identifiant">Identifiant :</label>
                    <input
                        type="text"
                        name="identifiant"
                        value={userId}
                        onChange={event => setUserId(event.target.value)}
                    />
                </div>
                <div className="wrapperInput">
                    <label htmlFor="mdp">Mot de passe :</label>
                    <input
                        type="password"
                        name="mdp"
                        value={pwd}
                        onChange={event => setPwd(event.target.value)}
                    />
                </div>
                <input
                    type="submit"
                    value="Valider"
                />
            </form>
        </div>
    )
}