const mongoose = require('mongoose');
const secret_admin = 'admin';
const secret_user = 'user';

// Define mongoose schemas
const userSchema = new mongoose.Schema({
    username: {type: String},
    password: String,
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
  });
  
  const adminSchema = new mongoose.Schema({
    username: String,
    password: String,
    admin_courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
  });
  
  const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
  });
  
  // Define mongoose models
  const User = mongoose.model('User', userSchema);
  const Admin = mongoose.model('Admin', adminSchema);
  const Course = mongoose.model('Course', courseSchema);

  module.exports = {User, Admin, Course, secret_admin, secret_user}