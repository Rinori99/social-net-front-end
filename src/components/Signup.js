import React from 'react';
import '../style/auth.css'
import '../style/style.css'
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';

function SignupComponent() {
    const history = useHistory();

    const handleSignupClick = async () => {
        const firstName = document.getElementById("firstName-field").value;
        const lastName = document.getElementById("lastName-field").value;
        const birthdate = document.getElementById("dateOfBirth-field").value;
        const email = document.getElementById("email-field").value;
        const password = document.getElementById("password-field").value;
        const livingIn = document.getElementById("livingIn-field").value;
        const education = document.getElementById("education-field").value;
        const workingAt = document.getElementById("workingAt-field").value;
        const hobby = document.getElementById("hobby-field").value;

        signUp({firstName, lastName, birthdate, email, password, livingIn, education, workingAt, hobby});
    }

    const signUp = async (user) => {
        await fetch("http://localhost:5000/users", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        })
        .then(res => {
            if (res.ok) {
                history.push("login");
            }
        })
    }

    return (
        !localStorage.getItem('token') ? (<div className="wrapper">
            <div className="form-signin">
                <a href="login">Log In</a>
                <h2 className="form-signin-heading">Register</h2>
                <input id="firstName-field" type="text" className="form-control sn-text-box" name="firstName" placeholder="First Name" required="" autofocus="" />
                <input id="lastName-field" type="text" className="form-control sn-text-box" name="lastName" placeholder="Last Name" required="" autofocus="" />
                <input id="dateOfBirth-field" type="date" className="form-control sn-text-box" name="dateOfBirth" placeholder="Date of Birth" required="" autofocus="" />
                <input id="email-field" type="text" className="form-control sn-text-box" name="email" placeholder="Email Address" required="" autofocus="" />
                <input id="password-field" type="password" className="form-control sn-text-box" name="password" placeholder="Password" required=""/>
                <input id="livingIn-field" type="text" className="form-control sn-text-box" name="livingIn" placeholder="Living in" required="" autofocus="" />
                <input id="education-field" type="text" className="form-control sn-text-box" name="education" placeholder="Education" required="" autofocus="" />
                <input id="workingAt-field" type="text" className="form-control sn-text-box" name="workingAt" placeholder="Working at" required="" autofocus="" />
                <input id="hobby-field" type="text" className="form-control sn-text-box" name="hobby" placeholder="Hobby" required="" autofocus="" style={{ marginBottom: "20px" }} />

                <button className="form-login-btn sn-btn" onClick={ handleSignupClick }>Register</button>
            </div>
        </div>) : (<Redirect to="/browse/home"></Redirect>)
    );
}

export default SignupComponent;