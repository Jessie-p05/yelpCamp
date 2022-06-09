require("dotenv").config();
const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/yelp-camp";
mongoose.connect(dbUrl, {
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

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
const imageArray = [
  {
    url:
      "https://res.cloudinary.com/dmh83e19r/image/upload/v1651179140/yelpCamp/tiauv37spkdidldxjspo.jpg",
    filename: "yelpCamp/tiauv37spkdidldxjspo",
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
]

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 500; i++) {
    const randomNum = Math.floor(Math.random() * 1000);
    const randomPrice = Math.floor(Math.random() * 30);
    const camp = new Campground({
      author: "624d2ebe7b801b1801084315",
      title: `${randomEleOfArray(descriptors)} ${randomEleOfArray(places)}`,
      location: `${cities[randomNum].city}, ${cities[randomNum].state}`,
      geometry: {
        type: "Point",
        coordinates: [cities[randomNum].longitude, cities[randomNum].latitude],
      },
      images: shuffle(imageArray),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat dolorum enim quae nihil libero reprehenderit eveniet eius quibusdam suscipit culpa, eum est molestias sequi saepe labore quos atque veritatis alias?",
      price: randomPrice,
    });
    await camp.save();
  }
};
seedDB();
