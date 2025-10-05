import React from 'react';

const Select = ({ label, name, value, onChange, children, className = '', error = null }) => (
    <div>
        <label className="block text-sm font-medium text-gray-500 mb-1 uppercase">{label}</label>
        <select
            name={name}
            value={value || ''}
            onChange={onChange}
            className={`w-full px-3 py-2 border ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition ${className}`}
        >
            {children}
        </select>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

export default Select;




