// Middleware שמאמת שהפרמטר id בכתובת הוא מספר שלם תקין
function validateId(req, res, next) {
  const id = parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'מזהה לא תקין' });
  }

  req.parsedId = id; // שומרים בקשה כדי לא לחשב שוב בקונטרולר
  next();
}

module.exports = validateId;
