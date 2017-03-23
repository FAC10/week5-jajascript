![Travis-Badge-Build](https://api.travis-ci.org/FAC10/week5-jajascript.svg?branch=master)

# Jajascript Bethnal Green

Live site: [https://week5-jajascript-bethnal-green.herokuapp.com/](https://week5-jajascript-bethnal-green.herokuapp.com/)

### User story

As a commuter, I would like to see when the trains leave from Bethnal Green station

### Homepage

Columns for Westbound and Eastbound

### Architecture

![Diagram of architecture]()

### Stretch goals

Add input field
Add other stations

## Day 1

architecture
setting up travis, codecov, tests
heroku

Specs:

- [x] Use at least 1 API
- [x] Make your API calls from the back-end using the Request module (or one you build yourself)

- [x] Your server should contain a minimum of 2 routes

- [ ] We expect back-end testing using tape (test as many components as you can) and basic front-end testing.

- [x] Test your server by injecting fake HTTP requests using Shot.

- [ ] Host your project on heroku, see resources

- [x] Use module.exports and require to break a single large server file into smaller modules.

- [x] Consider a good server file structure based on what we have discussed over the week.

- [x] Employ continuous intergration on your project with Travis or a similar tool.

- [x] Use CodeCov or a similar tool for test coverage.

- [x] Display continuous integration and code coverage badges on your project README.

- [ ] Ensure that errors are handled, if for example a user attempts to make a request to a non-existent route to your server, provide the user with a custom response.

**TFL API**

TFL Arrival of Things (buses, tubes etc):
(https://blog.tfl.gov.uk/2015/12/07/unified-api-part-5-aot-arrivals-of-things/)

The API URL we will be using is `https://api.tfl.gov.uk/Line/central/Arrivals/940GZZLUBLG?direction=inbound` which begins with the generic tfl API call `https://api.tfl.gov.uk`, followed by the specific extension for what you want to find out.

In this case it's `/Line/central/Arrivals` to get the list of arrival predictions for a specific tube stop's central line times.

We then need to specify which station we want information for. In this particular project we are using Bethnal Green Tube Station. To find the TFL 'naptanId' for Bethnal Green, you use this link and attach to the end "bethnal": `https://api.tfl.gov.uk/Stoppoint/Search/bethnal`. This returns an object of every bus and tube stop with the name "bethnal"; you now just need to find the correct stop.

The final part of our API URL specifies the direction we want train times for i.e. inbound (West) or outbound (East).

The return object from the API call is an array of objects containing lots of useful information!

We are using the 'towards' key from the TFL api, as this is clearer than destination name.
