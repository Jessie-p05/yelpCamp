const express = require("express");
const router = express.Router();
const passport = require("passport");
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
//register route
router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post(
  "/register",
  catchAsync(async (req, res) => {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const newUser = await User.register(user, password);
    req.flash("success", "Welcome to Yelp Camp");
    res.redirect("/campgrounds");
  })
);

//login route
router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post(
  "/login",
  passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }),
  (req, res) => {
    req.flash("success", "welcome back!");
    res.redirect("/campgrounds");
  }
);

router.get('/logout',(req,res) => {
  req.logout();
  req.flash('success','Goodbye!');
  res.redirect('/campgrounds');
})

module.exports = router;
