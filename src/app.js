const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);
// Setup static directory to serve
app.use(express.static(publicDirectory));
app.get('/', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Naranpurev',
		footer: 'Created by Narka',
	});
});
app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Apps',
		footer: 'Created by Narka',
	});
});
app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help Page',
		footer: 'Created by Narka',
	});
});
app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'Please provide an address',
		});
	}

	geocode(
		req.query.address,
		(error, { latitude, longitude, location } = {}) => {
			if (error) {
				return res.send({
					error,
				});
			}
			forecast(latitude, longitude, (error, forecastData) => {
				if (error) {
					return res.send({
						error,
					});
				}
				res.send({
					forecast: forecastData,
					location,
					address: req.query.address,
				});
			});
		}
	);
});

app.get('/products', (req, res) => {
	console.log(req.query);
	if (!req.query.search) {
		return res.send({
			error: 'provide value pls',
		});
	} else {
		res.send({
			products: [],
		});
	}
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		error: 'Help article not found',
		footer: 'Created by Narka',
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		error: 'Page not found',
		footer: 'Created by Narka',
	});
});
app.listen(3000, () => {
	console.log('App listening on port 3000!');
});
