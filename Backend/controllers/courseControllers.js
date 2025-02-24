const Course = require('../models/Courses');
const dotenv = require('dotenv');
dotenv.config();



module.exports.createCourse = async (req, res) => {
    try {
       console.log(req.body);
       
    } catch (err) {
        res.status(500).json({ error: "Error in signing up", err });
    }
};
