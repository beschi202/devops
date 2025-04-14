import './App.css';
import { Login } from './login';
import { Signup } from './signup';
import { Home } from './Home';
import { Components } from './components/Components';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import authService from './services/auth.service';
import Cart from './Cart';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const logOut = () => {
    authService.logout();
    setCurrentUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!currentUser ? <Signup /> : <Navigate to="/" />} />
          <Route path="/" element={currentUser ? <Home /> : <Navigate to="/login" />} />
          <Route path="/build" element={currentUser ? <Components /> : <Navigate to="/login" />} />
          <Route path="/cart" element={currentUser ? <Cart /> : <Navigate to="/login" />} />
          <Route path="/profile" element={currentUser ? <Home /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
