// arcelor-backend/src/config/index.js
require('dotenv').config();

const config = {
  port: process.env.PORT || 5001,
  
  ocr: {
    serviceUrl: process.env.OCR_SERVICE_URL || 'http://4.236.205.190:8000/api/v1/new_agentic_ocr',
    apiKey: process.env.OCR_API_KEY || '',
    timeout: parseInt(process.env.OCR_TIMEOUT) || 600000, // 10 minutes (increased for safety)
    prompt: process.env.OCR_PROMPT || 'Extract all fields in json',
    model: process.env.OCR_MODEL || 'gemini-2.5-flash'
  },
  
  gemini: {
    apiUrl: process.env.GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
    apiKey: process.env.GEMINI_API_KEY || ''
  },
  
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 10485760, // 10MB
    allowedTypes: process.env.ALLOWED_FILE_TYPES 
      ? process.env.ALLOWED_FILE_TYPES.split(',') 
      : ['image/jpeg', 'image/png', 'application/pdf', 'text/plain']
  }
};

// Validation
if (!config.ocr.serviceUrl || config.ocr.serviceUrl === 'https://your-ocr-service.com/api') {
  console.warn('⚠️  WARNING: OCR service URL not configured. Using fallback mode.');
}

module.exports = config;

