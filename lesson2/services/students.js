// Service for students
const students = require('../data/students');

// מחזיר את כל התלמידים
function getStudents() {
  return students;
}

// מחזיר תלמיד אחד לפי מזהה
function getStudentById(id) {
  return students.find((student) => student.id === id);
}

// יוצר תלמיד חדש ומוסיף אותו למערך
function createStudent(name) {
  const newStudent = {
    id: students.length ? Math.max(...students.map((student) => student.id)) + 1 : 1,
    name
  };

  students.push(newStudent);
  return newStudent;
}

// מעדכן את פרטי התלמיד הקיים
function updateStudent(id, updates) {
  const student = getStudentById(id);
  if (!student) return null;

  if (updates.name) student.name = updates.name;
  return student;
}

// מוחק תלמיד מהמערך
function deleteStudent(id) {
  const index = students.findIndex((student) => student.id === id);
  if (index === -1) return null;

  const [deletedStudent] = students.splice(index, 1);
  return deletedStudent;
}

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};
