// ראוטים לטיפול בתלמידים
const express = require('express');
const router = express.Router();
const validateId = require('../middleware/validateId');
const {
  getStudentsController,
  getStudentByIdController,
  createStudentController,
  updateStudentController,
  deleteStudentController
} = require('../controllers/students');

// קבלת כל התלמידים
router.get('/', getStudentsController);

// קבלת תלמיד לפי מזהה (עם אימות מזהה במידלוור)
router.get('/:id', validateId, getStudentByIdController);

// יצירת תלמיד חדש
router.post('/', createStudentController);

// עדכון תלמיד קיים
router.put('/:id', validateId, updateStudentController);

// מחיקת תלמיד
router.delete('/:id', validateId, deleteStudentController);

module.exports = router;
