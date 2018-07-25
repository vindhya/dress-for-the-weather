// plan:
// grab user's location via "use my location" button
// or take location text input from form
// send location to backend for API

const app = {};

app.apiDomain = 'http://localhost:3000';
app.$locationInput = $('.location-input');
app.$messageDiv = $('#message');
app.$recoDiv = $('#recommendation');
app.outfits = [
	{
		minTemp: -1000,
		maxTemp: -30,
		clothes: ['full body snow suit', 'winter boots']
	},
	{
		minTemp: -29,
		maxTemp: -15,
		clothes: ['parka', 'thermal underwear', 'sweater', 'warm pants', 'winter boots']
	},
	{
		minTemp: -14,
		maxTemp: -10,
		clothes: ['parka', 'long-sleeved shirt', 'pants', 'boots']
	},
	{
		minTemp: -9,
		maxTemp: 0,
		clothes: ['wool coat', 'sweater', 'pants']
	},
	{
		minTemp: 1,
		maxTemp: 10,
		clothes: ['jacket', 'long-sleeved shirt', 'pants']
	},
	{
		minTemp: 11,
		maxTemp: 15,
		clothes: ['light jacket', 't-shirt', 'pants']
	},
	{
		minTemp: 16,
		maxTemp: 19,
		clothes: ['long-sleeved shirt', 'pants']
	},
	{
		minTemp: 20,
		maxTemp: 23,
		clothes: ['t-shirt', 'pants']
	},
	{
		minTemp: 24,
		maxTemp: 1000,
		clothes: ['t-shirt', 'shorts', 'sandals']
	}
];
app.accessories = [
	{
		name: 'sunglasses',
		condition: 'sunny'
	},
	{
		name: 'umbrella',
		precipType: 'rain'
	},
	{
		name: 'snowshoes',
		precipType: 'snow'
	}
];

// get the weather from using my server which is calling the dark sky api
app.getWeather = async (lat, long) => {
	try {
		const weatherResponse = await fetch(`${app.apiDomain}/weather/${lat}/${long}`);
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
		const geocodeResponse = await fetch(`${app.apiDomain}/geocode/${query}`);
		const geocode = await geocodeResponse.json();
		
		if (geocode.resourceSets[0].estimatedTotal === 0) {
			app.$messageDiv.text(`Sorry, that location couldn't be found.`);
		} else {
			const lat = geocode.resourceSets[0].resources[0].point.coordinates[0];
			const long =  geocode.resourceSets[0].resources[0].point.coordinates[1];
			return app.getWeather(lat, long);
		}

	} catch(err) {
		console.error(err);
	}
};

// display a random photo from unsplash as the background based on the current weather summary
app.displayBackground = async summary => {
	const imgResponse = await fetch(`${app.apiDomain}/random-photo/${summary}`);
	const img = await imgResponse.json();
	const attribution = img.user;
	// console.log(img);

	$('body').css('background-image', `url('${img.urls.regular}')`);
	$('footer').html(`Powered by Dark Sky. Photo by <a href="${attribution.links.html}" target="_blank">${attribution.name}</a> on <a href="https://unsplash.com/" target="_blank">Unsplash</a>`);
};

// takes the summary and description from weather data and displays it in the #message div
app.displayWeatherSummary = (summary, description, temperature) => {
	const markup = `
		<h4>${summary}</h4>
		<p>It feels like ${Math.round(temperature)}°C outside. ${description}</p>
	`;
	app.$messageDiv.html(markup);
};

// displays the appropriate outfit based on the current weather
app.displayOutfitReco = weather => {
	const temp = Math.floor(weather.currently.apparentTemperature);
	
	// iterate through the list of outfits and find the clothes that this temp falls into
	const wearOutfit = app.outfits.filter(outfit => ((temp >= outfit.minTemp) && (temp <= outfit.maxTemp)));
	console.log('wearOutfit', wearOutfit);

	app.$recoDiv.html(`<h4>What to wear:</h4><ul></ul>`);
	const $recoList = $('#recommendation ul');

	wearOutfit[0].clothes.forEach(clothing => {
		$recoList.append(`<li>${clothing}</li>`);
	});
};

// displays an accessory recommendation based on precipitation type and current probability
app.displayAccessoryReco = weather => {
	const precipType = weather.currently.precipType;
	const precipProb = weather.currently.precipProbability;

	console.log('precipType', precipType);
	console.log('precipProb', precipProb);

	if (precipProb > .5) {
		app.accessories.forEach(accessory => {
			if (accessory.precipType === precipType) {
				app.$recoDiv.append(`<p>Don't forget to bring your ${accessory.name}!</p>`);
			}
		});
	}
};

// kick off the logic to display stuff
app.displayWeather = async weatherPromise => {
	const weather = await weatherPromise;
	console.log(weather);

	app.displayBackground(weather.currently.summary);
	app.displayWeatherSummary(weather.currently.summary, weather.hourly.summary, weather.currently.apparentTemperature);
	app.displayOutfitReco(weather);
	app.displayAccessoryReco(weather);
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