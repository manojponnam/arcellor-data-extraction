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
 * Intelligently merge form data from multiple sources
 * Rule: Non-empty values override empty values, longer strings preferred
 */
function mergeFormData(data1, data2) {
  const merged = { ...data1 };
  
  for (const key in data2) {
    const val1 = data1[key];
    const val2 = data2[key];
    
    // Skip meta fields - handle separately
    if (key.startsWith('_')) continue;
    
    // If val1 is empty/null, use val2
    if (!val1 || val1 === '') {
      merged[key] = val2;
    }
    // If val2 is not empty and longer, use val2
    else if (val2 && val2.length > val1.length) {
      merged[key] = val2;
    }
    // Otherwise keep val1
  }
  
  return merged;
}

/**
 * @route   POST /api/v2/process-document
 * @desc    Process document(s) with OCR and return structured form data
 */
router.post('/process-document', upload.array('documents', 5), async (req, res) => {
  try {
    // Support both single file (legacy) and multiple files
    const files = req.files || (req.file ? [req.file] : []);
    
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log(`📥 ${files.length} file(s) received:`, files.map(f => f.originalname).join(', '));
    console.log('📊 Total size:', (files.reduce((sum, f) => sum + f.size, 0) / 1024).toFixed(2), 'KB');
    
    let mergedFormData = null;
    let filesProcessed = 0;
    let filesFailed = 0;
    
    console.log('\n🔄 Processing files sequentially and merging data...\n');
    console.time('Total Processing Time (All Files)');
    
    // Process each file and merge results
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(`\n📄 [${i + 1}/${files.length}] Processing: ${file.originalname}`);
      
      try {
        let fileFormData;
        
        // Try OPTIMIZED METHOD FIRST: Direct Gemini processing (single API call)
        try {
          console.log('🚀 [OPTIMIZED] Attempting direct Gemini processing...');
          fileFormData = await processDirectWithGemini(file.buffer, file.mimetype);
          console.log('✅ Direct processing successful!');
          
        } catch (directError) {
          console.warn('⚠️  Direct processing failed:', directError.message);
          console.log('🔄 Falling back to two-step OCR method...');
          
          // FALLBACK: Use original two-step process (OCR → Transform)
          const rawOcrData = await processWithOCR(file);
          fileFormData = await transformWithGemini(rawOcrData);
          fileFormData._processingMethod = 'two_step_fallback';
          console.log('✅ Fallback processing successful!');
        }
        
        // Merge with accumulated data
        if (!mergedFormData) {
          mergedFormData = fileFormData;
        } else {
          console.log('🔀 Merging data from multiple files...');
          mergedFormData = mergeFormData(mergedFormData, fileFormData);
        }
        
        filesProcessed++;
        console.log(`✅ File ${i + 1}/${files.length} completed and merged.`);
        
      } catch (fileError) {
        console.error(`❌ Failed to process file ${file.originalname}:`, fileError.message);
        filesFailed++;
        // Continue with next file
      }
    }
    
    console.timeEnd('Total Processing Time (All Files)');
    console.log(`\n📊 Summary: ${filesProcessed}/${files.length} files processed successfully, ${filesFailed} failed.\n`);
    
    if (!mergedFormData) {
      throw new Error('All files failed to process');
    }
    
    // Add metadata about multiple file processing
    mergedFormData._filesProcessed = filesProcessed;
    mergedFormData._totalFiles = files.length;
    mergedFormData._ocrTimestamp = new Date().toISOString();
    
    // ===== DEBUG LOG =====
    console.log('\n============== FINAL MERGED FORM DATA ===============');
    console.log(JSON.stringify(mergedFormData, null, 2));
    console.log('=====================================================\n');
    // ====================
    
    console.log('✅ All processing complete. Sending merged data to frontend.');
    res.status(200).json(mergedFormData);
    
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

