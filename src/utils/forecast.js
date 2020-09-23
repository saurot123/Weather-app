const request = require("request");

// const forecast = (latitude, longitude, callback) => {
//   const url =
//     "http://api.weatherstack.com/current?access_key=6f6310020576e5ab5e91e79138cefa33&query=" +
//     latitude +
//     "," +
//     longitude +
//     "";
//   request({ url: url, json: true }, (error, response) => {
//     if (error) {
//       callback("Unable to connect to Weather Service!", undefined);
//     } else if (response.body.error) {
//       callback("Unable to find Location!", undefined);
//     } else {
//       callback(undefined, {
//         Temperature: response.body.current.temperature,
//         Raining_Probablity: response.body.current.precip,
//       });
//     }
//   });
// };
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=6f6310020576e5ab5e91e79138cefa33&query=" +
    latitude +
    "," +
    longitude +
    "";
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to Weather Service!", undefined);
    } else if (body.error) {
      callback("Unable to find Location!", undefined);
    } else {
      callback(undefined, "Temperature is "+body.current.temperature +" Celcius and chances of raining is "+ body.current.precip+".")
      }
    
  });
};
module.exports = forecast;
