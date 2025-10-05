import React from 'react';

const ApplicationTypeSelector = ({ onSelectType }) => {
    const applicationTypes = [
        {
            id: 'alta-clientes',
            title: 'Solicitud Alta Clientes',
            description: 'Registro de nuevos clientes en el sistema maestro',
            icon: '👤',
            color: 'blue',
            gradient: 'from-blue-500 to-blue-700',
            available: true
        },
        {
            id: 'modificacion-maestro',
            title: 'Modificación Maestro Clientes',
            description: 'Actualización de datos maestros de clientes existentes',
            icon: '✏️',
            color: 'green',
            gradient: 'from-green-500 to-green-700',
            available: true
        },
        {
            id: 'modificacion-financiera',
            title: 'Modificación Condiciones Financieras',
            description: 'Modificación de términos y condiciones financieras',
            icon: '💰',
            color: 'purple',
            gradient: 'from-purple-500 to-purple-700',
            available: true
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 flex items-center justify-center p-8">
            <div className="max-w-6xl w-full">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-block p-4 bg-white rounded-2xl shadow-lg mb-6">
                        <img 
                            src="/loggo.png" 
                            alt="ArcelorMittal" 
                            className="h-16 w-auto"
                        />
                    </div>
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">
                        Sistema de Gestión de Clientes
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Seleccione el tipo de solicitud que desea procesar
                    </p>
                </div>

                {/* Application Type Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {applicationTypes.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => type.available && onSelectType(type.id)}
                            disabled={!type.available}
                            className={`group relative bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                                type.available ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'
                            }`}
                        >
                            {/* Icon Circle */}
                            <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br ${type.gradient} flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                {type.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-gray-800 mb-3">
                                {type.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-gray-600 mb-4 min-h-[3rem]">
                                {type.description}
                            </p>

                            {/* Action Button */}
                            <div className={`inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r ${type.gradient} text-white font-semibold rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300`}>
                                <span>Iniciar Solicitud</span>
                                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                            </div>

                            {/* Available Badge */}
                            {type.available && (
                                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    Disponible
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Info Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                            ℹ️
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 mb-2">
                                Información del Sistema
                            </h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• <strong>Procesamiento OCR automático</strong> - Los documentos se analizan automáticamente</li>
                                <li>• <strong>Validación en tiempo real</strong> - Verificación de datos durante la entrada</li>
                                <li>• <strong>Guardado automático</strong> - Su progreso se guarda automáticamente</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationTypeSelector;

