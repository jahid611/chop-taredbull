import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ className = "" }) => {
  return (
    <Link to="/" className={`flex items-center space-x-2 ${className}`}>
      <div className="w-8 h-8">
        <img 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iTDcUNXWaMbZQmO99zXmpWpFWm2MI9.png"
          alt="E-Commerce Logo"
          className="w-full h-full object-contain"
        />
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        E-Commerce
      </span>
    </Link>
  );
};

