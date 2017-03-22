const fs = require('fs');
const tflAPI = require('./tflAPI.js');
const tflLogic = require('./tflLogic.js');
const request = require('request');

// // request module test
tflAPI.testRequest(request, tflLogic.tflTest);
