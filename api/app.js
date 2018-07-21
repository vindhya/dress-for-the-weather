const express = require('express');
const app = express();
const request = require('request');
const port = process.env.PORT || 3000;

require('dotenv').config();

app.set('view engine', 'ejs');

app.use(function(req, res, next) {
	// res.setHeader('Access-Control-Allow-Origin', 'https://vindhya.github.io');
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
	next();
}); 

app.get('/', (req, res) => res.send('hello world!'));

app.get('/:query', (req, res) => {
	const query = req.params.query;
	const url = `http://dev.virtualearth.net/REST/v1/Locations/${query}?maxResults=1&key=${process.env.BINGMAPS_KEY}`;

	request(url, (error, response, body) => {
		console.log(`requested bing maps api for ${query}`);

		if (!error && response.statusCode == 200) {
			const data = JSON.parse(body);
			res.send(data);
		} else {
			console.error(error);
		}
	});

});

app.get('/:latitude/:longitude', (req, res) => {
	const latitude = req.params.latitude;
	const longitude = req.params.longitude;
	const url = `https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${latitude},${longitude}?units=ca&exclude=[minutely,daily]`;
	
	request(url, (error, response, body) => {
		console.log(`requested dark sky api for ${latitude}, ${longitude}`);

		if (!error && response.statusCode == 200) {
			const data = JSON.parse(body);
			res.send(data);
		} else {
			console.error(error);
		}
	});

});

app.listen(port, () => console.log(`serving app on port ${port}!`));