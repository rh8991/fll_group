# 🔥 הגדרת Firebase למערכת עריכת התוכן

## מה השתנה?

עכשיו כשילדים בקבוצה יערכו טקסט באתר דרך פאנל הניהול, השינויים ישמרו בענן ויהיו נראים לכולם!

## שלבי ההתקנה (5 דקות)

### שלב 1: צור פרויקט Firebase (חינם!)

1. כנס ל-<https://console.firebase.google.com/>
2. לחץ על "הוסף פרויקט" (Add project)
3. תן שם לפרויקט (למשל: "fll-group")
4. בחר "המשך" (Continue) - לא צריך Google Analytics
5. המתן שהפרויקט ייווצר

### שלב 2: הפעל Firestore Database

1. בתפריט הצד, לחץ על "Firestore Database"
2. לחץ על "צור מסד נתונים" (Create database)
3. בחר "התחל במצב בדיקה" (Start in test mode) - **חשוב!**
4. בחר מיקום (europe-west או us-central - לא משנה)
5. לחץ "אפשר" (Enable)

### שלב 3: הוסף אפליקציית Web

1. בדף הראשי של הפרויקט, לחץ על סמל "Web" (</>)
2. תן שם לאפליקציה (למשל: "FLL Website")
3. **אל תסמן** "Firebase Hosting" - לא צריך
4. לחץ "רשום אפליקציה" (Register app)
5. תראה מסך עם קוד - **אל תסגור אותו!**

### שלב 4: העתק את הפרטים שלך

1. במסך שראית, העתק את הערכים האלה:
   - apiKey
   - authDomain
   - projectId
   - storageBucket
   - messagingSenderId
   - appId

2. צור קובץ חדש בשורש הפרויקט בשם `.env`

3. הדבק את הפרטים בפורמט הזה:

```VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=fll-group-xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=fll-group-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=fll-group-xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

**שמור את הקובץ!**

### שלב 5: הפעל מחדש את השרת

1. עצור את השרת (Ctrl+C בטרמינל)
2. הפעל שוב:

```bash
npm run dev
```

## ✅ זה הכל! עכשיו השינויים נשמרים בענן

### איך לבדוק שזה עובד?

1. פתח את האתר בדפדפן
2. ערוך משהו בפאנל הניהול
3. פתח את האתר בדפדפן אחר או במכשיר אחר
4. תראה את השינויים שעשית!

### איך לראות את הנתונים ב-Firebase?

1. כנס ל-<https://console.firebase.google.com/>
2. בחר את הפרויקט שלך
3. לחץ על "Firestore Database" בתפריט הצד
4. תראה את כל התוכן שהילדים ערכו!

## 🔒 אבטחה (חשוב!)

כרגע המערכת פתוחה למי שרוצה לערוך (מצב בדיקה). כשתרצה להגביל גישה:

1. עבור ל-Firestore Database > Rules
2. החלף את הכללים הקיימים ב:

```rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /siteContent/{document=**} {
      allow read: if true; // כולם יכולים לקרוא
      allow write: if request.auth != null; // רק משתמשים מחוברים יכולים לכתוב
    }
  }
}
```

אם תרצה הרשאות מתקדמות יותר, תוכל להוסיף Authentication ולתת גישה רק למשתמשים ספציפיים.

## ⚠️ חשוב

- **אל תעלה את קובץ `.env` ל-GitHub!** (הוא כבר נמצא ב-.gitignore)
- אם תרצה לפרסם את האתר, תצטרך להגדיר את המשתנים בשירות ההוסטינג שלך

## 🆘 צריך עזרה?

אם משהו לא עובד:

1. בדוק שיצרת את קובץ `.env` עם הפרטים הנכונים
2. בדוק שהפעלת את השרת מחדש אחרי יצירת `.env`
3. בדוק בקונסול של הדפדפן (F12) אם יש שגיאות
