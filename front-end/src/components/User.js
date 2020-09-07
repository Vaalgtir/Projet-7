import React, { useState } from 'react'
import jwt from 'jsonwebtoken';

import './User.css'

export default function User({ selectedUserId, username, role, email, bio, errorMessage, handleSubmit, submitDelete }) {
    const [newMail, setNewMail] = useState(email)
    const [newBio, setNewBio] = useState(bio)
    const [verifWord, setVerifWord] = useState("")
    const [modifying, setModifying] = useState(false)
    const [deleting, setDeleting] = useState(false)
    
    const token = localStorage.getItem('TOKEN');
    const tokenDecoded = jwt.verify(token, 'LTWNHGKXTJSSRMPGDEWVUUXGP')
    const userId = tokenDecoded.userId;
    const roleUser = tokenDecoded.role;

    function startModifying() {
        setModifying(true)
    }
    function stopModifying() {
        setModifying(false)
    }
    function startDeleting() {
        setDeleting(true)
    }
    function stopDeleting() {
        setDeleting(false)
    }
    
    return (
        <section className="wrapperTicket" >
            {modifying ? (
                [<div className="wrapperUser" key="1">
                    <div className="pseudo" >{username} ({role === 0 ? 'Member' : 'Admin'})</div>
                    <div className="wrapperContent" >
                        <div>mail : 
                            <textarea
                                col="10"
                                rows="1"
                                placeholder="email"
                                value={newMail}
                                onChange={event => setNewMail(event.target.value)}
                                style={{resize: 'none'}}
                            ></textarea>
                        </div>
                        <div className="wrapperBio" >
                            <div>Bio : </div>
                            <textarea
                                col="20"
                                rows="5"
                                placeholder="Bio"
                                value={newBio}
                                onChange={event => setNewBio(event.target.value)}
                                style={{resize: 'none'}}
                            ></textarea>
                        </div>
                    </div>
                </div>,
                
                selectedUserId !== userId && roleUser !== 'admin' ? null : (
                <div className="wrapperButton" key="2">
                    <button
                        onClick={() => {
                            handleSubmit( selectedUserId, newMail, newBio )
                            stopModifying()
                        }}
                    >Valider</button>
                    <button
                        onClick={stopModifying}
                    >Annuler</button>
                </div>)]
            ) : (
                [<div className="wrapperUser" key="1">
                    <div className="pseudo" >{username} ({role === 0 ? 'Member' : 'Admin'})</div>
                    <div className="wrapperContent" >
                        <div>mail : {email}</div>
                        <div className="wrapperBio" >
                            <div>Bio : </div>
                            {bio ? bio : 'Aucune bio'}
                        </div>
                    </div>
                </div>,
                selectedUserId !== userId && roleUser !== 'admin' ? null : (
                <div className="wrapperButton" key="2">
                    <button
                        onClick={startModifying}
                    >Modifier</button>

                    {deleting ? (
                        <div>
                            Etes-vous sûr.e de vouloir supprimer ce compte ?<br/>
                            Si oui, tapez "SUPPRIMER"<br/>
                            <input 
                                type="text"
                                value={verifWord}
                                onChange={event => setVerifWord(event.target.value)}
                            />
                            <button
                                onClick={() => {
                                    submitDelete( verifWord, selectedUserId )
                                    stopDeleting()
                                }}
                            >Valider</button>
                            <button onClick={stopDeleting}>Annuler</button><br/>
                            {errorMessage}
                        </div>
                    ) : (
                        <button
                            onClick={startDeleting}
                        >Supprimer le compte</button>
                    ) }

                </div>)]
            )}
        </section>
    )
}