import './App.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/profile';
import Navigation from './components/Navigation';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';

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
