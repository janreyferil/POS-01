import {getData,UserSetting,RemoveSetting} from './util.js';

let status = document.querySelector('#status');
let know = document.querySelector('#know');
let setting = document.querySelector('#setting');
let user = document.querySelector('#user');
let click = true;

function Status(){
  getData('POST','HTTP/POST/users/status.php')
  .then(data => {
    let parseData = JSON.parse(data);
    know.innerHTML = `<h1>Welcome ${parseData.first}</h1>`;
    status.innerHTML = `<table><tr><td>This user created at : ${parseData.created_at}</tr></td></table>
     <table><tr><td>This user updated at: ${parseData.updated_at}</table></tr></td>`; 
  })
  .catch(err => console.log(err));
}

user.addEventListener('click',function(x){ 
  x.preventDefault();
  if(click == true) {
    click = false;
    UserSetting(setting);
    return false;
  } 
  if(click == false) {
    click = true;
    RemoveSetting(setting);
    return false;
  }
});

Status();






