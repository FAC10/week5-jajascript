const fs = require('fs');
const path = require ('path');
const tflAPI = require('./tflAPI.js');
const tflLogic = require('./tflLogic.js');
const request = require('request');

const handler = module.exports = {};

handler.serveHome = function(req, res){
  readFile(res, '/index.html');
};

const readFile = (res, endpoint) => {
  fs.readFile(path.join(__dirname, '..', 'public', endpoint), function(err, file) {
    if (err) {
      console.log(err);
      handler.serveError(null, res);
    } else {
      var extension = endpoint.split('.')[1];
      var extensionType = {
        "html": "text/html",
        "css": "text/css",
        "js": "application/javascript",
        "jpg": "image/jpg",
        "ico": "image/x-icon"
      }
      res.writeHead(200, { "Content-Type": extensionType[extension]});
      res.end(file);
    }
  })
}

handler.servePublic = function(req, res) {
  var endpoint = req.url;
  readFile(res, endpoint)
};

handler.serveError = function (req, res){
  res.writeHead(404,{'Content-Type': 'text/html'});
  res.write('<h1>404 Page Requested Cannot Be Found<h1>');
  res.end();
};


handler.serveTFL = function(req, res) {
  tflAPI.TFLRequest(request, function (err, data) {
    var timesObject = tflLogic.TFLSortData(err, data);
    res.writeHead(200, { 'Content-Type': 'application/json'});
    res.end(JSON.stringify(timesObject));
  });
}
