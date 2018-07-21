const app = {};

// grab user's location via "use my location" button
// or take location text input from form
// send location to backend for API

app.promise = $.ajax({
	url: 'http://localhost:3000/64.126521/-79.39326740000001',
	dataType: 'JSON'
});

app.getWeatherFirst = position => {
	$.when(app.promise).done(function(weather) {
		console.log(weather);
	});

	console.log('weather gotten!');
};

app.getWeather = async position => {
	const weather = await fetch('http://localhost:3000/64.126521/-79.39326740000001');
	console.log(position, weather);
};

app.init = () => {

	$('#location-button').on('click', function(e) {
		navigator.geolocation.getCurrentPosition(position => {
			// console.log(position);
			app.getWeather(position);
    });
	});

	// fetch('http://localhost:3000/64.126521/-79.39326740000001')
	// 	.then(data => {
	// 		return data.json();
	// 	})
	// 	.then(weather => {
	// 		console.log(weather);
	// 	})
	// 	.catch(err => {
	// 		console.error(err);
	// 	});

};

$(function() {
	app.init();
});