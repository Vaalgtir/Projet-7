import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';

import './Login.css'

import logo from './../img/icon-above-font.svg';


export default function Login() {
    const [userId, setUserId] = useState("Admin")
    const [pwd, setPwd] = useState("khunou")
    const [warningFeedback, setWarning] = useState()

    const history = useHistory();

    function handleSubmit(event) {
        event.preventDefault()

        axios.post('http://localhost:5000/api/auth/login', {
            username: userId,
            password: pwd
        })
            .then(res => {
                localStorage.setItem('TOKEN', res.data.accessToken)
                history.push("/home")
            })
            .catch(() => {
                setWarning("Mot de passe incorrect ou Utilisateur inconnu")
            })
    }

    return (
        <main className="Login">
            <img src={logo} alt="Logo" className="logo" />

            <form
                className="formContainer"
                onSubmit={handleSubmit}
            >
                <span>Connectez Vous</span>
                <div className="wrapperInput">
                    <span className="warningMessage">{warningFeedback}</span>
                    <label htmlFor="identifiant">Identifiant :
                        <input
                            type="text"
                            name="identifiant"
                            value={userId}
                            onChange={event => setUserId(event.target.value)}
                        />
                    </label>
                </div>
                <div className="wrapperInput">
                    <label htmlFor="mdp">Mot de passe :
                        <input
                            type="password"
                            name="mdp"
                            value={pwd}
                            onChange={event => setPwd(event.target.value)}
                        />
                    </label>
                </div>
                <input
                    type="submit"
                    value="Valider"
                />
            </form>
        </main>
    )
}