let signup = document.querySelector('#signup');
let ulogin = document.querySelector('#ulogin');
let alogin = document.querySelector('#alogin');

let signbtn = document.querySelector('#signbtn');
let uloginbtn = document.querySelector('#uloginbtn');
let aloginbtn = document.querySelector('#aloginbtn');

let cross = document.querySelector('#cross');
let close = document.querySelector('.close');

let showA = true;
let showB = true;
let showC = true;

function SignUp(signup,ulogin,alogin) {
    let output = `
    <div class="card border-success mb-3 float-right" style="max-width: 15rem;">
  <div class="card-header"><h3 class="text-success">Sign up</b></h3></div>
  <div class="card-body text-success">
  <form action="HTTP/POST/users/usersignup.php" method="post">
    <div class="form-group">
    <label for="exampleInputEmail1"><b>First Name</b></label>
    <input class="form-control" type="text" name="fn">
    </div>
    <div class="form-group">
    <label for="exampleInputEmail1"><b>Last Name</b></label>
    <input class="form-control" type="text" name="ln">
    </div>
    <div class="form-group">
    <label for="exampleInputEmail1"><b>Username</b></label>
    <input class="form-control" type="text" name="uid">
    </div>
    <div class="form-group">
    <label for="exampleInputEmail1"><b>Password</b></label>
    <input class="form-control" type="password" name="pwd">
    </div>
    <div class="form-group">
    <label for="exampleInputEmail1"><b>Confirmation to Admin</b></label>
    <input class="form-control" type="password" name="cred">
    </div>
    <input class="btn btn-outline-success form-control" type="submit" name="signup" value="Submit">
    </form>
    </div>
    </div>`;
        ulogin.innerHTML = '';
        alogin.innerHTML = '';
        signup.innerHTML = output;
}

function UserLogIn(ulogin,alogin,signup) {
    let output = `    <div class="card border-success mb-3 float-right" style="max-width: 15rem;">
    <div class="card-header"><h3 class="text-success">User Login</b></h3></div>
    <div class="card-body text-success">
    <form action="HTTP/POST/users/userlogin.php" method="post">
        <div class="form-group">
        <label for="exampleInputEmail1"><b>Username</b></label>
        <input class="form-control" type="text" name="uid">
        </div>
        <div class="form-group">
        <label for="exampleInputEmail1"><b>Password</b></label>
        <input class="form-control" type="password" name="pwd">
        </div>
        <input class="btn btn-outline-success form-control" type="submit" name="ulogin" value="Submit">
    </form>
    </div>
    </div>`;
    signup.innerHTML = '';
    alogin.innerHTML = '';
    ulogin.innerHTML = output;
}

function AdminLogIn(alogin,ulogin,signup) {
    let output = `    <div class="card border-success mb-3 float-right" style="max-width: 15rem;">
    <div class="card-header"><h3 class="text-success">Admin Login</b></h3></div>
    <div class="card-body text-success">
    <form action="HTTP/POST/users/adminlogin.php" method="POST">
        <div class="form-group">
        <label for="exampleInputEmail1"><b>Username</b></label>
        <input class="form-control" type="text" name="uid">
        </div>
        <div class="form-group">
        <label for="exampleInputEmail1"><b>Password</b></label>
        <input class="form-control" type="password" name="pwd">
        </div>
        <input class="btn btn-outline-success form-control" type="submit" name="alogin" value="Submit">
    </form>
    </div>
    </div>`;
    signup.innerHTML = '';
    ulogin.innerHTML = '';
    alogin.innerHTML = output;
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

function Updating() {
    getData('GET','HTTP/GET/announcement/fetchannoucement.php')
    .then((data)=>{
    let announce = document.querySelector('#announce');
    let output = '';
    
    let anno = document.querySelector('#anno');
    let d = JSON.parse(data);
    if(d.id[0] == 0) {
        anno.innerHTML = `<h1 class="text-light"><div class="fas fa-bullhorn faa-pulse animated faa-fast"></div> No Announcement today</h1>`;
    } else {
        anno.innerHTML = `<h1 class="text-light"><div class="fas fa-bullhorn faa-pulse animated faa-fast"></div> Announcement today</h1>`;
    }
   
    for(let i = 0; i < d.id.length; i++) {
        if(d.id[i] == 0) {
            output += ``;
        } else {
            output += `
            <div class="card text-white border-dark mb-3" style="max-width: 53rem;">
            <div class="card-header"><h3>${d.title[i]}</h3>
            <small>Written On ${d.created_at[i]}</small></div>
            <div class="card-body text-light">
            <p>${d.body[i]}</p>
            </div>
            </div>
            `;          
        }
    }
    announce.innerHTML = output;

    })
    .catch(err => console.log(err));
}

Updating();
setInterval(Updating,1000);

function RemoveAll() {
    signup.innerHTML = '';
    ulogin.innerHTML = '';
    alogin.innerHTML = '';
}

if(close != null) {
    close.addEventListener('click',function(x){
        x.preventDefault();
        cross.style.display = 'none';
    });
}

signbtn.addEventListener('click',function(x){
    x.preventDefault();
    if(showA == true) {
        SignUp(signup,ulogin,alogin);
        showA = false;
        showB = true;
        showC = true;
        return false;
    } else {
        RemoveAll();
        showA = true;
        return false;
    }
});

uloginbtn.addEventListener('click',function(x){
    x.preventDefault();
    if(showB == true) {
        console.log('user');
        UserLogIn(ulogin,alogin,signup);
        showB = false;
        showA = true;
        showC = true;
        return false;
    } else {
        RemoveAll();
        showB = true;
        return false;
    }
});

aloginbtn.addEventListener('click',function(x){
    x.preventDefault();
    if(showC == true) {
        AdminLogIn(alogin,ulogin,signup);
        console.log('admin');
        showC = false;
        showA = true;
        showB = true;
        return false;
    } else {
        RemoveAll();
        showC = true;
        return false;
    }
    
});

