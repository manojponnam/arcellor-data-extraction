import React, { useState } from 'react';
import axios from 'axios';

const APP_TITLES = {
    'alta-clientes': 'Solicitud Alta Clientes',
    'modificacion-maestro': 'Modificación Maestro Clientes',
    'modificacion-financiera': 'Modificación Condiciones Financieras'
};

const Step0_Upload = ({ onUploadSuccess, appType }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [ocrWarning, setOcrWarning] = useState('');
    const [currentFile, setCurrentFile] = useState(null);
    const [fileCount, setFileCount] = useState(0);

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (!files || files.length === 0) return;

        setCurrentFile(files);
        await processFiles(files);
    };

    const processFiles = async (files) => {
        setError('');
        setOcrWarning('');
        setIsLoading(true);
        setFileCount(files.length);
        const uploadData = new FormData();
        
        // Append all files to FormData
        files.forEach((file) => {
            uploadData.append('documents', file);
        });

        try {
            // FIXED: Correct endpoint for backend API
            const response = await axios.post('http://localhost:5001/api/v2/process-document', uploadData);
            
            // DEBUG: Log the data received from backend
            console.log('✅ DATA RECEIVED FROM BACKEND:', response.data);
            
            // Check if OCR failed
            if (response.data._ocrFailed) {
                setOcrWarning('⚠️ La extracción OCR falló. Puede completar el formulario manualmente o intentar subir de nuevo.');
                setIsLoading(false);
                // Still transition to form but with empty data
                onUploadSuccess(response.data);
            } else {
                // OCR succeeded
                console.log('✅ OCR SUCCESS - Calling onUploadSuccess with:', response.data);
                onUploadSuccess(response.data);
            }
        } catch (err) {
            console.error('Error uploading file:', err);
            setError('Hubo un error al procesar el documento. Por favor, inténtelo de nuevo.');
            setIsLoading(false);
            setFileCount(0);
        }
    };

    const handleRetry = () => {
        if (currentFile) {
            processFiles(currentFile);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center h-[calc(100vh-80px)] p-4">
            <div className="text-center bg-white p-12 rounded-lg shadow-xl max-w-2xl">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    {APP_TITLES[appType] || 'Gestión de Clientes'}
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    Para comenzar, suba los documentos del cliente para rellenar automáticamente el formulario.
                </p>
                <label 
                    htmlFor="file-upload" 
                    className={`cursor-pointer inline-block text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-300 ${isLoading ? 'bg-gray-400 animate-pulse' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                   {isLoading ? `Procesando ${fileCount} documento${fileCount > 1 ? 's' : ''}... Por favor espere.` : 'Subir Documentos (1-3 PDFs)'}
                </label>
                {isLoading && fileCount > 1 && (
                    <p className="text-blue-600 mt-3 text-sm">
                        📄 Procesando y fusionando datos de {fileCount} archivos...
                    </p>
                )}
                <input 
                    id="file-upload" 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileUpload} 
                    disabled={isLoading}
                    accept=".pdf,.jpg,.jpeg,.png,.txt"
                    multiple
                />
                {error && <p className="text-red-500 mt-4 font-semibold">{error}</p>}
                {ocrWarning && (
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
                        <p className="text-yellow-800 font-semibold">{ocrWarning}</p>
                        <button
                            onClick={handleRetry}
                            className="mt-3 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
                        >
                            🔄 Reintentar Extracción OCR
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Step0_Upload;

