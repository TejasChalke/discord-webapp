import './Login.scss';
import backgroundImage from '../../images/login_background.png'
import { useContext, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import ChannelsContext from '../../contexts/ChannelsContext';

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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(UserContext);
    const { setChannels } = useContext(ChannelsContext);

    async function login() {
        if(email.trim().length === 0) {
            console.log("Enter a valid email");
            return;
        }
        if(password.trim().length < 4) {
            console.log("Enter a valid password");
            return;
        }

        const body = { email: email.trim(), password: password.trim()};
        var user = null;
        try {
            const response = await fetch("http://localhost:8080/api/user/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            
            if(response.status === 200) {
                user = await response.json();
            } else {
                console.log("Error logging in");
            }

            if(user !== null) {
                const channels = await getUserChannels(user.id);
                // select the first channel and get its data

                setChannels(channels);
                setUser(user);
            }
        } catch (error) {
            console.log("Error making api request to login: ", error);
        }
    }

    async function getUserChannels(id) {
        try {
            const response = await fetch(`http://localhost:8080/api/channel/user/${id}`);

            if(response.status === 200) {
                const result = await response.json();
                const channels = result.values.map(channel => {
                    const obj = {};
                    result.keys.forEach((key, index) => {
                        obj[key] = channel[index];
                    });
                    return obj;
                });

                return channels;
            } else {
                console.log("Error getting user channels");
                return [];
            }
        } catch(error) {
            console.log("Error making api request to get channels: ", error);
        }
    }

    return(
        <div id="loginForm">
            <div id="loginTitle">
                <div className="big">Welcome back!</div>
                <div className="small">We are so excited to see you again!</div>
            </div>
            <div className="loginInputContainer">
                <label htmlFor="login-email">Email</label>
                <input type="text" name="login-email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="loginInputContainer">
                <label htmlFor="login-password">Password</label>
                <input type="password" name="login-password" value={password} onChange={(e) => setPassword(e.target.value)}/>
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
    const [email, setEmail] = useState("");
    const [uname, setUname] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");

    async function register() {
        const body = { email: email.trim(), password: password.trim(), uname: uname.trim()};
        if(body.email.length === 0) {
            console.log("Enter a valid email");
            return;
        }

        if(body.password.length < 4 || body.password !== cpassword.trim()) {
            console.log("Check password/confirm password fields");
            return;
        }

        if(body.uname.length < 4 || body.uname.length > 8) {
            console.log("User name must be 4-8 characters long");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/user/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if(response.status === 201) {
                const result = await response.json();
                console.log(result);
            } else {
                console.log("Error registering user");
            }
        } catch (error) {
            console.log("Error making api request: ", error);
        }
    }

    return(
        <div id="loginForm">
            <div id="loginTitle">
                <div className="big">Create an Account</div>
            </div>
            <div className="loginInputContainer">
                <label htmlFor="register-email">Email</label>
                <input type="text" name="register-email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="loginInputContainer">
                <label htmlFor="register-username">Username</label>
                <input type="text" name="register-username" value={uname} onChange={(e) => setUname(e.target.value)}/>
            </div>
            <div className="loginInputContainer">
                <label htmlFor="register-password">Password</label>
                <input type="password" name="register-password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="loginInputContainer">
                <label htmlFor="register-confirm-password">Confirm Password</label>
                <input type="password" name="register-confirm-password" value={cpassword} onChange={(e) => setCpassword(e.target.value)}/>
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