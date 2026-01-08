# Technoda Warriors FLL Website 🏛️

Website for the Technoda Warriors FLL team, showcasing the UNEARTHED 2025 season project focused on smart archaeology solutions.

## 📁 Project Structure

```fll_group/
│
├── index.html                     # Main team website
├── company.html                   # Company/product website
│
├── css/
│   ├── styles.css                # Team website styles with centralized colors
│   └── company-styles.css        # Company website styles with centralized colors
│
├── js/
│   ├── script.js                 # Team website JavaScript
│   └── company-script.js         # Company website JavaScript
│
├── assets/
│   └── images/                   # Folder for team photos and gallery images
│
└── README.md                     # Project documentation (this file)
```

## 🌐 Two Websites

### 1. Team Website ([index.html](index.html))

The main FLL team website showcasing the Technoda Warriors team, their project, and robot design.

### 2. Company Website ([company.html](company.html))

A professional website for the "ArcheoVision AI" company that develops the archaeology AI solution featured in the team's project.

## 🎯 Features

### Admin Panel

- **Content Management**: Edit website content directly through the browser
- **Team Members**: Update all 10 team member names and roles
- **Project Details**: Modify problem, solution, and implementation descriptions
- **Company Link**: Add/update external company website link
- **Local Storage**: All changes are saved in the browser's localStorage

### Responsive Design

- Mobile-friendly navigation with hamburger menu
- Adaptive layouts for tablets and phones
- Touch-friendly carousel controls

### Interactive Elements

- Auto-playing image carousel with manual controls
- Smooth scrolling navigation
- Progress bar showing page scroll position
- Hover effects and animations

### Sections

1. **Hero** - Main landing section with team branding
2. **Core Values** - Display of the team's four core values
3. **About** - Team introduction and mission
4. **Gallery** - Image carousel (ready for team photos)
5. **Team** - Grid of all 10 team members
6. **Project** - Detailed project presentation (problem, solution, implementation)
7. **Game Strategy** - Competition strategy and mission priorities
8. **Robot Design** - Robot technical specifications and design choices
9. **Contact** - Footer with contact information and social links

## 🚀 How to Use

### Basic Usage

**Team Website:**

1. Open `index.html` in any modern web browser
2. Navigate through the site using the menu or scrolling
3. The site works completely offline (no external dependencies)

**Company Website:**

1. Open `company.html` in any modern web browser
2. Explore the ArcheoVision AI company features and product details
3. Submit contact form (demo mode - shows alert)

### Admin Access (Team Website Only)

1. Click the **"🔧 כניסת מנהל"** (Admin Access) button in the top-left corner
2. Edit any section's content in the admin panel
3. Click **"שמור שינויים"** (Save Changes) to save your edits
4. Changes are automatically saved and persist across browser sessions

### Adding Images

1. Place your team photos in the `assets/images/` folder
2. Update the carousel HTML in `index.html` to reference your images:

```html
<div class="carousel-slide">
    <img src="assets/images/your-photo.jpg" alt="Description">
</div>
```

### Customization

#### Colors - Centralized Theme System

Both websites now use CSS custom properties (variables) for easy theme customization.

**Team Website** - Edit `css/styles.css`:

```css
:root {
    --primary: #787ec2;    /* Sand/Purple */
    --secondary: #3d4c8c;  /* Pottery/Clay */
    --accent: #1ba6a6;     /* Tech Teal */
    --dark: #2b2b2b;       /* Dark Gray */
    --light: #f7f1e3;      /* Light Beige */
    --text: #1a1a1a;       /* Text Color */
}
```

**Company Website** - Edit `css/company-styles.css`:

```css
:root {
    --primary: #1a4d2e;    /* Forest Green */
    --secondary: #4f772d;  /* Olive Green */
    --accent: #90be6d;     /* Light Green */
    --light: #f8f9d2;      /* Light Yellow */
    --dark: #132a13;       /* Dark Forest */
    --gold: #d4a574;       /* Gold */
}
```

All colors include opacity variants and shadow presets for consistency.

#### Content

- **Team Website**: Edit static content directly in `index.html` or use the Admin Panel
- **Company Website**: Edit static content directly in `company.html`

## 💻 Technical Details

### Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with flexbox and grid
- **Vanilla JavaScript**: No external frameworks or libraries
- **LocalStorage API**: Client-side data persistence

### Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance

- No external dependencies (works offline)
- Optimized animations and transitions
- Minimal JavaScript for fast loading
- Responsive images support

## 📝 Notes

- The original single-file version is kept as `technoda_fll_website.html` for backup
- All content is in Hebrew (RTL layout)
- Admin changes are saved locally in the browser (not on a server)
- To reset admin content, clear the browser's localStorage

## 🏆 FLL Season

**Team**: Technoda Warriors  
**School**: Technoda Hadera
**Season**: UNEARTHED 2025  
**Theme**: Smart Archaeology with AI
