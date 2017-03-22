function tflTest(data) {
  let westbound = [];
  let eastbound = [];
  var arr = data.map((value)=>[value.platformName, value.destinationName, value.timeToStation]);
  var sorted = arr.sort((a, b) => {
    return a[2] - b[2];
  })
  sorted.forEach((value) => {
    if (value[0] === 'Westbound - Platform 1') {
      westbound.push(value);
    } else {
      eastbound.push(value);
    }
  });
  console.log(westbound);
}

module.exports = {
  tflTest: tflTest
}
