let StudentModel = require('../models/student.model')
let express = require('express');
let router = express.Router();

// Create an Student object
router.post('/student', (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request body is missing that is not good :(');
    }

    let model = new StudentModel(req.body);
    model.save().then(doc => {
        if (!doc || doc.length === 0) {
            return res.status(500).send(doc)
        }
        res.status(201).send(doc)
    }).catch(err => {
        res.status(500).json(err)
    });
})

// Get an Student object
router.get('/student', (req, res) => {

    if (!req.query.name) {
        return res.status(400).send('Missing Url parameters: name');
    }

    StudentModel.findOne({
        name: req.query.name
    }).then(doc => {
        res.json(doc);
    }).catch(err => {
        req.status(500).json(err);
    });
});

// Update an Student object
router.put('/student', (req, res) => {
    if (!req.query.email) {
        return res.status(400).send('Missing Url parameters: email');
    }

    StudentModel.findOneAndUpdate({
            email: req.query.email
        },
        req.body, {
            new: true
        }).then(doc => {
        res.json(doc);
    }).catch(err => {
        req.status(500).json(err);
    });
});

// Delete an Student object
router.delete('/student', (req, res) => {
    if (!req.query.email) {
        return res.status(400).send('Missing Url parameters: email');
    }

    StudentModel.findByIdAndRemove({
            email: req.query.email
        },
        req.body, {
            new: true
        }).then(doc => {
        res.json(doc);
    }).catch(err => {
        req.status(500).json(err);
    });
});



router.get('/student/:name', (req, res) => {
    res.send(`You have requested a student ${req.params.name}`);
});

router.get('/error', (req, res) => {
    throw new Error('This is a forced error');
});

module.exports = router;