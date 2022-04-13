const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../helpers/catchAsync");

const { isLoggedIn, isReviewAuthor, validateReview } = require("../middleware");
const reviews = require("../controllers/reviews");

//review route
router.post("/", validateReview, isLoggedIn, catchAsync(reviews.create));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.delete)
);
module.exports = router;
