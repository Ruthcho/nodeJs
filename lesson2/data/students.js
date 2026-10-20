// שכבת נתונים לתלמידים — קריאה וכתיבה אסינכרונית מקובץ JSON
const fs = require('fs').promises;
const path = require('path');

// נתיב מוחלט לקובץ הנתונים (__dirname = תיקיית data)
const FILE_PATH = path.join(__dirname, 'students.json');

// קריאת כל התלמידים מהקובץ
async function readAll() {
  try {
    const content = await fs.readFile(FILE_PATH, 'utf8');

    // קובץ ריק — אין נתונים עדיין
    if (!content.trim()) return [];

    return JSON.parse(content);
  } catch (err) {
    // קובץ לא קיים — הרצה ראשונה, מחזירים מערך ריק
    if (err.code === 'ENOENT') return [];

    // כל שגיאה אחרת (פגם ב-JSON, הרשאות וכו') — מפילים את הבקשה
    throw err;
  }
}

// שמירת כל התלמידים לקובץ
async function writeAll(students) {
  try {
    await fs.writeFile(FILE_PATH, JSON.stringify(students, null, 2), 'utf8');
    return students;
  } catch (err) {
    throw new Error(`שמירת הקובץ נכשלה: ${err.message}`);
  }
}

module.exports = {
  readAll,
  writeAll
};
