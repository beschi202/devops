import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import authService from './services/auth.service';

export function Login() {
    const [user, setUser] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleUserInput(e) {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    }

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");
        
        authService.login(user.username, user.password)
            .then(() => {
                navigate("/");
            })
            .catch((err) => {
                setError("Invalid username or password");
                console.error(err);
            });
    };

    return (
        <div className='loginbg'>
            <div className='logintitle'>BUILD YOUR PC</div>
            
            <div className='logincenter'>
                <div className='logincontainer'>
                    {error && <div className="error-message">{error}</div>}
                    <input
                        className="logininput"
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleUserInput}
                        placeholder='USERNAME'
                    />
                    <input
                        className="logininput"
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleUserInput}
                        placeholder='PASSWORD'
                    />
                    <div className='forgotpassword'>FORGOT PASSWORD?</div>
                    <div className='innerlogin'>
                        <div className='login' onClick={handleLogin}>LOGIN</div>
                        <img className='or' src="images/orline.png" alt="or" />
                        <img className='googlelogin' src="images/google_button.png" alt="google login" />
                    </div>
                    <Link to="/signup" className="nav-link">Don't have an account? Sign up</Link>
                </div>
            </div>
        </div>
    );
}
