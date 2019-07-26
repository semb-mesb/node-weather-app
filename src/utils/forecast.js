const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/890156f48b1ebc2feabbcce884fea103/' + latitude + ',' + longitude;

    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services', undefined);
        } else if (response.body.error) {
            callback('Unable to find location', undefined);
        }
        else {
            var fahrenheit = response.body.currently.temperature
            var celsius = (fahrenheit - 32) * 5 / 9 
            callback(undefined,  response.body.daily.data[0].summary + 'Temperature : ' + Math.trunc(celsius) + ' degree');
        }
    });
}

module.exports = forecast;