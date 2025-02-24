const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userController');
const {userSchema} = require('../middleware');
const middleware = require("../middleware");
// const {upload} = require('../middleware');

Router.post('/login',userController.login);
Router.post('/signup',userController.signup);
Router.post('/logout',userController.logout);
Router.post('/toggleLike',middleware.check,userController.toggleLike);
module.exports = Router;