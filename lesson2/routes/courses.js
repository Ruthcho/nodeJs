// ראוטים לטיפול בקורסים
const express = require('express');
const router = express.Router();
const {
  getCoursesController,
  getCourseByIdController,
  createCourseController,
  updateCourseController,
  deleteCourseController
} = require('../controllers/courses');

// קבלת כל הקורסים
router.get('/', getCoursesController);

// קבלת קורס לפי מזהה
router.get('/:id', getCourseByIdController);

// יצירת קורס חדש
router.post('/', createCourseController);

// עדכון קורס קיים
router.put('/:id', updateCourseController);

// מחיקת קורס
router.delete('/:id', deleteCourseController);

module.exports = router;
