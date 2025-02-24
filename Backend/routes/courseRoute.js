const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseControllers');

router.post('/createCourse', courseController.createCourse);

module.exports = router;
