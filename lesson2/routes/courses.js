// ראוטים לטיפול בקורסים
const express = require('express');
const router = express.Router();
const validateId = require('../middleware/validateId');
const {
  getCoursesController,
  getCourseByIdController,
  createCourseController,
  updateCourseController,
  deleteCourseController
} = require('../controllers/courses');

// קבלת כל הקורסים
router.get('/', getCoursesController);

// קבלת קורס לפי מזהה (עם אימות מזהה במידלוור)
router.get('/:id', validateId, getCourseByIdController);

// יצירת קורס חדש
router.post('/', createCourseController);

// עדכון קורס קיים
router.put('/:id', validateId, updateCourseController);

// מחיקת קורס
router.delete('/:id', validateId, deleteCourseController);

module.exports = router;
