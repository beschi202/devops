import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import authService from './services/auth.service';

export function Signup() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleUserInput(e) {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    }

    const handleSignup = (e) => {
        e.preventDefault();
        setError("");
        
        if (user.password !== user.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        
        authService.register(
            user.username, 
            user.email, 
            user.password, 
            user.firstName, 
            user.lastName
        )
        .then(() => {
            navigate("/login");
        })
        .catch((err) => {
            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError("Registration failed. Please try again.");
            }
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
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleUserInput}
                        placeholder='EMAIL'
                    />
                    <input
                        className="logininput"
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleUserInput}
                        placeholder='FIRST NAME'
                    />
                    <input
                        className="logininput"
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleUserInput}
                        placeholder='LAST NAME'
                    />
                    <input
                        className="logininput"
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleUserInput}
                        placeholder='PASSWORD'
                    />
                    <input
                        className="logininput"
                        type="password"
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={handleUserInput}
                        placeholder='CONFIRM PASSWORD'
                    />
                    <div className='innerlogin'>
                        <div className='login' onClick={handleSignup}>SIGN UP</div>
                        <img className='or' src="images/orline.png" alt="or" />
                        <img className='googlelogin' src="images/google_button.png" alt="google signup" />
                    </div>
                    <Link to="/" className="nav-link">Already have an account? Login</Link>
                </div>
            </div>
        </div>
    );
} 