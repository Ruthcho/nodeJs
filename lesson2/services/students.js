// Service for students
const { readAll, writeAll } = require('../data/students');

// מחזיר את כל התלמידים
async function getStudents() {
  return readAll();
}

// מחזיר תלמיד אחד לפי מזהה
async function getStudentById(id) {
  const students = await readAll();
  return students.find((student) => student.id === id);
}

// יוצר תלמיד חדש ושומר לקובץ
async function createStudent(name) {
  const students = await readAll();

  const newStudent = {
    id: students.length ? Math.max(...students.map((student) => student.id)) + 1 : 1,
    name
  };

  students.push(newStudent);
  await writeAll(students);
  return newStudent;
}

// מעדכן את פרטי התלמיד הקיים ושומר לקובץ
async function updateStudent(id, updates) {
  const students = await readAll();
  const student = students.find((s) => s.id === id);
  if (!student) return null;

  if (updates.name) student.name = updates.name;

  await writeAll(students);
  return student;
}

// מוחק תלמיד מהקובץ
async function deleteStudent(id) {
  const students = await readAll();
  const index = students.findIndex((student) => student.id === id);
  if (index === -1) return null;

  const [deletedStudent] = students.splice(index, 1);
  await writeAll(students);
  return deletedStudent;
}

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};
