const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseControllers');
const middleware = require('../middleware');

router.post('/createCourse',middleware.check, courseController.createCourse);
router.post('/myCourses',middleware.check, courseController.myCourses);
router.post('/editCourse',middleware.check,courseController.editCourse);
router.post('/:courseId',courseController.courseView);
router.get('/allCourses',courseController.allCourses);


module.exports = router;
