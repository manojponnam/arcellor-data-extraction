// arcelor-frontend/src/steps/Step6_CondicionesAprobadas.js
import React, { useContext } from 'react';
import { FormContext } from '../context/FormContext';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';

const Step6_CondicionesAprobadas = ({ errors = {} }) => {
    const { formData, updateFormData } = useContext(FormContext);
    const handleChange = (e) => updateFormData({ [e.target.name]: e.target.value });

    return (
        <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Paso 6: Condiciones Aprobadas</h2>
            <p className="text-sm text-gray-600 mb-6">(Uso Interno - Para ser completado por el departamento de crédito)</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                <Input 
                    label="CRÉDITO CONCEDIDO (€)" 
                    name="CREDITO_CONCEDIDO_EUROS" 
                    value={formData.CREDITO_CONCEDIDO_EUROS} 
                    onChange={handleChange} 
                    type="number"
                    step="0.01"
                    placeholder="Crédito aprobado"
                />
                
                <Input 
                    label="DPP OFICIAL" 
                    name="DPP_OFICIAL" 
                    value={formData.DPP_OFICIAL} 
                    onChange={handleChange}
                    placeholder="Días pago pronto"
                />
                
                <Input 
                    label="G. FINANCIERO OFICIAL" 
                    name="G_FINANCIERO_OFICIAL" 
                    value={formData.G_FINANCIERO_OFICIAL} 
                    onChange={handleChange}
                    placeholder="Gastos financieros oficiales"
                />
                
                <Input 
                    label="FECHA APROBACIÓN" 
                    name="FECHA_APROBACION" 
                    value={formData.FECHA_APROBACION} 
                    onChange={handleChange}
                    type="date"
                />
                
                <Input 
                    label="APROBADO POR" 
                    name="APROBADO_POR" 
                    value={formData.APROBADO_POR} 
                    onChange={handleChange}
                    placeholder="Nombre del responsable"
                />
                
                <Select 
                    label="ESTADO APROBACIÓN" 
                    name="ESTADO_APROBACION" 
                    value={formData.ESTADO_APROBACION} 
                    onChange={handleChange}
                >
                    <option value="pending">Pendiente</option>
                    <option value="approved">Aprobado</option>
                    <option value="rejected">Rechazado</option>
                    <option value="review">En Revisión</option>
                </Select>
                
                <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-gray-500 mb-1 uppercase">NOTAS DE APROBACIÓN</label>
                    <textarea
                        name="NOTAS_APROBACION"
                        value={formData.NOTAS_APROBACION || ''}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                        placeholder="Comentarios internos sobre la aprobación del crédito..."
                    />
                </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-800">
                    <strong>Nota:</strong> Este paso es solo para uso interno del departamento de crédito. 
                    El cliente no verá esta información.
                </p>
            </div>
        </div>
    );
};

export default Step6_CondicionesAprobadas;



