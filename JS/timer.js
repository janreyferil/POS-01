
  function clock(timer){
    let xhr = new XMLHttpRequest();

    xhr.open('GET','HTTP/GET/logbooks/clock.php',true);
    xhr.onload = function(){
      if(xhr.status == 200) {
        data = JSON.parse(xhr.responseText);
        timer.innerHTML = `<h5 style="text-align: right;">
        <i class="far fa-calendar mr-2"></i>
        ${data.day}, ${data.date} <i class="fas fa-hourglass-half ml-2"></i>  ${data.time} </h5>`;
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



