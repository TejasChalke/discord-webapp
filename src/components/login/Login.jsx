import './Login.scss';
import backgroundImage from '../../images/login_background.png'
import { useState } from 'react';

export default function Login() {
    const [display, setDisplay] = useState("login");

    return(
        <div id="loginContainer" style={{backgroundImage: `url(${backgroundImage})`}}>
            {
                display === "login" ?
                <LoginForm handleToggle={() => setDisplay("register")}/> :
                <RegisteForm handleToggle={() => setDisplay("login")} />
            }
        </div>
    )
}

function LoginForm(props) {
    function login() {
        console.log("login")
    }

    return(
        <div id="loginForm">
            <div id="loginTitle">
                <div className="big">Welcome back!</div>
                <div className="small">We are so excited to see you again!</div>
            </div>
            <div className="loginInputContainer">
                <label htmlFor="login-email">Email</label>
                <input type="text" name="login-email"/>
            </div>
            <div className="loginInputContainer">
                <label htmlFor="login-password">Password</label>
                <input type="text" name="login-password"/>
                <span className='login-link' tabIndex={0}>Forgot your password?</span>
            </div>
            <div
                className="loginButton"
                tabIndex={0}
                onClick={login}
                onKeyDown={(e) => { e.key === "Enter" && login() }}
            >
                Login
            </div>
            <div className="login-text-link">
                <span>Need an account?</span>
                <span
                    className='login-link'
                    tabIndex={0}
                    onClick={props.handleToggle}
                    onKeyDown={(e) => { e.key === "Enter" && props.handleToggle() }}
                >
                    Register
                </span>
            </div>
        </div>
    )
}

function RegisteForm(props) {
    function register() {
        console.log("register");
    }

    return(
        <div id="loginForm">
            <div id="loginTitle">
                <div className="big">Create an Account</div>
            </div>
            <div className="loginInputContainer">
                <label htmlFor="register-email">Email</label>
                <input type="text" name="register-email"/>
            </div>
            <div className="loginInputContainer">
                <label htmlFor="register-username">Username</label>
                <input type="text" name="register-username"/>
            </div>
            <div className="loginInputContainer">
                <label htmlFor="register-password">Password</label>
                <input type="password" name="register-password"/>
            </div>
            <div className="loginInputContainer">
                <label htmlFor="register-confirm-password">Confirm Password</label>
                <input type="password" name="register-confirm-password"/>
            </div>
            <div
                className="loginButton"
                tabIndex={0}
                onClick={register}
                onKeyDown={(e) => { e.key === "Enter" && register() }}
            >
                Register
            </div>
            <div className="login-text-link">
                <span
                    className='login-link'
                    tabIndex={0}
                    onClick={props.handleToggle}
                    onKeyDown={(e) => { e.key === "Enter" && props.handleToggle() }}
                >
                    Already have an account?
                </span>
            </div>
        </div>
    )
}