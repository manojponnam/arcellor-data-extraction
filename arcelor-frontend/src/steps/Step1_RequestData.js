import React, { useContext } from 'react';
import { FormContext } from '../context/FormContext';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';

const Step1_RequestData = ({ errors = {} }) => {
    const { formData, updateFormData } = useContext(FormContext);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        updateFormData({ [name]: type === 'checkbox' ? checked : value });
    };

    // Auto-fill class for OCR-extracted data
    const autoFillClass = formData._ocrSuccess ? 'border-green-400 bg-green-50' : '';

    return (
        <div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">Paso 1: Datos de Solicitud</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                <Select 
                    label="CENTRO" 
                    name="CENTRO" 
                    value={formData.CENTRO} 
                    onChange={handleChange}
                    error={errors.CENTRO}
                >
                    <option value="">Seleccionar</option>
                    <option value="BASAURI">BASAURI</option>
                    <option value="GETAFE">GETAFE</option>
                    <option value="BURGOS">BURGOS</option>
                    <option value="VITORIA">VITORIA</option>
                    <option value="SAPEM">SAPEM</option>
                    <option value="SANTANDER">SANTANDER</option>
                    <option value="HERNANI">HERNANI</option>
                    <option value="CANARIAS">CANARIAS</option>
                    <option value="TUYDESA">TUYDESA</option>
                    <option value="VALENCIA">VALENCIA</option>
                    <option value="VALLADOLID">VALLADOLID</option>
                    <option value="ORENSE">ORENSE</option>
                    <option value="MURCIA">MURCIA</option>
                    <option value="LLANERA">LLANERA</option>
                    <option value="ZARAGOZA">ZARAGOZA</option>
                    <option value="SEVILLA">SEVILLA</option>
                    <option value="BADAJOZ">BADAJOZ</option>
                    <option value="PESIBERIA">PESIBERIA</option>
                    <option value="SI">SI</option>
                </Select>
                <Input 
                    label="FECHA SOLICITUD ALTA" 
                    name="FECHA_SOLICITUD_ALTA" 
                    type="date" 
                    value={formData.FECHA_SOLICITUD_ALTA} 
                    onChange={handleChange} 
                />
                <Input 
                    label="FECHA RECEPCIÓN" 
                    name="FECHA_RECEPCION" 
                    type="date" 
                    value={formData.FECHA_RECEPCION} 
                    onChange={handleChange} 
                />
                
                <Select 
                    label="CANAL" 
                    name="CANAL" 
                    value={formData.CANAL} 
                    onChange={handleChange}
                    error={errors.CANAL}
                >
                    <option value="">Seleccionar</option>
                    <option value="01-CANAL 01">01-CANAL 01</option>
                </Select>

                <Select 
                    label="SECTOR" 
                    name="SECTOR" 
                    value={formData.SECTOR} 
                    onChange={handleChange}
                    error={errors.SECTOR}
                    className={autoFillClass}
                >
                    <option value="">Seleccionar</option>
                    <option value="BA - BASAURI">BA - BASAURI</option>
                    <option value="GE - GETAFE">GE - GETAFE</option>
                    <option value="BU - BURGOS">BU - BURGOS</option>
                    <option value="VI - VITORIA">VI - VITORIA</option>
                    <option value="SP - SAPEM">SP - SAPEM</option>
                    <option value="SN - SANTANDER">SN - SANTANDER</option>
                    <option value="HE - HERNANI">HE - HERNANI</option>
                    <option value="CA - CANARIAS">CA - CANARIAS</option>
                    <option value="TY - TUYDESA">TY - TUYDESA</option>
                    <option value="VA - VALENCIA">VA - VALENCIA</option>
                    <option value="VD - VALLADOLID">VD - VALLADOLID</option>
                    <option value="OR - ORENSE">OR - ORENSE</option>
                    <option value="MU - MURCIA">MU - MURCIA</option>
                    <option value="LL - LLANERA">LL - LLANERA</option>
                    <option value="ZA - ZARAGOZA">ZA - ZARAGOZA</option>
                    <option value="SE - SEVILLA">SE - SEVILLA</option>
                    <option value="BJ - BADAJOZ">BJ - BADAJOZ</option>
                    <option value="PE - PESIBERIA">PE - PESIBERIA</option>
                </Select>

                <Input 
                    label="Nº PROVEEDOR" 
                    name="NO_PROVEEDOR" 
                    value={formData.NO_PROVEEDOR} 
                    onChange={handleChange} 
                />
                <Select 
                    label="COND. PAGO PROV." 
                    name="COND_PAGO_PROV" 
                    value={formData.COND_PAGO_PROV} 
                    onChange={handleChange}
                    className={autoFillClass}
                >
                    <option value="">Seleccionar</option>
                    <option value="U485 - Pagad 21d,s/día fijo">U485 - Pagad 21d,s/día fijo</option>
                    <option value="U167 - 21 dias, d.pago 25">U167 - 21 dias, d.pago 25</option>
                    <option value="U168 - 21 dias, d.pago 05-25">U168 - 21 dias, d.pago 05-25</option>
                    <option value="U480 - 0 dias fin de mes, d.pago 10">U480 - 0 dias fin de mes, d.pago 10</option>
                    <option value="U118 - 0 dias fin de mes, d.pago 25">U118 - 0 dias fin de mes, d.pago 25</option>
                    <option value="U001 - PAGO ANTICIPADO">U001 - PAGO ANTICIPADO</option>
                    <option value="U382 - Pago Fraccionado 30-45-60 d">U382 - Pago Fraccionado 30-45-60 d</option>
                    <option value="U488 - Pago Fraccionado 30-45-60 d,dpago 15">U488 - Pago Fraccionado 30-45-60 d,dpago 15</option>
                    <option value="U039 - Pagad 10d,s/dia fijo">U039 - Pagad 10d,s/dia fijo</option>
                    <option value="U603 - 10 dias, d.pago 25">U603 - 10 dias, d.pago 25</option>
                    <option value="U606 - Pagad 11d,s/día fijo">U606 - Pagad 11d,s/día fijo</option>
                    <option value="U172 - 11 días, d.pago 20">U172 - 11 días, d.pago 20</option>
                    <option value="U173 - 11 días, d.pago 05 y 20">U173 - 11 días, d.pago 05 y 20</option>
                    <option value="U174 - 11 dias, d.pago 10 y 20">U174 - 11 dias, d.pago 10 y 20</option>
                    <option value="U040 - Pagad 15d,s/día fijo">U040 - Pagad 15d,s/día fijo</option>
                    <option value="U177 - 15 días, d.pago 10">U177 - 15 días, d.pago 10</option>
                    <option value="U483 - 15 dias, d.pago 15">U483 - 15 dias, d.pago 15</option>
                    <option value="U178 - 15 dias, d.pago 20">U178 - 15 dias, d.pago 20</option>
                    <option value="U151 - 15 días, d.pago 25">U151 - 15 días, d.pago 25</option>
                    <option value="U179 - 15 dias, d.pago 28">U179 - 15 dias, d.pago 28</option>
                    <option value="U097 - 15 dias, d.pago fin de mes">U097 - 15 dias, d.pago fin de mes</option>
                    <option value="U384 - 15- 15 dias, d.pago 05-15-25">U384 - 15- 15 dias, d.pago 05-15-25</option>
                    <option value="U181 - 15 días, d.pago 05 y 20">U181 - 15 días, d.pago 05 y 20</option>
                    <option value="U385 - 15 dias, d.pago 05 y 25">U385 - 15 dias, d.pago 05 y 25</option>
                    <option value="U182 - 15 dias, d.pago 10 y 20">U182 - 15 dias, d.pago 10 y 20</option>
                    <option value="U386 - 15 dias, d.pago 10 y 25">U386 - 15 dias, d.pago 10 y 25</option>
                    <option value="U387 - 15 dias, d.pago 15 y fin mes">U387 - 15 dias, d.pago 15 y fin mes</option>
                    <option value="U808 - Pagad 20d,s/día fijo">U808 - Pagad 20d,s/día fijo</option>
                    <option value="U202 - 20 días, d.pago 10">U202 - 20 días, d.pago 10</option>
                    <option value="U184 - 20 días, d.pago 15">U184 - 20 días, d.pago 15</option>
                    <option value="U484 - 20 días, d.pago 20">U484 - 20 días, d.pago 20</option>
                    <option value="U609 - 20 dias, d.pago 25">U609 - 20 dias, d.pago 25</option>
                    <option value="U185 - 20 días, d.pago 28">U185 - 20 días, d.pago 28</option>
                </Select>
                <Input 
                    label="DADO DE ALTA COMO PROVEEDOR" 
                    name="DADO_DE_ALTA_COMO_PROVEEDOR" 
                    value={formData.DADO_DE_ALTA_COMO_PROVEEDOR} 
                    onChange={handleChange} 
                />
                <Select 
                    label="CENTRO ORIGEN" 
                    name="CENTRO_ORIGEN" 
                    value={formData.CENTRO_ORIGEN} 
                    onChange={handleChange}
                >
                    <option value="">Seleccionar</option>
                    <option value="BASAURI">BASAURI</option>
                    <option value="GETAFE">GETAFE</option>
                    <option value="BURGOS">BURGOS</option>
                    <option value="VITORIA">VITORIA</option>
                    <option value="SAPEM">SAPEM</option>
                    <option value="SANTANDER">SANTANDER</option>
                    <option value="HERNANI">HERNANI</option>
                    <option value="CANARIAS">CANARIAS</option>
                    <option value="TUYDESA">TUYDESA</option>
                    <option value="VALENCIA">VALENCIA</option>
                    <option value="VALLADOLID">VALLADOLID</option>
                    <option value="ORENSE">ORENSE</option>
                    <option value="MURCIA">MURCIA</option>
                    <option value="LLANERA">LLANERA</option>
                    <option value="ZARAGOZA">ZARAGOZA</option>
                    <option value="SEVILLA">SEVILLA</option>
                    <option value="BADAJOZ">BADAJOZ</option>
                    <option value="PESIBERIA">PESIBERIA</option>
                    <option value="SI">SI</option>
                </Select>
                
                <div className="flex items-center mt-6 md:col-span-3">
                    <input
                        type="checkbox"
                        id="ABIERTO_COMO_CLIENTE"
                        name="ABIERTO_COMO_CLIENTE"
                        checked={formData.ABIERTO_COMO_CLIENTE}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="ABIERTO_COMO_CLIENTE" className="ml-2 block text-sm text-gray-900">
                        ABIERTO COMO CLIENTE SOLICITANDO LAS MISMAS CONDICIONES
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Step1_RequestData;



