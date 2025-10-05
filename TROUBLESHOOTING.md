# 🔧 Troubleshooting Guide

**Common issues and solutions for ArcelorMittal Customer Management System**

---

## 🚀 Quick Diagnostics

### **Check System Health:**
```bash
# Backend running?
curl http://localhost:5001

# Frontend running?
# Check browser: http://localhost:3000

# Database accessible?
cd arcelor-backend
npx prisma studio
```

---

## ❌ Common Issues

### **1. Port Already in Use**

**Problem:** `Error: listen EADDRINUSE: address already in use`

**Solution (Windows):**
```powershell
# Find process on port
netstat -ano | findstr :5001

# Kill process (replace PID)
taskkill /PID <PID> /F
```

**Solution (Mac/Linux):**
```bash
lsof -ti:5001 | xargs kill -9
```

**Alternative:** Change port in `.env` file:
```
PORT=5002
```

---

### **2. Backend Won't Start**

**Problem:** Backend crashes on startup

**Check 1 - Dependencies installed:**
```bash
cd arcelor-backend
npm install
```

**Check 2 - .env file exists:**
```bash
# Windows
type .env

# Mac/Linux
cat .env
```

**Check 3 - Database connection:**
```bash
npx prisma migrate dev
```

**Check logs:**
```bash
type logs\error.log
```

---

### **3. Frontend Won't Start**

**Problem:** `npm start` fails

**Solution 1 - Reinstall dependencies:**
```bash
cd arcelor-frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

**Solution 2 - Clear cache:**
```bash
npm cache clean --force
npm install
```

---

### **4. Database Errors**

**Problem:** `PrismaClientInitializationError`

**Solution 1 - Check PostgreSQL:**
```bash
# Verify PostgreSQL is running
# Windows: Check Services
# Mac: brew services list
# Linux: systemctl status postgresql
```

**Solution 2 - Reset database:**
```bash
cd arcelor-backend
npx prisma migrate reset
npx prisma migrate dev
```

**Solution 3 - Verify DATABASE_URL:**
```
DATABASE_URL="postgresql://user:password@localhost:5432/arcelordb?schema=public"
```

---

### **5. OCR Not Working**

**Problem:** Document upload but no data extracted

**Check 1 - OCR service configured:**
```bash
# In .env file
OCR_SERVICE_URL=http://your-ocr-service-url
```

**Check 2 - Network connectivity:**
```bash
curl http://your-ocr-service-url
```

**Check 3 - Backend logs:**
```bash
cd arcelor-backend
type logs\combined.log
```

---

### **6. Logo Not Appearing**

**Problem:** Logo doesn't display

**Solution 1 - Check file exists:**
```bash
cd arcelor-frontend\public
dir loggo.png
```

**Solution 2 - Clear browser cache:**
- Press `Ctrl + Shift + R` (force refresh)
- Or clear browser cache completely

**Solution 3 - Verify filename:**
- File: `arcelor-frontend/public/loggo.png`
- References in: `Header.js`, `ApplicationTypeSelector.js`

---

### **7. Form Validation Errors**

**Problem:** Can't proceed through steps

**Note:** Currently all fields are optional

**Check:** `src/App.js` lines 20-28
```javascript
const validationRules = {
    1: [],  // Should be empty arrays
    2: [],
    // etc...
};
```

---

### **8. Dropdown Values Not Showing**

**Problem:** Dropdown appears empty

**Solution:** Check component file:
- Step 1 fields: `src/steps/Step1_RequestData.js`
- Step 2 fields: `src/steps/Step2_GeneralData.js`

**Refresh browser:** `Ctrl + Shift + R`

---

### **9. Submit Button Not Working**

**Problem:** Click submit, nothing happens

**Expected:** Should show "Registro anotado / Record Noted" toast

**Check:** Browser console (F12) for errors

**Verify:** `src/App.js` around line 94
```javascript
showToast('✅ Registro anotado / Record Noted', 'success');
```

---

### **10. Slow OCR Processing**

**Problem:** Document upload takes too long

**Normal time:** 30-90 seconds

**Solutions:**
- Check network speed
- Verify OCR service status
- Check OCR_TIMEOUT in .env (default: 90000ms)
- Try smaller document
- Check backend logs for bottlenecks

---

## 🔍 Advanced Debugging

### **Enable Detailed Logging:**

**Backend (.env):**
```
LOG_LEVEL=debug
NODE_ENV=development
```

**View logs in real-time:**
```bash
cd arcelor-backend
tail -f logs/combined.log
```

---

### **Database Inspection:**

**Prisma Studio:**
```bash
cd arcelor-backend
npx prisma studio
# Opens http://localhost:5555
```

**Direct SQL:**
```bash
psql -U postgres -d arcelordb
SELECT * FROM "CustomerApplication" LIMIT 10;
```

---

### **Network Issues:**

**Check API connectivity:**
```bash
# Test backend from frontend
curl http://localhost:5001

# Test OCR service
curl http://your-ocr-service-url
```

**CORS issues:**
- Verify CORS enabled in backend
- Check browser console (F12) for CORS errors

---

## 🛡️ Security Checks

### **Environment Variables:**
```bash
# Never commit .env file
# Check .gitignore includes .env
```

### **API Keys:**
- Verify GEMINI_API_KEY is valid
- Check API quota not exceeded

---

## 📊 Performance Issues

### **Slow Frontend:**
- Clear browser cache
- Check React DevTools for re-renders
- Verify network tab in F12

### **Slow Backend:**
- Check database query performance
- Review logs for slow operations
- Monitor CPU/RAM usage

---

## 🔄 Reset Everything

**Complete fresh start:**

```bash
# Stop all servers (Ctrl + C)

# Backend
cd arcelor-backend
rm -rf node_modules package-lock.json
npm install
npx prisma generate
npx prisma migrate dev

# Frontend
cd arcelor-frontend
rm -rf node_modules package-lock.json
npm install

# Database (WARNING: Deletes all data)
cd arcelor-backend
npx prisma migrate reset

# Restart both servers
```

---

## 📞 Still Having Issues?

### **Collect Information:**
1. Error message (exact text)
2. Browser console output (F12)
3. Backend logs (`logs/error.log`)
4. Steps to reproduce
5. System info (Node version, OS)

### **Check Logs:**
```bash
# Backend errors
cd arcelor-backend
type logs\error.log

# Backend activity
type logs\combined.log
```

### **System Info:**
```bash
node --version
npm --version
```

---

## ✅ Verification Checklist

Before asking for help, verify:

- [ ] Node.js v16+ installed
- [ ] npm v8+ installed
- [ ] PostgreSQL running
- [ ] Both backend and frontend running
- [ ] .env file configured
- [ ] Dependencies installed (`npm install`)
- [ ] Database migrated (`npx prisma migrate dev`)
- [ ] Browser cache cleared
- [ ] No other apps using ports 3000/5001
- [ ] Firewall not blocking connections

---

**Most issues can be solved by:**
1. Restart servers
2. Clear browser cache (`Ctrl + Shift + R`)
3. Check logs
4. Verify .env configuration

---

**Version:** 4.0.0  
**Last Updated:** October 5, 2025

