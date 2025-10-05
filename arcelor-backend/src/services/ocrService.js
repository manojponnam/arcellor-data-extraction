// arcelor-backend/src/services/ocrService.js
const axios = require('axios');
const FormData = require('form-data');
const config = require('../config');

/**
 * Process file with OCR service
 * @param {Object} file - Multer file object
 * @returns {Promise<Object>} - OCR extracted data
 */
async function processWithOCR(file) {
  try {
    console.log(`📄 Processing: ${file.originalname} (${file.mimetype}, ${file.size} bytes)`);
    
    // Clean format - no extra quotes (FormData handles escaping)
    const formData = new FormData();
    formData.append('prompt', 'Extract all fields in json');
    formData.append('model', 'gemini-2.5-flash');
    formData.append('file', file.buffer, file.originalname);
    
    console.log(`📤 Sending to OCR service: ${config.ocr.serviceUrl}`);
    console.log(`📋 Form data: prompt="Extract all fields in json ", model="gemini-2.5-flash", file=${file.originalname}`);
    
    // Use ONLY FormData headers - no Authorization (curl doesn't have it)
    const headers = { ...formData.getHeaders() };
    
    const response = await axios.post(config.ocr.serviceUrl, formData, {
      headers,
      timeout: config.ocr.timeout
    });

    console.log('✅ OCR service response received:', response.status);
    
    // Check if the service returned an error within a 200 response
    if (response.data && response.data.status_code >= 400) {
      const errorMsg = response.data.detail?.error || JSON.stringify(response.data.detail);
      throw new Error(`OCR service error: ${errorMsg}`);
    }
    
    return response.data;
    
  } catch (error) {
    console.error('❌ OCR service error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    }
    
    throw new Error(`OCR processing failed: ${error.message}`);
  }
}

module.exports = { processWithOCR };

