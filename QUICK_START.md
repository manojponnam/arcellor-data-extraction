# ⚡ Quick Start Guide

Get the ArcelorMittal Customer Onboarding system running in 10 minutes.

---

## 📋 Prerequisites

- **Node.js** 16+ ([Download](https://nodejs.org/))
- **PostgreSQL** 14+ ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/))

---

## 🚀 Setup (10 Minutes)

### **Step 1: Database Setup** (3 minutes)

```bash
# Install PostgreSQL (if not installed)
# Windows: Download from postgresql.org
# Mac: brew install postgresql
# Linux: sudo apt install postgresql

# Start PostgreSQL
# Windows: Runs automatically after install
# Mac: brew services start postgresql
# Linux: sudo systemctl start postgresql

# Create database
psql -U postgres
CREATE DATABASE arcelordb;
\q
```

### **Step 2: Backend Setup** (4 minutes)

```bash
# Navigate to backend
cd arcelor-backend

# Install dependencies
npm install

# Create .env file
# Windows:
copy .env.example .env

# Mac/Linux:
cp .env.example .env

# Edit .env file and add:
# - DATABASE_URL (PostgreSQL connection string)
# - OCR_SERVICE_URL (your OCR service endpoint)
# - GEMINI_API_KEY (if using Gemini for transformation)

# Run database migrations
npx prisma migrate dev

# Start backend
npm start
```

**Backend will run on:** `http://localhost:5001`

### **Step 3: Frontend Setup** (3 minutes)

Open a **new terminal**:

```bash
# Navigate to frontend
cd arcelor-frontend

# Install dependencies
npm install

# Start frontend
npm start
```

**Frontend will open automatically at:** `http://localhost:3000`

---

## ✅ Verify Installation

### **Backend Health Check**
```bash
curl http://localhost:5001
# Should return: "ArcelorMittal AI Backend v3.0 is running."
```

### **Database Check**
```bash
cd arcelor-backend
npx prisma studio
# Opens database GUI at http://localhost:5555
```

### **Frontend Check**
Open browser: `http://localhost:3000`
- You should see the upload page

---

## 🔧 Configuration

### **Backend (.env file)**

```env
# Server
PORT=5001

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/arcelordb?schema=public"

# OCR Service (Step 1: Raw extraction)
OCR_SERVICE_URL=http://your-ocr-service-url
OCR_TIMEOUT=90000
OCR_MODEL=gemini-2.5-flash

# Gemini Transformer (Step 2: Data mapping)
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent
GEMINI_API_KEY=your_gemini_api_key_here

# Logging
LOG_LEVEL=info
NODE_ENV=development
```

---

## 📦 Common Commands

### **Backend**

```bash
# Start server
npm start

# Development mode (auto-reload)
npm run dev

# Database operations
npx prisma migrate dev        # Run migrations
npx prisma studio            # Open database GUI
npx prisma generate          # Generate Prisma client
```

### **Frontend**

```bash
# Start development server
npm start

# Build for production
npm run build
```

---

## 🧪 Testing the Workflow

1. **Upload Document**
   - Drag & drop a business document (PDF/image)
   - Or click to browse files

2. **OCR Processing**
   - System extracts data automatically
   - Fields with green borders = auto-filled

3. **Review & Edit**
   - Navigate through 6 steps
   - Review auto-filled data
   - Fill remaining fields

4. **Submit**
   - Click "Submit Application" on Step 6
   - Success toast notification appears

5. **Verify in Database**
   ```bash
   cd arcelor-backend
   npx prisma studio
   ```
   - Open CustomerApplication table
   - See your submitted data

---

## 🛠️ Troubleshooting

### **Backend won't start**

**Problem:** Port 5001 already in use
```bash
# Windows: Find process using port
netstat -ano | findstr :5001
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5001 | xargs kill -9
```

**Problem:** Database connection failed
- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- Ensure database "arcelordb" exists

### **Frontend won't start**

**Problem:** Port 3000 already in use
- Press `y` when prompted to use another port
- Or kill process on port 3000

### **OCR not working**

**Problem:** "OCR service unavailable"
- Check OCR_SERVICE_URL in .env
- Verify OCR service is accessible
- Check backend logs: `arcelor-backend/logs/error.log`

**Problem:** "Gemini API failed"
- Verify GEMINI_API_KEY in .env
- Check API key validity
- Ensure you have Gemini API access

### **Database Issues**

**Problem:** Prisma migration failed
```bash
# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Or manually:
psql -U postgres
DROP DATABASE arcelordb;
CREATE DATABASE arcelordb;
\q
npx prisma migrate dev
```

---

## 📚 Next Steps

- **See README.md** - Complete feature overview
- **See ARCHITECTURE.md** - Technical details & code structure
- **View logs** - `arcelor-backend/logs/combined.log`
- **Database GUI** - `npx prisma studio`

---

## 🎯 Development Workflow

### **Daily Development**

```bash
# Terminal 1: Backend
cd arcelor-backend
npm run dev

# Terminal 2: Frontend
cd arcelor-frontend
npm start

# Terminal 3: Database GUI (optional)
cd arcelor-backend
npx prisma studio
```

### **After Code Changes**

**Backend changes:**
- Auto-reloads with `npm run dev`
- Restart manually with `npm start`

**Database schema changes:**
1. Edit `prisma/schema.prisma`
2. Run `npx prisma migrate dev`
3. Restart backend

**Frontend changes:**
- Auto-reloads automatically

---

## 🚀 Production Deployment

### **Build**

```bash
# Frontend
cd arcelor-frontend
npm run build
# Creates optimized build in /build

# Backend (no build needed)
cd arcelor-backend
# Ready to deploy as-is
```

### **Environment**

```env
# Production .env
NODE_ENV=production
LOG_LEVEL=info
DATABASE_URL="postgresql://prod-user:prod-pass@prod-host:5432/arcelordb"
```

### **Run**

```bash
# Backend
cd arcelor-backend
npm start

# Frontend (serve build folder with nginx/apache)
```

---

**Setup complete! 🎉**

Your system should now be running:
- Backend: http://localhost:5001
- Frontend: http://localhost:3000
- Database GUI: http://localhost:5555 (if running prisma studio)



