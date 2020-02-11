"use strict";

module.exports = app => {
  // Health Check Route
  app.route("/api/ejam-nodejs/ping").get((req, res) => {
    res.status(200).send({
      status: "OK",
      message: "pong"
    });
  });
};
