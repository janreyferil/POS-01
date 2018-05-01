// Main Element
const mainElement = document.querySelector('#mainElement');

// Todo

let bolTodo = true;
const btnTodo = document.querySelector('#btnTodo');

// Supplier
let bolSupplier = true;
const btnSupplier = document.querySelector('#btnSupplier');

class Main {
   static getData(method,url){
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
   static postData(method,url,params){
    return new Promise((resolve,reject) => {
      let param = '';
      for(let i = 0; i < params.length; i++) {
          param += params[i];
        }
      let xhr = new XMLHttpRequest();
      xhr.open(method,url,true);
      xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
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
      xhr.send(param);
    });

  }
  static closeAll() {
    mainElement.innerHTML = '';
    bolTodo = true;
    bolSupplier = true;
  }
}

class Todo {
  static MainTodo(){
    
    const create = document.querySelector('#create');
    const show = document.querySelector('#show');

    const todo = document.querySelector('#todo');
    const del = document.querySelector('#del');

    mainElement.innerHTML = `<div class="card text-white border-success mb-3" style="max-width: 54rem;">
    <div class="card-header">
    <i class="float-right mt-3 ml-4 fas text-warning fa-times-circle fa-2x " onclick="Main.closeAll()"></i>
    <i id="create" class="float-right text-primary ml-4 mt-3 fa fa-pencil-alt fa-2x " onclick="Todo.Create()"></i>
    <i id="show" class="float-right text-info mt-3 fas fa-eye faa-fast fa-2x" onclick="Todo.Show()"></i>
    <h1><b> To-Do List</b></h1>
    <small class="float-right text-warning mr-1 ml-3"><b>Close</b></small>
    <small class="float-right text-primary mr-4 ml-3"><b>Write</b></small>
    <small class="float-right text-info mr-3"><b>Show</b></small>
    </div>
    
    <div class="card-body">
    <div id="todo"></div>
    </div>
    </div>`;
  
    Todo.Show();
  }

  static fetchTodo() {
    Todo.DelModal();
    Main.getData('GET','HTTP/GET/todo/todofetch.php')
    .then((data)=> {
      let d = JSON.parse(data);
      let output = ``;
      if(d.id == 0) {
        output += `<center><h1>Create new todo</h1></center>`;

      } 
      for(let i = 0; i < d.id.length; i++) {
            output += `
            <div class="card text-white bg-dark text-light mb-3" style="max-width: 54rem;">
            <div class="card-body">
            <i class="fas fa-trash-alt faa-wrench animated-hover text-warning float-right mr-4" onclick = "Todo.delGet(${d.id[i]})" data-toggle="modal" data-target="#del"></i>
              <small><b>Written On ${d.created_at[i]}</b></small>
              <br>
              <br>
              <h5>${d.body[i]}</h5>
              </div>
              </div>`;
        }
        todo.innerHTML = output;
      }
    )
    .catch((err)=>{
        console.log(err);
    });
  }

  static createTodo() {
    let b = document.querySelector('#body').value;
    let params = ['body=',b];
    Main.postData('POST','HTTP/POST/todo/createtodo.php',params)
    .then((data)=>{
      if(data == 'success') {
        todo.innerHTML = `<center><h1><b>Todo was added</b></h1></center>
          <input type="button" class="form-control btn btn-outline-secondary mt-2" onclick="Todo.Show()" value="Back to the todo">`;
        // console.log(xhr.responseText);
        } else if(data == 'empty') {
          todo.innerHTML = `<center><h1><b>Please compose a todo</b></h1></center>
          <input type="button" class="form-control btn btn-outline-secondary mt-2" onclick="Todo.formTodo()" value="Back to the create form">`;
        } 
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  static formTodo(){
    todo.innerHTML = `
    <form id="cTodo" class="text-light">
    <center><h1><b>Add Todo</b></h1></center>
    <div class="form-group">
    <label for="exampleInputEmail1"><b>Body</b></label>
    <textarea class="form-control" id="body" name="body"></textarea>
    </div>
    <input type="submit" class="form-control btn btn-outline-light" name="submit" value="Add">
    </form>`;

    
    let cTodo = document.querySelector('#cTodo');
  
    cTodo.addEventListener('submit',function(x){
      x.preventDefault();
      Todo.createTodo();
    });
  }

  static DeleteTodo() {
    let id = JSON.parse(sessionStorage.getItem('del_id'));
    let xhr = new XMLHttpRequest();
    let param = "hid="+id.del;
    xhr.open('POST','HTTP/DELETE/todo/deletetodo.php',true);
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
        if(xhr.responseText == 'delete') {
          Todo.fetchTodo();
        }
        }
    }
    xhr.onerror = function(){
      return xhr.statusText;
    }
      xhr.send(param);
  }

  static delGet(id) {
      let d = {
        del:id
      }
      if(sessionStorage.getItem('del_id') == null) {
        sessionStorage.setItem('del_id',JSON.stringify(d));
      } else {
        let data = JSON.parse(sessionStorage.getItem('del_id'))
        console.log(data.del);
        data.del = id;
        sessionStorage.setItem('del_id',JSON.stringify(data));
      }
      
      
  
  }

  static DelModal(){
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
          <button type="button" class="btn btn-outline-warning" onclick="Todo.DeleteTodo()" data-dismiss="modal">Confirm</button>
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>`;
  }

  static Create(){
        Todo.formTodo();
        create.classList.add('faa-tada');
        create.classList.add('animated');
        show.classList.remove('faa-pulse');
        show.classList.remove('animated');
  }
  
  static Show(){
      Todo.fetchTodo();
      show.classList.add('faa-pulse');
      show.classList.add('animated');
      create.classList.remove('faa-tada');
      create.classList.remove('animated');
  }

}

class Supplier {

 static MainSupplier() {
  const supplier = document.querySelector('#supplier');
  const options = document.querySelector('#options');
  const message = document.querySelector('#message');
  const create = document.querySelector('#create');
  const stock = document.querySelector('#stock');

  mainElement.innerHTML = `<div class="card text-white border-success mb-3" style="max-width: 54rem;">
  <div class="card-header">
  <i class="float-right mt-3 ml-4 fas text-warning fa-times-circle fa-2x " onclick="Main.closeAll()"></i>
  <i class="float-right mt-3 ml-4 fas text-info fas fas fa-table faa-pulse animated-hover faa-fast fa-2x"></></i>
  <i id="create" class="float-right mt-3 ml-4 fas text-success fas fa-people-carry fa-2x" onclick="Supplier.RegisterPerson()"></i>
  <i id="stock" class="float-right mt-3 ml-4 fas text-primary fas fa-truck-loading fa-2x" onclick="Supplier.RegisterStock()"></i>
  <h1><b> Supplier Section</b></h1>
  <small class="float-right text-warning mr-2 ml-4"><b>Close</b></small>
  <small class="float-right text-info mr-2 ml-2"><b>Table</b></small>
  <small class="float-right text-success mr-3 ml-3"><b>Supplier</b></small>
  <small class="float-right text-primary mr-3"><b>Stock</b></small>
  </div>

  <div class="card-body">
  <div class="mb-1 mt-1" id="message"></div>
  <div class="mb-1 mt-1" id="options"></div>
  <div id="supplier"></div>
  </div>
  </div>`;
 }

 static RegisterPerson() {
    options.innerHTML = '';
    message.innerHTML = '';
    Supplier.formSupplierPerson();
    create.classList.add('faa-horizontal');
    create.classList.add('animated');

    stock.classList.remove('faa-bounce')
    stock.classList.remove('animated');
 }
 
 static RegisterStock() {
   supplier.innerHTML = '';
   message.innerHTML = '';
   options.innerHTML = `<div onclick="Supplier.formSupplierTransac()" class="float-right form-inline text-primary">
   <i class="fas fa-hand-holding-usd ml-2 mb-1"></i><h5 class="noselect mt-1">Transaction</h5>
   </div>
   <div onclick="Supplier.formSupplierSupply()" class="float-right form-inline text-primary">
   <i class="fas fa-cubes ml-3 mr-2 mb-1"></i><h5 class="noselect mt-1">Add Supply</h5>
   </div>`;
   stock.classList.add('faa-bounce')
   stock.classList.add('animated');

   create.classList.remove('faa-horizontal');
   create.classList.remove('animated');
 }

 static registerSupplier() {

  let first = document.querySelector('#first').value;
  let last = document.querySelector('#last').value;
  let company = document.querySelector('#company').value;
  let contact = document.querySelector('#contact').value;

  let params = ['first=',first,'&last=',last,'&company=',company,'&contact=',contact];
  
  Main.postData('POST','HTTP/POST/supplier/supplierperson.php',params)
  .then((data)=>{
    console.log(data);
    if(data == 'success') {
      supplier.innerHTML = `<center><h1 class="text-success"><b>The supplier person was added</b></h1></center>
        <input type="button" class="form-control btn btn-outline-secondary mt-2" value="Back to the table">`;
      // console.log(xhr.responseText);
      } else if(data == 'empty') {
        message.innerHTML = `<center><h3 class="text-danger"><b>Please fill up all information because they are required</b></h3></center>`;
      } 
      else if(data == 'cannot') {
        message.innerHTML = `<center><h3 class="text-danger"><b>Please do not include any special character or not required character in specific form</b></h3></center>`;
      } 
  })
  .catch((err)=>{
    console.log(err);
  });

 }

 static formSupplierPerson() {
      supplier.innerHTML = `
      <form id="cSupplier" class="text-success">
      <center><h1><b>Add a supplier information</b></h1></center>
      <div class="form-group">
      <label for="exampleInputEmail1"><b>First Name</b></label>
      <input type="text" class="form-control" id="first" name="first">
      </div>
      <div class="form-group">
      <label for="exampleInputEmail1"><b>Last Name</b></label>
      <input type="text" class="form-control" id="last" name="last">
      </div>
      <div class="form-group">
      <label for="exampleInputEmail1"><b>Company Name</b></label>
      <input type="text" class="form-control" id="company" name="company">
      </div>
      <div class="form-group">
      <label for="exampleInputEmail1"><b>Contact Number</b></label>
      <input type="text" class="form-control" id="contact" name="contact">
      </div>
      <input type="submit" class="form-control btn btn-outline-success" name="submit" value="Submit">
      </form>`;

      const cSupplier = document.querySelector('#cSupplier');

      cSupplier.addEventListener('submit',function(x){
        x.preventDefault();
        Supplier.registerSupplier();
      })
 }

 static formSupplierSupply() {
  supplier.innerHTML = `
  <form id="SuppSupply" class="text-primary">
  <br>
  <br>
  <center><h1><b>Add a supplier information</b></h1></center>
  <div class="form-group">
  <label for="exampleInputEmail1"><b>Supply ID</b></label>
  <input type="text" class="form-control" id="supply_id" name="supply_id">
  </div>
  <div class="form-group">
  <label for="exampleInputEmail1"><b>Last Name</b></label>
  <input type="text" class="form-control" id="last" name="last">
  </div>
  <div class="form-group">
  <label for="exampleInputEmail1"><b>Company Name</b></label>
  <input type="text" class="form-control" id="company" name="company">
  </div>
  <div class="form-group">
  <label for="exampleInputEmail1"><b>Contact Number</b></label>
  <input type="text" class="form-control" id="contact" name="contact">
  </div>
  <input type="submit" class="form-control btn btn-outline-primary" name="submit" value="Submit">
  </form>`;
 }

 static formSupplierTransac() {
 
 }



}

// Button 
btnTodo.addEventListener('click',function(x){
  x.preventDefault();
  if(bolTodo) {
    Todo.MainTodo();
    bolTodo = false;
    bolSupplier = true;
  } else {
    mainElement.innerHTML = '';
    bolTodo = true;
  }

});

btnSupplier.addEventListener('click',function(x){
  x.preventDefault();
  if(bolSupplier) {
    Supplier.MainSupplier();
    bolSupplier = false;
    bolTodo = true;
  } else {
    mainElement.innerHTML = '';
    bolSupplier = true;
  }
})

