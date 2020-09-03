import React, { useState, useEffect } from 'react'
import axios from 'axios'
import jwt from 'jsonwebtoken';

import './CreateUser.css'

import { useHistory } from 'react-router-dom';


export default function CreateUser() {
    const [password, setPassword] = useState("")
    const [passwordVerif, setPasswordVerif] = useState("")
    const [pseudo, setPseudo] = useState("")
    const [privilege, setPrivilege] = useState(0)
    const [email, setEmail] = useState("")
    const [bio, setBio] = useState("")
    const [validForm, setFeedbackForm] = useState(false)
    const [validPwd, setFeedbackPwd] = useState("")

    const history = useHistory();
    const token = localStorage.getItem('TOKEN');
    const tokenDecoded = jwt.verify(token, 'LTWNHGKXTJSSRMPGDEWVUUXGP')
    const userIdAuthentified = tokenDecoded.userId
    const role = tokenDecoded.role
    const isAuth = tokenDecoded.isAuthentified;

    useEffect(() => {
        confirmForm()
    }, [pseudo, password, passwordVerif])

    function confirmForm() {
        if (password === "" || passwordVerif === "" || pseudo === "") {
            setFeedbackForm(false)
        } else {
            if (password !== passwordVerif) {
                setFeedbackPwd("Mot de passe erroné")
                setFeedbackForm(false)
            } else {
                setFeedbackForm(true)
                setFeedbackPwd("")
            }
        }
    }
    function handleSubmit(event) {
        event.preventDefault()
        
        const api = 'http://localhost:5000/api/auth/create'

        axios.post(api, {
            username: pseudo,
            password: password,
            isAdmin: privilege,
            bio: bio,
            email: email
        },
            { headers: { "Authorization": `Bearer ${token}` } })
            .then(() => {
                console.log('utilisateur créé')
                history.push(`/user/${userIdAuthentified}`)
            })
            .catch(() => {
                alert('Une erreur est survenue, article non partagé')
            })
    }


    if (isAuth && role === 'admin') {
        return (
            <div className='wrapperPage' >
                <form
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        placeholder='Pseudo (utilisé pour la connection)'
                        value={pseudo}
                        onChange={event => setPseudo(event.target.value)}
                    />
                    <input
                        type="password"
                        placeholder='Mot de passe'
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    {validPwd} 
                    <input
                        type="password"
                        placeholder='Confirmer le mot de passe'
                        value={passwordVerif}
                        onChange={event => setPasswordVerif(event.target.value)}
                    />
                    <select value={privilege} onChange={event => setPrivilege(event.target.value)}>
                      <option value="0">Membre</option>
                      <option value="1">Admin</option>
                    </select>
                    <input
                        type="text"
                        placeholder='E-mail'
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <textarea
                        row='5'
                        placeholder='Biographie'
                        value={bio}
                        onChange={event => setBio(event.target.value)}
                    />
                    <input
                        type="submit"
                        value="Valider"
                        className="submitButton"
                        disabled={!validForm}
                    />
                </form>
            </div>
        )
    } else {
        history.push("/")
        return null
    }
}