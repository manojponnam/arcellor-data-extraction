import React from 'react';

const Header = () => (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="flex justify-between items-center px-6 py-4">
            {/* Left Section - Logo and Title */}
            <div className="flex items-center space-x-4">
                <img 
                    src="/loggo.png" 
                    alt="ArcelorMittal Logo" 
                    className="h-10 w-auto"
                />
                <div className="border-l border-gray-300 pl-4 hidden md:block">
                    <h1 className="text-lg font-bold text-gray-800">
                        Sistema de Gestión
                    </h1>
                    <p className="text-xs text-gray-600">
                        Plataforma de Gestión de Clientes
                    </p>
                </div>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center space-x-4">
                {/* Search Bar */}
                <div className="hidden lg:block">
                    <div className="relative">
                        <input 
                            type="search" 
                            placeholder="Buscar..." 
                            className="w-64 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <svg 
                            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Help */}
                <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>

                {/* User Profile */}
                <div className="flex items-center space-x-3 pl-4 border-l border-gray-300">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-gray-800">Usuario Admin</p>
                        <p className="text-xs text-gray-600">admin@arcelormittal.com</p>
                    </div>
                    <img 
                        src="https://i.pravatar.cc/32" 
                        alt="User Profile" 
                        className="h-10 w-10 rounded-full border-2 border-blue-500 cursor-pointer hover:border-blue-600 transition-colors"
                    />
                </div>
            </div>
        </div>
    </header>
);

export default Header;
