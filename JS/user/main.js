let know = document.querySelector('#know');
let user = document.querySelector('#user');
let setting = document.querySelector('#setting');
let close = document.querySelector('#closer');
let click = true;



 if(close != null) {
    close.addEventListener('click',function(x){
        x.preventDefault();
        cross.style.display = 'none';
    });
  } 


function UserSetting(setting) {
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

function RemoveSetting(setting) {
    setting.innerHTML = '';
}

function Who(){
  getData('GET','HTTP/GET/users/status.php')
  .then(data => {
    let parseData = JSON.parse(data);
    know.innerHTML = `  <h1 class="text-success"><b><div class="fa fa-user-circle faa-pulse animated"></div> Welcome ${parseData.first}</b></h1>`;
  })
  .catch(err => console.log(err));
}

Who();



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