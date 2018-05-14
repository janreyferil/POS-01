
  function clock(timer){

    const d = new Date();

    const now = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday','Saturday'
    ]

    const options = {   
        month: 'long', 
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };

    timer.innerHTML = `<h5 style="text-align: right;">
    <i class="far fa-calendar mr-2"></i>${now[d.getDay()]}, ${d.toLocaleDateString('en-PH', options)} </h5>`;

  }

  function start(){
    return clock(timer);
  }

  let timer = document.querySelector('#timer');

clock(timer);
setInterval(start,1000);





