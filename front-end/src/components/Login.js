import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Login.css'

import logo from './../img/icon-above-font.svg';

const Users = {
    Vaalgtir: 'khunou',
    Fred: 'fredou'
}

class Login extends Component {
    state = {
        userId: '',
        pwd: '',
        feedbackButton: true,
    }

    // arrow fx for binding
    handleChangeUserId = ({ target: { value } }) => {
        this.setState({ userId: value })
    }

    // arrow fx for binding
    handleChangePwd = ({ target: { value } }) => {
        const { userId } = this.state
        this.setState({ pwd: value })
        Users[userId] ?
            (value === Users[userId] ?
                (this.setState({ feedbackButton: false }))
                : (this.setState({ feedbackButton: true })))
            : (console.log('doesn\'t exist'))
    }

    // arrow fx for binding
    handleSubmit = (event) => {
        event.preventDefault()
    }

    render() {
        const { feedbackButton } = this.state

        return (
            <div className="Login">
                <img src={logo} alt="Logo" className="logo" />

                <form 
                    action="" 
                    method="POST" 
                    className="formContainer"
                    onSubmit={this.handleSubmit}
                >
                    <span>Connectez Vous</span>
                    <div className="wrapperInput">
                        <label htmlFor="identifiant">Identifiant :</label>
                        <input
                            type="text"
                            name="identifiant"
                            value={this.state.userId}
                            onChange={this.handleChangeUserId}
                        />
                    </div>
                    <div className="wrapperInput">
                        <label htmlFor="mdp">Mot de passe :</label>
                        <input
                            type="password"
                            name="mdp"
                            value={this.state.pwd}
                            onChange={this.handleChangePwd}
                        />
                    </div>
                    <Link to="/home">
                        <input
                            type="submit"
                            value="Valider"
                            disabled={feedbackButton}
                        />
                    </Link>
                </form>
            </div>
        )
    }
}

export default Login;