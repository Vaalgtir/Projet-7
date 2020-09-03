import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './components/Login'
import Nav from './components/Nav'
import Home from './components/Home'
import UserPage from './components/UserPage'
import CreateUser from './components/CreateUser'

export default function App() {

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" exact>
          <Nav
            page='home'
          />
          <Home />
        </Route>
        <Route path="/creationUser/">
          <Nav
            page='user'
          />
          <CreateUser />
        </Route>
      </Switch>
        <Route path="/user/:id" component={Nav}/>
        <Route path="/user/:id" component={UserPage}/>
    </Router>
  );
}