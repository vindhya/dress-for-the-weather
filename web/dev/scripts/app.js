// grab user's location via "use my location" button
// or take location text input from form
// send location to backend for API

const app = {};

app.domain = 'http://localhost:3000';

app.getWeather = async (lat, long) => {
	try {
		const weatherResponse = await fetch(`${app.domain}/${lat}/${long}`);
		const weather = await weatherResponse.json();

		console.log('dark sky response', weather);
		return weather;

	} catch(err) {
		console.error(err);
	}
};

app.getWeatherFromQuery = async query => {
	console.log(query);
	try {
		const geocodeResponse = await fetch(`${app.domain}/${query}`);
		const geocode = await geocodeResponse.json();

		console.log('bing maps response', geocode);
		if (geocode.resourceSets[0].estimatedTotal === 0) {
			$('#message').text('your query sucks');
		} else {
			const lat = geocode.resourceSets[0].resources[0].point.coordinates[0];
			const long =  geocode.resourceSets[0].resources[0].point.coordinates[1];
			return app.getWeather(lat, long);
		}

	} catch(err) {
		console.error(err);
	}
};

app.init = () => {

	$('#location-button').on('click', function(e) {
		navigator.geolocation.getCurrentPosition(position => {
			console.log('position', position);
			app.getWeather(position.coords.latitude, position.coords.longitude);
    });
	});

	$('button[type=submit]').on('click', function(e) {
		e.preventDefault();
		app.getWeatherFromQuery($('input[type=text]').val());
	});

};

$(function() {
	app.init();
});