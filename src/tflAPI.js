const request = require('request');

// Helper
const testRequest = (module, callback) => {
  module('https://api.tfl.gov.uk/StopPoint/940GZZLUBLG/Arrivals?mode=tube', function (error, response, body) {
    var tflData = JSON.parse(body);
    callback(tflData);
  });
};

module.exports = {
  testRequest: testRequest
}
