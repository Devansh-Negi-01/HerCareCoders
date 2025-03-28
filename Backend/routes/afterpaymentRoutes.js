const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/updateProfile', userController.updateProfile);

module.exports = router;
