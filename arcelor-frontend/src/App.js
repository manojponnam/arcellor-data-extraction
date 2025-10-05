import React, { useState, useContext } from 'react';
import { FormContext, FormProvider } from './context/FormContext';
import { useToast } from './context/ToastContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ApplicationTypeSelector from './components/ApplicationTypeSelector';
import StepIndicator from './components/StepIndicator';
import Button from './components/ui/Button';
import Step0_Upload from './steps/Step0_Upload';
import Step1_RequestData from './steps/Step1_RequestData';
import Step2_GeneralData from './steps/Step2_GeneralData';
import Step3_DatosAreaVentas from './steps/Step3_DatosAreaVentas';
import Step4_Destinatarios from './steps/Step4_Destinatarios';
import Step5_CondicionesFinancieras from './steps/Step5_CondicionesFinancieras';
import Step6_CondicionesAprobadas from './steps/Step6_CondicionesAprobadas';

const TOTAL_STEPS = 6;

// Validation rules for each step (NO MANDATORY FIELDS - All optional)
const validationRules = {
    1: [], // No required fields
    2: [], // No required fields
    3: [], // No required fields
    4: [], // No required fields
    5: [], // No required fields
    6: [], // No required fields
};

// Application type configurations
const APP_CONFIGS = {
    'alta-clientes': {
        title: 'Solicitud Alta Clientes',
        description: 'Registro de nuevos clientes',
        icon: '👤',
        color: 'blue'
    },
    'modificacion-maestro': {
        title: 'Modificación Maestro Clientes',
        description: 'Actualización de datos maestros',
        icon: '✏️',
        color: 'green'
    },
    'modificacion-financiera': {
        title: 'Modificación Condiciones Financieras',
        description: 'Modificación de términos financieros',
        icon: '💰',
        color: 'purple'
    }
};

// Multi-step form component
const MultiStepForm = ({ appType }) => {
    const { formData } = useContext(FormContext);
    const { showToast } = useToast();
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState({});
    
    const appConfig = APP_CONFIGS[appType];
    
    // Check OCR status
    const ocrSuccess = formData._ocrSuccess;
    const ocrFailed = formData._ocrFailed;

    // Validate current step
    const validateStep = () => {
        const rules = validationRules[currentStep];
        if (!rules || rules.length === 0) return true;

        const newErrors = {};
        rules.forEach(field => {
            if (!formData[field] || formData[field].toString().trim() === '') {
                newErrors[field] = 'This field is required.';
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSaveAndContinue = async () => {
        if (!validateStep()) {
            showToast('Por favor complete todos los campos requeridos.', 'error');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setErrors({});

        if (currentStep < TOTAL_STEPS) {
            setCurrentStep(step => step + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Final submission - just show notification
            showToast('✅ Registro anotado / Record Noted', 'success');
            console.log('Application data noted:', formData);
        }
    };

    const handleGoBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
            setErrors({});
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const renderStep = () => {
        // Only render full form for alta-clientes, show coming soon for others
        if (appType !== 'alta-clientes') {
            return (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">{appConfig.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        {appConfig.title}
                    </h3>
                    <p className="text-gray-600 mb-8">
                        Este módulo estará disponible próximamente
                    </p>
                    <div className="inline-block bg-yellow-100 border border-yellow-300 rounded-lg p-4">
                        <p className="text-yellow-800 font-semibold">
                            🚧 En construcción - Próximamente disponible
                        </p>
                    </div>
                </div>
            );
        }

        switch (currentStep) {
            case 1: return <Step1_RequestData errors={errors} />;
            case 2: return <Step2_GeneralData errors={errors} />;
            case 3: return <Step3_DatosAreaVentas errors={errors} />;
            case 4: return <Step4_Destinatarios errors={errors} />;
            case 5: return <Step5_CondicionesFinancieras errors={errors} />;
            case 6: return <Step6_CondicionesAprobadas errors={errors} />;
            default: return <Step1_RequestData errors={errors} />;
        }
    };

    return (
        <main className="max-w-7xl mx-auto p-4 md:p-8">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{appConfig.title}</h1>
                    <p className="text-sm text-gray-600 mt-1">{appConfig.description}</p>
                </div>
                {ocrSuccess && (
                    <div className="flex items-center bg-green-100 px-4 py-2 rounded-lg">
                        <span className="text-green-800 font-semibold">✓ OCR Exitoso</span>
                    </div>
                )}
                {ocrFailed && (
                    <div className="flex items-center bg-yellow-100 px-4 py-2 rounded-lg">
                        <span className="text-yellow-800 font-semibold">⚠️ Modo de Entrada Manual</span>
                    </div>
                )}
            </div>

            {appType === 'alta-clientes' && (
                <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
            )}
            
            <div className="bg-white p-8 rounded-lg shadow-md">
                {renderStep()}
            </div>

            {appType === 'alta-clientes' && (
                <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                    <Button onClick={handleGoBack}>
                        <span>← Atrás</span>
                    </Button>
                )}
                    <div className="ml-auto">
                        <Button onClick={handleSaveAndContinue}>
                            <span>{currentStep === TOTAL_STEPS ? 'Enviar Solicitud' : 'Guardar y Continuar'}</span>
                            <span className="ml-2">→</span>
                        </Button>
                    </div>
                </div>
            )}
        </main>
    );
};

// Main App content with sidebar
const AppContent = () => {
    const { applicationType, setApplicationType, updateFormData, resetFormData } = useContext(FormContext);
    const [workflowState, setWorkflowState] = useState('select'); // 'select', 'upload', 'form'

    const handleSelectApplicationType = (type) => {
        setApplicationType(type);
        resetFormData();
        setWorkflowState('upload');
    };

    const handleChangeApplicationType = (type) => {
        if (window.confirm('¿Está seguro de que desea cambiar el tipo de solicitud? Se perderán los datos actuales.')) {
            setApplicationType(type);
            resetFormData();
            setWorkflowState('upload');
        }
    };

    const handleUploadSuccess = (ocrData) => {
        console.log('📥 handleUploadSuccess called with data:', ocrData);
        updateFormData(ocrData);
        console.log('✅ updateFormData called - switching to form view');
        setWorkflowState('form');
    };

    // Show application type selector first
    if (workflowState === 'select') {
        return <ApplicationTypeSelector onSelectType={handleSelectApplicationType} />;
    }

    // Show main app with sidebar
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar 
                currentApp={applicationType} 
                onSelectApp={handleChangeApplicationType} 
            />
            <div className="flex-1 flex flex-col">
                <Header />
                {workflowState === 'upload' ? (
                    <Step0_Upload onUploadSuccess={handleUploadSuccess} appType={applicationType} />
                ) : (
                    <MultiStepForm appType={applicationType} />
                )}
            </div>
        </div>
    );
};

// Wrapper that provides the global form context
const App = () => (
    <FormProvider>
        <AppContent />
    </FormProvider>
);

export default App;
