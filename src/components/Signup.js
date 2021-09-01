import React from 'react';
import './auth.css'
import './profile-style.css'

function SignupComponent() {
    return (
        <div className="wrapper">
            <form className="form-signin">
                <a href="login">Log In</a>
                <h2 className="form-signin-heading">Register</h2>
                <input type="text" className="form-control sn-text-box" name="firstName" placeholder="First Name" required="" autofocus="" />
                <input type="text" className="form-control sn-text-box" name="lastName" placeholder="Last Name" required="" autofocus="" />
                <input type="date" className="form-control sn-text-box" name="dateOfBirth" placeholder="Date of Birth" required="" autofocus="" />
                <input type="text" className="form-control sn-text-box" name="username" placeholder="Email Address" required="" autofocus="" />
                <input type="password" className="form-control sn-text-box" name="password" placeholder="Password" required=""/>
                <input type="text" className="form-control sn-text-box" name="firstName" placeholder="Living in" required="" autofocus="" />
                <input type="text" className="form-control sn-text-box" name="lastName" placeholder="Education" required="" autofocus="" />
                <input type="text" className="form-control sn-text-box" name="firstName" placeholder="Working at" required="" autofocus="" />
                <input type="text" className="form-control sn-text-box" name="lastName" placeholder="Hobby" required="" autofocus="" style={{ marginBottom: "20px" }} />

                <button className="form-login-btn sn-btn" type="submit">Register</button>   
            </form>
        </div>
    );
}

export default SignupComponent;