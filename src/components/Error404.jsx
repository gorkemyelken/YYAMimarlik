import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../resources/Error404.css'; // Optional: Import a CSS file for styling

export default function Error404() {
  return (
    <div className="error404-container">
      <h1 className="error404-title">404</h1>
      <p className="error404-message">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="error404-link">Go to Home</Link>
    </div>
  );
}
