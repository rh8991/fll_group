# 🏛️ Smart Archaeology Demo - Quick Start Guide

## ⚡ 3 Simple Steps to Get Started

### Step 1: Install & Dependencies ✨

```bash
npm install
```

This installs TensorFlow.js and all dependencies.

### Step 2: Create Your AI Model 🤖

1. Go to **[Google Teachable Machine](https://teachablemachine.withgoogle.com/)**
2. Click "Create New Project" → Choose "Image Project"
3. Create classes for archaeological periods:
   - Bronze Age (תקופת הברונזה)
   - Iron Age (תקופת הברזל)
   - Roman Period (התקופה הרומית)
   - (Add more as needed)
4. Upload 20-30+ artifact images for each period
5. Click "Train" and wait for completion
6. Click "Export" → Select "TensorFlow.js" format
7. Download the file

### Step 3: Add Model to Your Site 📁

1. Extract the downloaded ZIP file
2. Create folder: `public/tm_model/` (if not exists)
3. Copy all files from the extracted folder to `public/tm_model/`
4. Files should include: `model.json` and `.bin` weight files
5. Restart your dev server: `npm run dev`

---

## 🚀 Run & Test

**Start development server:**

```bash
npm run dev
```

**Open in browser:**

- Local: `http://localhost:5173/fll_group/archaeology`
- Or find the link in the website header

**Test the demo:**

1. You should see ✓ "המודל טעון ויצור לשימוש" (Model loaded)
2. Click "העלה תמונה של ממצא" (Upload artifact image)
3. Select any artifact image
4. Click "נתח ממצא" (Analyze artifact)
5. See predictions with confidence scores!

---

## 📊 Understanding the Results

When you upload an artifact image:

- **Top Result**: The most likely historical period
- **Confidence %**: How confident the AI is (0-100%)
- **All Predictions**: Shows all periods ranked by likelihood
- **Confidence Bars**: Visual representation of prediction strength

**Example:**

- Iron Age: 85% ████████
- Bronze Age: 12% ██
- Roman: 3% █

---

## 🔧 Admin Panel Setup Instructions

**Access Admin Panel:**

1. Scroll to website footer
2. Click the 🔧 (settings/tools) icon
3. Enter your admin password
4. Click "🏛️ דמו ארכיאולוגיה" tab

**You'll find:**

- Complete Teachable Machine setup guide (Hebrew)
- Step-by-step model training instructions
- Troubleshooting FAQ
- Links to resources and documentation

---

## 🗺️ GovMap Integration

The demo includes an embedded map from **GovMap** (Israeli National Data Repository) so users can:

- See where similar artifacts were found
- View archaeological distribution across Israel
- Connect predictions with real-world data
- Learn about artifact locations

---

## 📚 Files You Got

```✅ src/pages/SmartArchaeologyPage/index.tsx
   → Main demo component (381 lines)

✅ src/pages/SmartArchaeologyPage/SmartArchaeology.module.css
   → Beautiful styling with RTL Hebrew support

✅ src/App.tsx (updated)
   → New route: /archaeology

✅ src/components/AdminPanel/ (updated)
   → New "archaeology" tab with instructions

✅ public/tm_model/MODEL_SETUP.md
   → Detailed setup guide in Hebrew

✅ package.json (updated)
   → TensorFlow.js dependencies added

✅ README.md (updated)
   → Smart Archaeology section added

✅ SMART_ARCHAEOLOGY_IMPLEMENTATION.md
   → Complete technical documentation
```

---

## ⚠️ Important Notes

### Model Loading

- First time takes 5-10 seconds while downloading
- Shows "טוען מודל..." (Loading model...) message
- Model typically 5-20MB in size

### Accuracy

- Depends on training data quality
- More images = better results
- Include variety: different angles, lighting, artifact sizes
- Minimum 20-30 images per period recommended

### Privacy

- ✅ Everything runs in YOUR browser
- ✅ Images NEVER sent to any server
- ✅ 100% private and secure

### Mobile

- ✅ Works on phones and tablets
- ⚠️ May be slower on older devices
- ✅ Fully responsive design

---

## 🆘 Troubleshooting

### "Model won't load"

- Check that `/public/tm_model/model.json` exists
- Verify file names match exactly
- Restart dev server: `npm run dev`

### "CORS error in console"

- Model files must be in `/public/tm_model/`
- Don't place them outside public folder

### "Predictions are wrong"

- Model needs more training data
- Add more diverse images
- Retrain with better class separation
- Re-export and replace model files

### "Upload button doesn't work"

- Check browser console for errors
- Verify JavaScript is enabled
- Try a different image file

---

## 📖 Learning Resources

- **Google Teachable Machine Docs**: <https://teachablemachine.withgoogle.com/faq>
- **TensorFlow.js Guide**: <https://www.tensorflow.org/js/guide>
- **GovMap Platform**: <https://mapping.gov.il/>
- **Archaeological Dating**: <https://en.wikipedia.org/wiki/Archaeological_dating>

---

## 🎯 Next Steps (Optional)

1. **Train Better Model**
   - Collect more artifact images
   - Include museums' datasets
   - Add more time periods

2. **Enhance UI**
   - Add artifact facts on result page
   - Link to Wikipedia articles
   - Create timeline visualization

3. **Save Results**
   - Store predictions in Firebase
   - Track user interactions
   - Create artifact database

4. **Advanced Features**
   - Webcam live capture
   - Batch image analysis
   - PDF report export
   - Mobile app version

---

## ✅ Checklist Before Deploy

- [ ] Model trained with quality images
- [ ] Model files in `/public/tm_model/`
- [ ] `npm install` completed
- [ ] `npm run dev` shows no errors
- [ ] `/archaeology` route works
- [ ] Model loads (checkmark message shows)
- [ ] Upload and analyze works
- [ ] GovMap appears
- [ ] All text displays in Hebrew
- [ ] Mobile view works

---

## 🎉 You're All Set

Your Smart Archaeology AI demo is ready to:

- 🏛️ Demonstrate AI in archaeology
- 📸 Classify artifact images
- 📊 Show confidence scores
- 🗺️ Integrate with national data
- 🇮🇱 Display everything in Hebrew

**Enjoy your educational AI demo!**

---

Questions? Check **SMART_ARCHAEOLOGY_IMPLEMENTATION.md** for technical details.

Made with ❤️ for The Shimis FLL Team | UNEARTHED 2026 🏛️
