// arcelor-frontend/src/steps/Step4_Destinatarios.js
import React, { useContext } from 'react';
import { FormContext } from '../context/FormContext';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';

const Step4_Destinatarios = ({ errors = {} }) => {
    const { formData, updateFormData } = useContext(FormContext);
    const handleChange = (e) => updateFormData({ [e.target.name]: e.target.value });
    
    // Auto-fill class for OCR-extracted data
    const autoFillClass = formData._ocrSuccess ? 'border-green-400 bg-green-50' : '';

    return (
        <div className="space-y-8">
            {/* Destinatario de Mercancía */}
            <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Destinatario de Mercancía</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 p-6 border rounded-md bg-gray-50">
                    <Input 
                        label="NOMBRE" 
                        name="DESTINATARIO_MERCANCIA_NOMBRE" 
                        value={formData.DESTINATARIO_MERCANCIA_NOMBRE || formData.NOMBRE} 
                        onChange={handleChange}
                        className={autoFillClass}
                    />
                    <Input 
                        label="CALLE" 
                        name="DESTINATARIO_MERCANCIA_CALLE" 
                        value={formData.DESTINATARIO_MERCANCIA_CALLE || formData.CALLE} 
                        onChange={handleChange}
                        className={autoFillClass}
                    />
                    <Input 
                        label="NÚMERO" 
                        name="DESTINATARIO_MERCANCIA_NUMERO" 
                        value={formData.DESTINATARIO_MERCANCIA_NUMERO || formData.NUMERO} 
                        onChange={handleChange}
                        className={autoFillClass}
                    />
                    <Input 
                        label="COD. POSTAL" 
                        name="DESTINATARIO_MERCANCIA_COD_POSTAL" 
                        value={formData.DESTINATARIO_MERCANCIA_COD_POSTAL || formData.COD_POSTAL} 
                        onChange={handleChange}
                        className={autoFillClass}
                    />
                    <Input 
                        label="POBLACIÓN" 
                        name="DESTINATARIO_MERCANCIA_POBLACION" 
                        value={formData.DESTINATARIO_MERCANCIA_POBLACION || formData.POBLACION} 
                        onChange={handleChange}
                        className={autoFillClass}
                    />
                    <Select 
                        label="PAÍS" 
                        name="DESTINATARIO_MERCANCIA_PAIS" 
                        value={formData.DESTINATARIO_MERCANCIA_PAIS || formData.PAIS} 
                        onChange={handleChange}
                        className={autoFillClass}
                    >
                        <option value="">Select</option>
                        <option value="España">España</option>
                        <option value="Deutschland">Deutschland</option>
                        <option value="France">France</option>
                        <option value="Italia">Italia</option>
                    </Select>
                </div>
            </div>

            {/* Destinatario de Factura */}
            <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Destinatario de Factura</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 p-6 border rounded-md bg-gray-50">
                    <Input 
                        label="NOMBRE" 
                        name="DESTINATARIO_FACTURA_NOMBRE" 
                        value={formData.DESTINATARIO_FACTURA_NOMBRE || formData.NOMBRE} 
                        onChange={handleChange}
                        className={autoFillClass}
                    />
                    <Input 
                        label="CALLE" 
                        name="DESTINATARIO_FACTURA_CALLE" 
                        value={formData.DESTINATARIO_FACTURA_CALLE || formData.CALLE} 
                        onChange={handleChange}
                        className={autoFillClass}
                    />
                    <Input 
                        label="NÚMERO" 
                        name="DESTINATARIO_FACTURA_NUMERO" 
                        value={formData.DESTINATARIO_FACTURA_NUMERO || formData.NUMERO} 
                        onChange={handleChange}
                        className={autoFillClass}
                    />
                    <Input 
                        label="COD. POSTAL" 
                        name="DESTINATARIO_FACTURA_COD_POSTAL" 
                        value={formData.DESTINATARIO_FACTURA_COD_POSTAL || formData.COD_POSTAL} 
                        onChange={handleChange}
                        className={autoFillClass}
                    />
                    <Input 
                        label="POBLACIÓN" 
                        name="DESTINATARIO_FACTURA_POBLACION" 
                        value={formData.DESTINATARIO_FACTURA_POBLACION || formData.POBLACION} 
                        onChange={handleChange}
                        className={autoFillClass}
                    />
                    <Select 
                        label="PAÍS" 
                        name="DESTINATARIO_FACTURA_PAIS" 
                        value={formData.DESTINATARIO_FACTURA_PAIS || formData.PAIS} 
                        onChange={handleChange}
                        className={autoFillClass}
                    >
                        <option value="">Select</option>
                        <option value="España">España</option>
                        <option value="Deutschland">Deutschland</option>
                        <option value="France">France</option>
                        <option value="Italia">Italia</option>
                    </Select>
                </div>
            </div>
        </div>
    );
};

export default Step4_Destinatarios;



