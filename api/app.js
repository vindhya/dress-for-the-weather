const express = require('express');
const app = express();
const request = require('request');
const port = process.env.PORT || 3000;

require('dotenv').config();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	const latitude = '43.653226';
	const longitude = '-79.383184';
	const url = `https://api.darksky.net/forecast/${process.env.SECRET_KEY}/${latitude},${longitude}?units=ca&exclude=[minutely]`;

	request(url, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			const data = JSON.parse(body);
			res.send(data);
		}
	});
});

app.listen(port, () => console.log(`serving app on port ${port}!`));