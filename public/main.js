fetch("GET", 'tfl', appendData);

function fetch(method, url, cb) {
  var xhr = new XMLHttpRequest ();
    xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && xhr.status === 200){
      var jsonObj = JSON.parse(xhr.responseText);
      cb(jsonObj);
    } else {
      console.log('Waiting for response');
    }
  };
xhr.open(method, url, true);
xhr.send();
}

function secToMin(time) {
  var s = time%60;
  var m = Math.floor(time/60)
  return `${m}:${s}`;
}

function appendData(data) {
  // console.log(data);
  var westResults = document.getElementById('westbound-data');
  var eastResults = document.getElementById('eastbound-data');
  var long = Math.max(data.west.length, data.east.length);
  var short = Math.min(data.west.length, data.east.length);
  // var diff = long - short;
  // while (long > short) {
  //
  // }


  westResults.innerHTML = '';

  data.west.forEach((e) => {
    var westDestination = document.createElement('div');
    westDestination.className = 'west-dest-unit';
    westDestination.innerHTML = e[1];
    westResults.appendChild(westDestination);

    var westDepartures = document.createElement('div');
    westDepartures.className = 'west-dep-unit';
    westDepartures.innerHTML = secToMin(e[2]);
    westResults.appendChild(westDepartures);
  });

  data.east.forEach((e) => {
    var eastDestination = document.createElement('div');
    eastDestination.className = 'east-dest-unit';
    eastDestination.innerHTML = e[1];
    eastResults.appendChild(eastDestination);

    var eastDepartures = document.createElement('div');
    eastDepartures.className = 'east-dep-unit';
    eastDepartures.innerHTML = secToMin(e[2]);
    eastResults.appendChild(eastDepartures);
  });
}
