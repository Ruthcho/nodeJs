// Controller for courses
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../services/courses');

// מחזיר את כל הקורסים מהשרת
function getCoursesController(req, res) {
  getCourses()
    .then((courses) => res.json(courses))
    .catch(() => res.status(500).json({ message: 'שגיאה בקריאת הנתונים' }));
}

// מחזיר קורס אחד לפי מזהה
function getCourseByIdController(req, res) {
  const courseId = req.parsedId;

  getCourseById(courseId)
    .then((course) => {
      if (!course) return res.status(404).json({ message: 'הקורס לא נמצא' });
      res.json(course);
    })
    .catch(() => res.status(500).json({ message: 'שגיאה בקריאת הנתונים' }));
}

// יוצר קורס חדש מהנתונים שהתקבלו בבקשה
function createCourseController(req, res) {
  createCourse(req.body)
    .then((newCourse) => res.status(201).json(newCourse))
    .catch(() => res.status(500).json({ message: 'שגיאה בשמירת הנתונים' }));
}

// מעדכן קורס קיים לפי מזהה
function updateCourseController(req, res) {
  const courseId = req.parsedId;

  updateCourse(courseId, req.body)
    .then((updatedCourse) => {
      if (!updatedCourse) return res.status(404).json({ message: 'הקורס לא נמצא' });
      res.json(updatedCourse);
    })
    .catch(() => res.status(500).json({ message: 'שגיאה בשמירת הנתונים' }));
}

// מוחק קורס לפי מזהה
function deleteCourseController(req, res) {
  const courseId = req.parsedId;

  deleteCourse(courseId)
    .then((deletedCourse) => {
      if (!deletedCourse) return res.status(404).json({ message: 'הקורס לא נמצא' });
      res.json({ message: 'הקורס נמחק בהצלחה' });
    })
    .catch(() => res.status(500).json({ message: 'שגיאה בשמירת הנתונים' }));
}

module.exports = {
  getCoursesController,
  getCourseByIdController,
  createCourseController,
  updateCourseController,
  deleteCourseController
};
