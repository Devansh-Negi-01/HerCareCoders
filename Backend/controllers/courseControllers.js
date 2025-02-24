const Course = require('../models/Courses');
const dotenv = require('dotenv');
dotenv.config();

module.exports.createCourse = async (req, res) => {
    try {
        const { courseName, category, description, price, data,difficulty,duration } = req.body;
        
        const existingCourse = await Course.findOne({ courseName });
        if (existingCourse) {
            return res.status(400).json({ error: 'Course name already exists' });
        }
        // console.log(newC)

        const newCourse = new Course({
            courseName,
            category,
            description,
            price,
            owner: req.userId,
            data,
            difficulty,
            duration
        });
        // console.log(newCourse);
        await newCourse.save();
        res.status(201).json({ msg: 'Course created successfully', course: newCourse });
    } catch (err) {
        res.status(500).json({ error: 'Error in creating course', err });
    }
};

module.exports.myCourses = async (req, res) => {
    try {
        // console.log(req.userId);
        // console.log('1');
        const courses = await Course.find({ owner: req.userId });
        // console.log(req.userId);
        // if (!courses.length) {
        //     return res.status(404).json({ msg: 'No courses found' });
        // }
        res.status(200).json({ courses });
    } catch (err) {
        res.status(500).json({ error: 'Error in fetching courses', err });
    }
};

module.exports.editCourse = async (req, res) => {
    try {
        const { courseId, courseName, category, description, price, data,difficulty,duration } = req.body;
        
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        if (course.owner.toString() !== req.userId.toString()) {
            return res.status(403).json({ error: 'You are not authorized to edit this course' });
        }

        course.courseName = courseName ;
        course.category = category ;
        course.description = description ;
        course.price = price ;
        course.data = data ;
        course.difficulty = difficulty;
        course.duration = duration ;

        await course.save();
        res.status(200).json({ message: 'Course updated successfully', course });
    } catch (err) {
        res.status(500).json({ error: 'Error in editing course', err });
    }
};

module.exports.courseView = async (req, res) => {
    try {
      const { courseId } = req.params;
    //   console.log(courseId);
  
      if (!courseId) {
        return res.status(400).json({ success: false, message: "Course ID is required" });
      }
  
      const course = await Course.findById(courseId)
        .populate("owner", "name email")
        .populate("review.owner", "name email")
        .populate("buyers", "name email");

      if (!course) {
        return res.status(404).json({ success: false, message: "Course not found" });
      }
  
      res.status(200).json({ success: true, course });
    } catch (error) {
      console.error("Error fetching course details:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  