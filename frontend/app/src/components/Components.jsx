import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export function Components() {
    const [cart, setCart] = useState([]);

    // Load cart from localStorage on component mount
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
    }, []);

    const components = {
        gpus: [
            {
                id: 1,
                name: "NVIDIA RTX 3060",
                price: 299.99,
                image: "images/gpu1.jpg",
                description: "12GB GDDR6, Ray Tracing Cores, DLSS"
            },
            {
                id: 2,
                name: "NVIDIA RTX 4070",
                price: 599.99,
                image: "images/gpu2.jpg",
                description: "12GB GDDR6X, Advanced Ray Tracing, DLSS 3.0"
            }
        ],
        monitors: [
            {
                id: 3,
                name: "LG 27GL850-B",
                price: 399.99,
                image: "images/monitor1.jpg",
                description: "27\" 1440p 144Hz IPS Gaming Monitor"
            },
            {
                id: 4,
                name: "Samsung Odyssey G7",
                price: 699.99,
                image: "images/monitor2.jpg",
                description: "32\" 1440p 240Hz Curved Gaming Monitor"
            }
        ],
        processors: [
            {
                id: 5,
                name: "Intel Core i7-13700K",
                price: 419.99,
                image: "images/pro1.jpg",
                description: "16 Cores, 24 Threads, Up to 5.4 GHz"
            },
            {
                id: 6,
                name: "AMD Ryzen 7 7800X3D",
                price: 449.99,
                image: "images/pro2.jpg",
                description: "8 Cores, 16 Threads, 3D V-Cache"
            }
        ],
        motherboards: [
            {
                id: 7,
                name: "ASUS ROG STRIX B650-A",
                price: 229.99,
                image: "images/mot1.jpeg",
                description: "AM5 Socket, PCIe 5.0, DDR5 Support"
            },
            {
                id: 8,
                name: "MSI MPG Z790",
                price: 279.99,
                image: "images/mot2.webp",
                description: "LGA 1700, PCIe 5.0, DDR5 Support"
            }
        ]
    };

    const addToCart = (component) => {
        const updatedCart = [...cart, component];
        setCart(updatedCart);
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        alert(`${component.name} added to cart!`);
    };

    const renderComponentSection = (title, items) => (
        <div className="component-section">
            <h2 className="component-title">{title}</h2>
            <div className="component-grid">
                {items.map(item => (
                    <div key={item.id} className="component-card">
                        <img src={item.image} alt={item.name} className="component-image" />
                        <h3 className="component-name">{item.name}</h3>
                        <p className="component-description">{item.description}</p>
                        <p className="component-price">${item.price}</p>
                        <button 
                            className="add-to-cart-btn"
                            onClick={() => addToCart(item)}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="components-page">
            <nav className="navbar">
                <div className="nav-brand">BUILD YOUR PC</div>
                <div className="nav-links">
                    <Link to="/" className="nav-item">HOME</Link>
                    <Link to="/build" className="nav-item active">BUILD PC</Link>
                    <Link to="/cart" className="nav-item">CART ({cart.length})</Link>
                    <Link to="/profile" className="nav-item">PROFILE</Link>
                </div>
            </nav>

            <div className="components-container">
                {renderComponentSection("Graphics Cards", components.gpus)}
                {renderComponentSection("Monitors", components.monitors)}
                {renderComponentSection("Processors", components.processors)}
                {renderComponentSection("Motherboards", components.motherboards)}
            </div>
        </div>
    );
} 