// arcelor-backend/src/services/transformService.js

/**
 * Transform OCR response to match form structure
 * @param {Object} ocrData - Raw OCR response
 * @returns {Object} - Transformed data for form
 */
function transformOCRToFormData(ocrData) {
  console.log('🔄 Transforming OCR data to form structure...');
  
  // Handle different response formats
  let data = ocrData;
  if (ocrData.data) data = ocrData.data;
  if (ocrData.result) data = ocrData.result;
  
  // Parse string responses
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (e) {
      console.log('⚠️  Could not parse OCR response as JSON');
    }
  }
  
  // Extract nested structure from OCR
  const response = data.response || data;
  const companyId = response.company_identification || {};
  const contact = companyId.contact || companyId.contact_information || {};
  const general = response.general_information || {};
  const creditworthiness = response.creditworthiness || {};
  const business = response.business_activity || {};
  const financial = response.financial_figures || {};
  const regDetails = companyId.registration_details || {};
  
  // Parse address - handle both string and object formats
  const addressData = companyId.address || '';
  const { street, streetNumber, postalCode, city, country } = parseAddress(addressData);
  
  // Extract and clean values
  const companyName = companyId.company_name || companyId.name || general.company_name_short || '';
  const taxId = regDetails.vat_id || companyId.vat_id_number || companyId.tax_number || '';
  const creditLimit = cleanCreditLimit(creditworthiness.credit_limit_eur || '');
  const language = deriveLanguage(country);
  
  // Extract contact person from management
  const management = response.management_and_representation || {};
  const managingDirectors = management.managing_directors || [];
  const contactPerson = managingDirectors[0]?.name || '';
  const contactPersonLastName = contactPerson.split(' ').pop();
  
  // Map to form structure - PHASE 1 FOCUS (Steps 1-2 only)
  return {
    _ocrSuccess: true,
    _ocrTimestamp: new Date().toISOString(),
    
    // STEP 1: Request Data (Manual fields - OCR provides hints)
    SECTOR: business.certifications?.join(', ') || '',
    COND_PAGO_PROV: creditworthiness.payment_behavior?.payment_method || '',
    
    // STEP 2: General Data (Auto-filled)
    NUMERO_CLIENTE: general.member_id || '',
    NOMBRE: companyName,
    CIF: taxId,
    CONCEPTO_BUSQUEDA: companyName.substring(0, 10).toUpperCase().replace(/[^A-Z0-9]/g, ' '),
    RAMO: business.registered_business_purpose?.substring(0, 100) || '',
    CALLE: street,
    NUMERO: streetNumber,
    COD_POSTAL: postalCode,
    POBLACION: city,
    PAIS: country || 'Deutschland',
    IDIOMA: language,
    TIPO_CLIENTE: regDetails.legal_form || 'Industrial',
    PERSONA_CONTACTO: contactPerson,
    APELLIDO: contactPersonLastName,
    EMAIL_ENVIO_FACTURA: contact.email || '',
    TELEFONO_1: contact.phone || '',
    EMAIL_PERSONA_CONTACTO: contact.email || '',
    TEXTOS_INFORMATIVOS: buildInfoText(financial, business),
    CERTIFICADOS: (business.certifications || []).join(', '),
    
    // Additional fields for later steps (optional in Phase 1)
    LIMITE_CREDITO: creditLimit,
    FORMA_PAGO: creditworthiness.payment_behavior?.payment_method || '',
    OBSERVACIONES_FINANCIERAS: buildFinancialNotes(creditworthiness),
  };
}

/**
 * Parse address - handles both string and object formats
 * @param {string|Object} address - Full address string or address object
 * @returns {Object} - Address components
 */
function parseAddress(address) {
  let street = '', streetNumber = '', postalCode = '', city = '', country = '';
  
  if (!address) return { street, streetNumber, postalCode, city, country };
  
  // Handle object format (new OCR response)
  if (typeof address === 'object') {
    street = address.street || '';
    postalCode = address.zip_code || address.postal_code || '';
    city = address.city || '';
    country = address.country || '';
    
    // Extract street number from street field if present
    // "Stadtring Nordhorn 111" -> street: "Stadtring Nordhorn", number: "111"
    if (street) {
      const streetParts = street.split(' ');
      const lastPart = streetParts[streetParts.length - 1];
      if (/^\d+/.test(lastPart)) {
        streetNumber = lastPart;
        street = streetParts.slice(0, -1).join(' ');
      }
    }
    
    return { street, streetNumber, postalCode, city, country };
  }
  
  // Handle string format (legacy)
  const parts = address.split(',').map(p => p.trim());
  
  if (parts.length >= 3) {
    // "Stadtring Nordhorn 111, 33334 Gütersloh, Deutschland"
    const streetPart = parts[0].split(' ');
    streetNumber = streetPart.pop();
    street = streetPart.join(' ');
    
    const cityPart = parts[1].split(' ');
    postalCode = cityPart[0];
    city = cityPart.slice(1).join(' ');
    
    country = parts[2];
  }
  
  return { street, streetNumber, postalCode, city, country };
}

/**
 * Clean credit limit value
 * @param {string} value - Raw credit limit
 * @returns {string} - Cleaned number string
 */
function cleanCreditLimit(value) {
  if (!value) return '';
  // "650.000,00 EUR" -> "650000.00"
  return value.replace('EUR', '').replace(/\./g, '').replace(',', '.').trim();
}

/**
 * Derive language from country
 * @param {string} country - Country name
 * @returns {string} - Language code
 */
function deriveLanguage(country) {
  if (!country) return 'ES';
  const countryLower = country.toLowerCase();
  if (countryLower.includes('deutsch') || countryLower.includes('germany')) return 'DE';
  if (countryLower.includes('france') || countryLower.includes('francia')) return 'FR';
  return 'ES';
}

/**
 * Build informative text from financial and business data
 */
function buildInfoText(financial, business) {
  const employees = financial.employees_and_revenue?.employees || {};
  const latestYear = Object.keys(employees).sort().reverse()[0];
  const employeeCount = employees[latestYear] || '';
  const purpose = business.registered_purpose?.substring(0, 100) || '';
  return `Employees: ${employeeCount}. ${purpose}`.trim();
}

/**
 * Build financial observations from creditworthiness data
 */
function buildFinancialNotes(creditworthiness) {
  const parts = [];
  if (creditworthiness.bonitaetsindex2_0?.value) {
    parts.push(`Bonitätsindex: ${creditworthiness.bonitaetsindex2_0.value}`);
  }
  if (creditworthiness.pd_probability_of_default?.value) {
    parts.push(`PD: ${creditworthiness.pd_probability_of_default.value}`);
  }
  if (creditworthiness.pd_probability_of_default?.description) {
    parts.push(creditworthiness.pd_probability_of_default.description);
  }
  return parts.join('. ');
}

module.exports = { transformOCRToFormData };

