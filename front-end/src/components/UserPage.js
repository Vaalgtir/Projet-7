import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';


import User from './User'

import './UserPage.css'

import axios from 'axios'

export default function UserPage(props) {
    const [users, setUsers] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const history = useHistory();

    const token = localStorage.getItem('TOKEN');
    const tokenDecoded = jwt.verify(token, 'LTWNHGKXTJSSRMPGDEWVUUXGP')
    const userId = tokenDecoded.userId;
    const role = tokenDecoded.role;
    const isAuth = tokenDecoded.isAuthentified;
    const userIdSelected = props.match.params.id

    useEffect(() => {
        onLoad()
        // eslint-disable-next-line
    }, [])

    function onLoad() {
        if(role === 'admin') {
            const api = 'http://localhost:5000/api/auth/all'

            axios.get(api, { headers: { "Authorization": `Bearer ${token}` } })
                .then(res => {
                    setUsers(res.data.results)
                })
        } else {
            const api = 'http://localhost:5000/api/auth/' + userIdSelected;

            axios.get(api, { headers: { "Authorization": `Bearer ${token}` } })
                .then(res => {
                    setUsers(res.data.results)
                })
        }
    }

    function handleSubmit( selectedUserId, newMail, newBio ) {
        const api = 'http://localhost:5000/api/auth/update/' + selectedUserId

        axios.put(api, {
            email: newMail,
            bio: newBio
        },
        { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => {
                onLoad()
            })
    }
    function submitDelete( verifWord, selectedUserId ) {
        if( verifWord === 'SUPPRIMER') {
            axios.delete(`http://localhost:5000/api/auth/delete/${selectedUserId}`, { headers: { "Authorization": `Bearer ${token}` } })
                .then(() => {
                    console.log('User supprimé')
                    if(userId === selectedUserId) {
                        localStorage.removeItem('TOKEN')
                        history.push('/')
                    } else {
                        onLoad()
                    }
                })
                .catch(error => console.log(error))
        } else {
            setErrorMessage('Vérfication échouée, Voulez-vous vraiment supprimer ce compte ?')
        }
    }
    
    if (isAuth) {
        return (
            <main className="wrapperPage" >
                {users.length > 0 ?
                    (users.map((user, index) => (
                        <User 
                            key={index}
                            selectedUserId={user.userID}
                            username={user.username}
                            role={user.isAdmin}
                            email={user.email}
                            bio={user.bio}
                            errorMessage={errorMessage}
                            handleSubmit={handleSubmit}
                            submitDelete={submitDelete}
                        />
                    )))
                    : null
                }
                {role === 'admin' ? (
                    <button
                        onClick={() => history.push('/creationUser')}
                    >Créer un nouvel Utilisateur</button>
                ) : null}
            </main>
        )
    } else {
        history.push("/")
        return null
    }
}