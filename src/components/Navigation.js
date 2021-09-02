import React from "react";
import './profile-style.css'
import { BrowserRouter as Router, Switch, Route, Link, ListItemLink } from 'react-router-dom';

function NavigationComponent() {
    const handleLogoutClick = () => {
        localStorage.removeItem('token');
    }

    return (
        <div className="navigation">
            <ul class="navigation-left">
                <a href="/browse/home">Home</a>
                <a href="/browse/profile">Profile</a>
            </ul>
            <ul class="navigation-right">
                <a onClick={ handleLogoutClick } href="/login">Log out</a>
            </ul>
        </div>
    )
}

export default NavigationComponent;