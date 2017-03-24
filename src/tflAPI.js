const request = require('request');

// Helper
const TFLRequest = (module, callback) => {
  module('https://api.tfl.gov.uk/StopPoint/940GZZLUBLG/Arrivals?mode=tube', function (error, response, body) {

    if (error) {
      return new Error ('There is a stranger in the house!!');
    }
    else {
    var tflData = JSON.parse(body);
    callback(null, tflData);
    }
  });
};

module.exports = {
  TFLRequest: TFLRequest
}
