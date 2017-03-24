const request = require('request');

// Helper
const TFLRequest = (module, callback) => {
  module('https://api.tfl.gov.uk/StopPoint/940GZZLUBLG/Arrivals?mode=tube', function (error, response, body) {

    if (error) {
      return new Error ('There is a stranger in the house!!');
    }
    else {
    var TFLData = JSON.parse(body);
    callback(null, TFLData);
    }
  });
};

module.exports = {
  TFLRequest: TFLRequest
}
