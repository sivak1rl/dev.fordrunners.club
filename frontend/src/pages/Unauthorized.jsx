// src/pages/Unauthorized.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Unauthorized() {
  return (
    <main>
      <div className="container text-center py-12">
        <div className="text-error text-5xl mb-4">
          <i className="fas fa-exclamation-circle"></i>
        </div>
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-xl mb-8">
          You don't have permission to access this page.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/" className="btn btn-primary">
            Go to Home
          </Link>
          <Link to="/contact" className="btn btn-secondary">
            Contact Admin
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Unauthorized;