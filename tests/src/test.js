const test = require('tape');
const shot = require('shot');
const fs = require('fs');
const router = require('../../src/router');
const TFLSortData = require('../../src/tflLogic.js');

// INITIAL TEST
test('Initialise', (t) => {
  let num = 2
  t.equal(num, 2, 'Should return 2');
  t.end(); // Remember to call t.end() after every test call, to ensure tests run in order. You can also investigate t.plan() in the docs
});
test('Object filtering testing', (t) => {
  let emptyObject = [{platformName: 'Westbound platform 2'}];
  let expectedEmpty = {west:[], east:[]};
  let objEastEmpty = [{platformName: 'Westbound - Platform 1', towards: 'loughton', timeToStation: 451, station: 'Bethnal Green', BrokenTrain: 101}];
  let expectedEE = {west: [['Westbound - Platform 1', 'loughton', 451]], east: []};
  let objWestEmpty = [{platformName: 'Eastbound - Platform 2', towards: 'loughton', timeToStation: 451, station: 'Bethnal Green', BrokenTrain: 101}];
  let expectedWE = {west: [], east: [['Eastbound - Platform 2', 'loughton', 451]]};
  t.ok(typeof TFLSortData(null,objWestEmpty) && typeof (TFLSortData(null,objEastEmpty)) === 'object');
  t.ok(Array.isArray(TFLSortData(null,objEastEmpty).west));
  t.deepEqual(TFLSortData(null,emptyObject), expectedEmpty, 'Should return an object with two empy arrays!');
  t.deepEqual(TFLSortData(null,objWestEmpty), expectedWE, 'Should avoid BrokenTrain!');
  t.deepEqual(TFLSortData(null,objEastEmpty), expectedEE, 'Should avoid BrokenTrain!');
  t.end();
});


// EXAMPLE SINGLE ROUTE TEST
const singleRoute = () => {
  // Shot options
  const requireOptions = {url:'/', method:'get'};
  const responseOptions = {statusCode: 200, headers:{'Content-Type':'text/html'}};

  // Function call with above options.
  // Optional second argument (string) not included (adds a custom test name).
  testRoute([requireOptions, responseOptions]);

};

// EXAMPLE STATIC FILE TESTS
const singleStaticFile = () => {
  const cwd = process.cwd();
  const requireOptions = {url:'/'};
  const responseOptions = {statusCode: 200};
  fs.readFile(cwd + '/public/index.html', 'utf8', (err, file) => {
    responseOptions.payload = file;
    testRoute([requireOptions, responseOptions]);
  });

};

// EXAMPLE OBJECT TO RUN MULTIPLE ROUTE TESTS
// Each key in the object is the name of a test.
// Each value is an array with two objects:
// The first - require options for Shot
// The second - options to test the response with
// For example in 'route' the object passes in require options of '/' and 'get'
// and validates the server response of statusCode '200' and payload 'hello'
const routesToTest = {
  route:[{url:'/', method:'get'},{statusCode: 200, headers:{'Content-Type':'text/html'}}],
  css:[{url:'/styles.css', method:'get'},{statusCode: 200, headers:{'Content-Type':'text/css'}}],
  js:[{url:'/main.js', method:'get'},{statusCode: 200, headers:{'Content-Type':'application/javascript'}}],
  tfl:[{url:'/tfl', method:'get'},{statusCode: 200, headers:{'Content-Type':'application/json'}}],
  brokenurl:[{url:'/brokenurl'},{statusCode: 404}]
};

singleRoute();

singleStaticFile('/');
singleStaticFile('/styles.css');
singleStaticFile('/main.js');

testMultipleRoutes(routesToTest);


function testMultipleRoutes (routesToTest) {
  Object.keys(routesToTest).forEach(route => {
    testRoute(routesToTest[route], route);
  });
}

function testRoute ([reqOptions, resOptions], name = '') {
  const method = reqOptions.method || 'get';
  const url = reqOptions.url || '/';

  test(`Testing '${name || url}' with ${method}`, (t) => {
    shot.inject(router, reqOptions,
      (res) => {
        Object.keys(resOptions).forEach(option => {

          // second level options (headers[Content-Type], etc.)
          if (typeof resOptions[option] === 'object') {
            Object.keys(resOptions[option]).forEach(innerOption => {
              t.equal(res[option][innerOption], resOptions[option][innerOption],
                `${option}[${innerOption}] = ${res[option][innerOption]}`
              );
            });
            return;
          }

          // first level objects (statusCode, etc.)
          t.equal(res[option], resOptions[option],
            `${option} = ${res[option]}`);

        });
        t.end();
      });
  });
}
