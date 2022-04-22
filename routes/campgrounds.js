const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");
const catchAsync = require("../helpers/catchAsync");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router
  .route("/")
  .get(catchAsync(campgrounds.index))
  .post(
    upload.array("image"),
    // validateCampground,
    // isLoggedIn,catchAsync(
    // campgrounds.createCampground)
    (req, res) => {
      res.send("it worked!");
      console.log(req.body, req.files);
    }
  );

//add new campground
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    validateCampground,
    catchAsync(campgrounds.editCampground)
  )
  //delete route for a campground
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampgrounds));

//edit exist campground
router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
