const router = require('express').Router();
const { Campus, Student } = require('../../db/models');

module.exports = router;

// GET api/campuses
router.get('/', (req, res, next) => {
    Campus.findAll()
    .then(campuses => res.json(campuses))
    .catch(next);
})

// GET api/campuses/:campusId
router.get('/:campusId', (req, res, next) => {
    Campus.findById(req.params.campusId)
    .then(campus => res.json(campus))
    .catch(next);
})

// POST /api/campuses
router.post('/', (req, res, next) => {
  Campus.create(req.body)
    .then(campus => res.json(campus))
    .catch(next);
});

// PUT /api/campuses/:campusId
router.put('/:campusId', (req, res, next) => {
  Campus.findById(req.params.campusId)
    .then(campus => {
        return campus.update(req.body)
    }, {returning: true})
    .then((campus) => {
        res.json(campus)})
    .catch(next)
});

// DELETE /api/campuses/:campusId
router.delete('/:campusId', (req, res, next) => {
    Campus.findOne({where: {
        id: req.params.campusId}, individualHooks: true})
        .then(campus => {
            campus.destroy()
            })
        .then(() => { res.status(200).send("deleted")})
        .catch(next)
})

