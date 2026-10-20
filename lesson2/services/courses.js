// Service for courses
const { readAll, writeAll } = require('../data/courses');

// מחזיר את כל הקורסים
async function getCourses() {
  return readAll();
}

// מחזיר קורס אחד לפי מזהה
async function getCourseById(id) {
  const courses = await readAll();
  return courses.find((course) => course.idCourse === id);
}

// יוצר קורס חדש ושומר אותו לקובץ
async function createCourse(data) {
  const courses = await readAll();

  const newCourse = {
    idCourse: courses.length ? Math.max(...courses.map((course) => course.idCourse)) + 1 : 1,
    nameCourse: data.nameCourse || data.name || '',
    description: data.description || data.des || ''
  };

  courses.push(newCourse);
  await writeAll(courses);
  return newCourse;
}

// מעדכן את פרטי הקורס הקיים ושומר לקובץ
async function updateCourse(id, updates) {
  const courses = await readAll();
  const course = courses.find((c) => c.idCourse === id);
  if (!course) return null;

  if (updates.nameCourse || updates.name) {
    course.nameCourse = updates.nameCourse || updates.name;
  }

  if (updates.description || updates.des) {
    course.description = updates.description || updates.des;
  }

  await writeAll(courses);
  return course;
}

// מוחק קורס מהקובץ
async function deleteCourse(id) {
  const courses = await readAll();
  const index = courses.findIndex((course) => course.idCourse === id);
  if (index === -1) return null;

  const [deletedCourse] = courses.splice(index, 1);
  await writeAll(courses);
  return deletedCourse;
}

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
};
