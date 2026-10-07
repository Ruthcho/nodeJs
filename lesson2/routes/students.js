// ראוטים לטיפול בתלמידים
const express = require('express');
const router = express.Router();
const {
  getStudentsController,
  getStudentByIdController,
  createStudentController,
  updateStudentController,
  deleteStudentController
} = require('../controllers/students');

// קבלת כל התלמידים
router.get('/', getStudentsController);

// קבלת תלמיד לפי מזהה
router.get('/:id', getStudentByIdController);

// יצירת תלמיד חדש
router.post('/', createStudentController);

// עדכון תלמיד קיים
router.put('/:id', updateStudentController);

// מחיקת תלמיד
router.delete('/:id', deleteStudentController);

module.exports = router;
