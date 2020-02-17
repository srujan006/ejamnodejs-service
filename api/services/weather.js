"use strict";

const logger = require("../../utils/logger.js");
const authService = require("./auth.js");
const axios = require("axios");

const app_id = process.env.app_id;
const url = "https://weather-ydn-yql.media.yahoo.com/forecastrss";
const method = "GET";

module.exports = {
  getCityDetails: async (req, res) => {
    try {

      const { woeid } = req.body;
      const auth_header = await authService.getAuthHeader(url, method, woeid);
      const headers = {
        Authorization: auth_header,
        "X-Yahoo-App-Id": app_id
      };

      const result = await axios({
        url: `${url}?woeid=${woeid}&format=json`,
        method,
        headers
      });


      if (result.status != 200) {
        throw result;
      }

      return res.status(200).json({
        data: result.data
      });

    } catch (err) {
      return res.status(500).json({
        error: err
      });
    }
  },

  getMultipleCityDetails : async(req,res)=>{
    try {
      const { woeid_arr } = req.body;
      let promise_arr = woeid_arr.map(async(woeid)=>{

          const auth_header = await authService.getAuthHeader(url, method, woeid);
          const headers = {
            Authorization: auth_header,
            "X-Yahoo-App-Id": app_id
          };
          return await axios({
            url: `${url}?woeid=${woeid}&format=json`,
            method,
            headers
          });
      });
      let results = await Promise.all(promise_arr);

      let data_array = results.map((eachResult)=>{
        return eachResult.data
      })

      return res.status(200).json({
        data: data_array
      });

    } catch (err) {
      return res.status(500).json({
        error: err
      });
    }
  }
};
