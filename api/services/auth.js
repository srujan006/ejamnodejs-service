const CryptoJS = require("crypto-js");
const logger = require("../../utils/logger.js");

module.exports = {
  getAuthHeader: async (url, method, woeid) => {
    return new Promise((res, rej) => {
      const consumer_key = process.env.consumer_key;
      const consumer_secret = process.env.consumer_secret;
      const concat = "&";
      let query = { woeid, format: "json" };
      let oauth = {
        oauth_consumer_key: consumer_key,
        oauth_nonce: Math.random()
          .toString(36)
          .substring(2),
        oauth_signature_method: "HMAC-SHA1",
        oauth_timestamp: parseInt(new Date().getTime() / 1000).toString(),
        oauth_version: "1.0"
      };

      let merged = { ...query, ...oauth };
      // Note the sorting here is required
      let merged_arr = Object.keys(merged)
        .sort()
        .map(function(k) {
          return [k + "=" + encodeURIComponent(merged[k])];
        });

      let signature_base_str =
        method +
        concat +
        encodeURIComponent(url) +
        concat +
        encodeURIComponent(merged_arr.join(concat));

      let composite_key = encodeURIComponent(consumer_secret) + concat;
      let hash = CryptoJS.HmacSHA1(signature_base_str, composite_key);
      let signature = hash.toString(CryptoJS.enc.Base64);

      oauth["oauth_signature"] = signature;
      let auth_header =
        "OAuth " +
        Object.keys(oauth)
          .map(function(k) {
            return [k + '="' + oauth[k] + '"'];
          })
          .join(",");

      res(auth_header);
    });
  }
};
