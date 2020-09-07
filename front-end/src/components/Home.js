import React, { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken';

import './Home.css'

import Article from './Article'

import { useHistory } from 'react-router-dom';
import axios from 'axios'

export default function Home() {
    const [content, setContent] = useState("")
    const [titre, setTitle] = useState("")
    const [articles, setArticles] = useState("")

    const history = useHistory();

    const token = localStorage.getItem('TOKEN');
    const tokenDecoded = jwt.verify(token, 'LTWNHGKXTJSSRMPGDEWVUUXGP')
    const userId = tokenDecoded.userId;
    const username = tokenDecoded.username;
    const role = tokenDecoded.role;
    const isAuth = tokenDecoded.isAuthentified;

    useEffect(() => {
        onLoad()
        // eslint-disable-next-line
    }, [])

    function onLoad() {
        const api = 'http://localhost:5000/api/articles/'

        axios.get(api, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => {
                setArticles(res.data.results.reverse())
            })
    }

    function handleSubmit(event) {
        const api = 'http://localhost:5000/api/articles/'
        event.preventDefault()

        axios.post(api, {
            userID: userId,
            title: titre,
            content: content,
            username: username,
        },
            { headers: { "Authorization": `Bearer ${token}` } })
            .then(() => {
                setContent("")
                setTitle("")

                onLoad()
                console.log('Article partagé')
            })
            .catch(() => {
                alert('Une erreur est survenue, article non partagé')
            })
    }

    function handleDelete(articleId) {
        axios.delete(`http://localhost:5000/api/articles/${articleId}`, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => {
                console.log('article supprimé')
                onLoad()
            })
    }

    if (isAuth) {
        return (
            <main className="Home">
                <form
                    onSubmit={handleSubmit}
                >
                    <label>Titre: 
                        <textarea
                            col="10"
                            placeholder="Titre"
                            value={titre}
                            onChange={event => setTitle(event.target.value)}
                        ></textarea>
                    </label>
                    <label>Votre article
                        <textarea
                            rows="5"
                            placeholder="Que voulez vous partager ?"
                            value={content}
                            onChange={event => setContent(event.target.value)}
                        ></textarea>
                    </label>
                    <div>
                        <input type="submit" value="Partager" />
                    </div>
                </form>

                {articles.length > 0 ?
                    (articles.map((article) => (
                        <Article
                            key={article.articleID}
                            role={role}
                            articleId= {article.articleID}
                            userId= {article.userID}
                            username= {article.username}
                            date= {article.created_at}
                            onClick= {handleDelete}
                            titre= {article.title}
                            content= {article.content}
                        />
                    )))
                    : null
                }
            </main>
        )
    } else {
        history.push("/")
        return null
    }
}