const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseControllers');

router.post('/createCourse', courseController.createCourse);
router.post('/myCourses', courseController.myCourses);
router.post('/editCourse',courseController.editCourse);
router.post('/:courseId',courseController.courseView);

module.exports = router;
