const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const ejsMate = require("ejs-mate");
const catchAsync = require("./helpers/catchAsync");
const ExpressError = require('./helpers/ExpressError');
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get(
  "/campgrounds",
  catchAsync(async (req, res) => {
    // const camp = new Campground({title: 'my backyard', description: 'cheap camping!'});
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
  })
);

//add new campground
app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

app.post(
  "/campgrounds",
  catchAsync(async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();

    res.redirect(`/campgrounds/${campground._id}`);
  })
);

app.get(
  "/campgrounds/:id",
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/show", { campground });
  })
);

//edit exist campground
app.get(
  "/campgrounds/:id/edit",
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", { campground });
  })
);

app.put(
  "/campgrounds/:id",
  catchAsync(
    catchAsync(async (req, res) => {
      // console.log(req.params)
      // console.log(req.body)
      const campground = await Campground.findByIdAndUpdate(req.params.id, {
        ...req.body.campground,
      });

      res.redirect(`/campgrounds/${campground._id}`);
    })
  )
);

//delete route for a campground
app.delete(
  "/campgrounds/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
  })
);

app.all('*',(req,res,next) => {
  next(new ExpressError('Page not found',404))
});

app.use((err, req, res, next) => {
  const {statusCode = 500} = err;
  if(!err.statusCode) err.statusCode = 500;
  if(!err.message) err.message = ' Oh No, something went wrong!'
  res.status(statusCode).render('error',{err});
});

app.listen(3000, () => {
  console.log("yelpCame is listening on port 3000");
});
