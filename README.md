# 🤖 Technoda Warriors - FLL Team Website

Modern, responsive website for FIRST LEGO League team built with React, TypeScript, and Firebase.

## 🌟 Features

### 🎨 Dynamic Content Management

- **Admin Panel** - Edit website content without touching code
- **Real-time Sync** - Changes sync across all devices via Firebase Firestore
- **Theme Customization** - Change colors, text, and branding on the fly
- **Team Management** - Add/edit team member profiles dynamically

### 📱 Responsive Design

- Mobile-first approach with breakpoints for all devices
- Touch-friendly navigation
- Smooth animations and transitions
- Optimized for tablets, phones, and desktops

### 🔥 Firebase Integration

- **Firestore Database** - Cloud storage for all content and settings
- **Future: Storage** - Image uploads (ready for implementation)
- Fallback to localStorage when offline

### 🚀 Modern Tech Stack

- **React 18** - Component-based UI architecture
- **TypeScript** - Type-safe code
- **Vite** - Lightning-fast development and builds
- **CSS Modules** - Scoped, modular styling
- **React Router** - Client-side routing

## 📁 Project Structure

```fll_group/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header/         # Navigation header
│   │   ├── Footer/         # Site footer
│   │   ├── AdminPanel/     # Content management panel
│   │   └── ScrollToTop.tsx # Auto-scroll on navigation
│   │
│   ├── pages/              # Main page components
│   │   ├── HomePage/       # Landing page
│   │   │   └── sections/   # Page sections (Hero, About, etc.)
│   │   └── CompanyPage/    # Company/project details page
│   │
│   ├── context/            # React Context API
│   │   └── ContentContext.tsx  # Global state management
│   │
│   ├── firebase/           # Firebase configuration
│   │   └── config.ts       # Firebase initialization
│   │
│   └── styles/             # Global styles
│       └── index.css
│
├── assets/                 # Static assets (images, etc.)
├── .github/workflows/      # GitHub Actions for deployment
├── company.html           # Entry point for company page
├── index.html             # Entry point for home page
├── vite.config.ts         # Vite configuration
└── package.json           # Project dependencies

```

## 🛠️ Setup & Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account (free tier works great!)

### 1. Clone the Repository

```bash
git clone https://github.com/rh8991/fll_group.git
cd fll_group
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Firebase (Required for Cloud Storage)

Follow the detailed guide in [FIREBASE_SETUP.md](FIREBASE_SETUP.md) or quick steps:

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com/)
2. Enable Firestore Database in test mode
3. Create a web app and copy credentials
4. Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Note:** Without Firebase, the app will work but content will only save to browser localStorage (not synced).

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Build & Deployment

### Build for Production

```bash
npm run build
```

Creates optimized production build in `dist/` folder.

### Deploy to GitHub Pages

```bash
npm run deploy
```

Automatically builds and deploys to GitHub Pages.

**Or use GitHub Actions:** Push to `main` branch triggers automatic deployment via `.github/workflows/deploy.yml`.

### Deployment Configuration

The project is configured for GitHub Pages with base path `/fll_group/` in [vite.config.ts](vite.config.ts).

**To deploy to custom domain or root path:**

1. Update `base` in [vite.config.ts](vite.config.ts)
2. Update `basename` in [src/main.tsx](src/main.tsx)

## 🎮 Usage

### Accessing Admin Panel

1. Open the website
2. Scroll to the footer
3. Click the "🔧" (wrench) icon
4. Edit content in the admin panel
5. Changes save automatically to Firebase

### Sections You Can Edit

- Team information and members
- Project description (problem/solution/implementation)
- About section
- Game strategy
- Robot design details
- Colors and theme
- Footer information

## 🏗️ Tech Stack Details

| Technology   | Purpose          | Version  |
| ------------ | ---------------- | -------- |
| React        | UI Framework     | 18.2.0   |
| TypeScript   | Type Safety      | 5.3.3    |
| Vite         | Build Tool       | 7.3.1    |
| React Router | Routing          | 6.21.1   |
| Firebase     | Backend/Database | 12.8.0   |
| CSS Modules  | Styling          | Built-in |

## 🔧 Available Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start development server         |
| `npm run build`   | Build for production             |
| `npm run preview` | Preview production build locally |
| `npm run lint`    | Run ESLint                       |
| `npm run deploy`  | Deploy to GitHub Pages           |

## 🎨 Customization

### Changing Colors

Use the admin panel or edit [src/context/ContentContext.tsx](src/context/ContentContext.tsx) default theme colors.

### Adding New Sections

1. Create a new component in `src/pages/HomePage/sections/`
2. Import and add to [src/pages/HomePage/index.tsx](src/pages/HomePage/index.tsx)
3. Create corresponding CSS module

### Adding Images

Place images in `assets/images/` and reference them in components.

**Future:** Firebase Storage will enable dynamic image uploads through the admin panel.

## 📝 Content Management

### Where Content is Stored

1. **Firebase Firestore** - Primary storage (syncs across devices)
2. **localStorage** - Backup/fallback (browser-only)

### Data Structure

Content is stored in Firestore under collection `siteContent/mainContent`.

See [src/context/ContentContext.tsx](src/context/ContentContext.tsx) for the full data schema.

## 🔒 Security Notes

- `.env` file is in `.gitignore` - never commit Firebase credentials
- Firestore is in test mode by default - add security rules for production
- See [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for security configuration

## 📖 Documentation

- [FIREBASE_SETUP.md](FIREBASE_SETUP.md) - Complete Firebase setup guide (Hebrew)
- [vite.config.ts](vite.config.ts) - Build configuration
- [tsconfig.json](tsconfig.json) - TypeScript configuration

## 🐛 Troubleshooting

### Site shows "Loading..." forever

- Check Firebase configuration in `.env`
- Check browser console (F12) for errors
- Verify Firestore is enabled in Firebase Console

### Changes not saving

- Verify Firebase credentials are correct
- Check Firestore rules allow writes
- Check browser console for Firebase errors

### Build fails

- Run `npm install` to ensure all dependencies are installed
- Check TypeScript errors with `npm run lint`
- Verify Node.js version (v18+)

## 🤝 Contributing

This is a team project for FIRST LEGO League. To contribute:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is for educational purposes as part of FIRST LEGO League competition.

## 👥 Team

**Technoda Warriors** - FIRST LEGO League Team

---

**Built with ❤️ by the Technoda Warriors team**

For questions or issues, open an issue on GitHub or contact the team.
