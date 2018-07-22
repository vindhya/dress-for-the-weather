// plan:
// grab user's location via "use my location" button
// or take location text input from form
// send location to backend for API

const app = {};

app.apiDomain = 'http://localhost:3000';
app.$locationInput = $('.location-input');
app.$messageDiv = $('#message');
app.clothes = {
	tops: [
		{
			name: 'short-sleeved shirt',
			underLayer: true,
			value: 5,
			minTemp: 10
		},
		{
			name: 'long-sleeved shirt',
			underLayer: true,
			value: 10,
			maxTemp: 20
		},
		{
			name: 'sweater',
			overLayer: true,
			value: 15,
			maxTemp: 20
		},
		{
			name: 'jacket',
			overLayer: true,
			value: 20,
			maxTemp: 20
		}
	],
	bottoms: [
		{
			name: 'shorts',
			value: 5,
			minTemp: 18
		},
		{
			name: 'pants',
			value: 10,
			maxTemp: 30
		}
	],
	accessories: [
		{
			name: 'sunglasses',
			condition: 'sunny',
			verb: 'wear'
		},
		{
			name: 'umbrella',
			condition: 'rainy',
			verb: 'carry'
		}
	]
};

// get the weather from using my server which is calling the dark sky api
app.getWeather = async (lat, long) => {
	try {
		const weatherResponse = await fetch(`${app.apiDomain}/${lat}/${long}`);
		const weather = await weatherResponse.json();
		return weather;

	} catch(err) {
		console.error(err);
	}
};

// get the geocode for the entered location via bing maps api through my server
// then call getWeather on the coordinates
app.getWeatherFromQuery = async query => {
	try {
		const geocodeResponse = await fetch(`${app.apiDomain}/${query}`);
		const geocode = await geocodeResponse.json();
		
		if (geocode.resourceSets[0].estimatedTotal === 0) {
			$messageDiv.text('your query sucks');
		} else {
			const lat = geocode.resourceSets[0].resources[0].point.coordinates[0];
			const long =  geocode.resourceSets[0].resources[0].point.coordinates[1];
			return app.getWeather(lat, long);
		}

	} catch(err) {
		console.error(err);
	}
};

app.displayBackground = async summary => {
	const img = 'public/images/partly-cloudy.jpeg';
	

	console.log('background displayed!');
};

app.displayWeatherSummary = (summary, description) => {
	const markup = `
		<p class="lead">${summary}</p>
		<p>${description}</p>
	`;
	app.$messageDiv.html(markup);
};

// kick off the logic to display stuff
app.displayWeather = async weatherPromise => {
	const weather = await weatherPromise;
	console.log(weather);

	app.displayBackground(weather.currently.summary);
	app.displayWeatherSummary(weather.currently.summary, weather.hourly.summary);

};

app.init = () => {

	// when the "use my location" button is clicked
	$('#location-button').on('click', function(e) {
		app.$locationInput.remove();
		app.$messageDiv.text('Loading...');
		navigator.geolocation.getCurrentPosition(position => {
			const weather = app.getWeather(position.coords.latitude, position.coords.longitude);
			app.displayWeather(weather);
		});
	});

	// when the location is submitted through text
	$('button[type=submit]').on('click', function(e) {
		e.preventDefault();
		const weather = app.getWeatherFromQuery($('#location-text').val());
		app.displayWeather(weather);
		app.$locationInput.remove();
		app.$messageDiv.text('Loading...');
	});

};

$(function() {
	app.init();
});