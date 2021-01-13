const mongoose = require('mongoose');
const cities = require('./cities');
const axios = require('axios');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


//img function to use api and return the url from it
const img = async () => {
    try {
        const res = await axios.get('https://source.unsplash.com/collection/483251');
        return res.request.res.responseUrl;
    } catch (e) {
        console.log("error", e);
    }
}

//added the function in to the image key with await so it waits for it to complete before assigning it
//also added in an await function after each one to make sure a different image was got each time - requests sent very close resulted in the same image
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: await img(),
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur illo voluptatem soluta quod dignissimos officiis voluptate a fuga ipsa cumque, in sit facere culpa corrupti? Veniam rerum molestiae impedit labore!',
            price
        })
        await camp.save();
        await new Promise(r => setTimeout(r, 2000));
    }
}

seedDB().then(() => {
    console.log('Connection closed');
    mongoose.connection.close();
})