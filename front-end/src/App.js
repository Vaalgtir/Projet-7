import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './components/Login'
import Nav from './components/Nav'
import Home from './components/Home'

function App() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/home" component={Nav} />
      <Route path="/home" exact component={Home} />
    </Router>
  );
}


export default App;
