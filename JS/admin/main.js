let admin = document.querySelector('#admin');
let setting = document.querySelector('#setting');

let know = document.querySelector('#know');
let click = true;
let urluser = "HTTP/GET/logbooks/userlogbookfetch.php";
let urladmin = "HTTP/GET/logbooks/adminlogbookfetch.php";

let fetchtime = document.querySelector('#fetchtime');

let cross = document.querySelector('#cross');
let close = document.querySelector('.close');

let userlogbook = document.querySelector('#userlogbook');
let adminlogbook = document.querySelector('#adminlogbook');


let aclick = true;
let uclick = true;

let lighten = document.querySelector('#lighten');

let search = document.querySelector('#search');
let val = document.querySelector('#val');
let order = document.querySelector('#order');

let ashow = false;
let ushow = false;


let userfetchtime = document.getElementById('userfetchtime');
let adminfetchtime = document.getElementById('adminfetchtime');



function AdminSetting(setting) {
  getData('GET','HTTP/GET/users/status.php')
  .then(data => {
    let parseData = JSON.parse(data);
    let val = document.querySelector('#username').value;
    let output = `<div class="card border-success mb-3 float-right" style="max-width: 15rem;">
    <div class="card-header text-success"><h5><b>Account Setting</b></h5></div>
    <div class="card-body text-success">
    <form action="HTTP/POST/users/setting.php" method="POST">
      <div class="form-group">
      <label for="exampleInputEmail1"><b>Username</b></label>
      <input class = "form-control" type="text" name="uid" value="${val}">
      </div>
      <div class="form-group">
      <label for="exampleInputEmail1"><b>Confirm Password</b></label>
      <input class="form-control" type="password" name="cpwd">
      </div>
      <div class="form-group">
      <label for="exampleInputEmail1"><b>New Password</b></label>
      <input class="form-control" type="password" name="npwd">
      </div>
    <input class="btn btn-outline-success form-control" type="submit" name="update" value="Submit">
    </form>
  </div>
  <div class="card-header text-success"><h5><b>Credential Setting</b></h5></div> 
  <div class="card-body text-success">
    <form action="HTTP/POST/users/admincredential.php" method="POST">
    <div class="form-group">
    <label for="exampleInputEmail1"><b>Confirm Credential</b></label>
    <input class="form-control" type="password" name="confcred">
    </div>
    <div class="form-group">
    <label for="exampleInputEmail1"><b>New Credential</b></label>
    <input class="form-control" type="password" name="newcred">
    </div>
    <input class="btn btn-outline-success form-control" type="submit" name="credential" value="Submit">
    </form>
    </div>
    <div class="card-header"><b>Account Information</b></div>
    <ul class="list-group list-group-flush">
    <li class="list-group-item"><b>Create</b> ${parseData.created_at}</li>
    <li class="list-group-item"><b>Update</b> ${parseData.updated_at}</li>
    </ul>
    </div>`;
    setting.innerHTML = output;
  
  })
  .catch(err => console.log(err));  
}

function RemoveSetting(setting) {
      setting.innerHTML = '';
}
  
function TimeFetch(fetchtime,url,who){ 
    
      let xhr = new XMLHttpRequest();
      
      let s = document.getElementById('search').value;
      let o = document.getElementById('val').value;
      let order = document.getElementById('order').value;
      let param = "search="+s+"&val="+o+"&order="+order;
      xhr.open('POST',url,true);
      xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
      xhr.onreadystatechange = function(){
        fetchtime.innerHTML = '';
        if(xhr.readyState == 4 && xhr.status == 200) {
         let data = JSON.parse(xhr.responseText);
         console.log(data);
         let output = '';
         output += `<h3 class="text-success">${who} Logbook</h3>
         <table class="table table-hover" style="max-width: 55rem;">
         <thead>
         <tr class="table-success">
         <th>Names</th>
         <th>Log in</th>
         <th>Log out</th>
         <th>Delete</th>
         </tr>
         </thead>`;
         for(let i =0; i < data.name.length;i++) {
            output += 
            `<tbody>
            <tr class="table-active">
            <td class="text-light">${data.name[i]}</td>
            <td class="text-light">${data.login[i]}</td>
            <td class="text-light">${data.logout[i]}</td>
            <td><button class="btn btn-outline-danger" onclick ="LetDelete(${data.id[i]})">Delete</button></td>
            </tr>
            </tbody>`;
         }
          output += `
          </table>`;
          fetchtime.innerHTML = output;
          
          // fetchtime.innerHTML = data;
          }
     }
      xhr.send(param);
}
  
function getData(method,url){
      return new Promise((resolve,reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method,url);
        xhr.onload = function(){
          if(xhr.status == 200) {
            resolve(xhr.responseText);
          } else {
            reject({
              status: xhr.status,
              statusText: xhr.status
            });
          }
        }
        xhr.onerror = function(){
          reject({
            status: xhr.status,
            statusText: xhr.status
          });
        }
        xhr.send();
      });

}
  
function LetDelete(id) {
    let xhr = new XMLHttpRequest();
    let param = "hid="+id;
    xhr.open('POST','HTTP/DELETE/logbook/deletetime.php',true);
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4 && xhr.status == 200) {
        xhr.responseText;
        }
   }
   xhr.onerror = function(){
     return xhr.statusText;
   }
    xhr.send(param);
    if(ushow == true) {
      TimeFetch(userfetchtime,urluser,'User'); 
      TimeFetch(userfetchtime,urluser,'User'); 
      TimeFetch(userfetchtime,urluser,'User'); 
      TimeFetch(userfetchtime,urluser,'User'); 
      console.log('Delete User');
    }
    if(ashow == true) {
      TimeFetch(adminfetchtime,urladmin,'Admin'); 
      TimeFetch(adminfetchtime,urladmin,'Admin'); 
      TimeFetch(adminfetchtime,urladmin,'Admin'); 
      TimeFetch(adminfetchtime,urladmin,'Admin'); 
      console.log('Delete Admin');
    }

  
}

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

function Who(){
  getData('GET','HTTP/GET/users/status.php')
  .then(data => {
    let parseData = JSON.parse(data);
    know.innerHTML = `  <h1 class="text-success"><b><div class="fas fa-user-secret faa-flash animated"></div> Welcome ${parseData.first}</b></h1>`;
  })
  .catch(err => console.log(err));
}

Who();

search.disabled = true;
val.disabled = true;
order.disabled = true;

userlogbook.addEventListener('click',function(x){
  x.preventDefault();
  
  if(uclick == true) {
    uclick = false;
    ushow = true;
    search.disabled = false;
    val.disabled = false;
    order.disabled = false;
    TimeFetch(userfetchtime,urluser,'User'); 
    return false;
  } 
  if(uclick == false) {
    uclick = true;
    ushow = false;
    search.value = '';
    search.disabled = true;
    if(aclick == true) {
      val.disabled = true;
      order.disabled = true;
    }
    RemoveSetting(userfetchtime);
    return false;
  }



});

adminlogbook.addEventListener('click',function(x){

  if(aclick == true) {
    aclick = false;
    ashow = true;
    val.disabled = false;
    order.disabled = false;
    TimeFetch(adminfetchtime,urladmin,'Admin');  
    return false;
  } 
  if(aclick == false) {
    aclick = true;
    ashow = false;
    if(uclick == true) {
      val.disabled = true;
      order.disabled = true;
    }
    RemoveSetting(adminfetchtime);
    return false;
  }

});

myForm.addEventListener('keyup',function(x){
  x.preventDefault();
  if(search.value == '') {
    lighten1.classList.remove('faa-pulse');
    lighten1.classList.remove('animated');
  } else {
    lighten1.classList.add('faa-pulse');
    lighten1.classList.add('animated');
  }

  if(val.value == '') {
    lighten2.classList.remove('faa-tada');
    lighten2.classList.remove('animated');
  } else {
    lighten2.classList.add('faa-tada');
    lighten2.classList.add('animated');
  }
  
  if(ushow == true) {
    TimeFetch(userfetchtime,urluser,'User'); 
  }
  if(ashow == true) {
  TimeFetch(adminfetchtime,urladmin,'Admin'); 
  }
});

myForm_2.addEventListener('change',function(x){

  x.preventDefault();

  if(ushow == true) {

    TimeFetch(userfetchtime,urluser,'User'); 
  }
  if(ashow == true) {

  TimeFetch(adminfetchtime,urladmin,'Admin'); 
  }
  


    lighten3.classList.add('faa-vertical');
    lighten3.classList.add('animated');

    setTimeout(function(){
      lighten3.classList.remove('faa-vertical');
      lighten3.classList.remove('animated');
  
    },1000);

});

if(close != null) {
  close.addEventListener('click',function(x){
      x.preventDefault();
      cross.style.display = 'none';
  });
}

