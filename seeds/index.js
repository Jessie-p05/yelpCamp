const mongoose = require('mongoose');
const Campground = require('../models/campground'); 
const cities = require('./cities');
const {descriptors, places} = require ('./seedHelpers');


mongoose.connect('mongodb://localhost:27017/yelp-camp',{
  useNewUrlParser:true,
  useUnifiedTopology:true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",() => {
  console.log("Database connected")
});

const randomEleOfArray = array => array[Math.floor(Math.random()*array.length)];


const seedDB = async() => {
  await Campground.deleteMany({});
  for(let i = 0; i < 50; i++) {
    const randomNum = Math.floor(Math.random()*1000);
    const randomPrice = Math.floor(Math.random()*30);
    const camp = new Campground({
      author: '624d2ebe7b801b1801084315',
      title:`${randomEleOfArray(descriptors)} ${randomEleOfArray(places)}`,
      location: `${cities[randomNum].city}, ${cities[randomNum].state}`,
      image:'http://source.unsplash.com/collection/483251',
      description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat dolorum enim quae nihil libero reprehenderit eveniet eius quibusdam suscipit culpa, eum est molestias sequi saepe labore quos atque veritatis alias?',
      price: randomPrice
    })
    await camp.save();
  }

};
seedDB();
