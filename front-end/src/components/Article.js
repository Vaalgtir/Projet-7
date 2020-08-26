import React from 'react'

import './Article.css'

const Article = ({ articleId, username, date, onClick, titre, content }) => (
    <div className="article" >
        <span>{username} a partagé le {date} : <button onClick={() => onClick(articleId)} >Supprimer</button> </span>
        <div className="titre"> {titre} </div>
        <div>{content}</div>
    </div>
)

export default Article