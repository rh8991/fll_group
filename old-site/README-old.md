# Technoda Warriors FLL - עונת UNEARTHED 2025

אתר הקבוצה של Technoda Warriors מהטכנודע חדרה, עונת FIRST LEGO League 2025.

## 🚀 טכנולוגיות

האתר בנוי עם:
- **Vite** - Build tool מהיר וחכם
- **React 18** - ספריית UI מודרנית
- **TypeScript** - Type safety ו-developer experience משופרים
- **CSS Modules** - עיצוב מודולרי וסקופי
- **React Router** - ניווט בין דפים

## 🎨 עיצוב

- עיצוב רספונסיבי מלא לנייד וטאבלט
- תמיכה בכיוון RTL (עברית)
- אנימציות והשפעות חלקות
- נגישות משופרת

## 📦 התקנה והרצה

### התקנת תלויות
```bash
npm install
```

### הרצה במצב פיתוח
```bash
npm run dev
```

האתר יהיה זמין ב-`http://localhost:5173`

### בנייה לפרודקשן
```bash
npm run build
```

### תצוגה מקדימה של הבילד
```bash
npm run preview
```

## 📁 מבנה הפרויקט

```
fll_group/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── src/
│   ├── components/             # רכיבים משותפים
│   │   ├── Header/
│   │   ├── Footer/
│   │   └── AdminPanel/
│   ├── context/                # React Context (ניהול state)
│   │   └── ContentContext.tsx
│   ├── pages/                  # דפים ראשיים
│   │   ├── HomePage/
│   │   │   ├── sections/       # סקשנים של דף הבית
│   │   │   ├── index.tsx
│   │   │   └── HomePage.module.css
│   │   └── CompanyPage/
│   ├── styles/                 # סגנונות גלובליים
│   │   └── index.css
│   ├── App.tsx                 # רכיב ראשי
│   └── main.tsx                # Entry point
├── public/                     # קבצים סטטיים
├── index-new.html              # HTML ראשי
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🌐 פריסה ל-GitHub Pages

האתר מתעדכן אוטומטית ב-GitHub Pages עם כל push ל-branch main.

### הגדרת GitHub Pages (פעם אחת)

1. עבור לSettings → Pages
2. תחת "Build and deployment", בחר **GitHub Actions**
3. ה-workflow יפעל אוטומטית בכל push

## ✨ תכונות

- **דף הבית**: מידע על הקבוצה, ערכי ליבה, חברי הצוות, הפרויקט, אסטרטגיית המשחק והרובוט
- **דף החברה**: מידע על ArcheoVision AI - המערכת שפותחה לפרויקט
- **ממשק ניהול**: עריכת תוכן האתר באמצעות לוח בקרה (localStorage)
- **גלריה**: קרוסלת תמונות
- **רספונסיבי**: תמיכה מלאה במובייל, טאבלט וטלטופ

## 🔧 עריכת תוכן

האתר כולל לוח בקרה מובנה לעריכת תוכן:
1. לחץ על כפתור "כניסת מנהל" בתחתית הדף
2. ערוך את הטקסטים, חברי הצוות, והקישורים
3. לחץ "שמור שינויים" - השינויים נשמרים ב-localStorage

## 📱 תאימות

- ✅ Chrome / Edge (גרסאות חדשות)
- ✅ Firefox (גרסאות חדשות)
- ✅ Safari (iOS 12+)
- ✅ מובייל - כל המכשירים

## 📄 רישיון

© 2024-2025 Technoda Warriors FLL | כל הזכויות שמורות
