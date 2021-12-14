const request = require('request');
const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoibmFyYW5wdXJldiIsImEiOiJja3BrbXR4eHQwajZwMnZxa2kxeWgyYTYwIn0.DSO-3kuhlgES5vk9VWZWqg`;
	request({ url, json: true }, (err, res) => {
		if (err) {
			callback('Unable to connect location service');
		} else if (!res.body.features.length) {
			callback('Could not find lat and long for the input');
		} else {
			callback(undefined, {
				latitude: res.body.features[0].center[1],
				longitude: res.body.features[0].center[0],
				location: res.body.features[0].place_name,
			});
		}
	});
};
module.exports = geocode;
