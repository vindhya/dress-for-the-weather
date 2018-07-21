const app = {};

// grab user's location via "use my location" button
// or take location text input from form
// send location to backend for API

app.getWeather = async (lat, long) => {
	try {
		const response = await fetch(`http://localhost:3000/${lat}/${long}`);
		const weather = await response.json();

		console.log('dark sky response', weather);
		return weather;
		
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

};

$(function() {
	app.init();
});