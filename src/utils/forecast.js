const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=da5af045a1bc6eabc865c7f73cbfc7d8&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  // request({ url: url, json: true }, (error, response) => {
  //   if (error) {
  //     callback("Unable to connect to weather services", undefined);
  //   } else if (response.body.error) {
  //     callback("Unable to find location co-ordintaes", undefined);
  //   } else {
  //     callback(
  //       undefined,
  //       "It is currently " +
  //         response.body.current.temperature +
  //         " degrees out. There wind speed feels like " +
  //         response.body.current.feelslike +
  //         " degrees out"
  //     );
  //   }
  // });

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.error) {
      callback("Unable to find location co-ordintaes", undefined);
    } else {
      callback(
        undefined,
        "It is currently " +
          body.current.temperature +
          " degrees out. There wind speed feels like " +
          body.current.feelslike +
          " degrees out"
      );
    }
  });
};

module.exports = forecast;
