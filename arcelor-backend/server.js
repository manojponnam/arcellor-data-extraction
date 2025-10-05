// arcelor-backend/server.js
const app = require('./src/app');
const config = require('./src/config');

app.listen(config.port, () => {
  console.log('\n🚀 ========================================');
  console.log(`   ArcelorMittal Backend Server v2.0`);
  console.log(`   Running on http://localhost:${config.port}`);
  console.log('   ========================================\n');
  console.log('📋 Configuration:');
  console.log(`   OCR Service: ${config.ocr.serviceUrl}`);
  console.log(`   Max File Size: ${config.upload.maxFileSize / 1024 / 1024}MB`);
  console.log(`   Allowed Types: ${config.upload.allowedTypes.join(', ')}`);
  console.log('\n✅ Ready to process documents!\n');
});

