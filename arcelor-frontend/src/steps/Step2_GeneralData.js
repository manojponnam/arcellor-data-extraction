import React, { useContext } from 'react';
import { FormContext } from '../context/FormContext';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';

const Step2_GeneralData = ({ errors = {} }) => {
    const { formData, updateFormData } = useContext(FormContext);

    const handleChange = (e) => {
        updateFormData({ [e.target.name]: e.target.value });
    };

    // DEBUG: Log form data in Step2
    console.log('📝 Step2_GeneralData - formData:', formData);
    console.log('📝 Step2_GeneralData - NOMBRE:', formData.NOMBRE, 'CIF:', formData.CIF);

    // Auto-fill class for OCR-extracted data
    const autoFillClass = formData._ocrSuccess ? 'border-green-400 bg-green-50' : '';
    console.log('🎨 autoFillClass:', autoFillClass, '_ocrSuccess:', formData._ocrSuccess);

    return (
        <div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">Paso 2: Datos Generales</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                <Input 
                    label="NUMERO CLIENTE" 
                    name="NUMERO_CLIENTE" 
                    value={formData.NUMERO_CLIENTE} 
                    onChange={handleChange}
                    className={autoFillClass}
                />
                <Input 
                    label="NOMBRE" 
                    name="NOMBRE" 
                    value={formData.NOMBRE} 
                    onChange={handleChange}
                    error={errors.NOMBRE}
                    className={autoFillClass}
                />
                <Input 
                    label="CIF" 
                    name="CIF" 
                    value={formData.CIF} 
                    onChange={handleChange}
                    error={errors.CIF}
                    className={autoFillClass}
                />
                <Input 
                    label="CONCEPTO BUSQUEDA" 
                    name="CONCEPTO_BUSQUEDA" 
                    value={formData.CONCEPTO_BUSQUEDA} 
                    onChange={handleChange}
                    className={autoFillClass}
                />
                <Select 
                    label="RAMO" 
                    name="RAMO" 
                    value={formData.RAMO} 
                    onChange={handleChange}
                    className={autoFillClass}
                >
                    <option value="">Seleccionar</option>
                    <option value="0070 - ALMACENISTAS;L. CORT">0070 - ALMACENISTAS;L. CORT</option>
                    <option value="0071 - AUTOMOVILES">0071 - AUTOMOVILES</option>
                    <option value="0072 - OTROS CONSUMIDORE">0072 - OTROS CONSUMIDORE</option>
                    <option value="0073 - FABRICAS (PROD,AU">0073 - FABRICAS (PROD,AU</option>
                    <option value="0074 - ESTAMPACIONES">0074 - ESTAMPACIONES</option>
                    <option value="0075 - CARROCEROS">0075 - CARROCEROS</option>
                    <option value="0076 - ELEVACION/ASCENSO">0076 - ELEVACION/ASCENSO</option>
                    <option value="0077 - LINEA BLANCA">0077 - LINEA BLANCA</option>
                    <option value="0078 - CONSTRUCTORAS">0078 - CONSTRUCTORAS</option>
                    <option value="0079 - FERRALLISTAS">0079 - FERRALLISTAS</option>
                    <option value="0080 - FILIALES">0080 - FILIALES</option>
                    <option value="0081 - ASTILLEROS/NAVA">0081 - ASTILLEROS/NAVA</option>
                    <option value="0082 - CALDERERÍA">0082 - CALDERERÍA</option>
                    <option value="0083 - CERRAJEROS">0083 - CERRAJEROS</option>
                    <option value="0084 - TRANSFORM/MECAN">0084 - TRANSFORM/MECAN</option>
                    <option value="0085 - PRODUCT.CONFORM">0085 - PRODUCT.CONFORM</option>
                    <option value="0086 - ENVASES">0086 - ENVASES</option>
                    <option value="0087 - LAMINADORES">0087 - LAMINADORES</option>
                    <option value="0088 - BACULOS">0088 - BACULOS</option>
                    <option value="0089 - CARPINTERIA METAL">0089 - CARPINTERIA METAL</option>
                    <option value="0090 - FABRICAC. MAQUINA">0090 - FABRICAC. MAQUINA</option>
                    <option value="0091 - ALMACENISTAS">0091 - ALMACENISTAS</option>
                    <option value="0092 - OXICORTISTAS">0092 - OXICORTISTAS</option>
                    <option value="0093 - MAQUILADORES">0093 - MAQUILADORES</option>
                    <option value="0094 - INTERMEDIARIO/TRADER">0094 - INTERMEDIARIO/TRADER</option>
                    <option value="0095 - MATERIAL FERROVIARIO">0095 - MATERIAL FERROVIARIO</option>
                    <option value="0098 - INGENIER. Y MONTAJES">0098 - INGENIER. Y MONTAJES</option>
                    <option value="0099 - FORJA Y ESTAMPADO">0099 - FORJA Y ESTAMPADO</option>
                </Select>
                <Input 
                    label="CALLE" 
                    name="CALLE" 
                    value={formData.CALLE} 
                    onChange={handleChange}
                    error={errors.CALLE}
                    className={autoFillClass}
                />
                <Input 
                    label="NÚMERO" 
                    name="NUMERO" 
                    value={formData.NUMERO} 
                    onChange={handleChange}
                    className={autoFillClass}
                />
                <Input 
                    label="COD. POSTAL" 
                    name="COD_POSTAL" 
                    value={formData.COD_POSTAL} 
                    onChange={handleChange}
                    error={errors.COD_POSTAL}
                    className={autoFillClass}
                />
                <Input 
                    label="POBLACIÓN" 
                    name="POBLACION" 
                    value={formData.POBLACION} 
                    onChange={handleChange}
                    error={errors.POBLACION}
                    className={autoFillClass}
                />
                <Select 
                    label="REGIÓN" 
                    name="REGION" 
                    value={formData.REGION} 
                    onChange={handleChange}
                >
                    <option value="">Select</option>
                    <option value="Andalucía">Andalucía</option>
                    <option value="Cataluña">Cataluña</option>
                    <option value="Madrid">Madrid</option>
                </Select>
                <Select 
                    label="PAÍS" 
                    name="PAIS" 
                    value={formData.PAIS} 
                    onChange={handleChange}
                    error={errors.PAIS}
                    className={autoFillClass}
                >
                    <option value="">Select</option>
                    <option value="España">España</option>
                    <option value="Deutschland">Deutschland</option>
                    <option value="France">France</option>
                    <option value="Italia">Italia</option>
                </Select>
                <Input 
                    label="IDIOMA" 
                    name="IDIOMA" 
                    value={formData.IDIOMA} 
                    onChange={handleChange}
                    className={autoFillClass}
                />
                <Input 
                    label="TIPO CLIENTE" 
                    name="TIPO_CLIENTE" 
                    value={formData.TIPO_CLIENTE} 
                    onChange={handleChange}
                    className={autoFillClass}
                />
                <Input 
                    label="EMAIL ENVIO FACTURA" 
                    name="EMAIL_ENVIO_FACTURA" 
                    value={formData.EMAIL_ENVIO_FACTURA} 
                    onChange={handleChange}
                    type="email"
                    className={autoFillClass}
                />
                <Input 
                    label="TELEFONO 1" 
                    name="TELEFONO_1" 
                    value={formData.TELEFONO_1} 
                    onChange={handleChange}
                    type="tel"
                    className={autoFillClass}
                />
                <Input 
                    label="NOMBRE PERSONA CONTACTO" 
                    name="NOMBRE_PERSONA_CONTACTO" 
                    value={formData.NOMBRE_PERSONA_CONTACTO} 
                    onChange={handleChange}
                    className={autoFillClass}
                />
                <Input 
                    label="APELLIDO" 
                    name="APELLIDO" 
                    value={formData.APELLIDO} 
                    onChange={handleChange}
                    className={autoFillClass}
                />
                <Input 
                    label="EMAIL PERSONA CONTACTO" 
                    name="EMAIL_PERSONA_CONTACTO" 
                    value={formData.EMAIL_PERSONA_CONTACTO} 
                    onChange={handleChange}
                    type="email"
                    className={autoFillClass}
                />
                <Input 
                    label="CODIGO IBAN" 
                    name="CODIGO_IBAN" 
                    value={formData.CODIGO_IBAN} 
                    onChange={handleChange}
                    className={autoFillClass}
                />
            </div>
        </div>
    );
};

export default Step2_GeneralData;



