let todo = document.querySelector('#todo');
let del = document.querySelector('#del');

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

function fetchTodo() {
  getData('GET','HTTP/GET/todo/todofetch.php')
  .then((data)=> {
    let d = JSON.parse(data);
    let output = ``;
    if(d.id == 0) {
      output += `<center><h1>Create new todo</h1></center>`;

    } 
    for(let i = 0; i < d.id.length; i++) {
        if(i%2 == 0) {
          DelModal(d.id[i]);
          output += `
          <div class="card text-white bg-dark text-success mb-3" style="max-width: 40rem;">
          <div class="card-body">
          <i class="fas fa-trash-alt faa-wrench animated-hover text-warning float-right mr-4" data-toggle="modal" data-target="#del"></i>
            <small><b>Written On ${d.created_at[i]}</b></small>
            <br>
            <br>
            <h5>${d.body[i]}</h5>
            </div>
            </div>`;
        } else {
          DelModal(d.id[i]);
          output += `
          <div class="card text-white bg-default text-light mb-3" style="max-width: 40rem;">
          <div class="card-body">
          <i class="fas fa-trash-alt faa-wrench animated-hover text-danger float-right mr-4" data-toggle="modal" data-target="#del"></i>
            <small><b>Written On ${d.created_at[i]}</b></small>
            <br>
            <br>
            <h5>${d.body[i]}</h5>
            </div>
            </div>`;
        }
       }
       todo.innerHTML = output;
    }
  )
  .catch((err)=>{
      console.log(err);
  });
}

function createTodo() {
  let xhr = new XMLHttpRequest();
  let b = document.querySelector('#body').value;
  let param = "body="+b;
  xhr.open('POST','HTTP/POST/todo/createtodo.php',true);
  xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
  xhr.onload = function(){
    if(xhr.status == 200) {
      console.log(xhr.responseText);
      if(xhr.responseText == 'success') {
       todo.innerHTML = `<center><h1><b>Todo was added</b></h1></center>
        <input type="button" class="form-control btn btn-outline-secondary mt-2" onclick="fetchTodo()" value="Back to the todo">`;
       // console.log(xhr.responseText);
      } else if(xhr.responseText == 'empty') {
        todo.innerHTML = `<center><h1><b>Please compose a todo</b></h1></center>
        <input type="button" class="form-control btn btn-outline-secondary mt-2" onclick="formTodo()" value="Back to the create form">`;
      } 
    }
  }
  xhr.onerror = function(){
    console.log(xhr.statusText);
  }
  xhr.send(param);
}

function formTodo(){
  todo.innerHTML = `
  <form id="cTodo" class="text-light">
  <center><h1><b>Add Todo</b></h1></center>
  <label for="exampleInputEmail1"><b>Body</b></label>
  <div class="form-group">
  <textarea class="form-control" id="body" name="body"></textarea>
  </div>
  <input type="submit" class="form-control btn btn-outline-light" name="submit" value="submit">
  </form>`;

  
  let cTodo = document.querySelector('#cTodo');
 
  cTodo.addEventListener('submit',function(x){
    x.preventDefault();
    createTodo();
  });
}

function DeleteTodo(id) {
  let xhr = new XMLHttpRequest();
  let param = "hid="+id;
  xhr.open('POST','HTTP/DELETE/todo/deletetodo.php',true);
  xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr.responseText);
      if(xhr.responseText == 'delete') {
        fetchTodo();
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
        <button type="button" class="btn btn-outline-warning" onclick="DeleteTodo(${id})" data-dismiss="modal">Confirm</button>
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
      </div>
    </div>
  </div>`;
}


let show = document.querySelector('#show');
let create = document.querySelector('#create');
let sclick = true;
let cclick = true;

create.addEventListener('click',function(x){
  x.preventDefault();
  if(show) {
    formTodo();
    show = false;
    cclick = true;
  } else {
    todo.innerHTML = '';
    show = true;
  }
});

show.addEventListener('click',function(x){
  x.preventDefault();
  if(cclick) {
    fetchTodo();
    show = true;
    cclick = false;
  } else {
    todo.innerHTML = '';
    cclick = true;
  }
});