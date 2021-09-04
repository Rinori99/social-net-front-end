import React from "react";
import '../style/style.css'

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