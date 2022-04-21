const express = require("express");
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require("../helpers/catchAsync");
const { isLoggedIn, isAuthor,validateCampground } = require("../middleware");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


router.get(
  "/",
  catchAsync(campgrounds.index)
);

//add new campground
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.post( 
  "/",upload.array('image'),
  // validateCampground,
  // isLoggedIn,catchAsync(
  // campgrounds.createCampground)
  (req,res) => {
    res.send('it worked!');
    console.log(req.body,req.files)
  }
);

router.get(
  "/:id",
  catchAsync(campgrounds.showCampground)
);

//edit exist campground
router.get(
  "/:id/edit",
  isLoggedIn, isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

router.put(
  "/:id",
  isLoggedIn,isAuthor,
  validateCampground,
  catchAsync(campgrounds.editCampground)
);

//delete route for a campground
router.delete(
  "/:id",
  isLoggedIn,isAuthor,
  catchAsync(campgrounds.deleteCamgrounds)
);
module.exports = router;
