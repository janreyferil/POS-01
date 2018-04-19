
  function clock(timer){
    let xhr = new XMLHttpRequest();

    xhr.open('GET','HTTP/GET/logbooks/clock.php',true);
    xhr.onload = function(){
      if(xhr.status == 200) {
        data = JSON.parse(xhr.responseText);
        timer.innerHTML = `<h5 style="text-align: right;" class="text-light">
        <i class="fas fa-hourglass-half faa-spin animated faa-fast"></i> 
        ${data.time} ${data.day}, ${data.date} </h5>`;
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



