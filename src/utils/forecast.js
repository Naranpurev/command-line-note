const request = require('request');

const forecast = (lat, long, callback) => {
	const apiKey = '3a2c9ca95e4b2696fd655ad4b68c3b12';
	const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${lat},${long}`;
	request({ url, json: true }, (error, response) => {
		if (error) {
			callback('Unable to connect to weather service', undefined);
		} else if (response.body.error) {
			callback('Unable to find location', undefined);
		} else {
			callback(
				undefined,
				`${response.body.location.name} is at ${response.body.current.temperature}C`
			);
		}
	});
};

module.exports = forecast;
