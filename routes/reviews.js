const express = require("express");
const router = express.Router({mergeParams: true});
const catchAsync = require("../helpers/catchAsync");
const Campground = require("../models/campground")
const{isLoggedIn,validateReview} = require('../middleware')
;
const Review = require("../models/review");



//review route
router.post(
  "/",
  validateReview,isLoggedIn,
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success", "Successfully made a new review!");

    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete(
  "/:reviewId",isLoggedIn,
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Successfully deleted a review!");
    res.redirect(`/campgrounds/${id}`);
  })
);
module.exports = router;