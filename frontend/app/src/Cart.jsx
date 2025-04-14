import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    const loadCartItems = () => {
        // Get cart items from localStorage
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(savedCart);
        
        // Calculate total
        const totalPrice = savedCart.reduce((sum, item) => sum + item.price, 0);
        setTotal(totalPrice);
    };

    // Load cart items on component mount
    useEffect(() => {
        loadCartItems();
    }, []);

    // Refresh cart when window receives focus
    useEffect(() => {
        const handleFocus = () => {
            loadCartItems();
        };

        window.addEventListener('focus', handleFocus);
        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, []);

    const removeFromCart = (itemId) => {
        const updatedCart = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        
        // Recalculate total
        const newTotal = updatedCart.reduce((sum, item) => sum + item.price, 0);
        setTotal(newTotal);
    };

    const handleCheckout = () => {
        // TODO: Implement checkout functionality
        alert('Checkout functionality coming soon!');
    };

    return (
        <div className="components-page">
            <div className="components-container">
                <div className="component-section">
                    <h2 className="component-title">Your Cart</h2>
                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <p>Your cart is empty</p>
                            <button 
                                className="add-to-cart-btn"
                                onClick={() => navigate('/build')}
                            >
                                Start Building
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="component-grid">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="component-card">
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="component-image"
                                        />
                                        <h3 className="component-name">{item.name}</h3>
                                        <p className="component-description">{item.description}</p>
                                        <p className="component-price">${item.price}</p>
                                        <button 
                                            className="add-to-cart-btn remove-btn"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove from Cart
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="cart-summary">
                                <h3 className="total-price">Total: ${total}</h3>
                                <button 
                                    className="add-to-cart-btn checkout-btn"
                                    onClick={handleCheckout}
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart; 