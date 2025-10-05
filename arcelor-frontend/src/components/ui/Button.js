import React from 'react';

const Button = ({ children, onClick }) => (
    <button
        onClick={onClick}
        className="flex items-center justify-center px-6 py-3 bg-lime-400 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-lime-500 transition-colors duration-200"
    >
        {children}
    </button>
);

export default Button;




