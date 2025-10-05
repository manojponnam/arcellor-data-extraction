import React from 'react';

const Step = ({ number, title, isActive, isCompleted }) => (
    <div className="flex items-center">
        <div className={`w-8 h-8 rounded-md flex items-center justify-center text-white ${isActive ? 'bg-blue-600' : 'bg-blue-600'}`}>
            {isCompleted && !isActive ? '✔' : number}
        </div>
        <div className="ml-4 text-left">
            <div className="text-xs text-gray-400">Step {number}</div>
            <div className="text-sm font-semibold text-gray-700">{title}</div>
        </div>
    </div>
);

const StepIndicator = ({ currentStep, totalSteps = 6 }) => {
    // All possible steps (show only the ones needed per phase)
    const allSteps = [
        { number: 1, title: 'DATOS SOLICITUD' },
        { number: 2, title: 'DATOS GENERALES' },
        { number: 3, title: 'DATOS AREA VENTAS' },
        { number: 4, title: 'DESTINATARIOS' },
        { number: 5, title: 'CONDICIONES FINANCIERAS' },
        { number: 6, title: 'CONDICIONES APROBADAS' },
    ];
    
    const steps = allSteps.slice(0, totalSteps);
    
    return (
        <div className="flex justify-between items-center my-8 px-4 md:px-16">
            {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                    <Step 
                        number={step.number} 
                        title={step.title} 
                        isActive={currentStep === step.number}
                        isCompleted={currentStep > step.number}
                    />
                    {index < steps.length - 1 && <div className="flex-1 h-0.5 mx-4 bg-gray-200"></div>}
                </React.Fragment>
            ))}
        </div>
    );
};

export default StepIndicator;

