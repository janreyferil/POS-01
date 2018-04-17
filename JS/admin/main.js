import {AdminSetting,RemoveSetting, TimeFetch,getData} from './util.js';

let admin = document.querySelector('#admin');
let setting = document.querySelector('#setting');
let fetchtime = document.querySelector('#fetchtime');
let know = document.querySelector('#know');
let click = true;
let urluser = "HTTP/POST/logbooks/userlogbookfetch.php";
let urladmin = "HTTP/POST/logbooks/adminlogbookfetch.php";

admin.addEventListener('click',function(x){ 
    x.preventDefault();
    if(click == true) {
      click = false;
      AdminSetting(setting);
      return false;
    } 
    if(click == false) {
      click = true;
      RemoveSetting(setting);
      return false;
    }
});

let status = document.querySelector('#status');

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


myForm.addEventListener('keyup',function(x){
  x.preventDefault();
 TimeFetch(userfetchtime,urluser);  

});
TimeFetch(userfetchtime,urluser);  
TimeFetch(adminfetchtime,urladmin);  

Status();






