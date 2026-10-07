// ראוטים לטיפול ברישומים
const express = require('express');
const router = express.Router();
const {
  getRegistrationsController,
  getRegistrationByIdController,
  createRegistrationController,
  updateRegistrationController,
  deleteRegistrationController
} = require('../controllers/registration');

// קבלת כל הרישומים
router.get('/', getRegistrationsController);

// קבלת רישום לפי מזהה
router.get('/:id', getRegistrationByIdController);

// יצירת רישום חדש
router.post('/', createRegistrationController);

// עדכון רישום קיים
router.put('/:id', updateRegistrationController);

// מחיקת רישום
router.delete('/:id', deleteRegistrationController);

module.exports = router;
