"use strict";

require('dotenv').config();

const express = require("express"),
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  cors = require("cors");

const app = express();
const logger = require("./utils/logger");

//API middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//logs requests
app.use(morgan("tiny"));

let port = process.env.PORT;


//Service listening on 3000 port
app.listen(port, () => {
  logger.info(`${'listening on port '}${port}`);
});

const pingroute = require("./api/routes/ping.js");
pingroute(app);

const routes = require("./api/routes");
routes(app);

module.exports = app;
