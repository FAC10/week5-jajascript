[![Travis-Badge-Build](https://api.travis-ci.org/FAC10/week5-jajascript.svg?branch=master)](https://travis-ci.org/FAC10/week5-jajascript)
[![Code Coverage](https://codecov.io/gh/FAC10/week5-jajascript/branch/master/graph/badge.svg)](https://codecov.io/gh/FAC10/week5-jajascript)
# Jajascript Bethnal Green

Live site: [https://week5-jajascript-bethnal-green.herokuapp.com/](https://week5-jajascript-bethnal-green.herokuapp.com/)

An app that uses the TFL API to display arrival time predictions at Bethnal Green Underground station (Westbound and Eastbound).

### User story

As a commuter who **only** uses Bethnal Green Underground station, I would like to see when the trains leave from Bethnal Green station, so that I can make sure I arrive at the station at the right time

### Architecture

![Diagram of architecture]()

### TFL API

TFL Arrival of Things (buses, tubes etc):
(https://blog.tfl.gov.uk/2015/12/07/unified-api-part-5-aot-arrivals-of-things/)

The API URL we will be using is `https://api.tfl.gov.uk/Line/central/Arrivals/940GZZLUBLG?direction=inbound` which begins with the generic tfl API call `https://api.tfl.gov.uk`, followed by the specific extension for what you want to find out.

In this case it's `/Line/central/Arrivals` to get the list of arrival predictions for a specific tube stop's central line times.

We then need to specify which station we want information for. In this particular project we are using Bethnal Green Tube Station. To find the TFL 'naptanId' for Bethnal Green, you use this link and attach to the end "bethnal": `https://api.tfl.gov.uk/Stoppoint/Search/bethnal`. This returns an object of every bus and tube stop with the name "bethnal"; you now just need to find the correct stop.

The final part of our API URL specifies the direction we want train times for i.e. inbound (West) or outbound (East).

The return object from the API call is an array of objects containing lots of useful information! Specifically, we return:

- `platformName` - Westbound or Eastbound

- `towards` - where the train is heading towards (we originally used `destinationName` but found that `towards` would make more sense for the user)

- `timeToStation` - the time, in seconds, until the train reaches Bethnal Green

### Stretch goals

- Expand our app for users who may use stations other than Bethnal Green
- Add input field for user to specify other stations

### Day 1

- Discuss app purpose and architecture
- Create initial folder structure and files
- Set up Codecov, Travis, Istanbul and initial tests using tape and shot
- Set up Heroku
- Spike on how to use TFL API

### Day 2

- Enable back-end to pass relevant data to the front-end
- Add more specific back-end tests
- Add styling and DOM manipulation to display data

### Specification

- [x] Use at least 1 API
- [x] Make your API calls from the back-end using the Request module (or one you build yourself)
- [x] Your server should contain a minimum of 2 routes
- [x] We expect back-end testing using tape (test as many components as you can) and basic front-end testing.
- [x] Test your server by injecting fake HTTP requests using Shot.
- [x] Host your project on heroku, see resources
- [x] Use module.exports and require to break a single large server file into smaller modules.
- [x] Consider a good server file structure based on what we have discussed over the week.
- [x] Employ continuous integration on your project with Travis or a similar tool.
- [x] Use CodeCov or a similar tool for test coverage.
- [x] Display continuous integration and code coverage badges on your project README.
- [x] Ensure that errors are handled, if for example a user attempts to make a request to a non-existent route to your server, provide the user with a custom response.

### Heroku

Things to remember for next time!

- Make sure that `port` is declared in `server.js` as below, in order for successful deployment on Heroku. Heroku needs `process.env.PORT`, as it won't recognise `4000`.

  `var port = process.env.PORT || 4000;`

- Ensure that there is a `start` script in package.json, as below.

```  
"scripts": {
    "start": "node src/server.js"
  }
```
- It is also ok to use `nodemon` in the `start` script, but you must ensure that `nodemon` is listed in dependencies, not just devDependencies. See example below.

```  
"scripts": {
    "start": "nodemon src/server.js"
},
"dependencies": {
    "nodemon": "^1.11.0"
}
```


### Installation instructions

 - Clone this repo and cd into it

 - `git clone git@github.com:FAC10/week5-jajascript.git`

 - Run `npm install` to install all dependencies

 - Run `npm run devStart` to start the server using Nodemon (which will automatically restart Node when changes are detected in your files)

 - Navigate to http://localhost:4000/ in your browser
