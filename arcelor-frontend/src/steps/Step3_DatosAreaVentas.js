// arcelor-frontend/src/steps/Step3_DatosAreaVentas.js
import React, { useContext } from 'react';
import { FormContext } from '../context/FormContext';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';

const Step3_DatosAreaVentas = ({ errors = {} }) => {
    const { formData, updateFormData } = useContext(FormContext);
    const handleChange = (e) => updateFormData({ [e.target.name]: e.target.value });
    
    // Highlight fields successfully filled by OCR
    const autoFillClass = formData._ocrSuccess ? 'border-green-400 bg-green-50' : '';

    return (
        <div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">Paso 3: Datos del Área de Ventas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                <Input 
                    label="GRUPO VENDEDORES" 
                    name="GRUPO_VENDEDORES" 
                    value={formData.GRUPO_VENDEDORES} 
                    onChange={handleChange} 
                    error={errors.GRUPO_VENDEDORES} 
                />
                <Input 
                    label="OFICINA VENTAS" 
                    name="OFICINA_VENTAS" 
                    value={formData.OFICINA_VENTAS} 
                    onChange={handleChange} 
                />
                <Select 
                    label="MONEDA" 
                    name="MONEDA" 
                    value={formData.MONEDA} 
                    onChange={handleChange} 
                    error={errors.MONEDA}
                >
                    <option value="">Select</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                    <option value="GBP">GBP</option>
                </Select>
                
                <Input 
                    label="COND. EXP" 
                    name="COND_EXP" 
                    value={formData.COND_EXP} 
                    onChange={handleChange} 
                />
                <Input 
                    label="ZONA DE VENTAS" 
                    name="ZONA_DE_VENTAS" 
                    value={formData.ZONA_DE_VENTAS} 
                    onChange={handleChange}
                    className={autoFillClass}
                />
                <Select 
                    label="INCOTERM" 
                    name="INCOTERM" 
                    value={formData.INCOTERM} 
                    onChange={handleChange} 
                    error={errors.INCOTERM}
                >
                    <option value="">Select</option>
                    <option value="EXW">EXW - Ex Works</option>
                    <option value="FCA">FCA - Free Carrier</option>
                    <option value="CPT">CPT - Carriage Paid To</option>
                    <option value="CIP">CIP - Carriage and Insurance Paid</option>
                    <option value="DAP">DAP - Delivered at Place</option>
                    <option value="DPU">DPU - Delivered at Place Unloaded</option>
                    <option value="DDP">DDP - Delivered Duty Paid</option>
                </Select>
                
                <Input 
                    label="CALENDARIO FACTURACION" 
                    name="CALENDARIO_FACTURACION" 
                    value={formData.CALENDARIO_FACTURACION} 
                    onChange={handleChange} 
                />
                <Input 
                    label="VALORACION PORTES" 
                    name="VALORACION_PORTES" 
                    value={formData.VALORACION_PORTES} 
                    onChange={handleChange} 
                />
                <Input 
                    label="TIPO FACTURACION" 
                    name="TIPO_FACTURACION" 
                    value={formData.TIPO_FACTURACION} 
                    onChange={handleChange} 
                />
                
                <Input 
                    label="CERTIFICADOS" 
                    name="CERTIFICADOS" 
                    value={formData.CERTIFICADOS} 
                    onChange={handleChange}
                    className={autoFillClass}
                />
                <Input 
                    label="FACT. EMAIL" 
                    name="FACT_EMAIL" 
                    value={formData.FACT_EMAIL} 
                    onChange={handleChange} 
                    type="email"
                />
                <Select 
                    label="CLASE ABC" 
                    name="CLASE_ABC" 
                    value={formData.CLASE_ABC} 
                    onChange={handleChange}
                >
                    <option value="">Select</option>
                    <option value="A">A - Alto valor</option>
                    <option value="B">B - Medio valor</option>
                    <option value="C">C - Bajo valor</option>
                </Select>
                
                <Input 
                    label="PROCEDIMIENTO RECLAMACION" 
                    name="PROCEDIMIENTO_RECLAMACION" 
                    value={formData.PROCEDIMIENTO_RECLAMACION} 
                    onChange={handleChange} 
                />
                <Input 
                    label="E-MAIL RECLAMACION" 
                    name="E_MAIL_RECLAMACION" 
                    value={formData.E_MAIL_RECLAMACION} 
                    onChange={handleChange} 
                    type="email"
                />
            </div>
        </div>
    );
};

export default Step3_DatosAreaVentas;



