var handler = require('./handler.js');
var algorithm = require('./tflLogic.js');

module.exports = function(req, res) {
  var endpoint = req.url;
  console.log(endpoint);
  if (endpoint === '/') {
    handler.serveHome(req,res);
  }
  else if(endpoint.indexOf('tfl') !== -1) {
    handler.serveTFL(req, res);
  }
  else if(endpoint.indexOf('.html') === -1) {
    handler.servePublic(req, res);
  }
  else {
    handler.serveError(req,res);
  }
}
