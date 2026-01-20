# 🔥 Firebase Setup for Content Management System

## What's This For?

When team members edit text and colors on the website through the admin panel, the changes are saved to the cloud and visible to everyone!

**This system includes:**

- ✅ **Firestore Database** - For storing text, colors, and all site content
- ✅ **Firebase Storage** - (Future) For storing images in the cloud

## Setup Steps (5 Minutes)

### Step 1: Create a Firebase Project (Free!)

1. Go to <https://console.firebase.google.com/>
2. Click "Add project"
3. Give your project a name (e.g., "fll-group")
4. Click "Continue" - You don't need Google Analytics
5. Wait for the project to be created

### Step 2: Enable Firestore Database

1. In the side menu, click "Firestore Database"
2. Click "Create database"
3. Select "Start in test mode" - **Important!**
4. Choose a location (europe-west or us-central - doesn't matter)
5. Click "Enable"

### Step 3: Add a Web App

1. On the project homepage, click the "Web" icon (</>)
2. Give the app a name (e.g., "FLL Website")
3. **Don't check** "Firebase Hosting" - not needed
4. Click "Register app"
5. You'll see a screen with code - **Don't close it!**

### Step 4: Copy Your Credentials

On the screen you just saw, copy these values:

- apiKey
- authDomain
- projectId
- storageBucket
- messagingSenderId
- appId

**Choose your setup method:**

#### Option A: Local Development (Your Computer)

1. Create a new file in the project root named `.env`
2. Paste the details in this format:

```VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=fll-group-xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=fll-group-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=fll-group-xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

3. **Save the file!** (It's in `.gitignore` so it won't be uploaded to GitHub)

#### Option B: GitHub Codespaces

To use this project in Codespaces, add your credentials as secrets:

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Codespaces**
3. Click **New repository secret** and add each value:
   - Name: `VITE_FIREBASE_API_KEY` | Value: `AIzaSy...`
   - Name: `VITE_FIREBASE_AUTH_DOMAIN` | Value: `fll-group-xxxxx.firebaseapp.com`
   - Name: `VITE_FIREBASE_PROJECT_ID` | Value: `fll-group-xxxxx`
   - Name: `VITE_FIREBASE_STORAGE_BUCKET` | Value: `fll-group-xxxxx.appspot.com`
   - Name: `VITE_FIREBASE_MESSAGING_SENDER_ID` | Value: `123456789`
   - Name: `VITE_FIREBASE_APP_ID` | Value: `1:123456789:web:abcdef123456`

4. These secrets will automatically be available as environment variables when you open Codespaces!

### Step 5: Restart the Server

1. Stop the server (Ctrl+C in terminal)
2. Start it again:

```bash
npm run dev
```

## ✅ That's It! Changes Now Save to the Cloud

### How to Check if It's Working?

1. Open the website in a browser
2. Edit something in the admin panel
3. Open the website in another browser or device
4. You'll see the changes you made!

### How to View Data in Firebase?

1. Go to <https://console.firebase.google.com/>
2. Select your project
3. Click "Firestore Database" in the side menu
4. You'll see all the content that was edited!

## 🔒 Security (Important!)

Currently, the system is open for anyone to edit (test mode). When you want to restrict access:

1. Go to Firestore Database > Rules
2. Replace the existing rules with:

```rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /siteContent/{document=**} {
      allow read: if true; // Everyone can read
      allow write: if request.auth != null; // Only authenticated users can write
    }
  }
}
```

If you want more advanced permissions, you can add Authentication and give access only to specific users.

## ⚠️ Important

- **Don't upload the `.env` file to GitHub!** (It's already in .gitignore)
- If you want to publish the site, you'll need to set the variables in your hosting service

---

## 📸 Future: Firebase Storage for Images

Currently, images are stored in the project itself. If you want to enable image uploads through the admin panel:

### Setting up Firebase Storage

1. In the Firebase Console, click "Storage" in the side menu
2. Click "Get Started"
3. Select "Start in test mode"
4. Click "Done"

### What Does This Enable?

- Upload images directly through the website
- Store images in the cloud (not in the project)
- Access images from any device
- No need to update code every time you add an image

**Note:** Additional code is needed to use Storage. If you want this, it can be added in the future.

---

## 🆘 Need Help?

If something doesn't work:

1. Check that you created the `.env` file with the correct details
2. Check that you restarted the server after creating `.env`
3. Check the browser console (F12) for errors
