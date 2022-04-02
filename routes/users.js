const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../helpers/catchAsync");
const ExpressError = require("../helpers/ExpressError");
const { userSchema } = require("../schemas");

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

router.get('/register',(req,res) => {
  res.render('users/register')
});

router.post('/register',catchAsync(async(req,res) => {
  // res.send(req.body);
  const{email,username,password} = req.body;
  const user = new User({email, username})
  const newUser = await User.register(user,password);
  console.log(newUser);
  req.flash('success','Welcome to Yelp Camp');
  res.redirect('/campgrounds');
}));
router.get('/login',(req,res) => {
  res.render('users/login')
});

module.exports = router;