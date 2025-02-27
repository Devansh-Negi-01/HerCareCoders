const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const adminRoutes = require('./routes/adminRoutes')
const passport = require("./config/passport");
const session = require("express-session");
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const afterpaymentRoute = require('./routes/afterpaymentRoutes');
const courseRoute = require('./routes/courseRoute');
const middleware = require('./middleware');
const cors = require('cors');
const cloudinary = require('./utils/cloudinaryConfig');
const cookieParser = require('cookie-parser');
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(cors({ origin: process.env.FRONTEND_URL ,credentials:true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

app.use(cookieParser());
app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize()); 
app.use(passport.session());
dotenv.config();
// console.log(cloudinary);

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/admin',adminRoutes);
app.use('/user',userRoutes);
app.use('/auth',authRoutes);
app.use('/payment',middleware.check, afterpaymentRoute);
app.use('/course',courseRoute);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});


app.listen(PORT,()=>{ 
    console.log(`Server running on port ${PORT}`);
})