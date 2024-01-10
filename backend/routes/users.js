const express = require('express');
const jwt = require('jsonwebtoken');
const {User, Admin, Course, secret_admin, secret_user}= require('../database');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      res.json({ message: 'User already exists' });
    } else {
      await new User({ username, password, purchasedCourses:[]}).save();
      res.json({message: 'User created successfully'})
    }
  });
  
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ username}, secret_user, { expiresIn: '1h' });
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
       const user = jwt.verify(token, secret_user);
       req.user = user;
       next();
      }  
      catch (error) {
        res.json({message: 'Invalid User'})
      }  
    }
    else{
      res.status(403);
    }
  })
  
  router.get('/courses', async (req, res) => {
    const courses = await Course.find({published: true});
    res.json({ courses });
  });
  
  router.post('/courses/:courseId', async (req, res) => {  
    const course = await Course.findById(req.params.courseId);
    if (course) {
      const user = await User.findOne({ username: req.user.username });
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: 'Course purchased successfully' });
    }
    else {
      res.status(404).json({ message: 'Course not found' });
    }
  });
  
  router.get('/purchasedCourses', async (req, res) => {
    const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
    if (user) {
      res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  });

  module.exports = router;