// arcelor-frontend/src/components/common/Toast.js
import React, { useEffect, useState } from 'react';

const Toast = ({ message, type, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 500);
        }, 3000);
        return () => clearTimeout(timer);
    }, [message, onClose]);
    
    const baseClasses = "fixed bottom-5 right-5 p-4 rounded-lg shadow-lg text-white transition-transform duration-500 ease-in-out z-50";
    const typeClasses = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
        warning: 'bg-yellow-500',
    };
    const transformClass = visible ? 'translate-x-0' : 'translate-x-[120%]';

    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
        warning: '⚠',
    };

    return (
        <div className={`${baseClasses} ${typeClasses[type]} ${transformClass}`}>
            <div className="flex items-center space-x-2">
                <span className="text-xl font-bold">{icons[type]}</span>
                <span className="font-medium">{message}</span>
            </div>
        </div>
    );
};

export default Toast;






