const express = require('express');
const jwt = require('jsonwebtoken');
const {User, Admin, Course, secret_admin, secret_user}= require('../database');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (admin) {
      res.json({ message: 'Admin already exists' });
    } 
    else {
      await new Admin({username, password, admin_courses : []}).save();
      res.json({ message: 'Admin created successfully. Proceed to login'});
    }
  
    
  });
  
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
      const token = jwt.sign({ username}, secret_admin, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });
  
  router.use('/', (req, res, next) =>{
    const auth = req.headers.authorization;
    if(auth){
      const token = auth.split(' ')[1];
      try {
       const admin = jwt.verify(token, secret_admin);
       req.admin = admin;
       next();
      }  
      catch (error) {
        res.json({message: 'Invalid Admin'})
      }  
    }
    else{
      res.status(403);
    }
  })
  
  router.post('/addcourse',  async (req, res) => {
    const admin = await Admin.findOne({username: req.admin.username})
    const course = await new Course(req.body).save();
    admin.admin_courses.push(course);
    await admin.save();
    res.json({ message: 'Course created successfully', courseId: course.id });
  });
  
  router.put('/courses/:courseId', async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (course) {
      res.json({ message: 'Course updated successfully' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });
  
  router.get('/courses/:courseId', async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    if (course) {
      res.json({ course });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });
  
  router.get('/courses', async (req, res) => {
    const admin = await Admin.findOne({username: req.admin.username}).populate('admin_courses');
    res.json({"courses" : admin.admin_courses || []});
  });

module.exports = router;
  
