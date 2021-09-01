import React from 'react';
import Profile from './profile';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function BrowseComponent() {
    return (
        <div>
            Nav Bar
            <Switch>
                <Route path='home' component={Home}>

                </Route>
                <Route path='profile' component={Profile}></Route>
            </Switch>
        </div>
    )
}

export default BrowseComponent;