// Service for courses
const courses = require('../data/courses');

// מחזיר את כל הקורסים
function getCourses() {
  return courses;
}

// מחזיר קורס אחד לפי מזהה
function getCourseById(id) {
  return courses.find((course) => course.idCourse === id);
}

// יוצר קורס חדש ומוסיף אותו למערך
function createCourse(data) {
  const newCourse = {
    idCourse: courses.length ? Math.max(...courses.map((course) => course.idCourse)) + 1 : 1,
    nameCourse: data.nameCourse || data.name || '',
    description: data.description || data.des || ''
  };

  courses.push(newCourse);
  return newCourse;
}

// מעדכן את פרטי הקורס הקיים
function updateCourse(id, updates) {
  const course = getCourseById(id);
  if (!course) return null;

  if (updates.nameCourse || updates.name) {
    course.nameCourse = updates.nameCourse || updates.name;
  }

  if (updates.description || updates.des) {
    course.description = updates.description || updates.des;
  }

  return course;
}

// מוחק קורס מהמערך
function deleteCourse(id) {
  const index = courses.findIndex((course) => course.idCourse === id);
  if (index === -1) return null;

  const [deletedCourse] = courses.splice(index, 1);
  return deletedCourse;
}

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
};
