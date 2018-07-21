const express = require('express');
const app = express();
const request = require('request');
const port = process.env.PORT || 3000;

require('dotenv').config();

app.set('view engine', 'ejs');

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'https://vindhya.github.io');
	next();
}); 

app.get('/', (req, res) => res.send('hello world!'));

app.get('/:latitude/:longitude', (req, res) => {
	const latitude = req.params.latitude;
	const longitude = req.params.longitude;
	const url = `https://api.darksky.net/forecast/${process.env.SECRET_KEY}/${latitude},${longitude}?units=ca&exclude=[minutely,daily]`;
	
	request(url, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			const data = JSON.parse(body);
			res.send(data);
		}
	});

});

app.listen(port, () => console.log(`serving app on port ${port}!`));