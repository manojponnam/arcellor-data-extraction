// arcelor-backend/src/api/uploadRoutes.js
const express = require('express');
const multer = require('multer');
const { processWithOCR } = require('../services/ocrService');
const { processDirectWithGemini, transformWithGemini } = require('../services/geminiTransformerService');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

/**
 * @route   POST /api/v2/process-document
 * @desc    Process document with OCR and return structured form data
 */
router.post('/process-document', upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('📥 File received:', req.file.originalname);
    console.log('📊 File size:', (req.file.size / 1024).toFixed(2), 'KB');
    
    let formData;
    
    // Try OPTIMIZED METHOD FIRST: Direct Gemini processing (single API call)
    try {
      console.log('\n🚀 [OPTIMIZED PATH] Attempting direct Gemini processing...');
      console.time('Total Processing Time');
      
      formData = await processDirectWithGemini(req.file.buffer, req.file.mimetype);
      
      console.timeEnd('Total Processing Time');
      console.log('✅ [SUCCESS] Direct processing complete!');
      
      // ===== DEBUG LOG =====
      console.log('\n============== DIRECT GEMINI OUTPUT ===============');
      console.log(JSON.stringify(formData, null, 2));
      console.log('===================================================\n');
      // ====================
      
    } catch (directError) {
      console.warn('⚠️  Direct processing failed:', directError.message);
      console.log('🔄 Falling back to two-step OCR method...\n');
      
      // FALLBACK: Use original two-step process (OCR → Transform)
      console.time('Total Processing Time (Fallback)');
      
      // Step 1: Extract raw data from OCR service
      console.log('[1/2] 🔄 Extracting raw data from OCR service...');
      const rawOcrData = await processWithOCR(req.file);
      
      console.log('\n=============== RAW OCR EXTRACTOR OUTPUT ===============');
      console.log(JSON.stringify(rawOcrData, null, 2));
      console.log('========================================================\n');
      
      // Step 2: Transform with Gemini AI for intelligent field mapping
      console.log('[2/2] 🤖 Transforming with Gemini AI...');
      formData = await transformWithGemini(rawOcrData);
      
      console.timeEnd('Total Processing Time (Fallback)');
      console.log('✅ [FALLBACK SUCCESS] Two-step processing complete!');
      
      console.log('\n============== TRANSFORMED FORM DATA OUTPUT ===============');
      console.log(JSON.stringify(formData, null, 2));
      console.log('===========================================================\n');
      
      formData._processingMethod = 'two_step_fallback';
    }
    
    console.log('✅ Processing complete. Sending data to frontend.');
    res.status(200).json(formData);
    
  } catch (error) {
    console.error('❌ Upload processing error:', error.message);
    
    // Return failure flag for graceful degradation
    res.status(500).json({ 
      _ocrFailed: true,
      _ocrError: error.message,
      message: 'OCR processing failed. Please enter data manually.'
    });
  }
});

module.exports = router;

