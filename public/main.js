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

function appendData(data) {
  console.log(data);
  //   var journey = document.getElementById('journey');
  //   journey.innerHTML = '';
  //
  //   data.forEach(function(val) {
  //     var option = document.createElement('li');
  //     option.className += 'option-li';
  //     option.innerHTML = val[1];
  //     journey.appendChild(option);
  // });
}
