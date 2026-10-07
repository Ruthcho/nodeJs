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
  res.json(getCourses());
}

// מחזיר קורס אחד לפי מזהה
function getCourseByIdController(req, res) {
  const courseId = parseInt(req.params.id);
  const course = getCourseById(courseId);

  if (!course) return res.status(404).json({ message: 'הקורס לא נמצא' });

  res.json(course);
}

// יוצר קורס חדש מהנתונים שהתקבלו בבקשה
function createCourseController(req, res) {
  const newCourse = createCourse(req.body);
  res.status(201).json(newCourse);
}

// מעדכן קורס קיים לפי מזהה
function updateCourseController(req, res) {
  const courseId = parseInt(req.params.id);
  const updatedCourse = updateCourse(courseId, req.body);

  if (!updatedCourse) return res.status(404).json({ message: 'הקורס לא נמצא' });

  res.json(updatedCourse);
}

// מוחק קורס לפי מזהה
function deleteCourseController(req, res) {
  const courseId = parseInt(req.params.id);
  const deletedCourse = deleteCourse(courseId);

  if (!deletedCourse) return res.status(404).json({ message: 'הקורס לא נמצא' });

  res.json({ message: 'הקורס נמחק בהצלחה' });
}

module.exports = {
  getCoursesController,
  getCourseByIdController,
  createCourseController,
  updateCourseController,
  deleteCourseController
};
