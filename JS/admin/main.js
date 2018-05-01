let click = true;
let aclick = true;
let uclick = true;
let ashow = false;
let ushow = false;
let annshow = true;
let cann = true;
let sann = true;

let urluser = "HTTP/GET/logbooks/userlogbookfetch.php";
let urladmin = "HTTP/GET/logbooks/adminlogbookfetch.php";

let know = document.querySelector('#know');
let admin = document.querySelector('#admin');
let setting = document.querySelector('#setting');
let fetchtime = document.querySelector('#fetchtime');
let cross = document.querySelector('#cross');
let close = document.querySelector('.close');
let userlogbook = document.querySelector('#userlogbook');
let adminlogbook = document.querySelector('#adminlogbook');
let lighten = document.querySelector('#lighten');
let search = document.querySelector('#search');
let val = document.querySelector('#val');
let order = document.querySelector('#order');
let userfetchtime = document.getElementById('userfetchtime');
let adminfetchtime = document.getElementById('adminfetchtime');
let logout = document.querySelector('#logout');
let createAnn = document.querySelector('#createAnn');
let popCreate = document.querySelector('#popCreate');
let popShow = document.querySelector('#popShow');
let del = document.querySelector('#del');

search.disabled = true;
val.disabled = true;
order.disabled = true;

if(close != null) {
  close.addEventListener('click',function(x){
      x.preventDefault();
      cross.style.display = 'none';
  });
}

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
         let output = '';
         output += `<h3 class="text-light">${who} Logbook</h3>
         <table class="table table-hover" style="max-width: 55rem;">
         <thead>
         <tr class="table-success">
         <th>Names</th>
         <th>Log in</th>
         <th>Log out</th>
         <th>Delete</th>
         </tr>
         </thead>`;
            let cid = data.name.length;
            let get = {
              count: cid
            }
    
            if(localStorage.getItem('counts') == null) {
              let gett = [];
              gett.push(get);
              localStorage.setItem('counts',JSON.stringify(gett));
            } else {
             let gett = JSON.parse(localStorage.getItem('counts'));
              console.log(gett[0].count);
              console.log(cid);
              if(gett[0].count < cid) {
                gett[0] = get;
                localStorage.setItem('counts',JSON.stringify(gett)); 
              }
               }

         for(let i =0; i < data.name.length;i++) {
            output += 
            `<tbody>
            <tr class="table-active">
            <td class="text-light">${data.name[i]}</td>
            <td class="text-light">${data.login[i]}</td>
            <td class="text-light">${data.logout[i]}</td>`;
            if(data.id[i] == 0) {
              output += `<td class="text-light">No Search Found</td>
              </tr>
              </tbody>`;
            } else {
              output += `<td><button class="btn btn-outline-danger" onclick ="LetDelete(${data.id[i]})">Delete</button></td>
              </tr>
              </tbody>`;
            }
  
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
    let i = 0;
    let gett = JSON.parse(localStorage.getItem('counts'));
    let count = gett[0].count + 4;
    if(ashow == true && ushow == true) {
      while(i < count) {
        TimeFetch(adminfetchtime,urladmin,'Admin');  
        TimeFetch(userfetchtime,urluser,'User'); 
        i++;
      }
      console.log('Delete Admin and User');
      return false;
    }

    if(ushow == true && ashow == false) {
      while(i < count) {
        TimeFetch(userfetchtime,urluser,'User'); 
        i++;
      }
      console.log('Delete User');
      return false;
    }
    if(ashow == true && ushow == false) {
      while(i < count) {
        TimeFetch(adminfetchtime,urladmin,'Admin');  
        i++;
      }
      console.log('Delete Admin');
    }  
}

function Who(){
  getData('GET','HTTP/GET/users/status.php')
  .then(data => {
    let parseData = JSON.parse(data);
    know.innerHTML = `  <h1 class="text-success"><b><div class="fas fa-user-secret faa-flash animated"></div> Welcome ${parseData.first}</b></h1>`;
  })
  .catch(err => console.log(err));
}

Who();

function PutAnnounce(){
  let xhr = new XMLHttpRequest();
  let t = document.querySelector('#title').value;
  let b = document.querySelector('#body').value;
  let param = "title="+t+"&body="+b;
  xhr.open('POST','HTTP/POST/announcement/createann.php',true);
  xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
  xhr.onload = function(){
    if(xhr.status == 200) {
      console.log(xhr.responseText);
      if(xhr.responseText == 'success') {
        createAnn.innerHTML = `<center><h1><b>New announcement was added</b></h1></center>
        <input type="button" class="form-control btn btn-outline-secondary mt-2" onclick="FetchAnnounce()" value="Back to the list of titles">`;
       // console.log(xhr.responseText);
      } else if(xhr.responseText == 'empty') {
        createAnn.innerHTML = `<center><h1><b>Please fill up all fields</b></h1></center>
        <input type="button" class="form-control btn btn-outline-secondary mt-2" onclick="CreateAnnouncement()" value="Back to the create form">`;
      } 
    }
  }
  xhr.onerror = function(){
    console.log(xhr.statusText);
  }
  xhr.send(param);
}

function UpdateAnnounce(){
  let xhr = new XMLHttpRequest();
  let t = document.querySelector('#title').value;
  let b = document.querySelector('#body').value;
  let i = document.querySelector('#eid').value;
  let param = "eid="+i+"&title="+t+"&body="+b;
  xhr.open('POST','HTTP/POST/announcement/editann.php',true);
  xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
  xhr.onload = function(){
    if(xhr.status == 200) {
      console.log(xhr.responseText);
      if(xhr.responseText == 'update') {
        createAnn.innerHTML = `<center><h1><b>Announcement was updated</b></h1></center>
        <input type="button" class="form-control btn btn-outline-secondary mt-2" onclick="FetchAnnounce()" value="Back to the list of titles">`;
       // console.log(xhr.responseText);
      } else if(xhr.responseText == 'empty') {
        createAnn.innerHTML = `<center><h1><b>Please fill up all fields</b></h1></center>
        <input type="button" class="form-control btn btn-outline-secondary mt-2" onclick="EditAnnounce(${i})" value="Back to the edit form">`;
      } 
    }
  }
  xhr.onerror = function(){
    console.log(xhr.statusText);
  }
  xhr.send(param);
}

function ShowAnnounce(id) {
  getData('GET','HTTP/GET/announcement/fetchannoucement.php')
  .then((data)=>{
    let d = JSON.parse(data);
    let output = '';
    for(let i =0; i < d.title.length; i++) {
      if(d.id[i] == id) {
        output += `
        <div class="card text-white bg-dark text-light mb-3">
        <div class="card-body">
        <i class="fas fa-arrow-right text-secondary faa-horizontal animated-hover float-right mr-4" onclick="FetchAnnounce()"></i>
        <h3>${d.title[i].trim()}</h3>
        <small>Written On ${d.created_at[i]} </small>`;
        if(d.created_at[i] !== d.updated_at[i]) {
          output += `<small> Updated On ${d.updated_at[i]}</small>`;
        }
        output += `
        <p>${d.body[i].trim()}</p>
        </div>
        </div>`;
      }
    }
    createAnn.innerHTML = output;
  })
  .catch(err => console.log(err));
}

function EditAnnounce(id) {
  getData('GET','HTTP/GET/announcement/fetchannoucement.php')
  .then((data)=>{
    let d = JSON.parse(data);
    console.log(d)
    let output = '';
    for(let i =0; i < d.title.length; i++) {
      if(d.id[i] == id) {
        output += `<form id="annEForm">
        <input class="form-control" type="hidden" name="eid" id="eid" value="${d.id[i]}">
        <div class="form-group">
        <label for="exampleInputEmail1"><b>Title</b></label>
        <input class="form-control" type="text" name="title" id="title" value="${d.title[i]}">
        </div>
        <div class="form-group">
        <label for="exampleInputEmail1"><b>Body</b></label>
        <textarea class="form-control" type="text" name="body" id="body">${d.body[i]}</textarea>
        </div>
        <input type="submit" name="submit" class="form-control btn btn-outline-light" value="Submit">
        <input type="button" class="form-control btn btn-outline-secondary mt-2" onclick="FetchAnnounce()" value="Cancel">
        </form>`;
        createAnn.innerHTML = output;

        let annEForm = document.querySelector('#annEForm');
        annEForm.addEventListener('submit',function(x){
          x.preventDefault();
          UpdateAnnounce();
        });
      }
    }
  })
  .catch(err => console.log(err));
}

function FetchAnnounce(){
  getData('GET','HTTP/GET/announcement/fetchannoucement.php')
  .then((data)=>{
    let d = JSON.parse(data);
    let output = '';
    output += `<center><h3>List of titles</h3></center>`;
    for(let i =0; i < d.title.length; i++) {
      if(d.id[i] == 0) {
        output += `<center><h5>${d.title[i]}</h5></center>`;
      } else {
        DelModal(d.id[i]);
        output += `<div class="card text-white bg-dark text-light mb-3" style="max-width: 60rem;">
        <div class="card-body">
        <i class="fas fa-trash-alt faa-wrench animated-hover text-warning float-right mr-4" data-toggle="modal" data-target="#del"></i>
        <i class="fas fa-edit text-danger faa-vertical animated-hover float-right mr-4" onclick="EditAnnounce(${d.id[i]})"></i>
        <i class="fa fa-eye faa-pulse animated-hover text-info float-right mr-4" onclick="ShowAnnounce(${d.id[i]})"></i>
        <h5>${d.title[i]}</h5>
        </div>
        </div>`;
      }
     
    }
    createAnn.innerHTML = output;
  })
  .catch(err => console.log(err));
}

function CreateAnnouncement() {
  createAnn.innerHTML = `<form id="annForm">
  <div class="form-group">
  <label for="exampleInputEmail1"><b>Title</b></label>
  <input class="form-control" type="text" name="title" id="title">
  </div>
  <div class="form-group">
  <label for="exampleInputEmail1"><b>Body</b></label>
  <textarea class="form-control" type="text" name="body" id="body"></textarea>
  </div>
  <input type="submit" value="Submit" name="submit" class="form-control btn btn-outline-light">
  </form>`;

  let annForm = document.querySelector('#annForm');
  annForm.addEventListener('submit',function(x){
    x.preventDefault();
    PutAnnounce();
  });
}

function DeleteAnnounce(id) {
  let xhr = new XMLHttpRequest();
  let param = "hid="+id;
  xhr.open('POST','HTTP/DELETE/announcement/deleteann.php',true);
  xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr.responseText);
      if(xhr.responseText == 'delete') {
        FetchAnnounce();
      }
      }
 }
 xhr.onerror = function(){
   return xhr.statusText;
 }
  xhr.send(param);

}

function DelModal(id){
  del.innerHTML = `
  <div class="modal-dialog text-warning" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title"><i class="fas fa-exclamation-circle faa-bounce animated fa-md"></i> <b>Delete</b></h3>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Are you sure you want to delete this item?</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-warning" onclick="DeleteAnnounce(${id})" data-dismiss="modal">Confirm</button>
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
      </div>
    </div>
  </div>`;
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

popCreate.addEventListener('click',function(x){
  x.preventDefault();
  if(cann == true) {
    cann = false;
    sann = true;
    CreateAnnouncement();
    return false;
  } 
  if(cann == false) {
    cann = true;
    RemoveSetting(createAnn);
    return false;
  }
});

popShow.addEventListener('click',function(x){
  x.preventDefault();
  if(sann == true) {
    sann = false;
    cann = true;
    FetchAnnounce(createAnn);
    return false;
  } 
  if(sann == false) {
    sann = true;
    RemoveSetting(createAnn);
    return false;
  }

})

logout.addEventListener('click',function(x){
  let gett = JSON.parse(localStorage.getItem('counts'));
  gett[0].count = 0;
  localStorage.setItem('counts',JSON.stringify(gett)); 
});






