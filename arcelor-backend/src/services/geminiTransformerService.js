// arcelor-backend/src/services/geminiTransformerService.js
const axios = require('axios');
const config = require('../config');

/**
 * Process PDF directly with Gemini (OPTIMIZED - Single API Call)
 * @param {Buffer} fileBuffer - PDF file buffer
 * @param {string} mimeType - File MIME type
 * @returns {Promise<Object>} - Mapped form data
 */
async function processDirectWithGemini(fileBuffer, mimeType) {
  if (!config.gemini || !config.gemini.apiKey || config.gemini.apiKey === "YOUR_GEMINI_API_KEY") {
    throw new Error('Gemini API Key not configured. Cannot use direct processing.');
  }

  const targetSchema = getTargetSchema();
  
  const prompt = `You are an expert data extraction AI for ArcelorMittal customer onboarding forms.

TASK: Extract ALL data from this German Creditreform business report PDF and map it to a Spanish customer onboarding form.

CRITICAL MAPPING RULES:
1. Extract company name → NOMBRE
2. Extract VAT ID (USt-ID Nr.) → CIF
3. Split street address:
   - Street name → CALLE (e.g., "Stadtring Nordhorn" from "Stadtring Nordhorn 111")
   - Street number → NUMERO (e.g., "111" from "Stadtring Nordhorn 111")
4. Extract postal code → COD_POSTAL
5. Extract city → POBLACION
6. Extract country → PAIS
7. Extract phone → TELEFONO_1
8. Extract email → EMAIL_ENVIO_FACTURA and EMAIL_PERSONA_CONTACTO
9. Extract legal form → TIPO_CLIENTE
10. Extract business purpose → RAMO
11. Extract first managing director:
    - Full name → PERSONA_CONTACTO
    - Last name only → APELLIDO
12. Extract all certifications (e.g., IATF 16949) → CERTIFICADOS (comma-separated)
13. Extract credit limit → CREDITO_SOLICITADO_EUROS (clean format: "650000" not "650.000,00")
14. Set IDIOMA based on country: "DE" for Germany, "ES" for Spain, "FR" for France
15. Extract employee count and create summary → TEXTOS_INFORMATIVOS
16. For DESTINATARIO_MERCANCIA and DESTINATARIO_FACTURA fields, use the main company address
17. Set MONEDA to "EUR" by default

IMPORTANT:
- If a field cannot be found, leave it as empty string ""
- DO NOT invent data
- Extract only what exists in the document
- Return ONLY valid JSON matching the schema below

TARGET SCHEMA:
${JSON.stringify(targetSchema, null, 2)}

Analyze the document and return the mapped JSON data:`;

  try {
    console.log('🚀 [OPTIMIZED] Processing PDF directly with Gemini (single call)...');
    console.time('Direct Gemini Processing');
    
    // Convert buffer to base64
    const base64Data = fileBuffer.toString('base64');
    
    const response = await axios.post(
      `${config.gemini.apiUrl}?key=${config.gemini.apiKey}`,
      {
        contents: [{
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: mimeType,
                data: base64Data
              }
            }
          ]
        }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.1,
        },
      },
      { 
        headers: { 'Content-Type': 'application/json' },
        timeout: 120000 // 2 minutes timeout (reasonable for single call)
      }
    );

    console.timeEnd('Direct Gemini Processing');
    
    const jsonString = response.data.candidates[0].content.parts[0].text;
    const transformedData = JSON.parse(jsonString);
    
    // Ensure meta fields are set
    transformedData._ocrSuccess = true;
    transformedData._ocrTimestamp = new Date().toISOString();
    transformedData._processingMethod = 'direct_gemini';
    
    console.log('✅ Direct Gemini processing complete!');
    return transformedData;
    
  } catch (error) {
    console.error('❌ Direct Gemini processing failed:', error.message);
    console.timeEnd('Direct Gemini Processing');
    throw error;
  }
}

/**
 * Define the complete form schema (all 6 steps)
 */
function getTargetSchema() {
  return {
    // Meta fields
    _ocrSuccess: true,
    _ocrTimestamp: "",
    
    // Step 1: Request Data
    CENTRO: "",
    FECHA_SOLICITUD_ALTA: "",
    FECHA_RECEPCION: "",
    CANAL: "",
    SECTOR: "",
    NO_PROVEEDOR: "",
    COND_PAGO_PROV: "",
    
    // Step 2: General Data
    NUMERO_CLIENTE: "",
    NOMBRE: "",
    CIF: "",
    CONCEPTO_BUSQUEDA: "",
    RAMO: "",
    CALLE: "",
    NUMERO: "",
    COD_POSTAL: "",
    POBLACION: "",
    REGION: "",
    PAIS: "",
    APDO_CORREOS: "",
    POBL_APDO: "",
    COD_APDO: "",
    IDIOMA: "",
    TELEFONO_1: "",
    HORARIO_DE_DESCARGA: "",
    PERSONA_CONTACTO: "",
    TELEFONO: "",
    EMAIL_PERSONA_CONTACTO: "",
    TEXTOS_INFORMATIVOS: "",
    CODIGO_IBAN: "",
    TIPO_CLIENTE: "",
    APELLIDO: "",
    EMAIL_ENVIO_FACTURA: "",
    
    // Step 3: Sales Area Data
    GRUPO_VENDEDORES: "",
    OFICINA_VENTAS: "",
    MONEDA: "EUR",
    COND_EXP: "",
    ZONA_DE_VENTAS: "",
    INCOTERM: "",
    CALENDARIO_FACTURACION: "",
    VALORACION_PORTES: "",
    TIPO_FACTURACION: "",
    CERTIFICADOS: "",
    FACT_EMAIL: "",
    CLASE_ABC: "",
    PROCEDIMIENTO_RECLAMACION: "",
    E_MAIL_RECLAMACION: "",
    
    // Step 4: Recipients
    DESTINATARIO_MERCANCIA_NOMBRE: "",
    DESTINATARIO_MERCANCIA_CALLE: "",
    DESTINATARIO_MERCANCIA_POBLACION: "",
    DESTINATARIO_FACTURA_NOMBRE: "",
    DESTINATARIO_FACTURA_CALLE: "",
    DESTINATARIO_FACTURA_POBLACION: "",
    
    // Step 5: Financial Conditions
    V_PAGO: "",
    COND_PAGO: "",
    DESCUENTO_PP: "",
    GASTOS_FIN: "",
    DIAS_MEDIOS_PAGO: "",
    VENTAS_ESTIMADAS_ANO_EUROS: "",
    VENTAS_LIMITADAS_EUROS: "",
    CREDITO_SOLICITADO_EUROS: "",
    
    // Step 6: Approved Conditions (Internal)
    CREDITO_CONCEDIDO_EUROS: "",
    DPP_OFICIAL: "",
    G_FINANCIERO_OFICIAL: ""
  };
}

/**
 * Use Gemini 2.5 Pro to intelligently transform OCR data to form structure
 * @param {Object} rawOcrJson - Raw OCR response with nested structure
 * @returns {Promise<Object>} - Intelligently mapped form data
 */
async function transformWithGemini(rawOcrJson) {
  if (!config.gemini || !config.gemini.apiKey || config.gemini.apiKey === "YOUR_GEMINI_API_KEY") {
    console.warn('⚠️  Gemini API Key not configured. Falling back to basic transformation.');
    return basicTransform(rawOcrJson);
  }

  const targetSchema = getTargetSchema();
  
  const prompt = `You are an expert data mapping AI for ArcelorMittal customer onboarding forms.

Your task: Map data from a German Creditreform business report to a Spanish customer onboarding form.

CRITICAL INSTRUCTIONS:
1. The source data is a nested JSON object from OCR extraction.
2. The 'address' field may be an object with {street, zip_code, city, country}.
3. Extract the street NUMBER from the street field (e.g., "Stadtring Nordhorn 111" → CALLE: "Stadtring Nordhorn", NUMERO: "111").
4. Map the first managing director to PERSONA_CONTACTO (full name) and APELLIDO (last name only).
5. The CIF field should be the VAT ID (vat_id or USt-ID Nr.).
6. CERTIFICADOS should list all certifications (e.g., "IATF 16949").
7. RAMO is the registered business purpose (registered_business_purpose).
8. TIPO_CLIENTE is the legal form (legal_form).
9. CREDITO_SOLICITADO_EUROS should be the credit limit from creditworthiness (credit_limit_eur), cleaned to a number (e.g., "650.000,00" → "650000").
10. IDIOMA: "DE" for Deutschland, "ES" for España, "FR" for France.
11. For DESTINATARIO_MERCANCIA and DESTINATARIO_FACTURA, use the main company address as default.
12. EMAIL_ENVIO_FACTURA and EMAIL_PERSONA_CONTACTO should use the company email.
13. TEXTOS_INFORMATIVOS: Create a brief summary with employee count and business description.
14. If a value is not found in the source data, leave it as an empty string "".
15. DO NOT INVENT DATA. Only map what exists in the source.

SOURCE DATA (from OCR):
${JSON.stringify(rawOcrJson, null, 2)}

TARGET SCHEMA:
${JSON.stringify(targetSchema, null, 2)}

OUTPUT: Return ONLY a valid JSON object matching the TARGET SCHEMA structure. No explanations, no markdown.`;

  try {
    console.log('🤖 Calling Gemini AI for intelligent transformation...');
    
    const response = await axios.post(
      `${config.gemini.apiUrl}?key=${config.gemini.apiKey}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.1, // Low temperature for consistent mapping
        },
      },
      { 
        headers: { 'Content-Type': 'application/json' },
        timeout: 300000 // 5 minutes for Gemini AI (handles large prompts)
      }
    );

    const jsonString = response.data.candidates[0].content.parts[0].text;
    const transformedData = JSON.parse(jsonString);
    
    // Ensure meta fields are set
    transformedData._ocrSuccess = true;
    transformedData._ocrTimestamp = new Date().toISOString();
    
    console.log('✅ Gemini transformation complete!');
    return transformedData;
    
  } catch (error) {
    console.error('❌ Gemini transformation failed:', error.message);
    console.warn('⚠️  Falling back to basic transformation.');
    return basicTransform(rawOcrJson);
  }
}

/**
 * Basic fallback transformation if Gemini API is not available
 */
function basicTransform(ocrData) {
  const response = ocrData.response || ocrData;
  const companyId = response.company_identification || {};
  const address = companyId.address || {};
  const contact = companyId.contact || {};
  const regDetails = companyId.registration_details || {};
  const creditworthiness = response.creditworthiness || {};
  const business = response.business_activity || {};
  const management = response.management_and_representation || {};
  
  // Parse street number
  let street = address.street || '';
  let streetNumber = '';
  if (street) {
    const parts = street.split(' ');
    const lastPart = parts[parts.length - 1];
    if (/^\d+/.test(lastPart)) {
      streetNumber = lastPart;
      street = parts.slice(0, -1).join(' ');
    }
  }
  
  const managingDirector = (management.managing_directors || [])[0];
  const contactPerson = managingDirector?.name || '';
  const lastName = contactPerson.split(' ').pop();
  
  // Clean credit limit - handle both number and string formats
  let creditLimit = '';
  if (creditworthiness.credit_limit_eur) {
    if (typeof creditworthiness.credit_limit_eur === 'number') {
      creditLimit = creditworthiness.credit_limit_eur.toString();
    } else {
      creditLimit = creditworthiness.credit_limit_eur.replace(/[^\d,]/g, '').replace(',', '.');
    }
  }
  
  return {
    _ocrSuccess: true,
    _ocrTimestamp: new Date().toISOString(),
    
    // Step 2: General Data (main fields)
    NOMBRE: companyId.name || companyId.company_name || '',
    CIF: companyId.vat_id || '',
    CALLE: street,
    NUMERO: streetNumber,
    COD_POSTAL: address.zip_code || address.postal_code || '',
    POBLACION: address.city || '',
    PAIS: address.country || 'Deutschland',
    IDIOMA: 'DE',
    TIPO_CLIENTE: companyId.legal_form || '',
    PERSONA_CONTACTO: contactPerson,
    APELLIDO: lastName,
    EMAIL_ENVIO_FACTURA: companyId.email || '',
    EMAIL_PERSONA_CONTACTO: companyId.email || '',
    TELEFONO_1: companyId.phone || '',
    RAMO: business.registered_business_purpose?.substring(0, 100) || '',
    CERTIFICADOS: (business.certifications || []).join(', '),
    CREDITO_SOLICITADO_EUROS: creditLimit,
  };
}

module.exports = { 
  processDirectWithGemini,
  transformWithGemini 
};

