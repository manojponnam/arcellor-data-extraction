import React, { createContext, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [applicationType, setApplicationType] = useState(null); // Track which type of application
    const [formData, setFormData] = useState({
        // OCR status fields
        _ocrSuccess: false,
        _ocrFailed: false,
        _ocrError: '',
        _ocrTimestamp: '',

        // ===== PHASE 2: All 6 Steps =====
        
        // Step 1: Request Data
        CENTRO: '',
        FECHA_SOLICITUD_ALTA: new Date().toISOString().slice(0, 10),
        FECHA_RECEPCION: '',
        CANAL: '',
        SECTOR: '',
        NO_PROVEEDOR: '',
        COND_PAGO_PROV: '',
        DADO_DE_ALTA_COMO_PROVEEDOR: '',
        ABIERTO_COMO_CLIENTE: false,
        CENTRO_ORIGEN: '',

        // Step 2: General Data
        NUMERO_CLIENTE: '', 
        NOMBRE: '', 
        CIF: '', 
        CONCEPTO_BUSQUEDA: '',
        RAMO: '', 
        CALLE: '', 
        NUMERO: '', 
        COD_POSTAL: '', 
        POBLACION: '',
        REGION: '', 
        PAIS: '', 
        APDO_CORREOS: '', 
        POBL_APDO: '',
        COD_APDO: '', 
        IDIOMA: '', 
        TIPO_CLIENTE: '',
        PERSONA_CONTACTO_ENVIO_FACTURA_EMAIL: '',
        EMAIL_ENVIO_FACTURA: '',
        TELEFONO_1: '', 
        NOMBRE_PERSONA_CONTACTO: '', 
        APELLIDO: '',
        TELEFONO: '',
        EMAIL_PERSONA_CONTACTO: '',
        TEXTOS_INFORMATIVOS: '', 
        CODIGO_IBAN: '',
        HORARIO_DE_DESCARGA: '',
        PERSONA_CONTACTO: '',

        // Step 3: Sales Area Data
        GRUPO_VENDEDORES: '',
        OFICINA_VENTAS: '',
        MONEDA: 'EUR',
        COND_EXP: '',
        ZONA_DE_VENTAS: '',
        INCOTERM: '',
        CALENDARIO_FACTURACION: '',
        VALORACION_PORTES: '',
        TIPO_FACTURACION: '',
        CERTIFICADOS: '',
        FACT_EMAIL: '',
        CLASE_ABC: '',
        PROCEDIMIENTO_RECLAMACION: '',
        E_MAIL_RECLAMACION: '',

        // Step 4: Recipients
        DESTINATARIO_MERCANCIA_NOMBRE: '',
        DESTINATARIO_MERCANCIA_CALLE: '',
        DESTINATARIO_MERCANCIA_NUMERO: '',
        DESTINATARIO_MERCANCIA_COD_POSTAL: '',
        DESTINATARIO_MERCANCIA_POBLACION: '',
        DESTINATARIO_MERCANCIA_PAIS: '',
        DESTINATARIO_FACTURA_NOMBRE: '',
        DESTINATARIO_FACTURA_CALLE: '',
        DESTINATARIO_FACTURA_NUMERO: '',
        DESTINATARIO_FACTURA_COD_POSTAL: '',
        DESTINATARIO_FACTURA_POBLACION: '',
        DESTINATARIO_FACTURA_PAIS: '',

        // Step 5: Financial Conditions
        V_PAGO: '',
        COND_PAGO: '',
        FORMA_PAGO: '',
        DESCUENTO_PP: '',
        GASTOS_FIN: '',
        DIAS_MEDIOS_PAGO: '',
        VENTAS_ESTIMADAS_ANO_EUROS: '',
        VENTAS_LIMITADAS_EUROS: '',
        CREDITO_SOLICITADO_EUROS: '',
        LIMITE_CREDITO: '',
        OBSERVACIONES_FINANCIERAS: '',

        // Step 6: Approved Conditions (Internal)
        CREDITO_CONCEDIDO_EUROS: '',
        DPP_OFICIAL: '',
        G_FINANCIERO_OFICIAL: '',
        FECHA_APROBACION: '',
        APROBADO_POR: '',
        ESTADO_APROBACION: 'pending',
        NOTAS_APROBACION: ''
    });

    const updateFormData = (newData) => {
        setFormData(prev => ({ ...prev, ...newData }));
    };

    const resetFormData = () => {
        setFormData({
            _ocrSuccess: false,
            _ocrFailed: false,
            _ocrError: '',
            _ocrTimestamp: '',
            CENTRO: '',
            FECHA_SOLICITUD_ALTA: new Date().toISOString().slice(0, 10),
            FECHA_RECEPCION: '',
            CANAL: '',
            SECTOR: '',
            NO_PROVEEDOR: '',
            COND_PAGO_PROV: '',
            DADO_DE_ALTA_COMO_PROVEEDOR: '',
            ABIERTO_COMO_CLIENTE: false,
            CENTRO_ORIGEN: '',
            NUMERO_CLIENTE: '', 
            NOMBRE: '', 
            CIF: '', 
            CONCEPTO_BUSQUEDA: '',
            RAMO: '', 
            CALLE: '', 
            NUMERO: '', 
            COD_POSTAL: '', 
            POBLACION: '',
            REGION: '', 
            PAIS: '', 
            APDO_CORREOS: '', 
            POBL_APDO: '',
            COD_APDO: '', 
            IDIOMA: '', 
            TIPO_CLIENTE: '',
            PERSONA_CONTACTO_ENVIO_FACTURA_EMAIL: '',
            EMAIL_ENVIO_FACTURA: '',
            TELEFONO_1: '', 
            NOMBRE_PERSONA_CONTACTO: '', 
            APELLIDO: '',
            TELEFONO: '',
            EMAIL_PERSONA_CONTACTO: '',
            TEXTOS_INFORMATIVOS: '', 
            CODIGO_IBAN: '',
            HORARIO_DE_DESCARGA: '',
            PERSONA_CONTACTO: '',
            GRUPO_VENDEDORES: '',
            OFICINA_VENTAS: '',
            MONEDA: 'EUR',
            COND_EXP: '',
            ZONA_DE_VENTAS: '',
            INCOTERM: '',
            CALENDARIO_FACTURACION: '',
            VALORACION_PORTES: '',
            TIPO_FACTURACION: '',
            CERTIFICADOS: '',
            FACT_EMAIL: '',
            CLASE_ABC: '',
            PROCEDIMIENTO_RECLAMACION: '',
            E_MAIL_RECLAMACION: '',
            DESTINATARIO_MERCANCIA_NOMBRE: '',
            DESTINATARIO_MERCANCIA_CALLE: '',
            DESTINATARIO_MERCANCIA_NUMERO: '',
            DESTINATARIO_MERCANCIA_COD_POSTAL: '',
            DESTINATARIO_MERCANCIA_POBLACION: '',
            DESTINATARIO_MERCANCIA_PAIS: '',
            DESTINATARIO_FACTURA_NOMBRE: '',
            DESTINATARIO_FACTURA_CALLE: '',
            DESTINATARIO_FACTURA_NUMERO: '',
            DESTINATARIO_FACTURA_COD_POSTAL: '',
            DESTINATARIO_FACTURA_POBLACION: '',
            DESTINATARIO_FACTURA_PAIS: '',
            V_PAGO: '',
            COND_PAGO: '',
            FORMA_PAGO: '',
            DESCUENTO_PP: '',
            GASTOS_FIN: '',
            DIAS_MEDIOS_PAGO: '',
            VENTAS_ESTIMADAS_ANO_EUROS: '',
            VENTAS_LIMITADAS_EUROS: '',
            CREDITO_SOLICITADO_EUROS: '',
            LIMITE_CREDITO: '',
            OBSERVACIONES_FINANCIERAS: '',
            CREDITO_CONCEDIDO_EUROS: '',
            DPP_OFICIAL: '',
            G_FINANCIERO_OFICIAL: '',
            FECHA_APROBACION: '',
            APROBADO_POR: '',
            ESTADO_APROBACION: 'pending',
            NOTAS_APROBACION: ''
        });
    };

    return (
        <FormContext.Provider value={{ 
            formData, 
            updateFormData, 
            resetFormData,
            applicationType, 
            setApplicationType 
        }}>
            {children}
        </FormContext.Provider>
    );
};

