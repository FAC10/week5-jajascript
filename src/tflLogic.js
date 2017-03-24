function TFLSortData(error, data) {
  if (error) {
    return new Error ('There is another stranger in the house!');
  }
  else {
  let westbound = [];
  let eastbound = [];
  let arr = data.map((value)=>[value.platformName, value.towards, value.timeToStation]);
  let sorted = arr.sort((a, b) => {
    return a[2] - b[2];
  })
  sorted.forEach((value) => {
    if (value[0] === 'Westbound - Platform 1') {
      westbound.push(value);
    }
    else if (value[0] === 'Eastbound - Platform 2') {
      eastbound.push(value);
    }
    else {
      return new Error;
    }
  });
  var tflObj = {};
  tflObj['west'] = westbound;
  tflObj['east'] = eastbound;
  return tflObj;
  }
}

module.exports = {
  TFLSortData: TFLSortData
}
