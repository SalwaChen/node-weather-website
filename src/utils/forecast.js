const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=3ab3e8d7da5d6190ba38959591ec4afa&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const str = `${body.current.temperature}°c`;
      callback(undefined, str);
    }
  });
};
module.exports = forecast;
