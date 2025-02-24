const Course = require('../models/Courses');
const dotenv = require('dotenv');
dotenv.config();

module.exports.createCourse = async (req, res) => {
    try {
        const { courseName, category, description, price, data } = req.body;
        
        const existingCourse = await Course.findOne({ courseName });
        if (existingCourse) {
            return res.status(400).json({ error: 'Course name already exists' });
        }

        const newCourse = new Course({
            courseName,
            category,
            description,
            price,
            owner: req.userId,
            data
        });

        await newCourse.save();
        res.status(201).json({ message: 'Course created successfully', course: newCourse });
    } catch (err) {
        res.status(500).json({ error: 'Error in creating course', err });
    }
};

module.exports.myCourses = async (req, res) => {
    try {
        const courses = await Course.find({ owner: req.userId });
        if (!courses.length) {
            return res.status(404).json({ message: 'No courses found' });
        }
        res.status(200).json({ courses });
    } catch (err) {
        res.status(500).json({ error: 'Error in fetching courses', err });
    }
};

module.exports.editCourse = async (req, res) => {
    try {
        const { courseId, courseName, category, description, price, data } = req.body;
        
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        if (course.owner.toString() !== req.userId.toString()) {
            return res.status(403).json({ error: 'You are not authorized to edit this course' });
        }

        course.courseName = courseName || course.courseName;
        course.category = category || course.category;
        course.description = description || course.description;
        course.price = price || course.price;
        course.data = data || course.data;

        await course.save();
        res.status(200).json({ message: 'Course updated successfully', course });
    } catch (err) {
        res.status(500).json({ error: 'Error in editing course', err });
    }
};

