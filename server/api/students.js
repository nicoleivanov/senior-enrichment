const router = require('express').Router();
const { Campus, Student } = require('../../db/models');

module.exports = router;

// GET api/students
router.get('/', (req, res, next) => {
    Student.findAll()
    .then(students => res.json(students))
    .catch(next);
})

// GET api/students/:studentId
router.get('/:studentId', (req, res, next) => {
    Student.findById(req.params.studentId)
    .then(student => res.json(student))
    .catch(next);
})

// POST /api/students
router.post('/', (req, res, next) => {
  Student.create(req.body)
  .then(student => {
    return Student.findById(student.id)})
  .then((newStudent) =>res.send(newStudent))
  .catch(next);
})

// PUT /api/students/:studentId
// router.put('/:studentId', (req, res, next) => {
//   Student.findById(req.params.studentId)
//     .then(student => {
//         student.update(req.body)
//     }, {returning: true})
//     .then((student) => {
//         res.json(student)})
//     .catch(next)
// });
router.put('/:studentId', (req, res, next) => {
  Student.update(req.body, {
    where: { id: req.params.studentId },
    returning: true,
    plain: true
  })
  .spread((numRows, student) => {
    res.json(student)
  })
  .catch(next)
})


// DELETE /api/students/:studentId
router.delete('/:studentId', (req, res, next) => {
  Student.destroy({
    where: {
      id: req.params.studentId
    }
  })
  .then(() => res.status(200).send("deleted"))
  .catch(next)
})