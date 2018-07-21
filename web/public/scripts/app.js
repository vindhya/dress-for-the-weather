(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = {};

// grab user's location via "use my location" button
// or take location text input from form
// send location to backend for API

app.promise = $.ajax({
	url: 'http://localhost:3000/64.126521/-79.39326740000001',
	dataType: 'JSON'
});

app.getWeatherFirst = function (position) {
	$.when(app.promise).done(function (weather) {
		console.log(weather);
	});

	console.log('weather gotten!');
};

app.getWeather = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(position) {
		var weather;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return fetch('http://localhost:3000/64.126521/-79.39326740000001');

					case 2:
						weather = _context.sent;

						console.log(position, weather);

					case 4:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function (_x) {
		return _ref.apply(this, arguments);
	};
}();

app.init = function () {

	$('#location-button').on('click', function (e) {
		navigator.geolocation.getCurrentPosition(function (position) {
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

$(function () {
	app.init();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FDQUEsSUFBTSxNQUFNLEVBQVo7O0FBRUE7QUFDQTtBQUNBOztBQUVBLElBQUksT0FBSixHQUFjLEVBQUUsSUFBRixDQUFPO0FBQ3BCLE1BQUssb0RBRGU7QUFFcEIsV0FBVTtBQUZVLENBQVAsQ0FBZDs7QUFLQSxJQUFJLGVBQUosR0FBc0Isb0JBQVk7QUFDakMsR0FBRSxJQUFGLENBQU8sSUFBSSxPQUFYLEVBQW9CLElBQXBCLENBQXlCLFVBQVMsT0FBVCxFQUFrQjtBQUMxQyxVQUFRLEdBQVIsQ0FBWSxPQUFaO0FBQ0EsRUFGRDs7QUFJQSxTQUFRLEdBQVIsQ0FBWSxpQkFBWjtBQUNBLENBTkQ7O0FBUUEsSUFBSSxVQUFKO0FBQUEsb0VBQWlCLGlCQUFNLFFBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUNNLE1BQU0sb0RBQU4sQ0FETjs7QUFBQTtBQUNWLGFBRFU7O0FBRWhCLGNBQVEsR0FBUixDQUFZLFFBQVosRUFBc0IsT0FBdEI7O0FBRmdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBQWpCOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUtBLElBQUksSUFBSixHQUFXLFlBQU07O0FBRWhCLEdBQUUsa0JBQUYsRUFBc0IsRUFBdEIsQ0FBeUIsT0FBekIsRUFBa0MsVUFBUyxDQUFULEVBQVk7QUFDN0MsWUFBVSxXQUFWLENBQXNCLGtCQUF0QixDQUF5QyxvQkFBWTtBQUNwRDtBQUNBLE9BQUksVUFBSixDQUFlLFFBQWY7QUFDRSxHQUhIO0FBSUEsRUFMRDs7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLENBcEJEOztBQXNCQSxFQUFFLFlBQVc7QUFDWixLQUFJLElBQUo7QUFDQSxDQUZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgYXBwID0ge307XG5cbi8vIGdyYWIgdXNlcidzIGxvY2F0aW9uIHZpYSBcInVzZSBteSBsb2NhdGlvblwiIGJ1dHRvblxuLy8gb3IgdGFrZSBsb2NhdGlvbiB0ZXh0IGlucHV0IGZyb20gZm9ybVxuLy8gc2VuZCBsb2NhdGlvbiB0byBiYWNrZW5kIGZvciBBUElcblxuYXBwLnByb21pc2UgPSAkLmFqYXgoe1xuXHR1cmw6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAvNjQuMTI2NTIxLy03OS4zOTMyNjc0MDAwMDAwMScsXG5cdGRhdGFUeXBlOiAnSlNPTidcbn0pO1xuXG5hcHAuZ2V0V2VhdGhlckZpcnN0ID0gcG9zaXRpb24gPT4ge1xuXHQkLndoZW4oYXBwLnByb21pc2UpLmRvbmUoZnVuY3Rpb24od2VhdGhlcikge1xuXHRcdGNvbnNvbGUubG9nKHdlYXRoZXIpO1xuXHR9KTtcblxuXHRjb25zb2xlLmxvZygnd2VhdGhlciBnb3R0ZW4hJyk7XG59O1xuXG5hcHAuZ2V0V2VhdGhlciA9IGFzeW5jIHBvc2l0aW9uID0+IHtcblx0Y29uc3Qgd2VhdGhlciA9IGF3YWl0IGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjMwMDAvNjQuMTI2NTIxLy03OS4zOTMyNjc0MDAwMDAwMScpO1xuXHRjb25zb2xlLmxvZyhwb3NpdGlvbiwgd2VhdGhlcik7XG59O1xuXG5hcHAuaW5pdCA9ICgpID0+IHtcblxuXHQkKCcjbG9jYXRpb24tYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHRcdG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24ocG9zaXRpb24gPT4ge1xuXHRcdFx0Ly8gY29uc29sZS5sb2cocG9zaXRpb24pO1xuXHRcdFx0YXBwLmdldFdlYXRoZXIocG9zaXRpb24pO1xuICAgIH0pO1xuXHR9KTtcblxuXHQvLyBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDozMDAwLzY0LjEyNjUyMS8tNzkuMzkzMjY3NDAwMDAwMDEnKVxuXHQvLyBcdC50aGVuKGRhdGEgPT4ge1xuXHQvLyBcdFx0cmV0dXJuIGRhdGEuanNvbigpO1xuXHQvLyBcdH0pXG5cdC8vIFx0LnRoZW4od2VhdGhlciA9PiB7XG5cdC8vIFx0XHRjb25zb2xlLmxvZyh3ZWF0aGVyKTtcblx0Ly8gXHR9KVxuXHQvLyBcdC5jYXRjaChlcnIgPT4ge1xuXHQvLyBcdFx0Y29uc29sZS5lcnJvcihlcnIpO1xuXHQvLyBcdH0pO1xuXG59O1xuXG4kKGZ1bmN0aW9uKCkge1xuXHRhcHAuaW5pdCgpO1xufSk7Il19
