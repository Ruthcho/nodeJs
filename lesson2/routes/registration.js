// ראוטים לטיפול ברישומים
const express = require('express');
const router = express.Router();
const validateId = require('../middleware/validateId');
const {
  getRegistrationsController,
  getRegistrationByIdController,
  createRegistrationController,
  updateRegistrationController,
  deleteRegistrationController
} = require('../controllers/registration');

// קבלת כל הרישומים
router.get('/', getRegistrationsController);

// קבלת רישום לפי מזהה (עם אימות מזהה במידלוור)
router.get('/:id', validateId, getRegistrationByIdController);

// יצירת רישום חדש
router.post('/', createRegistrationController);

// עדכון רישום קיים
router.put('/:id', validateId, updateRegistrationController);

// מחיקת רישום
router.delete('/:id', validateId, deleteRegistrationController);

module.exports = router;
