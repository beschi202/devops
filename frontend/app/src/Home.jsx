import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import authService from './services/auth.service';

export function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <div className='homebg'>
      <nav className='navbar'>
        <div className='nav-brand'>BUILD YOUR PC</div>
        <div className='nav-links'>
          <Link to="/" className='nav-item active'>HOME</Link>
          <Link to="/build" className='nav-item'>BUILD PC</Link>
          <Link to="/cart" className='nav-item'>CART</Link>
          <Link to="/profile" className='nav-item'>PROFILE</Link>
          <div className='nav-item logout' onClick={handleLogout}>LOGOUT</div>
        </div>
      </nav>
      
      <div className='home-content'>
        <div className='welcome-container'>
          <h1 className='welcome-title'>
            HELLO, {currentUser ? currentUser.username.toUpperCase() : 'USER'}
          </h1>
          <p className='welcome-subtitle'>START BUILDING YOUR DREAM PC TODAY</p>
          <Link to="/build" className='start-building-btn'>START BUILDING</Link>
        </div>
      </div>
    </div>
  );
} 