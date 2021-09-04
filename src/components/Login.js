import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './auth.css'
import './profile-style.css'
import { Redirect } from 'react-router-dom/cjs/react-router-dom';

function LoginComponent() {

    const [shouldShowWrongCredentials, setShouldShowWrongCredentials] = useState(false);
    const history = useHistory();
    
    const handleLoginClick = () => {
        const email = document.getElementById("email-field").value;
        const password = document.getElementById("password-field").value;

        login(email, password);
    }

    const login = async (email, password) => {
        await fetch("http://localhost:5000/users/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password }),
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                localStorage.setItem('token', res.token);
                history.push("browse/home");
            } else {
                setShouldShowWrongCredentials(true);
            }
        });
    }

    return (
        !localStorage.getItem('token') ? (<div className="wrapper">
            <div className="form-signin">
                <a href="signup">Sign Up</a>
                <h2 className="form-signin-heading">Please login</h2>
                <input id="email-field" type="text" className="form-control sn-text-box" placeholder="Email Address" />
                <input id="password-field" type="password" className="form-control sn-text-box" placeholder="Password"/>
                <button className="form-login-btn sn-btn" onClick={ handleLoginClick }>Login</button>
                { shouldShowWrongCredentials ? (<h4 className="wrong-auth">Wrong email or password, please try again!</h4>) : ""}
            </div>
        </div>) : (<Redirect to="/browse/home"></Redirect>)
    );
}

export default LoginComponent;