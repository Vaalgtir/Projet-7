import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Home.css'

class Home extends Component {
    state = {
        
    }

    render() {
        return (
            <main>
                <form action="" method="POST">
                    <textarea rows="5" placeholder="Que voulez vous partager ?"></textarea>
                    <div>
                        <input type="submit" value="Partager"/>
                    </div>
                </form>
                <div className="article">
                    <span>Fred a partagé le 01/07/2020 à 12:00</span>
                    <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto velit cum magni quasi nostrum quibusdam, excepturi pariatur quidem dolorem voluptatem, impedit facilis praesentium molestias ea quas, incidunt nesciunt error distinctio.</div>
                </div>
                <div className="article">
                    <span>Fred a partagé le 01/07/2020 à 12:00</span>
                    <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto velit cum magni quasi nostrum quibusdam, excepturi pariatur quidem dolorem voluptatem, impedit facilis praesentium molestias ea quas, incidunt nesciunt error distinctio.</div>
                </div>
            </main>
        )
    }
}

export default Home;