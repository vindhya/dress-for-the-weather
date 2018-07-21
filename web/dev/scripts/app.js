const app = {};

// grab user's location via "use my location" button
// or take location text input from form
// send location to backend for API

app.getWeather = async position => {
	const lat = position.coords.latitude;
	const long = position.coords.longitude;
	const response = await fetch(`http://localhost:3000/${lat}/${long}`);
	const weather = await response.json();
	console.log(position, weather);
};

app.init = () => {

	$('#location-button').on('click', function(e) {
		navigator.geolocation.getCurrentPosition(position => {
			// console.log(position);
			app.getWeather(position);
    });
	});

};

$(function() {
	app.init();
});