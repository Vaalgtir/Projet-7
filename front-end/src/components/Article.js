import React from 'react'
import jwt from 'jsonwebtoken';

import './Article.css'

import { useHistory } from 'react-router-dom';


export default function Article ( {articleId, role, userId, username, date, onClick, titre, content} ) {
    
    const history = useHistory();
    const token = localStorage.getItem('TOKEN');
    const tokenDecoded = jwt.verify(token, 'LTWNHGKXTJSSRMPGDEWVUUXGP')
    const userIdAuthentified = tokenDecoded.userId

    const dateRaw = date.split('')
    const annee = [dateRaw[0], dateRaw[1], dateRaw[2], dateRaw[3]].join('')
    const mois = [dateRaw[5], dateRaw[6]].join('')
    const jour = [dateRaw[8], dateRaw[9]].join('')
    const heure = [dateRaw[11], dateRaw[12]].join('')
    const minute = [dateRaw[14], dateRaw[15]].join('')
    
    function handleProfil(userId) {
        history.push(`/user/${userId}`)
    }
    return (
        <section className="article" >
            <span>
                <span onClick={handleProfil.bind(this, userId)} className="profilLink" >
                    {username}
                </span> a partagé le {jour}/{mois}/{annee} à {heure}h{minute} : {role === 'admin' || userId === userIdAuthentified ? ( <button onClick={() => onClick(articleId)} >Supprimer</button> ) : <div></div>}
            </span>
            <div className="titre"> {titre} </div>
            <div>{content}</div>
        </section>
    )
}