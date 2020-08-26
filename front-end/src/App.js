import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AppContext } from "./libs/contextLib";

import Login from './components/Login'
import Nav from './components/Nav'
import Home from './components/Home'

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  return (
    <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/home">
          <Nav />
          <Home />
        </Route>
      </Router>
    </AppContext.Provider>
  );
}


export default App;
