// Service for registrations
const registrations = require('../data/registration');

// מחזיר את כל הרישומים
function getRegistrations() {
  return registrations;
}

// מחזיר רישום אחד לפי מזהה
function getRegistrationById(id) {
  return registrations.find((registration) => registration.id === id);
}

// יוצר רישום חדש ומוסיף אותו למערך
function createRegistration(data) {
  const newRegistration = {
    id: registrations.length + 1,
    studentId: parseInt(data.studentId),
    courseId: parseInt(data.courseId),
    date: new Date().toISOString().split('T')[0]
  };

  registrations.push(newRegistration);
  return newRegistration;
}

// מעדכן את פרטי הרישום הקיים
function updateRegistration(id, updates) {
  const registration = getRegistrationById(id);
  if (!registration) return null;

  if (updates.studentId) registration.studentId = parseInt(updates.studentId);
  if (updates.courseId) registration.courseId = parseInt(updates.courseId);

  return registration;
}

// מוחק רישום מהמערך
function deleteRegistration(id) {
  const index = registrations.findIndex((registration) => registration.id === id);
  if (index === -1) return null;

  const [deletedRegistration] = registrations.splice(index, 1);
  return deletedRegistration;
}

module.exports = {
  getRegistrations,
  getRegistrationById,
  createRegistration,
  updateRegistration,
  deleteRegistration
};
