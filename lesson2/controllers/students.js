// Controller for students
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../services/students');

// מחזיר את כל התלמידים מהשרת
function getStudentsController(req, res) {
  res.json(getStudents());
}

// מחזיר תלמיד אחד לפי מזהה
function getStudentByIdController(req, res) {
  const studentId = parseInt(req.params.id);
  const student = getStudentById(studentId);

  if (!student) return res.status(404).json({ message: 'התלמיד לא נמצא' });

  res.json(student);
}

// יוצר תלמיד חדש מהנתונים שהתקבלו בבקשה
function createStudentController(req, res) {
  const { name } = req.body;
  const newStudent = createStudent(name);

  res.status(201).json(newStudent);
}

// מעדכן תלמיד קיים לפי מזהה
function updateStudentController(req, res) {
  const studentId = parseInt(req.params.id);
  const updatedStudent = updateStudent(studentId, req.body);

  if (!updatedStudent) return res.status(404).json({ message: 'התלמיד לא נמצא' });

  res.json(updatedStudent);
}

// מוחק תלמיד לפי מזהה
function deleteStudentController(req, res) {
  const studentId = parseInt(req.params.id);
  const deletedStudent = deleteStudent(studentId);

  if (!deletedStudent) return res.status(404).json({ message: 'התלמיד לא נמצא' });

  res.json({ message: 'התלמיד נמחק מהמערכת בהצלחה' });
}

module.exports = {
  getStudentsController,
  getStudentByIdController,
  createStudentController,
  updateStudentController,
  deleteStudentController
};
