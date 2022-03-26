const express = require("express");
const router = express.Router();
const catchAsync = require("../helpers/catchAsync");
const ExpressError = require("../helpers/ExpressError");
const Campground = require("../models/campground");
const { campgroundSchema } = require("../schemas");

const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
router.get(
  "/",
  catchAsync(async (req, res) => {
    // const camp = new Campground({title: 'my backyard', description: 'cheap camping!'});
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
  })
);

//add new campground
router.get("/new", (req, res) => {
  res.render("campgrounds/new");
});

router.post(
  "/",
  validateCampground,
  catchAsync(async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();

    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate(
      "reviews"
    );
    res.render("campgrounds/show", { campground });
  })
);

//edit exist campground
router.get(
  "/:id/edit",
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", { campground });
  })
);

router.put(
  "/:id",
  validateCampground,catchAsync(async (req, res) => {
    // console.log(req.params)
    // console.log(req.body)
    const campground = await Campground.findByIdAndUpdate(req.params.id, {
      ...req.body.campground,
    });

    res.redirect(`/campgrounds/${campground._id}`);
  })
);

//delete route for a campground
router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
  })
);
module.exports = router;
