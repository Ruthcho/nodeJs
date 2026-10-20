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
  getStudents()
    .then((students) => res.json(students))
    .catch(() => res.status(500).json({ message: 'שגיאה בקריאת הנתונים' }));
}

// מחזיר תלמיד אחד לפי מזהה
function getStudentByIdController(req, res) {
  const studentId = req.parsedId;

  getStudentById(studentId)
    .then((student) => {
      if (!student) return res.status(404).json({ message: 'התלמיד לא נמצא' });
      res.json(student);
    })
    .catch(() => res.status(500).json({ message: 'שגיאה בקריאת הנתונים' }));
}

// יוצר תלמיד חדש מהנתונים שהתקבלו בבקשה
function createStudentController(req, res) {
  const { name } = req.body;

  createStudent(name)
    .then((newStudent) => res.status(201).json(newStudent))
    .catch(() => res.status(500).json({ message: 'שגיאה בשמירת הנתונים' }));
}

// מעדכן תלמיד קיים לפי מזהה
function updateStudentController(req, res) {
  const studentId = req.parsedId;

  updateStudent(studentId, req.body)
    .then((updatedStudent) => {
      if (!updatedStudent) return res.status(404).json({ message: 'התלמיד לא נמצא' });
      res.json(updatedStudent);
    })
    .catch(() => res.status(500).json({ message: 'שגיאה בשמירת הנתונים' }));
}

// מוחק תלמיד לפי מזהה
function deleteStudentController(req, res) {
  const studentId = req.parsedId;

  deleteStudent(studentId)
    .then((deletedStudent) => {
      if (!deletedStudent) return res.status(404).json({ message: 'התלמיד לא נמצא' });
      res.json({ message: 'התלמיד נמחק מהמערכת בהצלחה' });
    })
    .catch(() => res.status(500).json({ message: 'שגיאה בשמירת הנתונים' }));
}

module.exports = {
  getStudentsController,
  getStudentByIdController,
  createStudentController,
  updateStudentController,
  deleteStudentController
};
