const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const randomEleOfArray = (array) =>
  array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const randomNum = Math.floor(Math.random() * 1000);
    const randomPrice = Math.floor(Math.random() * 30);
    const camp = new Campground({
      author: "624d2ebe7b801b1801084315",
      title: `${randomEleOfArray(descriptors)} ${randomEleOfArray(places)}`,
      location: `${cities[randomNum].city}, ${cities[randomNum].state}`,
      geometry : { type : "Point", coordinates : [ -114.334624, 48.410802 ] },
      images: [
        {
          url:
            "https://res.cloudinary.com/dmh83e19r/image/upload/v1650910038/yelpCamp/ce5lmuqfyoafj6z3n9go.jpg",
          filename: "yelpCamp/ce5lmuqfyoafj6z3n9go",
        },
        {
          url:
            "https://res.cloudinary.com/dmh83e19r/image/upload/v1650910051/yelpCamp/dovwo5tzxw0lqw2u06qg.jpg",
          filename: "yelpCamp/dovwo5tzxw0lqw2u06qg",
        },
        {
          url:
            "https://res.cloudinary.com/dmh83e19r/image/upload/v1650910055/yelpCamp/kf6mcax3e22mmb3ke27g.jpg",
          filename: "yelpCamp/kf6mcax3e22mmb3ke27g",
        },
        {
          url:
            "https://res.cloudinary.com/dmh83e19r/image/upload/v1650910065/yelpCamp/eojnmbg1bngzk3tqpmpm.jpg",
          filename: "yelpCamp/eojnmbg1bngzk3tqpmpm",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat dolorum enim quae nihil libero reprehenderit eveniet eius quibusdam suscipit culpa, eum est molestias sequi saepe labore quos atque veritatis alias?",
      price: randomPrice,
    });
    await camp.save();
  }
};
seedDB();
