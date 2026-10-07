// 1. טעינת משתני הסביבה מקובץ .env (חייב להיות ראשון!)
require('dotenv').config();

// 2. ייבוא ספריית express לתוך הקובץ
const express = require('express');

// 3. יצירת מופע של האפליקציה הראשית
const app = express();

// 4. הגדרת הפורט שבו השרת יפעל — מתוך משתני הסביבה
const PORT = process.env.PORT || 3000;

// 4. מאפשר לקרוא נתונים JSON בבקשות
app.use(express.json());

// 5. ייבוא המידלוור לאימות גישה
const authMiddleware = require('./middleware/auth');

// 6. הפעלת המידלוור על כל הבקשות
app.use(authMiddleware);

const {
  getCoursesController
} = require('./controllers/courses');

const {
  getStudentsController
} = require('./controllers/students');

const coursesRouter = require('./routes/courses');
const studentsRouter = require('./routes/students');
const registrationRouter = require('./routes/registration');

// ---------------- נתיבים (Routes) ----------------

// נתיב ברירת מחדל לבדיקה שהשרת עובד
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'השרת עובד בהצלחה!',
    description: 'זהו שרת אקספרס בסיסי המציג נתוני קורסים וסטודנטים'
  });
});

// נתיב להצגת כל הקורסים
app.get('/courses', getCoursesController);

// נתיב להצגת כל התלמידים
app.get('/students', getStudentsController);

// חיבור הראוטים של הקורסים לתחום ה-API
app.use('/api/courses', coursesRouter);
// חיבור הראוטים של התלמידים לתחום ה-API
app.use('/api/students', studentsRouter);

// חיבור הראוטים של הרישומים לתחום ה-API
app.use('/api/enrollments', registrationRouter);

// הפעלת השרת על הפורט שהוגדר
app.listen(PORT, () => {
  console.log(`השרת רץ בהצלחה בכתובת: http://localhost:${PORT}`);
});
