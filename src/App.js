import './App.css';
import React from "react";
import Profile from './components/profile';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import DefaultComponent from './components/Default';
import Browse from './components/Browse';
import Navigation from './components/Navigation';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
// import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
// import { useEffect, useState } from 'react';
// import Weather from './cps/weather';
// import Loader from './cps/loader';

function App() {
  return (
    <Router>
      <div className="App">
          <Switch>
            <Route exact path='/'>
              <Redirect to="browse/home"/>
            </Route>
            <Route path='/browse'>
              <Navigation />
              <Switch>
                  <Route path='/browse/home' component={Home}></Route>
                  <Route exact path='/browse/profile' component={Profile}></Route>
                  <Route path='/browse/profile/:id' component={Profile}></Route>
              </Switch>
            </Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/signup' component={Signup}></Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
