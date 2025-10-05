// arcelor-frontend/src/steps/Step5_CondicionesFinancieras.js
import React, { useContext } from 'react';
import { FormContext } from '../context/FormContext';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';

const Step5_CondicionesFinancieras = ({ errors = {} }) => {
    const { formData, updateFormData } = useContext(FormContext);
    const handleChange = (e) => updateFormData({ [e.target.name]: e.target.value });
    
    // Auto-fill class for OCR-extracted data
    const autoFillClass = formData._ocrSuccess ? 'border-green-400 bg-green-50' : '';

    return (
        <div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">Paso 5: Condiciones Financieras Solicitadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                <Select 
                    label="VÍA DE PAGO" 
                    name="V_PAGO" 
                    value={formData.V_PAGO} 
                    onChange={handleChange} 
                    error={errors.V_PAGO}
                >
                    <option value="">Select</option>
                    <option value="SEPA">SEPA</option>
                    <option value="Transferencia">Transferencia Bancaria</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Pagaré">Pagaré</option>
                </Select>
                
                <Input 
                    label="CONDICIONES DE PAGO" 
                    name="COND_PAGO" 
                    value={formData.COND_PAGO || formData.FORMA_PAGO} 
                    onChange={handleChange}
                    placeholder="Ej: 30 días"
                    className={autoFillClass}
                />
                
                <Input 
                    label="DESCUENTO PP (%)" 
                    name="DESCUENTO_PP" 
                    value={formData.DESCUENTO_PP} 
                    onChange={handleChange}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                />
                
                <Input 
                    label="GASTOS FINANCIEROS" 
                    name="GASTOS_FIN" 
                    value={formData.GASTOS_FIN} 
                    onChange={handleChange} 
                    type="number"
                    step="0.01"
                />
                
                <Input 
                    label="DÍAS MEDIOS PAGO" 
                    name="DIAS_MEDIOS_PAGO" 
                    value={formData.DIAS_MEDIOS_PAGO} 
                    onChange={handleChange} 
                    type="number"
                    placeholder="30"
                />
                
                <Input 
                    label="VENTAS ESTIMADAS AÑO (€)" 
                    name="VENTAS_ESTIMADAS_ANO_EUROS" 
                    value={formData.VENTAS_ESTIMADAS_ANO_EUROS} 
                    onChange={handleChange} 
                    type="number"
                    step="0.01"
                />
                
                <Input 
                    label="VENTAS LIMITADAS (€)" 
                    name="VENTAS_LIMITADAS_EUROS" 
                    value={formData.VENTAS_LIMITADAS_EUROS} 
                    onChange={handleChange} 
                    type="number"
                    step="0.01"
                />
                
                <Input 
                    label="CRÉDITO SOLICITADO (€)" 
                    name="CREDITO_SOLICITADO_EUROS" 
                    value={formData.CREDITO_SOLICITADO_EUROS || formData.LIMITE_CREDITO} 
                    onChange={handleChange} 
                    type="number"
                    step="0.01"
                    error={errors.CREDITO_SOLICITADO_EUROS}
                    className={autoFillClass}
                />
                
                <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-gray-500 mb-1 uppercase">OBSERVACIONES FINANCIERAS</label>
                    <textarea
                        name="OBSERVACIONES_FINANCIERAS"
                        value={formData.OBSERVACIONES_FINANCIERAS || ''}
                        onChange={handleChange}
                        rows="3"
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 ${autoFillClass}`}
                        placeholder="Notas adicionales sobre condiciones financieras..."
                    />
                </div>
            </div>
        </div>
    );
};

export default Step5_CondicionesFinancieras;



