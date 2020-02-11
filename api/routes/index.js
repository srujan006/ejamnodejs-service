const weatherService = require("../services/weather.js");

module.exports = app => {
  app.route("/api/ejam-nodejs/city-details")
      .post(weatherService.getCityDetails);

  app.route("/api/ejam-nodejs/multiple-city-details")
      .post(weatherService.getMultipleCityDetails);
};
