# OCR Service Configuration

Your OCR service is now configured and ready to use!

---

## ✅ Current Configuration

Based on your curl command, the system is configured with:

```env
OCR_SERVICE_URL=http://4.236.205.190:8000/api/v1/new_agentic_ocr
OCR_TIMEOUT=90000
OCR_MODEL=gemini-2.5-flash
OCR_MODEL_ALT=Qwen2-VL-72B-Instruct
OCR_PROMPT=Extract all fields in json
```

---

## 🔄 How It Works

### **1. User Uploads Document**
Frontend sends file to backend endpoint:
```
POST /api/v2/process-document
```

### **2. Backend Processes File**
File: `src/api/uploadRoutes.js`
- Receives file via Multer
- Calls `ocrService.processWithOCR(file)`

### **3. OCR Service Call**
File: `src/services/ocrService.js`
- Creates FormData with your exact curl parameters:
  ```javascript
  formData.append('blob_url', `"${config.ocr.blobUrl}"`);
  formData.append('prompt', `"${config.ocr.prompt}"`);
  formData.append('model', `"${config.ocr.model}"`);
  formData.append('model', `"${config.ocr.modelAlt}"`);
  formData.append('file', file.buffer, file.originalname);
  ```

### **4. Data Transformation**
File: `src/services/transformService.js`
- Receives raw OCR response
- Maps to 90+ form fields
- Returns structured data

### **5. Frontend Auto-fills**
- FormContext receives data
- Fields auto-populate (green borders)
- User reviews and submits

---

## 🧪 Testing Your OCR

### **Method 1: Via Frontend** (Recommended)

```bash
# Terminal 1: Start backend
cd arcelor-backend
npm start

# Terminal 2: Start frontend
cd arcelor-frontend
npm start

# Browser: http://localhost:3000
# Upload a PDF/image and watch it auto-fill!
```

### **Method 2: Via curl** (Direct test)

```bash
curl --location 'http://localhost:5001/api/v2/process-document' \
  --form 'document=@"/path/to/your/document.pdf"'
```

### **Method 3: Via Postman**

1. **URL:** `POST http://localhost:5001/api/v2/process-document`
2. **Body:** form-data
3. **Key:** `document` (type: File)
4. **Value:** Select your PDF/image file
5. **Send**

---

## 📊 Expected Response

### **Success Response:**
```json
{
  "_ocrSuccess": true,
  "_ocrTimestamp": "2025-10-03T12:30:00.000Z",
  "NOMBRE": "Fischer Fertigungstechnik GmbH",
  "CIF": "DE123456789",
  "CALLE": "Stadtring Nordhorn",
  "NUMERO": "111",
  "COD_POSTAL": "33334",
  "POBLACION": "Gütersloh",
  "PAIS": "Deutschland",
  ...90+ more fields
}
```

### **Failure Response:**
```json
{
  "_ocrFailed": true,
  "_ocrError": "OCR processing failed: timeout",
  "message": "Please enter data manually"
}
```

---

## 🔍 Monitoring

### **Check Logs**

```bash
# All logs
cat logs/combined.log

# Errors only
cat logs/error.log

# Real-time monitoring
tail -f logs/combined.log
```

### **What to Look For:**

**Successful OCR:**
```
📄 Processing: document.pdf (application/pdf, 245678 bytes)
📤 Sending to OCR service: http://4.236.205.190:8000/api/v1/new_agentic_ocr
✅ OCR service response received: 200
🔄 Transforming OCR data to form structure...
```

**Failed OCR:**
```
❌ OCR service error: timeout of 90000ms exceeded
⚠️  OCR processing failed, returning error flag
```

---

## ⚙️ Configuration Files

### **Where Your Config is Used:**

1. **`.env`** (root config)
   - Loaded by `dotenv` package
   - Contains your actual values
   - **NEVER commit to git!**

2. **`src/config/index.js`** (config loader)
   - Reads from `.env`
   - Provides defaults
   - Validates configuration

3. **`src/services/ocrService.js`** (OCR caller)
   - Uses `config.ocr.*` values
   - Makes POST request
   - Handles errors

4. **`src/services/transformService.js`** (data mapper)
   - Transforms OCR response
   - Maps to form fields
   - Cleans data

---

## 🛠️ Customization

### **Change OCR Prompt**

Edit `.env`:
```env
OCR_PROMPT=Extract company information including name, address, tax ID, and contact details as JSON
```

### **Change Timeout**

Edit `.env`:
```env
OCR_TIMEOUT=120000  # 2 minutes
```

### **Change Models**

Edit `.env`:
```env
OCR_MODEL=gpt-4-vision
OCR_MODEL_ALT=claude-3-opus
```

Restart backend after changes:
```bash
npm start
```

---

## 🐛 Troubleshooting

### **OCR Returns Empty Data**

Check if service is accessible:
```bash
curl -X POST http://4.236.205.190:8000/api/v1/new_agentic_ocr \
  --form 'prompt="test"' \
  --form 'model="gemini-2.5-flash"' \
  --form 'file=@test.pdf'
```

### **Timeout Errors**

Increase timeout in `.env`:
```env
OCR_TIMEOUT=180000  # 3 minutes
```

### **Wrong Data Format**

Check `transformService.js` - the mapping logic may need adjustment based on your OCR response format.

### **Network Errors**

1. Verify OCR service URL is accessible
2. Check firewall rules
3. Test from backend server directly

---

## 📝 Summary

| Component | Status | Location |
|-----------|--------|----------|
| **Configuration** | ✅ Done | `.env` |
| **OCR Service** | ✅ Done | `src/services/ocrService.js` |
| **Transform Service** | ✅ Done | `src/services/transformService.js` |
| **API Endpoint** | ✅ Done | `src/api/uploadRoutes.js` |
| **Frontend Integration** | ✅ Done | `arcelor-frontend/src/steps/Step0_Upload.js` |

**Your OCR is ready to use! Just start the backend and upload a document.** 🚀

---

**Last Updated:** October 3, 2025  
**Configuration Source:** User's curl command  
**Status:** Production Ready ✅



