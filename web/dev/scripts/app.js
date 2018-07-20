const app = {};

// grab user's location via "use my location" button
// or take location text input from form
// send location to backend for API

app.init = () => {

	$('#location-button').on('click', function(e) {
		navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
    });
	});
	
};

$(function() {
	app.init();
});