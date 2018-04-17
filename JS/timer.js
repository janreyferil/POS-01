
  function clock(timer){
    let xhr = new XMLHttpRequest();

    xhr.open('GET','HTTP/POST/logbooks/clock.php',true);
    xhr.onload = function(){
      if(xhr.status == 200) {
        data = JSON.parse(xhr.responseText);
        timer.innerHTML = 'Time: ' + data.time + '<br>' +
        ' Date: ' + data.day + ', ' + data.date;
      }
    }
    xhr.send();
  }

  function start(){
    return clock(timer);
  }

  let timer = document.querySelector('#timer');

clock(timer);
setInterval(start,1000);

