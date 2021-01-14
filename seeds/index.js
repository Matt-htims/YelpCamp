const mongoose = require('mongoose');
const cities = require('./cities');
const axios = require('axios');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect(
	'mongodb+srv://first-user:SBLiyERmC7g4jNE@cluster0.dzqvb.mongodb.net/<dbname>?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	}
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 50; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			author: '5fff2642f1ccc201494f64b1',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			images: [
				{
					url: 'https://res.cloudinary.com/dt3riwyne/image/upload/v1610121015/YelpCamp/jbtqfwbi7rqtodllwmae.jpg',
					filename: 'YelpCamp/jbtqfwbi7rqtodllwmae',
				},
				{
					url: 'https://res.cloudinary.com/dt3riwyne/image/upload/v1610123279/YelpCamp/ffajrlk0yeumo6so3kmw.jpg',
					filename: 'YelpCamp/fxphncbg1ipgjiibhhcc',
				},
			],
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur illo voluptatem soluta quod dignissimos officiis voluptate a fuga ipsa cumque, in sit facere culpa corrupti? Veniam rerum molestiae impedit labore!',
			price,
			geometry: {
				type: 'Point',
				coordinates: [cities[random1000].longitude, cities[random1000].latitude],
			},
		});
		await camp.save();
	}
};

seedDB().then(() => {
	console.log('Connection closed');
	mongoose.connection.close();
});
