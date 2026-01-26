# 🤖 The Shimis - FLL Team Website

Modern FLL team website built with React, TypeScript, and Firebase.

**Live Site**: <https://rh8991.github.io/fll_group/>

## Features

- 🎨 **Admin Panel** - Edit content, manage team, upload images
- 🔒 **Secure** - Password-protected with SHA-256 hashing
- 📱 **Responsive** - Mobile-first, RTL Hebrew support
- 🔥 **Firebase** - Real-time cloud sync across devices
- 🚀 **Modern Stack** - React 18, TypeScript, Vite 7

## Quick Start

### Prerequisites

- Node.js v18+
- Firebase account (free tier)

### Setup

1. **Clone & Install**:

   ```bash
   git clone https://github.com/rh8991/fll_group.git
   cd fll_group
   npm install
   ```

2. **Configure Firebase**:
   - Create project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database (test mode)
   - Add web app and copy credentials
3. **Create `.env` file**:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_ADMIN_PASSWORD_HASH=your_admin_panel_password
```

_Default password hash is for "admin123" - change immediately!_

1. **Generate Password Hash** (PowerShell):

   ```powershell
   $password = "YourNewPassword"
   $bytes = [System.Text.Encoding]::UTF8.GetBytes($password)
   $hash = [System.Security.Cryptography.SHA256]::Create().ComputeHash($bytes)
   $hashString = [System.BitConverter]::ToString($hash).Replace("-","").ToLower()
   Write-Host $hashString
   ```

2. **Start Development**:

   ```bash
   npm run dev
   ```

Open <http://localhost:5173/fll_group/>

## Admin Panel

**Access**: Scroll to footer → Click 🔧 icon → Enter password

**Features**:

- **Large Panel**: 1200px wide for comfortable editing
- **Tabbed Interface**: Separate tabs for Homepage, Company Page, Gallery, Team, Theme, and Demo
- **Save All Button**: Save all changes across all tabs at once
- **Bullet Points**: Add bullet points easily with one click
- **Comprehensive Theme Colors**:
  - Main site colors (Primary, Secondary, Accent, Dark, Light, Text)
  - Header colors (Background, Text)
  - Footer colors (Background, Text)
  - Company page colors (Primary, Secondary, Accent)
- Edit all homepage sections (about, problem, solution, implementation)
- Edit all company page sections (hero, about, features, contact)
- Manage team members (add/edit/delete)
- Upload images (max 2MB, JPG/PNG/WebP)
- Update header/footer info
- **Demo Tab**: Access Smart Archaeology AI demo setup instructions

## Smart Archaeology AI Demo

**Access**: `/archaeology` route or via "דמו ארכיאולוגיה" tab in Admin Panel

**Features**:

- 🏛️ **Image-based Classification**: Uses TensorFlow.js + Google Teachable Machine
- 📷 **Upload Archaeological Artifacts**: Users upload artifact images
- 🤖 **AI Inference**: Browser-based prediction using trained model
- 📊 **Confidence Scores**: Display probability for each historical period
- 🗺️ **Embedded GovMap**: Integrated national data repository map
- 📱 **Fully Responsive**: Works on desktop, tablet, and mobile
- 🇮🇱 **Hebrew UI**: All user-facing text in Hebrew

### Setting Up the Model

1. **Create Model** (Free):
   - Go to [Google Teachable Machine](https://teachablemachine.withgoogle.com/)
   - Create "Image Project"
   - Add classes for historical periods (Bronze Age, Iron Age, Roman, etc.)
   - Train with artifact images (minimum 20-30 per period)

2. **Export Model**:
   - Click "Export" → Select "TensorFlow.js"
   - Download all files

3. **Add to Project**:
   - Create folder: `/public/tm_model/`
   - Place `model.json` and weight files (\*.bin files) inside
   - Restart dev server

4. **Access Demo**:
   - Navigate to `/archaeology` route
   - Model automatically loads on page open
   - Upload artifact images and analyze!

### How It Works

- **Model Loading**: TensorFlow.js loads model.json on page mount
- **Image Processing**: Uploaded image resized to 224x224 and normalized
- **Inference**: Forward pass through neural network in browser
- **Results Display**: Top predictions with confidence percentages
- **GovMap Integration**: Embedded iframe for data repository access

## Deployment

**Automatic** (GitHub Actions):

- Push to `main` branch → Auto-deploys to GitHub Pages

**Manual**:

```bash
npm run build
npm run deploy
```

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview build
npm run deploy   # Deploy to GitHub Pages
```

## Troubleshooting

**Site stuck on "Loading..."**: Check Firebase config in `.env`, enable Firestore

**Admin won't open**: Verify password hash in `.env`, restart server

**Images not showing**: Check path `/fll_group/assets/images/`, clear cache

**Gallery upload fails**: Compress images under 2MB, use JPG/PNG/WebP

## Team

**The Shimis** - FLL Team Technoda Hadera  
Season: UNEARTHED 2026  
Website: <https://rh8991.github.io/fll_group/>

---

Made with ❤️ by The Shimis Team | FLL UNEARTHED 2026 🏛️
