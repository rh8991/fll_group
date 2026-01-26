# 📖 Smart Archaeology - Documentation Guide

This file helps you navigate all the documentation for the Smart Archaeology AI demo.

## 🎯 Choose Your Starting Point

### ⚡ **Just Want to Get Started?**

→ Read: **[QUICK_START_ARCHAEOLOGY.md](./QUICK_START_ARCHAEOLOGY.md)**

- 3-step setup
- Quick reference
- Troubleshooting FAQ
- ~5 minute read

### 🔧 **Need Technical Details?**

→ Read: **[SMART_ARCHAEOLOGY_IMPLEMENTATION.md](./SMART_ARCHAEOLOGY_IMPLEMENTATION.md)**

- Complete architecture
- File structure
- Code explanation
- Customization guide
- ~20 minute read

### 📋 **Want to Set Up Your Model?**

→ Read: **[public/tm_model/MODEL_SETUP.md](./public/tm_model/MODEL_SETUP.md)**

- Hebrew setup instructions
- Teachable Machine guide
- Model file structure
- Performance tips
- Troubleshooting
- ~10 minute read

### 📊 **Looking for Overview?**

→ Read: **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)**

- What was built
- File checklist
- Key statistics
- Next steps
- ~10 minute read

### 📚 **See the Code?**

→ Check: **[src/pages/SmartArchaeologyPage/](./src/pages/SmartArchaeologyPage/)**

- `index.tsx` - Main component (381 lines)
- `SmartArchaeology.module.css` - Styles (451 lines)

---

## 📁 Quick File Reference

| File                                                                         | Purpose                       | Time   |
| ---------------------------------------------------------------------------- | ----------------------------- | ------ |
| [QUICK_START_ARCHAEOLOGY.md](./QUICK_START_ARCHAEOLOGY.md)                   | Get running fast              | 5 min  |
| [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)                     | Overview of what was built    | 10 min |
| [SMART_ARCHAEOLOGY_IMPLEMENTATION.md](./SMART_ARCHAEOLOGY_IMPLEMENTATION.md) | Technical details             | 20 min |
| [public/tm_model/MODEL_SETUP.md](./public/tm_model/MODEL_SETUP.md)           | Model training guide (Hebrew) | 10 min |
| [README.md](./README.md)                                                     | Updated main readme           | 5 min  |

---

## 🚀 The 3-Step Plan

### Step 1: Setup (5 minutes)

```bash
npm install
```

Read: **[QUICK_START_ARCHAEOLOGY.md](./QUICK_START_ARCHAEOLOGY.md)** (section 1)

### Step 2: Create Model (30 minutes)

Visit: [Google Teachable Machine](https://teachablemachine.withgoogle.com/)
Read: **[public/tm_model/MODEL_SETUP.md](./public/tm_model/MODEL_SETUP.md)** (detailed guide in Hebrew)

### Step 3: Run Demo (2 minutes)

```bash
npm run dev
# Visit: http://localhost:5173/fll_group/archaeology
```

Read: **[QUICK_START_ARCHAEOLOGY.md](./QUICK_START_ARCHAEOLOGY.md)** (section 2)

---

## 📖 What Each File Covers

### QUICK_START_ARCHAEOLOGY.md

**For**: Everyone (especially beginners)
**Contains**:

- 3-step quick start
- How to create your model
- How to test the demo
- Understanding results
- Admin panel access
- Troubleshooting

**Read this if**: You just want to get it working fast

---

### IMPLEMENTATION_SUMMARY.md

**For**: Developers & Project Leads
**Contains**:

- What was built (overview)
- Feature checklist
- File structure
- Technical details
- API information
- Deployment info
- Stats and metrics

**Read this if**: You want to understand what you got

---

### SMART_ARCHAEOLOGY_IMPLEMENTATION.md

**For**: Developers & Tech-savvy users
**Contains**:

- Complete technical documentation
- Component structure (381 lines)
- Model loading process
- Image processing details
- Inference explanation
- Customization guide
- Troubleshooting (technical)
- Next steps (advanced)

**Read this if**: You need to customize or understand code

---

### public/tm_model/MODEL_SETUP.md

**For**: Everyone training the model
**Contains**:

- Complete Hebrew instructions
- Teachable Machine workflow
- Step-by-step guide
- File structure explanation
- Troubleshooting FAQ
- Performance tips
- Resource links

**Read this if**: You're training an AI model

---

### README.md (Updated)

**For**: General overview
**Contains**:

- Updated main project README
- Smart Archaeology section added
- Setup instructions
- Feature overview
- Links to documentation

**Read this if**: You want the official overview

---

## 🎓 Learning Path

```Beginner
   ↓
QUICK_START_ARCHAEOLOGY.md
   ↓
Create your model at Teachable Machine
   ↓
public/tm_model/MODEL_SETUP.md (Hebrew guide)
   ↓
Test at /archaeology route
   ↓
                ┌─────────────────┐
                │   Works Great!  │ → You're Done!
                └─────────────────┘
                   Or...
                ┌─────────────────────────────────────┐
                │ Need to Understand/Customize Code?  │
                └─────────────────────────────────────┘
                   ↓
        SMART_ARCHAEOLOGY_IMPLEMENTATION.md
                   ↓
        Understand architecture & customize
```

---

## 🔍 Find Specific Info

### "How do I get started?"

→ **[QUICK_START_ARCHAEOLOGY.md](./QUICK_START_ARCHAEOLOGY.md)** - Section: "⚡ 3 Simple Steps"

### "How do I create a model?"

→ **[public/tm_model/MODEL_SETUP.md](./public/tm_model/MODEL_SETUP.md)** - Step-by-step guide

### "What files were created?"

→ **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Section: "📁 File Structure"

### "How does the code work?"

→ **[SMART_ARCHAEOLOGY_IMPLEMENTATION.md](./SMART_ARCHAEOLOGY_IMPLEMENTATION.md)** - Section: "✅ What Was Implemented"

### "My model won't load - what's wrong?"

→ **[QUICK_START_ARCHAEOLOGY.md](./QUICK_START_ARCHAEOLOGY.md)** - Section: "🆘 Troubleshooting"

### "How do I customize the colors/text?"

→ **[SMART_ARCHAEOLOGY_IMPLEMENTATION.md](./SMART_ARCHAEOLOGY_IMPLEMENTATION.md)** - Section: "🎨 Customization Options"

### "Where do I add my model files?"

→ **[public/tm_model/MODEL_SETUP.md](./public/tm_model/MODEL_SETUP.md)** - Section: "File Structure Example"

---

## 📞 Quick Reference Commands

```bash
# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

---

## ✅ Files to Remember

### Core Implementation

- `src/pages/SmartArchaeologyPage/index.tsx` - Main component
- `src/pages/SmartArchaeologyPage/SmartArchaeology.module.css` - Styles
- `src/App.tsx` - Has the route
- `package.json` - Has TensorFlow dependencies

### Where to Put Your Model

- `public/tm_model/model.json` - Your model architecture
- `public/tm_model/*.bin` - Weight files

### Admin Panel

- `src/components/AdminPanel/AdminPanel.tsx` - Has archaeology tab
- Look for: "🏛️ דמו ארכיאולוגיה" tab

---

## 🎯 Main Routes

| Route           | Purpose            | File                                       |
| --------------- | ------------------ | ------------------------------------------ |
| `/archaeology`  | The AI demo page   | `src/pages/SmartArchaeologyPage/index.tsx` |
| Admin Panel tab | Setup instructions | `src/components/AdminPanel/AdminPanel.tsx` |

---

## 💡 Pro Tips

1. **Start with QUICK_START_ARCHAEOLOGY.md** - Most people should read this first
2. **Keep MODEL_SETUP.md handy** - You'll need it when training your model
3. **Check troubleshooting first** - Common issues documented in multiple files
4. **Admin panel has built-in guide** - No need to leave the website for instructions

---

## 🆘 Getting Help

1. **Troubleshooting**: [QUICK_START_ARCHAEOLOGY.md](./QUICK_START_ARCHAEOLOGY.md#-troubleshooting)
2. **Technical Issues**: [SMART_ARCHAEOLOGY_IMPLEMENTATION.md](./SMART_ARCHAEOLOGY_IMPLEMENTATION.md#-troubleshooting)
3. **Model Setup Help**: [public/tm_model/MODEL_SETUP.md](./public/tm_model/MODEL_SETUP.md)
4. **Admin Panel**: Check the "🏛️ דמו ארכיאולוגיה" tab for built-in guide

---

## 📊 Documentation Stats

| File                                | Lines      | Type        | Time       |
| ----------------------------------- | ---------- | ----------- | ---------- |
| QUICK_START_ARCHAEOLOGY.md          | 200+       | Quick Start | 5 min      |
| IMPLEMENTATION_SUMMARY.md           | 400+       | Summary     | 10 min     |
| SMART_ARCHAEOLOGY_IMPLEMENTATION.md | 1,000+     | Technical   | 20 min     |
| MODEL_SETUP.md                      | 100+       | Guide       | 10 min     |
| **Total**                           | **1,700+** | **All**     | **45 min** |

---

## 🚀 Next Steps

1. **Right now**: Read [QUICK_START_ARCHAEOLOGY.md](./QUICK_START_ARCHAEOLOGY.md)
2. **Then**: Create your model at Teachable Machine
3. **Then**: Add model files to `/public/tm_model/`
4. **Then**: Run `npm run dev` and visit `/archaeology`
5. **Finally**: Deploy and enjoy!

---

## 🎉 You're All Set

Everything you need is documented. Just follow the files in order:

1. **QUICK_START_ARCHAEOLOGY.md** ← Start here
2. Create model at Teachable Machine
3. **public/tm_model/MODEL_SETUP.md** ← Reference while training
4. Add model files
5. Test and enjoy!

**Questions?** Check the appropriate documentation file above.

---

Made with ❤️ for The Shimis FLL Team | UNEARTHED 2026 🏛️
