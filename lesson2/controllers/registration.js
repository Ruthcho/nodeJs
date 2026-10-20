// Controller for registrations
const {
  getRegistrations,
  getRegistrationById,
  createRegistration,
  updateRegistration,
  deleteRegistration
} = require('../services/registration');

// מחזיר את כל הרישומים מהשרת
function getRegistrationsController(req, res) {
  getRegistrations()
    .then((registrations) => res.json(registrations))
    .catch(() => res.status(500).json({ message: 'שגיאה בקריאת הנתונים' }));
}

// מחזיר רישום אחד לפי מזהה
function getRegistrationByIdController(req, res) {
  const registrationId = req.parsedId;

  getRegistrationById(registrationId)
    .then((registration) => {
      if (!registration) return res.status(404).json({ message: 'הרישום לא נמצא' });
      res.json(registration);
    })
    .catch(() => res.status(500).json({ message: 'שגיאה בקריאת הנתונים' }));
}

// יוצר רישום חדש מהנתונים שהתקבלו בבקשה
function createRegistrationController(req, res) {
  createRegistration(req.body)
    .then((registration) => {
      // ה-Service מחזיר error כאשר התלמיד או הקורס לא קיימים
      if (registration.error) return res.status(400).json({ message: registration.error });
      res.status(201).json(registration);
    })
    .catch(() => res.status(500).json({ message: 'שגיאה בשמירת הנתונים' }));
}

// מעדכן רישום קיים לפי מזהה
function updateRegistrationController(req, res) {
  const registrationId = req.parsedId;

  updateRegistration(registrationId, req.body)
    .then((updatedRegistration) => {
      if (!updatedRegistration) return res.status(404).json({ message: 'הרישום לא נמצא' });
      res.json(updatedRegistration);
    })
    .catch(() => res.status(500).json({ message: 'שגיאה בשמירת הנתונים' }));
}

// מוחק רישום לפי מזהה
function deleteRegistrationController(req, res) {
  const registrationId = req.parsedId;

  deleteRegistration(registrationId)
    .then((deletedRegistration) => {
      if (!deletedRegistration) return res.status(404).json({ message: 'הרישום לא נמצא' });
      res.json({ message: 'הרישום בוטל בהצלחה' });
    })
    .catch(() => res.status(500).json({ message: 'שגיאה בשמירת הנתונים' }));
}

module.exports = {
  getRegistrationsController,
  getRegistrationByIdController,
  createRegistrationController,
  updateRegistrationController,
  deleteRegistrationController
};
