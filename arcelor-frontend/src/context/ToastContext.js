// arcelor-frontend/src/context/ToastContext.js
import React, { createContext, useState, useContext, useCallback } from 'react';
import Toast from '../components/common/Toast';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(null);

    const showToast = useCallback((message, type = 'info') => {
        setToast({ message, type });
        setTimeout(() => {
            setToast(null);
        }, 3000);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);


