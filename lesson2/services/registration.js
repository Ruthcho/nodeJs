// Service for registrations
const { readAll, writeAll } = require('../data/registration');
const { getStudentById } = require('./students');
const { getCourseById } = require('./courses');

// מחזיר את כל הרישומים
async function getRegistrations() {
  return readAll();
}

// מחזיר רישום אחד לפי מזהה
async function getRegistrationById(id) {
  const registrations = await readAll();
  return registrations.find((registration) => registration.id === id);
}

// יוצר רישום חדש ושומר לקובץ
async function createRegistration(data) {
  const studentId = parseInt(data.studentId);
  const courseId = parseInt(data.courseId);

  // בדיקת שלמות קשרים — אסור לרשום תלמיד או קורס שלא קיימים
  const student = await getStudentById(studentId);
  if (!student) return { error: 'התלמיד לא קיים' };

  const course = await getCourseById(courseId);
  if (!course) return { error: 'הקורס לא קיים' };

  const registrations = await readAll();

  const newRegistration = {
    id: registrations.length ? Math.max(...registrations.map((r) => r.id)) + 1 : 1,
    studentId,
    courseId,
    date: new Date().toISOString().split('T')[0]
  };

  registrations.push(newRegistration);
  await writeAll(registrations);
  return newRegistration;
}

// מעדכן את פרטי הרישום הקיים ושומר לקובץ
async function updateRegistration(id, updates) {
  const registrations = await readAll();
  const registration = registrations.find((r) => r.id === id);
  if (!registration) return null;

  if (updates.studentId) registration.studentId = parseInt(updates.studentId);
  if (updates.courseId) registration.courseId = parseInt(updates.courseId);

  await writeAll(registrations);
  return registration;
}

// מוחק רישום מהקובץ
async function deleteRegistration(id) {
  const registrations = await readAll();
  const index = registrations.findIndex((registration) => registration.id === id);
  if (index === -1) return null;

  const [deletedRegistration] = registrations.splice(index, 1);
  await writeAll(registrations);
  return deletedRegistration;
}

module.exports = {
  getRegistrations,
  getRegistrationById,
  createRegistration,
  updateRegistration,
  deleteRegistration
};
