import React from 'react';

export const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`bg-gray-900 border border-gray-800 rounded-lg shadow-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ children, className = "", ...props }) => {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "", ...props }) => {
  return (
    <div className={`p-4 border-b border-gray-800 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = "", ...props }) => {
  return (
    <h3 className={`text-lg font-semibold text-gray-100 ${className}`} {...props}>
      {children}
    </h3>
  );
};

export const CardDescription = ({ children, className = "", ...props }) => {
  return (
    <p className={`text-sm text-gray-400 ${className}`} {...props}>
      {children}
    </p>
  );
};

export const CardFooter = ({ children, className = "", ...props }) => {
  return (
    <div className={`p-4 border-t border-gray-800 ${className}`} {...props}>
      {children}
    </div>
  );
};

