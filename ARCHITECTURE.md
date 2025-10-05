# 🏗️ System Architecture

Technical documentation for the ArcelorMittal Customer Onboarding system.

---

## 📊 System Overview

```
┌─────────────┐         ┌─────────────┐         ┌──────────────┐
│   Frontend  │────────▶│   Backend   │────────▶│  PostgreSQL  │
│  (React)    │  REST   │  (Express)  │  Prisma │  (Database)  │
└─────────────┘         └─────────────┘         └──────────────┘
                              │
                              ▼
                        ┌─────────────┐
                        │ OCR Service │
                        │  (External) │
                        └─────────────┘
```

---

## 📁 Project Structure

```
customer_masterdata_extraction/
│
├── arcelor-backend/                 # Node.js Backend
│   ├── src/
│   │   ├── api/                     # HTTP Routes
│   │   │   ├── uploadRoutes.js     # OCR processing endpoint
│   │   │   └── applicationRoutes.js # CRUD endpoints
│   │   │
│   │   ├── services/               # Business Logic
│   │   │   ├── ocrService.js       # OCR integration
│   │   │   └── transformService.js # Data transformation
│   │   │
│   │   ├── utils/                  # Utilities
│   │   │   ├── db.js               # Prisma client
│   │   │   └── logger.js           # Winston logger
│   │   │
│   │   ├── validation/             # Validation Schemas
│   │   │   └── applicationSchema.js # Zod schema
│   │   │
│   │   ├── config/                 # Configuration
│   │   │   └── index.js            # Environment config
│   │   │
│   │   └── app.js                  # Express app setup
│   │
│   ├── prisma/                     # Database
│   │   ├── schema.prisma           # Database schema
│   │   └── migrations/             # Migration files
│   │
│   ├── logs/                       # Application logs
│   ├── uploads/                    # Temp file storage
│   ├── server.js                   # Entry point
│   ├── package.json
│   └── .env                        # Environment variables
│
├── arcelor-frontend/               # React Frontend
│   ├── src/
│   │   ├── steps/                  # Form Steps (7 components)
│   │   │   ├── Step0_Upload.js
│   │   │   ├── Step1_RequestData.js
│   │   │   ├── Step2_GeneralData.js
│   │   │   ├── Step3_DatosAreaVentas.js
│   │   │   ├── Step4_Destinatarios.js
│   │   │   ├── Step5_CondicionesFinancieras.js
│   │   │   └── Step6_CondicionesAprobadas.js
│   │   │
│   │   ├── components/             # Reusable UI
│   │   │   ├── ui/                 # Base components
│   │   │   │   ├── Button.js
│   │   │   │   ├── Input.js
│   │   │   │   └── Select.js
│   │   │   ├── common/
│   │   │   │   └── Toast.js        # Notifications
│   │   │   ├── Header.js
│   │   │   └── StepIndicator.js
│   │   │
│   │   ├── context/                # Global State
│   │   │   ├── FormContext.js      # Form data (90+ fields)
│   │   │   └── ToastContext.js     # Notifications
│   │   │
│   │   ├── App.js                  # Main component
│   │   ├── index.js                # Entry point
│   │   └── index.css               # Tailwind CSS
│   │
│   ├── public/                     # Static assets
│   ├── package.json
│   └── tailwind.config.js
│
├── README.md                       # Project overview
├── QUICK_START.md                  # Setup guide
└── ARCHITECTURE.md                 # This file
```

---

## 🔄 Data Flow

### **Document Upload & OCR Processing**

```
1. User uploads document (PDF/image)
   │
   ├──▶ Frontend: Step0_Upload.js
   │
2. POST /api/v2/process-document
   │
   ├──▶ Backend: uploadRoutes.js
   │        │
   │        ├──▶ ocrService.js
   │        │    └──▶ External OCR API (raw extraction)
   │        │
   │        └──▶ transformService.js
   │             └──▶ Gemini API (data mapping)
   │
3. Returns structured JSON
   │
   └──▶ Frontend: FormContext auto-fills fields (green borders)
```

### **Application Submission**

```
1. User completes 6-step form
   │
2. POST /api/v2/submit-application
   │
   ├──▶ Backend: applicationRoutes.js
   │        │
   │        ├──▶ Zod validation (applicationSchema.js)
   │        │
   │        ├──▶ Prisma ORM (db.js)
   │        │    └──▶ PostgreSQL
   │        │
   │        └──▶ Winston logger (logger.js)
   │
3. Returns success + application ID
   │
   └──▶ Frontend: Shows toast notification
```

---

## 🗄️ Database Schema

### **CustomerApplication Table**

```prisma
model CustomerApplication {
  id        String   @id @default(uuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Step 1: Request Data (7 fields)
  centro                String?
  fechaSolicitudAlta    String?
  fechaRecepcion        String?
  canal                 String?
  sector                String?
  noProveedor           String?
  condPagoProv          String?
  
  // Step 2: General Data (26 fields)
  numeroCliente         String?
  nombre                String
  cif                   String   @unique
  conceptoBusqueda      String?
  ramo                  String?
  calle                 String?
  numero                String?
  codPostal             String?
  poblacion             String?
  // ... more fields
  
  // Steps 3-6 (60+ more fields)
  // ... see prisma/schema.prisma for complete list
  
  auditLogs AuditLog[]
}

model AuditLog {
  id              String   @id @default(uuid())
  applicationId   String
  application     CustomerApplication @relation(...)
  action          String
  changes         Json?
  ipAddress       String?
  userAgent       String?
  timestamp       DateTime @default(now())
}
```

**Key Features:**
- `cif` is unique (business identifier)
- All fields nullable except `nombre` and `cif`
- Audit log tracks all changes
- Timestamps for created/updated

---

## 🛠️ Technology Stack

### **Backend**

| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime | 16+ |
| **Express** | Web framework | 4.x |
| **PostgreSQL** | Database | 14+ |
| **Prisma** | ORM | 5.x |
| **Zod** | Validation | 3.x |
| **Winston** | Logging | 3.x |
| **Axios** | HTTP client | 1.x |
| **Multer** | File upload | 1.x |

### **Frontend**

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI library | 18.x |
| **Tailwind CSS** | Styling | 3.x |
| **Axios** | HTTP client | 1.x |
| **Context API** | State management | Built-in |

---

## 🔌 API Endpoints

### **POST /api/v2/process-document**
Upload document for OCR processing

**Request:**
```javascript
FormData {
  document: File
}
```

**Response:**
```json
{
  "_ocrSuccess": true,
  "_ocrTimestamp": "2025-10-03T10:30:00Z",
  "nombre": "Company Name",
  "cif": "B12345678",
  "calle": "Main Street",
  // ... 90+ fields
}
```

### **POST /api/v2/submit-application**
Submit completed application

**Request:**
```json
{
  "nombre": "Company Name",
  "cif": "B12345678",
  // ... 90+ fields
}
```

**Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "applicationId": "uuid"
}
```

### **GET /api/v2/applications**
List all applications

**Response:**
```json
{
  "applications": [
    {
      "id": "uuid",
      "nombre": "Company Name",
      "cif": "B12345678",
      "createdAt": "2025-10-03T10:30:00Z"
    }
  ]
}
```

### **GET /api/v2/applications/:id**
Get application by ID

**Response:**
```json
{
  "id": "uuid",
  "nombre": "Company Name",
  // ... all fields
}
```

---

## 🔐 Security

### **Input Validation**

**Client-side (Frontend):**
```javascript
// App.js - validationRules
const validationRules = {
  1: ['CENTRO', 'CANAL', 'SECTOR'],
  2: ['NOMBRE', 'CIF', 'CALLE', 'COD_POSTAL'],
  // ... per step
};
```

**Server-side (Backend):**
```javascript
// validation/applicationSchema.js
const applicationSchema = z.object({
  nombre: z.string().min(1).max(255),
  cif: z.string().regex(/^[A-Z][0-9]{8}$/),
  // ... 90+ field validations
});
```

### **File Upload**

- **Max size:** 10MB
- **Storage:** Temporary (in-memory with Multer)
- **Cleanup:** Automatic after processing

### **Database**

- **Unique constraint:** `cif` (prevents duplicates)
- **Indexes:** `cif`, `createdAt` (performance)
- **Type safety:** Prisma generates TypeScript types

---

## 📊 Logging

### **Winston Configuration**

```javascript
// utils/logger.js
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: 'logs/combined.log' 
    })
  ]
});
```

**Log Levels:**
- `error` - Errors only → `error.log`
- `info` - All logs → `combined.log`
- `debug` - Development only

**Log Files:**
- `logs/error.log` - Errors only
- `logs/combined.log` - All logs

---

## 🧩 Component Architecture

### **Frontend Component Hierarchy**

```
App.js
├── ToastProvider (context)
│   └── Toast (notification component)
│
└── FormProvider (context)
    ├── Header
    ├── StepIndicator
    │
    └── Current Step Component
        ├── Step0_Upload
        ├── Step1_RequestData
        ├── Step2_GeneralData
        ├── Step3_DatosAreaVentas
        ├── Step4_Destinatarios
        ├── Step5_CondicionesFinancieras
        └── Step6_CondicionesAprobadas
```

### **Backend Layer Architecture**

```
Request
  │
  ├──▶ Routes (api/)
  │     └──▶ Handle HTTP, parse request
  │
  ├──▶ Validation (validation/)
  │     └──▶ Validate with Zod
  │
  ├──▶ Services (services/)
  │     └──▶ Business logic
  │
  ├──▶ Utils (utils/)
  │     ├──▶ db.js (Prisma)
  │     └──▶ logger.js (Winston)
  │
  └──▶ Database (PostgreSQL)
```

---

## 🔧 Configuration

### **Environment Variables**

```env
# Server
PORT=5001
NODE_ENV=development

# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/arcelordb"

# OCR Service
OCR_SERVICE_URL=http://ocr-service:8000/api/v1/ocr
OCR_TIMEOUT=90000
OCR_MODEL=gemini-2.5-flash

# Gemini Transformer
GEMINI_API_URL=https://generativelanguage.googleapis.com/...
GEMINI_API_KEY=your_api_key

# Logging
LOG_LEVEL=info
```

---

## 📈 Performance

### **Database Indexes**

```prisma
@@index([cif])      // Fast CIF lookups
@@index([createdAt]) // Fast date queries
```

### **Optimizations**

- **Prisma:** Connection pooling
- **Multer:** In-memory uploads (fast)
- **React:** Context API (minimal re-renders)
- **Logging:** Async file writes

---

## 🧪 Development

### **Adding New Field**

1. **Frontend:** Add to `FormContext.js` initialState
2. **Backend:** Add to `prisma/schema.prisma`
3. **Migration:** `npx prisma migrate dev`
4. **Validation:** Add to `validation/applicationSchema.js`
5. **UI:** Add to appropriate step component

### **Adding New API Endpoint**

1. Create route in `src/api/`
2. Add validation schema in `src/validation/`
3. Implement business logic in `src/services/`
4. Register route in `src/app.js`

### **Database Changes**

```bash
# Edit schema
nano prisma/schema.prisma

# Create migration
npx prisma migrate dev --name description

# Apply to production
npx prisma migrate deploy
```

---

## 📚 Code Conventions

### **Backend**

- **Files:** camelCase ending with purpose (e.g., `ocrService.js`)
- **Functions:** camelCase, async/await
- **Logging:** Use `logger.info()`, not `console.log()`
- **Errors:** Try-catch with logger.error()

### **Frontend**

- **Components:** PascalCase (e.g., `Button.js`)
- **Steps:** `Step[N]_[Name].js` format
- **Styling:** Tailwind utility classes
- **State:** Context API, not prop drilling

---

## 🎯 Best Practices

✅ **Separation of Concerns** - Each layer has one responsibility  
✅ **DRY Principle** - Reusable components and utilities  
✅ **Type Safety** - Zod validation + Prisma types  
✅ **Error Handling** - Try-catch + logging everywhere  
✅ **Clean Code** - Small functions, clear names  

---

**For setup instructions, see:** [`QUICK_START.md`](QUICK_START.md)  
**For project overview, see:** [`README.md`](README.md)



