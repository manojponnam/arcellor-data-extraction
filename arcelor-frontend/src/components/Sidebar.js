import React from 'react';

const Sidebar = ({ currentApp, onSelectApp }) => {
    const applications = [
        {
            id: 'alta-clientes',
            title: 'Alta Clientes',
            description: 'Solicitud Alta Clientes',
            icon: '👤',
            color: 'blue'
        },
        {
            id: 'modificacion-maestro',
            title: 'Modificación Maestro',
            description: 'Modificación Maestro Clientes',
            icon: '✏️',
            color: 'green'
        },
        {
            id: 'modificacion-financiera',
            title: 'Condiciones Financieras',
            description: 'Modificación Condiciones Financieras',
            icon: '💰',
            color: 'purple'
        }
    ];

    const getColorClasses = (color, isActive) => {
        const colors = {
            blue: {
                active: 'bg-blue-600 text-white border-blue-700',
                inactive: 'bg-white text-gray-700 hover:bg-blue-50 border-gray-200'
            },
            green: {
                active: 'bg-green-600 text-white border-green-700',
                inactive: 'bg-white text-gray-700 hover:bg-green-50 border-gray-200'
            },
            purple: {
                active: 'bg-purple-600 text-white border-purple-700',
                inactive: 'bg-white text-gray-700 hover:bg-purple-50 border-gray-200'
            }
        };
        return isActive ? colors[color].active : colors[color].inactive;
    };

    return (
        <aside className="w-80 bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200 min-h-screen p-6">
            {/* Sidebar Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Gestión de Clientes
                </h2>
                <p className="text-sm text-gray-600">
                    Sistema de solicitudes ArcelorMittal
                </p>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Tipos de Solicitud
                </p>
                {applications.map((app) => (
                    <button
                        key={app.id}
                        onClick={() => onSelectApp(app.id)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-[1.02] ${
                            getColorClasses(app.color, currentApp === app.id)
                        } ${currentApp === app.id ? 'shadow-lg' : 'shadow-sm'}`}
                    >
                        <div className="flex items-start space-x-3">
                            <span className="text-3xl">{app.icon}</span>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-sm mb-1">
                                    {app.title}
                                </h3>
                                <p className={`text-xs ${
                                    currentApp === app.id ? 'text-white opacity-90' : 'text-gray-600'
                                }`}>
                                    {app.description}
                                </p>
                            </div>
                            {currentApp === app.id && (
                                <span className="text-white text-xl">✓</span>
                            )}
                        </div>
                    </button>
                ))}
            </nav>

            {/* Help Section */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <h4 className="font-semibold text-blue-900 text-sm mb-2">
                    ℹ️ Ayuda
                </h4>
                <p className="text-xs text-blue-800">
                    Seleccione el tipo de solicitud que desea procesar. Puede cambiar entre tipos en cualquier momento.
                </p>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-8 border-t border-gray-300">
                <p className="text-xs text-gray-500 text-center">
                    ArcelorMittal © 2025
                    <br />
                    Sistema de Gestión v3.0
                </p>
            </div>
        </aside>
    );
};

export default Sidebar;

