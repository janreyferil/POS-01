// Main Element
const mainElement = document.querySelector('#mainElement');

// Todo

let bolTodo = true;
const btnTodo = document.querySelector('#btnTodo');

// Supplier
let bolSupplier = true;
const btnSupplier = document.querySelector('#btnSupplier');

// Inventory
let bolInventory = true;
const btnInventory = document.querySelector('#btnInventory');

let redirect = false;

class Main {
  //Ajax
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
  //Redirect
  static RedirectSupply(){
    redirect = true;
    bolSupplier = false;
    bolTodo = true;
    bolInventory = true;
    Supplier.MainSupplier();
    
  }
}

class Todo {
  static MainTodo(){
    const create = document.querySelector('#create');
    const show = document.querySelector('#show');

    const todo = document.querySelector('#todo');
    const del = document.querySelector('#del');
    const title = document.querySelector('#title');
    mainElement.innerHTML = `<div class="card text-white border-light mb-3" style="max-width: 54rem;">
    <div class="card-header bg-light-opacity">
    <i class="float-right mt-3 ml-4 fas text-dark fa-times-circle fa-2x " onclick="Main.closeAll()"></i>
    <i id="create" class="float-right text-primary ml-4 mt-3 fa fa-pencil-alt fa-2x " onclick="Todo.Create()"></i>
    <i id="show" class="float-right text-info mt-3 fas fa-eye faa-fast fa-2x" onclick="Todo.Show()"></i>
    <h1 id="title" class="text-dark"><b> To-Do List</b></h1>
    <small class="float-right text-dark mr-1 ml-3"><b>Close</b></small>
    <small class="float-right text-primary mr-4 ml-3"><b>Write</b></small>
    <small class="float-right text-info mr-3"><b>Show</b></small>
    </div>
    
    <div class="card-body">
    <div class="card text-white bg-dark-opacity text-light mt-2 mb-2" style="max-width: 54rem;">
    <div class="card-body">
    <div id="todo"></div>
    </div>
    </div>
    </div>
    </div>`;
  
    Todo.Show();
  }
  
  static fetchTodo() {
    Todo.DelModal();
    title.innerHTML = `<b>To-do List</b>`;
    Main.getData('GET','HTTP/GET/todo/todofetch.php')
    .then((data)=> {
    let d = JSON.parse(data);
    //////console.log(d));
    let output = ``;
    if(d.id == 0) {
      output += `<center><h1>Create new todo</h1></center>`;

    } 
    for(let i = 0; i < d.id.length; i++) {
          output += `
          <div class="card text-white bg-dark text-light mt-2 mb-2" style="max-width: 54rem;">
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
        todo.innerHTML = `  <div class="card text-white bg-dark text-light mt-2 mb-2" style="max-width: 54rem;">
          <div class="card-body">
          <center><h1><b>To-do was added</b></h1></center>
          <input type="button" class="col-12 btn btn-outline-secondary mt-2" onclick="Todo.Show()" value="Back to the todo">
          </div>
          </div>`;
        // console.log(xhr.responseText);
        } else if(data == 'empty') {
          todo.innerHTML = `<div class="card text-white bg-dark text-light mt-2 mb-2" style="max-width: 54rem;">
          <div class="card-body">
          <center><h1><b>Please compose a todo</b></h1></center>
          <input type="button" class="col-12 btn btn-outline-secondary mt-2" onclick="Todo.formTodo()" value="Back to the create form">
          </div>
          </div>`;
        } 
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  static formTodo(){
    title.innerHTML = `<b>Add To-do</b>`;
    todo.innerHTML = `
    <form id="cTodo" class="text-light">
    <div class="form-group">
    <label for="exampleInputEmail1"><b>Body</b></label>
    <textarea class="form-control form-control-light bg-dark text-light" id="body" name="body"></textarea>
    </div>
    <input type="submit" class="col-12 btn btn-outline-light" name="submit" value="Add">
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
         //console.log(d)ata.del);
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
 // Main Option List
 static MainSupplier() {
  const body = document.querySelector('#body');
  const options = document.querySelector('#options');
  const message = document.querySelector('#message');
  const create = document.querySelector('#create');
  const stock = document.querySelector('#stock');
  const fetchs = document.querySelector('#fetchs');

  const title = document.querySelector('#title');

  mainElement.innerHTML = `<div class="card border-primary mb-3" style="max-width: 54rem;">
  <div class="card-header bg-primary-opacity">
  <i class="float-right mt-3 ml-4 fas text-dark fa-times-circle fa-2x " onclick="Main.closeAll()"></i>
  <i  id="fetchs" class="float-right mt-3 ml-4 fas text-info fas fas fa-table faa-fast fa-2x" onclick="Supplier.FetchingSupply()"></></i>
  <i id="create" class="float-right mt-3 ml-4 fas text-success fas fa-people-carry fa-2x" onclick="Supplier.RegisterPerson()"></i>
  <i id="stock" class="float-right mt-3 ml-4 fas text-light fas fa-truck-loading fa-2x" onclick="Supplier.RegisterStock()"></i>
  <h1 id="title" class="text-dark"></h1>
  <small class="float-right text-dark mr-2 ml-4"><b>Close</b></small>
  <small class="float-right text-info mr-2 ml-2"><b>Table</b></small>
  <small class="float-right text-success mr-3 ml-3"><b>Supplier</b></small>
  <small class="float-right text-light mr-3"><b>Stock</b></small>
  </div>

  <div class="card-body text-info">
  <div class="card text-white bg-dark-opacity text-light mt-2 mb-2" style="max-width: 54rem;">
  <div class="card-body">
  <div id="message" class="mb-2"></div>
  <div class="mb-1 mt-1" id="options"></div>
  <div id="body"></div>
  </div>
  </div>
  </div>
  </div>`;
  if(redirect == true){
    Supplier.RegisterStock();
    redirect = false;
  } else {
    Supplier.FetchingSupply();
  }
 }
 // Sub Option List
 static RegisterPerson() {
    body.innerHTML = '';
    options.innerHTML = '';
    message.innerHTML = '';
    Supplier.formSupplierPerson();
    create.classList.add('faa-horizontal');
    create.classList.add('animated');

    stock.classList.remove('faa-bounce')
    stock.classList.remove('animated');

    fetchs.classList.remove('faa-pulse');
    fetchs.classList.remove('animated');
 }
 
 static RegisterStock() {
   options.innerHTML = '';
   body.innerHTML = '';
   message.innerHTML = '';
   Supplier.formSupplierSupply();
   options.innerHTML =  `   <div onclick="Supplier.formSupplierSupply()" class="float-left form-inline text-light">
   <button class="btn btn-outline-light mr-2"><i class="fas fa-cubes"> Add Supply</i></h5></button>
   </div>
  
   <div onclick="Supplier.formSupplierTransac()" class="float-left form-inline text-light">
   <button class="btn btn-outline-light mr-2"><i class="fas fa-hand-holding-usd"> Transaction</i></button>
   </div>`;
   stock.classList.add('faa-bounce')
   stock.classList.add('animated');

   create.classList.remove('faa-horizontal');
   create.classList.remove('animated');

   fetchs.classList.remove('faa-pulse');
   fetchs.classList.remove('animated');
 
 }

 static FetchingSupply(){
  options.innerHTML = '';
  body.innerHTML = '';
  message.innerHTML = '';
  Supplier.fetchSupply();
  options.innerHTML = `<div onclick="Supplier.fetchSupply()" class="float-left form-inline">
  <button class="btn btn-outline-info mr-2"><i class="fas fas fa-boxes"> Supply</i></button>
  </div>

  <div onclick="Supplier.fetchTransac()" class="float-left form-inline">
  <button class="btn btn-outline-info"><i class="fas fa-handshake"> Transaction</i></h5></button>
  </div>

  <div onclick="Supplier.fetchSupplier()" class="float-left form-inline">
  <button class="btn btn-outline-info ml-2"><i class="fas fa-address-book"> Supplier</i></h5></button>
  </div>`;

  fetchs.classList.add('faa-pulse');
  fetchs.classList.add('animated');

  stock.classList.remove('faa-bounce')
  stock.classList.remove('animated');

  create.classList.remove('faa-horizontal');
  create.classList.remove('animated');

  
  const searchForm = document.querySelector('#searchForm');

 }

 //Supply
 static registerSupplyID() {

  const supply_id = document.querySelector('#supply_id').value;
  const ref_name = document.querySelector('#ref_name').value;

  let params = ['supply_id=',supply_id,'&ref_name=',ref_name];
  
  Main.postData('POST','HTTP/POST/supplier/suppliersupply_id.php',params)
  .then((data)=>{

    if(data == 'success') {
      message.innerHTML = '';
      body.innerHTML = `<center><h1 class="text-light"><b>The supply was added</b></h1></center>
        <input type="button" class="col-12 btn btn-outline-secondary mt-2" value="Back to Supply ID" onclick="Supplier.formSupplierSupply()">`;
      // console.log(xhr.responseText);
      } else if(data == 'empty') {
        message.innerHTML = `<center><h3 class="text-danger"><b>Please fill out all the forms</b></h3></center>`;
      } 
      else if(data == 'cannot') {
        message.innerHTML = `<center><h3 class="text-danger"><b>Do not include any inappropriate characters</b></h3></center>`;
      } else if(data == 'taken') {
        message.innerHTML = `<center><h3 class="text-danger"><b>The value was taken</b></h3></center>`;
      } else if(data == 'count') {
        message.innerHTML = `<center><h3 class="text-danger"><b>Please follow the requirement of the field</b></h3></center>`;
      }
  })
  .catch((err)=>{
    console.log(err);
  });

 }

 static formSupplierSupply() {
  message.innerHTML = '';
  body.innerHTML = '';
  title.innerHTML = `<b>Supply Section</b>`;
  body.innerHTML = `<br><br><br>
  <form id="SuppSupply" class="text-light">
  <div class="form-group">
  <label for="exampleInputEmail1"><b>Supply ID</b></label>
  <input type="text" autocomplete="off" class="form-control form-control-light bg-dark text-light" id="supply_id" name="supply_id" placeholder="Required an exactly 5 value">
  </div>
  <div class="form-group">
  <label for="exampleInputEmail1"><b>Reference Name</b></label>
  <input type="text" autocomplete="off" class="form-control form-control-light bg-dark text-light" id="ref_name" name="ref_name" placeholder="Required a maximun of 25 value">
  </div>
  <input type="submit" class="col-12 btn btn-outline-light" name="submit" value="Submit">
  </form>`;
  const SuppSupply = document.querySelector('#SuppSupply');

  SuppSupply.addEventListener('submit',function(x){
    x.preventDefault();
    Supplier.registerSupplyID();
  });
 }

 static fetchSupply(){
  Supplier.DelModalSupply();
  body.innerHTML = '';
  message.innerHTML = '';
  title.innerHTML = `<b>Supply Table</b>`;
  body.innerHTML += `<br><br>
  <div class="form-inline mb-3 mt-4">
  <form id="searchForm">
     <div class="form-group">
       <div class="text-light input-group-addon bg"><i id="lighten1" class="text-info fas fa-search"></i></div>
       <input class="form-control border-info" type="text" autocomplete="off" name="search" id="search">

       <div class="text-light input-group-addon bg ml-2"><i id="lighten2" class="text-info fas fa-database"></i></div>
       <input class="form-control border-info" type="text" autocomplete="off" name="val" id="val">
       </div>
       </form>

   <form id="orderForm">
   <div class="form-group">
       <div class="text-light input-group-addon ml-2"><i id="lighten3" class="text-info fas fa-sort"></i></div>
       <select class="form-control" id="order" name="order">
       <option value="ASC">ASCENDING ORDER</option>
       <option value="DESC">DESCENDING ORDER</option>
       </select>
   </div>
   </form>
  </div>

  <table class="table table-hover border-info">
  <thead>
    <tr class="table-info">
      <th scope="col">Supply ID</th>
      <th scope="col">Reference Name</th>
      <th scope="col">Status</th>
      <th scope="col">Stock</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody id="supply">
  </tbody>
   </table>`;
   const search = document.querySelector('#search').value; 
   const val = document.querySelector('#val').value;
   const order = document.querySelector('#order').value;
   const params = ['search=',search,'&val=',val,'&order=',order]; 
   Main.postData('POST','HTTP/GET/supplier/supplierfetchsupply.php',params)
    .then((data)=>{
     let d = JSON.parse(data);
     const supply = document.querySelector('#supply');
     for(let i = 0; i < d.supply_id.length;i++){
       if(d.id[i] == 0){
        supply.innerHTML += `<tr class="table-default">
        <th scope="row" style="width: 17.16%">${d.supply_id[i]}</th>
        <td style="width: 28.5%">${d.ref_name[i]}</td>
        <td style="width: 17.16%">${d.status[i]}</td>
        <td style="width: 17.16%">${d.stock[i]}</td>
        <td style="width: 25%">
          no search found
         </td>
        </tr>`;
       } else {
        supply.innerHTML += `<tr class="table-default">
        <th scope="row" style="width: 17.16%">${d.supply_id[i]}</th>
        <td style="width: 28.5%">${d.ref_name[i]}</td>
        <td style="width: 17.16%">${d.status[i]}</td>
        <td style="width: 17.16%">${d.stock[i]}</td>
        <td style="width: 25%">
         <i class="fas fa-edit text-danger faa-vertical animated-hover ml-2" onclick="Supplier.EditSupply(${d.id[i]})"></i>
         <i class="fas fa-trash-alt faa-wrench animated-hover text-warning ml-2" onclick="Supplier.delSessId(${d.id[i]})" data-toggle="modal" data-target="#del"></i>
         <i class="fa fa-eye faa-pulse animated-hover text-info ml-2" onclick="Supplier.ShowSupply(${d.id[i]})"></i>
         </td>
        </tr>`;
       }
     }
   })
 

   const searchForm = document.querySelector('#searchForm');
   const orderForm = document.querySelector('#orderForm');
   searchForm.addEventListener('keyup',(x)=>{
     x.preventDefault();
     supply.innerHTML = '';
    
     const search = document.querySelector('#search').value; 
     const val = document.querySelector('#val').value;
     const order = document.querySelector('#order').value;
     const params = ['search=',search,'&val=',val,'&order=',order]; 
     Main.postData('POST','HTTP/GET/supplier/supplierfetchsupply.php',params)
     .then((data)=>{
       let d = JSON.parse(data);
      // //////console.log(d));
       const supply = document.querySelector('#supply');
       for(let i = 0; i < d.supply_id.length;i++){
        if(d.id[i] == 0){
          supply.innerHTML += `<tr class="table-default">
          <th scope="row" style="width: 17.16%">${d.supply_id[i]}</th>
          <td style="width: 28.5%">${d.ref_name[i]}</td>
          <td style="width: 17.16%">${d.status[i]}</td>
          <td style="width: 17.16%">${d.stock[i]}</td>
          <td style="width: 25%">
            no search found
           </td>
          </tr>`;
         } else {
          supply.innerHTML += `<tr class="table-default">
          <th scope="row" style="width: 17.16%">${d.supply_id[i]}</th>
          <td style="width: 28.5%">${d.ref_name[i]}</td>
          <td style="width: 17.16%">${d.status[i]}</td>
          <td style="width: 17.16%">${d.stock[i]}</td>
          <td style="width: 25%">
           <i class="fas fa-edit text-danger faa-vertical animated-hover ml-2" onclick="Supplier.EditSupply(${d.id[i]})"></i>
           <i class="fas fa-trash-alt faa-wrench animated-hover text-warning ml-2" onclick="Supplier.delSessId(${d.id[i]})" data-toggle="modal" data-target="#del"></i>
           <i class="fa fa-eye faa-pulse animated-hover text-info ml-2" onclick="Supplier.ShowSupply(${d.id[i]})"></i>
           </td>
          </tr>`;
         }
       }

       if(search == '') {
        lighten1.classList.remove('faa-pulse');
        lighten1.classList.remove('animated');
      } else {
        lighten1.classList.add('faa-pulse');
        lighten1.classList.add('animated');
      }
    
      if(val == '') {
        lighten2.classList.remove('faa-tada');
        lighten2.classList.remove('animated');
      } else {
        lighten2.classList.add('faa-tada');
        lighten2.classList.add('animated');
      }

     })
     .catch((err)=>{
       console.log(err);
     });
   });

   orderForm.addEventListener('change',(x)=>{
    x.preventDefault();
    supply.innerHTML = '';
   
    const search = document.querySelector('#search').value; 
    const val = document.querySelector('#val').value;
    const order = document.querySelector('#order').value;
    const params = ['search=',search,'&val=',val,'&order=',order]; 
    Main.postData('POST','HTTP/GET/supplier/supplierfetchsupply.php',params)
    .then((data)=>{
      let d = JSON.parse(data);
     // //////console.log(d));
      const supply = document.querySelector('#supply');
      for(let i = 0; i < d.supply_id.length;i++){
        if(d.id[i] == 0){
          supply.innerHTML += `<tr class="table-default">
          <th scope="row" style="width: 17.16%">${d.supply_id[i]}</th>
          <td style="width: 28.5%">${d.ref_name[i]}</td>
          <td style="width: 17.16%">${d.status[i]}</td>
          <td style="width: 17.16%">${d.stock[i]}</td>
          <td style="width: 25%">
            no search found
           </td>
          </tr>`;
         } else {
          supply.innerHTML += `<tr class="table-default">
          <th scope="row" style="width: 17.16%">${d.supply_id[i]}</th>
          <td style="width: 28.5%">${d.ref_name[i]}</td>
          <td style="width: 17.16%">${d.status[i]}</td>
          <td style="width: 17.16%">${d.stock[i]}</td>
          <td style="width: 25%">
           <i class="fas fa-edit text-danger faa-vertical animated-hover ml-2" onclick="Supplier.EditSupply(${d.id[i]})"></i>
           <i class="fas fa-trash-alt faa-wrench animated-hover text-warning ml-2" onclick="Supplier.delSessId(${d.id[i]})" data-toggle="modal" data-target="#del"></i>
           <i class="fa fa-eye faa-pulse animated-hover text-info ml-2" onclick="Supplier.ShowSupply(${d.id[i]})"></i>
           </td>
          </tr>`;
         }
      }


      lighten3.classList.add('faa-vertical');
      lighten3.classList.add('animated');
  
      setTimeout(function(){
        lighten3.classList.remove('faa-vertical');
        lighten3.classList.remove('animated');
    
      },1000);

    })
    .catch((err)=>{
      console.log(err);
    });
   });


   
 }

 static DelModalSupply(){
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
        <p>Are you sure you want to delete this item ?</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-warning" onclick="Supplier.DeleteSupply()" data-dismiss="modal">Confirm</button>
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
      </div>
    </div>
  </div>`;
 }

 static DeleteSupply(){
  let id = JSON.parse(sessionStorage.getItem('del_id'));
  let params = ["hid="+id.del];
  Main.postData('POST','HTTP/DELETE/supplier/supplydelete.php',params)
  .then((data)=>{
    //console.log(d)ata);
    if(data == 'stock'){
      message.innerHTML = `<center><h3 class="text-danger"><b>You cannot remove a supply with filled stock</b></h3></center>`;
      return false;
    }
    Supplier.fetchSupply();
  })
  .catch((err)=>{
    console.log(err);
  })
 
 }

 static delSessId(id) {
  let d = {
    del:id
  }
  if(sessionStorage.getItem('del_id') == null) {
    sessionStorage.setItem('del_id',JSON.stringify(d));
  } else {
    let data = JSON.parse(sessionStorage.getItem('del_id'))
  //  //console.log(d)ata.del);
    data.del = id;
    sessionStorage.setItem('del_id',JSON.stringify(data));
  }
 }

 static ShowSupply(id){
   //console.log(id);
  body.innerHTML = '';
  let params = ["hid="+id];
  Main.postData('POST','HTTP/GET/supplier/suppliershowsupply.php',params)
  .then((data)=>{
    let d = JSON.parse(data);
    //////console.log(d));
    body.innerHTML = `<br><br><br>
    <div class="text-info">
    <h1><b><center>Full Information</center></b></h1>
    <h4><b>Supply ID: </b>${d.supply_id}</h4>
    <h4><b>Name: </b>${d.ref_name}</h4>
    <h4><b>Status: </b>${d.status}</h4>
    <h4><b>Stock: </b>${d.stock}</h4>
    <h4><b>Created at: </b>${d.created_at}</h4>
    <h4><b>Updated at: </b>${d.updated_at}</h4>
    <input type="button" class="col-12 btn btn-outline-secondary mt-2" onclick="Supplier.fetchSupply()" value="Back">
    </div>`;
    //Supplier.fetchSupply();
  })
  .catch((err)=>{
    console.log(err);
  })
 
 }

 static EditSupply(id){
  message.innerHTML = '';
  body.innerHTML = '';
  let params = ["hid="+id];
  Main.postData('POST','HTTP/GET/supplier/suppliershowsupply.php',params)
  .then((data)=>{
    let d = JSON.parse(data);
    body.innerHTML = `
    <br><br><br>
    <div class="card text-white bg-dark text-light mb-3" style="max-width: 54rem;">
    <div class="card-body">
    <div class="text-info">
    <form id="UpdateSupply" class="text-info">
    <center><h1><b>Edit the supply</b></h1></center>
    <div class="form-group">
    <label for="exampleInputEmail1"><b>Supply ID</b></label>
    <input type="text" autocomplete="off" class="form-control" id="supply_id" name="supply_id" placeholder="Required an exactly 5 value" value="${d.supply_id}">
    </div>
    <div class="form-group">
    <label for="exampleInputEmail1"><b>Reference Name</b></label>
    <input type="text" autocomplete="off" class="form-control" id="ref_name" name="ref_name" placeholder="Required a maximun of 25 value" value="${d.ref_name}">
    </div>
    <input type="submit" class="mt-2 col-12 btn btn-outline-info" name="submit" value="Submit">
    <input type="button" class="mt-2 col-12 btn btn-outline-secondary" onclick="Supplier.fetchSupply()" value="Back">
    </form>
    </div>
    </div>`;
    const UpdateSupply = document.querySelector('#UpdateSupply');
  
    UpdateSupply.addEventListener('submit',function(x){
      x.preventDefault();
      Supplier.UpdateSupply(id);
    });
  })
  .catch((err)=>{
    console.log(err);
  })
 }

 static UpdateSupply(id){
  const supply_id = document.querySelector('#supply_id').value;
  const ref_name = document.querySelector('#ref_name').value;

  let params = ['uid=',id,'&supply_id=',supply_id,'&ref_name=',ref_name];
  
  Main.postData('POST','HTTP/PUT/supplier/updatesupply.php',params)
  .then((data)=>{
    if(data == 'stock'){
      message.innerHTML = `<center><h3 class="text-danger"><b>You cannot update a supply with filled stock</b></h3></center>`;
    }
    ////console.log(d)ata);
    if(data == 'success') {
      message.innerHTML = '';
      body.innerHTML = `<br><br><br>
        <center><h1 class="text-info"><b>The supply was updated</b></h1></center>
        <input type="button" class="col-12 btn btn-outline-secondary mt-2" value="Back to Supply ID" onclick="Supplier.fetchSupply()">`;
      // console.log(xhr.responseText);
      } else if(data == 'empty') {
        message.innerHTML = `<center><h3 class="text-danger"><b>Please fill out all the forms</b></h3></center>`;
      } 
      else if(data == 'cannot') {
        message.innerHTML = `<center><h3 class="text-danger"><b>Please do not include any letters</b></h3></center>`;
      } else if(data == 'taken') {
        message.innerHTML = `<center><h3 class="text-danger"><b>Please put unique a supply id</b></h3></center>`;
      } else if(data == 'count') {
        message.innerHTML = `<center><h3 class="text-danger"><b>Please follow the requirement of the fields</b></h3></center>`;
      }
  })
  .catch((err)=>{
    console.log(err);
  });
 }
 
 // Supplier
 static formSupplierPerson() {
      message.innerHTML = '';
      body.innerHTML = '';
      options.innerHTML = '';
      title.innerHTML = `<b>Supplier Section</b>`;
      body.innerHTML = `
      <form id="cSupplier" class="text-success">
      <div class="form-group">
      <label for="exampleInputEmail1"><b>First Name</b></label>
      <input type="text" autocomplete="off" class="form-control form-control-success bg-dark text-success" id="first" name="first" placeholder="Required a maximum of 30 value">
      </div>
      <div class="form-group">
      <label for="exampleInputEmail1"><b>Last Name</b></label>
      <input type="text" autocomplete="off" class="form-control form-control-success bg-dark text-success" id="last" name="last" placeholder="Required a maximum of 30 value">
      </div>
      <div class="form-group">
      <label for="exampleInputEmail1"><b>Company Name</b></label>
      <input type="text" autocomplete="off" class="form-control form-control-success bg-dark text-success" id="company" name="company" placeholder="Required a maximum of 30 value">
      </div>
      <div class="form-group">
      <label for="exampleInputEmail1"><b>Contact Number</b></label>
      <input type="text" autocomplete="off" class="form-control form-control-success bg-dark text-success" id="contact" name="contact" placeholder="eg. 0926214112 exactly 11 value only">
      </div>
      <input type="submit" class="col-12 btn btn-outline-success" name="submit" value="Submit">
      </form>`;



      const cSupplier = document.querySelector('#cSupplier');

      cSupplier.addEventListener('submit',function(x){
        x.preventDefault();
        Supplier.registerSupplier();
      })
 }

 static registerSupplier() {

  let first = document.querySelector('#first').value;
  let last = document.querySelector('#last').value;
  let company = document.querySelector('#company').value;
  let contact = document.querySelector('#contact').value;

  let params = ['first=',first,'&last=',last,'&company=',company,'&contact=',contact];
  
  Main.postData('POST','HTTP/POST/supplier/supplierperson.php',params)
  .then((data)=>{
   // //console.log(d)ata);
    if(data == 'success') {
      body.innerHTML = `<center><h1 class="text-success"><b>The supplier person was added</b></h1></center>
        <input type="button" class="col-12 btn btn-outline-secondary mt-2" value="Back to the table" onclick="Supplier.fetchSupplier()">`;
      // console.log(xhr.responseText);
      } else if(data == 'empty') {
        message.innerHTML = `<center><h3 class="text-danger"><b>Please fill out all the forms</b></h3></center>`;
      } 
      else if(data == 'cannot') {
        message.innerHTML = `<center><h3 class="text-danger"><b>Do not include any inappropriate characters</b></h3></center>`;
      } else if(data == 'taken') {
        message.innerHTML = `<center><h3 class="text-danger"><b>The value was taken</b></h3></center>`;
      } else if(data == 'count') {
        message.innerHTML = `<center><h3 class="text-danger"><b>Please follow the requirement of the field</b></h3></center>`;
      }
  })
  .catch((err)=>{
    console.log(err);
  });

 }

 static fetchSupplier(){
  body.innerHTML = '';
  message.innerHTML = '';
  options.innerHTML = `<div onclick="Supplier.fetchSupply()" class="float-left form-inline">
  <button class="btn btn-outline-info mr-2"><i class="fas fas fa-boxes"> Supply</i></button>
  </div>

  <div onclick="Supplier.fetchTransac()" class="float-left form-inline">
  <button class="btn btn-outline-info"><i class="far fa-handshake"> Transaction</i></h5></button>
  </div>

  <div onclick="Supplier.fetchSupplier()" class="float-left form-inline">
  <button class="btn btn-outline-info ml-2"><i class="fas fa-address-book"> Supplier</i></h5></button>
  </div>`;
  Supplier.DelModalSupplier();
  title.innerHTML = `<b>Supplier Table</b>`;
  body.innerHTML += `<br><br>
  <div class="form-inline mb-3 mt-4">
  <form id="searchForm">
     <div class="form-group">
       <div class="text-light input-group-addon bg"><i id="lighten1" class="text-info fas fa-search"></i></div>
       <input class="form-control border-info" type="text" autocomplete="off" name="search" id="search">

       <div class="text-light input-group-addon bg ml-2"><i id="lighten2" class="text-info fas fa-database"></i></div>
       <input class="form-control border-info" type="text" autocomplete="off" name="val" id="val">
       </div>
       </form>

   <form id="orderForm">
   <div class="form-group">
       <div class="text-light input-group-addon ml-2"><i id="lighten3" class="text-info fas fa-sort"></i></div>
       <select class="form-control" id="order" name="order">
       <option value="ASC">ASCENDING ORDER</option>
       <option value="DESC">DESCENDING ORDER</option>
       </select>
   </div>
   </form>
  </div>

  <table class="table table-hover border-info">
  <thead>
    <tr class="table-info">
      <th scope="col">Name</th>
      <th scope="col">Company</th>
      <th scope="col">Contact</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody id="supply">
    </tbody>
   </table>`;
   const search = document.querySelector('#search').value; 
   const val = document.querySelector('#val').value;
   const order = document.querySelector('#order').value;
   const params = ['search=',search,'&val=',val,'&order=',order]; 

   Main.postData('POST','HTTP/GET/supplier/supplierfetch.php',params)
    .then((data)=>{

     let d = JSON.parse(data);
     ////////console.log(d));
     const supply = document.querySelector('#supply');
     for(let i = 0; i < d.name.length;i++){
       if(d.id[i] == 0) {
        supply.innerHTML += `<tr class="table-default">
        <th scope="row" style="width:30%">${d.name[i]}</th>
        <td style="width:30.5%">${d.company[i]}</td>
        <td style="width:18%">${d.contact[i]}</td>
        <td style="width:25%">
          no search found
        </td>
      </tr>`
       } else {
        supply.innerHTML += `<tr class="table-default">
        <th scope="row" style="width:30%">${d.name[i]}</th>
        <td style="width:30.5%">${d.company[i]}</td>
        <td style="width:18%">${d.contact[i]}</td>
        <td style="width:25%">
        <i class="fas fa-edit text-danger faa-vertical animated-hover ml-2" onclick="Supplier.EditSupplier(${d.id[i]})"></i>
        <i class="fas fa-trash-alt faa-wrench animated-hover text-warning ml-2" onclick="Supplier.delSessId(${d.id[i]})" data-toggle="modal" data-target="#del"></i>
        <i class="fa fa-eye faa-pulse animated-hover text-info ml-2" onclick="Supplier.ShowSupplier(${d.id[i]})"></i>
        </td>
      </tr>`
       }
    }
   });

   const searchForm = document.querySelector('#searchForm');
   const orderForm = document.querySelector('#orderForm');

  searchForm.addEventListener('keyup',(x)=>{
    x.preventDefault();
    supply.innerHTML = '';
   
    const search = document.querySelector('#search').value; 
    const val = document.querySelector('#val').value;
    const order = document.querySelector('#order').value;
    const params = ['search=',search,'&val=',val,'&order=',order]; 
    Main.postData('POST','HTTP/GET/supplier/supplierfetch.php',params)
      .then((data)=>{
      let d = JSON.parse(data);
      // ////////console.log(d));
      const supply = document.querySelector('#supply');
      for(let i = 0; i < d.name.length;i++){
        if(d.id[i] == 0) {
          supply.innerHTML += `<tr class="table-default">
          <th scope="row" style="width:30%">${d.name[i]}</th>
          <td style="width:30.5%">${d.company[i]}</td>
          <td style="width:18%">${d.contact[i]}</td>
          <td style="width:25%">
            no search found
          </td>
        </tr>`
         } else {
          supply.innerHTML += `<tr class="table-default">
          <th scope="row" style="width:30%">${d.name[i]}</th>
          <td style="width:30.5%">${d.company[i]}</td>
          <td style="width:18%">${d.contact[i]}</td>
          <td style="width:25%">
          <i class="fas fa-edit text-danger faa-vertical animated-hover ml-2" onclick="Supplier.EditSupplier(${d.id[i]})"></i>
          <i class="fas fa-trash-alt faa-wrench animated-hover text-warning ml-2" onclick="Supplier.delSessId(${d.id[i]})" data-toggle="modal" data-target="#del"></i>
          <i class="fa fa-eye faa-pulse animated-hover text-info ml-2" onclick="Supplier.ShowSupplier(${d.id[i]})"></i>
          </td>
        </tr>`
         }
      }

      if(search == '') {
       lighten1.classList.remove('faa-pulse');
       lighten1.classList.remove('animated');
     } else {
       lighten1.classList.add('faa-pulse');
       lighten1.classList.add('animated');
     }
   
     if(val == '') {
       lighten2.classList.remove('faa-tada');
       lighten2.classList.remove('animated');
     } else {
       lighten2.classList.add('faa-tada');
       lighten2.classList.add('animated');
     }

     })
      .catch((err)=>{
      console.log(err);
       });
  });

  orderForm.addEventListener('change',(x)=>{
   x.preventDefault();
   supply.innerHTML = '';
  
   const search = document.querySelector('#search').value; 
   const val = document.querySelector('#val').value;
   const order = document.querySelector('#order').value;
   const params = ['search=',search,'&val=',val,'&order=',order]; 
   Main.postData('POST','HTTP/GET/supplier/supplierfetch.php',params)
   .then((data)=>{
     let d = JSON.parse(data);
     //////////console.log(d));
     const supply = document.querySelector('#supply');
     for(let i = 0; i < d.name.length;i++){
      if(d.id[i] == 0) {
        supply.innerHTML += `<tr class="table-default">
        <th scope="row" style="width:30%">${d.name[i]}</th>
        <td style="width:30.5%">${d.company[i]}</td>
        <td style="width:18%">${d.contact[i]}</td>
        <td style="width:25%">
          no search found
        </td>
      </tr>`
       } else {
        supply.innerHTML += `<tr class="table-default">
        <th scope="row" style="width:30%">${d.name[i]}</th>
        <td style="width:30.5%">${d.company[i]}</td>
        <td style="width:18%">${d.contact[i]}</td>
        <td style="width:25%">
        <i class="fas fa-edit text-danger faa-vertical animated-hover ml-2" onclick="Supplier.EditSupplier(${d.id[i]})"></i>
        <i class="fas fa-trash-alt faa-wrench animated-hover text-warning ml-2" onclick="Supplier.delSessId(${d.id[i]})" data-toggle="modal" data-target="#del"></i>
        <i class="fa fa-eye faa-pulse animated-hover text-info ml-2" onclick="Supplier.ShowSupplier(${d.id[i]})"></i>
        </td>
      </tr>`
       }
    }


     lighten3.classList.add('faa-vertical');
     lighten3.classList.add('animated');
 
     setTimeout(function(){
       lighten3.classList.remove('faa-vertical');
       lighten3.classList.remove('animated');
   
     },1000);

   })
   .catch((err)=>{
     console.log(err);
   });
  });

 }

 static DelModalSupplier(){
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
        <p>Are you sure you want to delete this item ?</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-warning" onclick="Supplier.DeleteSupplier()" data-dismiss="modal">Confirm</button>
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
      </div>
    </div>
  </div>`;
 }

 static DeleteSupplier(){
  let id = JSON.parse(sessionStorage.getItem('del_id'));
  let params = ["hid="+id.del];
  Main.postData('POST','HTTP/DELETE/supplier/supplierdelete.php',params)
  .then((data)=>{
    //console.log(d)ata);
    Supplier.fetchSupplier();
  })
  .catch((err)=>{
    console.log(err);
  })
 
 }

 static ShowSupplier(id){
  //console.log(id);
  body.innerHTML = '';
  let params = ["hid="+id];
  Main.postData('POST','HTTP/GET/supplier/showsupplier.php',params)
  .then((data)=>{
   let d = JSON.parse(data);
   ////console.log(d));
   body.innerHTML = `<br><br><br>
   <div class="text-info">
   <h1><b><center>Full Information</center></b></h1>
   <h4><b>Registrar: </b>${d.user_name}</h4>
   <h4><b>Supplier Name: </b>${d.first} ${d.last}</h4>
   <h4><b>Company: </b>${d.company}</h4>
   <h4><b>Contact: </b>${d.contact}</h4>
   <h4><b>Created at: </b>${d.created_at}</h4>
   <h4><b>Updated at: </b>${d.updated_at}</h4>
   <input type="button" class="col-12 btn btn-outline-secondary mt-2" onclick="Supplier.fetchSupplier()" value="Back">
   </div>`;
   //Supplier.fetchSupply();
  })
  .catch((err)=>{
    console.log(err);
  })

 }

 static EditSupplier(id){
  message.innerHTML = '';
  body.innerHTML = '';
  let params = ["hid="+id];
  Main.postData('POST','HTTP/GET/supplier/showsupplier.php',params)
  .then((data)=>{
    let d = JSON.parse(data);
    body.innerHTML = `
    <form id="updateSupplier" class="text-info">
    <center><h1><b>Add a supplier information</b></h1></center>
    <div class="form-group">
    <label for="exampleInputEmail1"><b>First Name</b></label>
    <input type="text" autocomplete="off" class="form-control" id="first" name="first" placeholder="Required a maximum of 30 value" value="${d.first}">
    </div>
    <div class="form-group">
    <label for="exampleInputEmail1"><b>Last Name</b></label>
    <input type="text" autocomplete="off" class="form-control" id="last" name="last" placeholder="Required a maximum of 30 value" value="${d.last}">
    </div>
    <div class="form-group">
    <label for="exampleInputEmail1"><b>Company Name</b></label>
    <input type="text" autocomplete="off" class="form-control" id="company" name="company" placeholder="Required a maximum of 30 value" value="${d.company}">
    </div>
    <div class="form-group">
    <label for="exampleInputEmail1"><b>Contact Number</b></label>
    <input type="text" autocomplete="off" class="form-control" id="contact" name="contact" placeholder="eg. 0926214112 exactly 11 value only" value="${d.contact}">
    </div>
    <input type="submit" class="mt-2 col-12 btn btn-outline-info" name="submit" value="Submit">
    <input type="button" class="mt-2 col-12 btn btn-outline-secondary" onclick="Supplier.fetchSupplier()" value="Back">
    </form>`;

    const updateSupplier = document.querySelector('#updateSupplier');

    updateSupplier.addEventListener('submit',function(x){
      x.preventDefault();
      //console.log('OK');
      Supplier.UpdateSupplier(id);
    });
  }
  ).catch((err)=>{
    console.log(err);
  });
 }

 static UpdateSupplier(id){
  let first = document.querySelector('#first').value;
  let last = document.querySelector('#last').value;
  let company = document.querySelector('#company').value;
  let contact = document.querySelector('#contact').value;

  let params = ['uid=',id,'&first=',first,'&last=',last,'&company=',company,'&contact=',contact];
  
  Main.postData('POST','HTTP/PUT/supplier/updatesupplier.php',params)
   .then((data)=>{
   //console.log(d)ata);
    if(data == 'success') {
      message.innerHTML = '';
      body.innerHTML = `<br><br>
      <br>
      <center><h1 class="text-info"><b>The supplier person was updated</b></h1></center>
        <input type="button" class="col-12 btn btn-outline-secondary mt-2" value="Back to the table" onclick="Supplier.fetchSupplier()">`;
      } else if(data == 'empty') {
        message.innerHTML = `<center><h3 class="text-danger"><b>Please fill out all the forms</b></h3></center>`;
      } 
      else if(data == 'cannot') {
        message.innerHTML = `<center><h3 class="text-danger"><b>Please do not include any special character or not required character in specific form</b></h3></center>`;
      } else if(data == 'count') {
        message.innerHTML = `<center><h3 class="text-danger"><b>Please follow the requirement of the fields</b></h3></center>`;
      }
    })
    .catch((err)=>{
      console.log(err);
    });
 }


 // Transaction

 static formSupplierTransac() {
  message.innerHTML = '';
  body.innerHTML = '';
  title.innerHTML = `<b>Transaction Section</b>`;
  body.innerHTML += `<br><br><br>
  <form id="searchSupply">
  <div class="form-group">
  <label for="exampleInputEmail1"><b>Search For Reference Name</b></label>
  <input type="search" class="form-control form-control-light bg-dark text-light" name="search" id="search" placeholder="Search..">
  </div>
  </form>`;
  body.innerHTML += `
  <form id="SuppTransac" class="text-light">

  <div class="form-group">
  <label for="exampleInputEmail1"><b>Supply ID</b></label>
  <input type="text" autocomplete="off" class="form-control form-control-light bg-dark text-light" id="supply_id" name="supply_id" placeholder="Required an exactly 5 value">
  </div>

  <div class="form-group">
  <label for="exampleInputEmail1"><b>Supplier's Name</b></label>
  <select class="form-control form-control-light bg-dark text-light" name="supply_name" id="supply_name">
  </select>
  </div>

  <div class="form-group">
  <label for="exampleInputEmail1"><b>Quantity</b></label>
  <input type="text" autocomplete="off" class="form-control form-control-light bg-dark text-light" id="quantity" name="quantity" placeholder="Required a maximum of 10 value">
  </div>

  <div class="form-group">
  <label for="exampleInputEmail1"><b>Unit Price</b></label>
  <input type="text" autocomplete="off" class="form-control form-control-light bg-dark text-light" id="unit_price" name="unit_price" placeholder="Required a maximum of 10 value">
  </div>

  <input type="submit" class="col-12 btn btn-outline-light" name="submit" value="Submit">
  </form>`;

  Main.getData('GET','HTTP/GET/supplier/suppliernamefetch.php')
  .then((data)=>{
    if(data == 'none'){
      body.innerHTML = '';
       body.innerHTML = `<br><br>
       <center><h1 class="text-danger"><b>Please add a supplier first to use the transaction section</b></h1></center>
      <input type="button" class="col-12 btn btn-outline-secondary mt-2" value="Redirect to supplier section" onclick="Supplier.formSupplierPerson()">`;

    } else {
      let list = JSON.parse(data);
      const supply_name = document.querySelector('#supply_name');
      for(let i = 0;i < list.name.length;i++) {
        supply_name.innerHTML += `<option value="${list.name[i]}">${list.name[i]}</option>`;
      }
    }
   });

    const SuppTransac = document.querySelector('#SuppTransac');
    const searchSupply = document.querySelector('#searchSupply');

    SuppTransac.addEventListener('submit',function(x){
      x.preventDefault();
      Supplier.supplyTransac();
    });


    searchSupply.addEventListener('keyup',function(x){
      x.preventDefault();
      const supply_id = document.querySelector('#supply_id');
      const search = document.querySelector('#search').value;
      if(search == ''){
        supply_id.value = '';
        return false;
      }

      let params = ['search=',search];
      Main.postData('POST','HTTP/GET/supplier/searchsupply.php',params)
      .then((data)=>{
        let d = JSON.parse(data);
        //console.log(d).supply_id);
        supply_id.value = d.supply_id;
      });
    });

    
    
 }

 static supplyTransac(){
  const supply_name = document.querySelector('#supply_name').value;
  const supply_id = document.querySelector('#supply_id').value;
  const quantity = document.querySelector('#quantity').value;
  const unit_price = document.querySelector('#unit_price').value;

  let params = ['supply_name=',supply_name,'&supply_id=',supply_id,
  '&quantity=',quantity,'&unit_price=',unit_price];

  Main.postData('POST','HTTP/POST/supplier/suppliertransac.php',params)
  .then((data)=>{
    //console.log(d)ata);
    if(data == 'success') {
      message.innerHTML = '';
      body.innerHTML = `<center><h1 class="text-light"><b>Transaction was finished</b></h1></center>
        <input type="button" class="col-12 btn btn-outline-secondary mt-2" value="Back to Supply ID" onclick="Supplier.formSupplierSupply()">`;
      // console.log(xhr.responseText);
      } else if(data == 'empty') {
        message.innerHTML = `<center><h3 class="text-danger"><b>Please fill out all the forms</b></h3></center>`;
      } 
      else if(data == 'cannot') {
        message.innerHTML = `<center><h3 class="text-danger"><b>Do not include any inappropriate characters</b></h3></center>`;
      } else if(data == 'taken') {
        message.innerHTML = `<center><h3 class="text-danger"><b>The value was taken</b></h3></center>`;
      } else if(data == 'count') {
        message.innerHTML = `<center><h3 class="text-danger"><b>Please follow the requirement of the field</b></h3></center>`;
      }
  })
  .catch((err)=>{
    console.log(err);
  })
 }
 
 static fetchTransac(){
  body.innerHTML = '';
  message.innerHTML = '';
  Supplier.DelModalTransac();
  title.innerHTML = `<b>Transaction Table</b>`;
  body.innerHTML += `<br><br>
  <div class="form-inline mb-3 mt-4">
  <form id="searchForm">
     <div class="form-group">
       <div class="input-group-addon bg"><i id="lighten1" class="text-info fas fa-search"></i></div>
       <input class="form-control border-info" type="text" autocomplete="off" name="search" id="search">

       <div class="input-group-addon bg ml-2"><i id="lighten2" class="text-info fas fa-database"></i></div>
       <input class="form-control border-info" type="text" autocomplete="off" name="val" id="val">
       </div>
       </form>

   <form id="orderForm">
   <div class="form-group">
       <div class="text-light input-group-addon ml-2"><i id="lighten3" class="text-info fas fa-sort"></i></div>
       <select class="form-control" id="order" name="order">
       <option value="DESC">DESCENDING ORDER</option>
       <option value="ASC">ASCENDING ORDER</option>
       </select>
   </div>
   </form>
  </div>

  <table class="table table-hover border-info">
  <thead>
    <tr class="table-info">
      <th scope="col">Transac ID</th>
      <th scope="col">Quantity</th>
      <th scope="col">Unit Price</th>
      <th scope="col">Date Issued</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody id="supply"></tbody>
  </table>`;

  const search = document.querySelector('#search').value; 
  const val = document.querySelector('#val').value;
  const order = document.querySelector('#order').value;
  const params = ['search=',search,'&val=',val,'&order=',order]; 

   Main.postData('POST','HTTP/GET/supplier/supplierfetchtransac.php',params)
    .then((data)=>{
     let d = JSON.parse(data);
     ////console.log(d));
     const supply = document.querySelector('#supply');
     for(let i = 0; i < d.supp_product_id.length;i++){
      if(d.id[i] == 0){
        supply.innerHTML += `<tr class="table-default">
        <th scope="row" style="width:17.5%">${d.supp_product_id[i]}</th>
        <td style="width:18.5%">${d.quantity[i]}</td>
        <td style="width:20%">${d.unit_price[i]}</td>
        <td style="width:22.5%">${d.created_at[i]}</td>
        <td style="width:22.5%">
        no search found
      </td>
    </tr>`
      } else {
        supply.innerHTML += `<tr class="table-default">
      <th scope="row" style="width:17.5%">${d.supp_product_id[i]}</th>
      <td style="width:18.5%">${d.quantity[i]}</td>
      <td style="width:20%">${d.unit_price[i]}</td>
      <td style="width:22.5%">${d.created_at[i]}</td>
      <td style="width:22.5%">
      <i class="fas fa-edit text-danger faa-vertical animated-hover ml-2" onclick="Supplier.EditTransac(${d.id[i]})"></i>
      <i class="fas fa-trash-alt faa-wrench animated-hover text-warning ml-2" onclick="Supplier.delSessId(${d.id[i]})" data-toggle="modal" data-target="#del"></i>
      <i class="fa fa-eye faa-pulse animated-hover text-info ml-2" onclick="Supplier.ShowTransac(${d.id[i]})"></i>
      </td>
    </tr>`
      }
      
    }
   });
   const searchForm = document.querySelector('#searchForm');
   const orderForm = document.querySelector('#orderForm');

  searchForm.addEventListener('keyup',(x)=>{
    x.preventDefault();
    supply.innerHTML = '';
    console.log('response');
    const search = document.querySelector('#search').value; 
    const val = document.querySelector('#val').value;
    const order = document.querySelector('#order').value;
    const params = ['search=',search,'&val=',val,'&order=',order]; 
    Main.postData('POST','HTTP/GET/supplier/supplierfetchtransac.php',params)
    .then((data)=>{
      let d = JSON.parse(data);
      const supply = document.querySelector('#supply');
      for(let i = 0; i < d.supp_product_id.length;i++){
        if(d.id[i] == 0){
          supply.innerHTML += `<tr class="table-default">
          <th scope="row" style="width:17.5%">${d.supp_product_id[i]}</th>
          <td style="width:18.5%">${d.quantity[i]}</td>
          <td style="width:20%">${d.unit_price[i]}</td>
          <td style="width:22.5%">${d.created_at[i]}</td>
          <td style="width:22.5%">
          no search found
        </td>
      </tr>`
        } else {
          supply.innerHTML += `<tr class="table-default">
          <th scope="row" style="width:17.5%">${d.supp_product_id[i]}</th>
          <td style="width:18.5%">${d.quantity[i]}</td>
          <td style="width:20%">${d.unit_price[i]}</td>
          <td style="width:22.5%">${d.created_at[i]}</td>
          <td style="width:22.5%">
        <i class="fas fa-edit text-danger faa-vertical animated-hover ml-2" onclick="Supplier.EditTransac(${d.id[i]})"></i>
        <i class="fas fa-trash-alt faa-wrench animated-hover text-warning ml-2" onclick="Supplier.delSessId(${d.id[i]})" data-toggle="modal" data-target="#del"></i>
        <i class="fa fa-eye faa-pulse animated-hover text-info ml-2" onclick="Supplier.ShowTransac(${d.id[i]})"></i>
        </td>
      </tr>`
        }
     }
    })
      .catch((err)=>{
      console.log(err);
       });
  });

  orderForm.addEventListener('change',(x)=>{
   x.preventDefault();
   supply.innerHTML = '';
  
   const search = document.querySelector('#search').value; 
   const val = document.querySelector('#val').value;
   const order = document.querySelector('#order').value;
   const params = ['search=',search,'&val=',val,'&order=',order]; 
   Main.postData('POST','HTTP/GET/supplier/supplierfetchtransac.php',params)
   .then((data)=>{
     let d = JSON.parse(data);
     const supply = document.querySelector('#supply');
     for(let i = 0; i < d.supp_product_id.length;i++){
      if(d.id[i] == 0){
        supply.innerHTML += `<tr class="table-default">
        <th scope="row" style="width:17.5%">${d.supp_product_id[i]}</th>
        <td style="width:18.5%">${d.quantity[i]}</td>
        <td style="width:20%">${d.unit_price[i]}</td>
        <td style="width:22.5%">${d.created_at[i]}</td>
        <td style="width:22.5%">
        no search found
      </td>
    </tr>`
      } else {
        supply.innerHTML += `<tr class="table-default">
        <th scope="row" style="width:17.5%">${d.supp_product_id[i]}</th>
        <td style="width:18.5%">${d.quantity[i]}</td>
        <td style="width:20%">${d.unit_price[i]}</td>
        <td style="width:22.5%">${d.created_at[i]}</td>
        <td style="width:22.5%">
      <i class="fas fa-edit text-danger faa-vertical animated-hover ml-2" onclick="Supplier.EditTransac(${d.id[i]})"></i>
      <i class="fas fa-trash-alt faa-wrench animated-hover text-warning ml-2" onclick="Supplier.delSessId(${d.id[i]})" data-toggle="modal" data-target="#del"></i>
      <i class="fa fa-eye faa-pulse animated-hover text-info ml-2" onclick="Supplier.ShowTransac(${d.id[i]})"></i>
      </td>
    </tr>`
      }
    }
   })
   .catch((err)=>{
     console.log(err);
   });
  });
 }

 static DelModalTransac(){
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
        <p>Are you sure you want to delete this item ?</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-warning" onclick="Supplier.DeleteTransac()" data-dismiss="modal">Confirm</button>
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
      </div>
    </div>
  </div>`;
 }

 static DeleteTransac(){
  let id = JSON.parse(sessionStorage.getItem('del_id'));
  let params = ["hid="+id.del];
  Main.postData('POST','HTTP/DELETE/supplier/transacdelete.php',params)
  .then((data)=>{
    //console.log(d)ata);
    Supplier.fetchTransac();
  })
  .catch((err)=>{
    console.log(err);
  })
 
 }
 
 static ShowTransac(id){
  //console.log(id);
  body.innerHTML = '';
  let params = ["hid="+id];
  Main.postData('POST','HTTP/GET/supplier/showtransac.php',params)
  .then((data)=>{
   let d = JSON.parse(data);
   ////console.log(d));
   body.innerHTML = `<br><br><br>
   <div class="text-info">
   <h1><b><center>Full Information</center></b></h1>
   <h4><b>Registrar: </b>${d.supp_user_name}</h4>
   <h4><b>Transaction ID: </b>${d.transac_id}</h4>
   <h4><b>Supply ID: </b>${d.supp_product_id}</h4>
   <h4><b>Supplier Name </b>${d.supp_person_name}</h4>
   <h4><b>Quantity: </b>${d.quantity}</h4>
   <h4><b>Unit Price: </b>₱ ${d.unit_price}</h4>
   <h4><b>Created at: </b>${d.created_at}</h4>
   <h4><b>Updated at: </b>${d.updated_at}</h4>
   <input type="button" class="col-12 btn btn-outline-secondary mt-2" onclick="Supplier.fetchTransac()" value="Back">
   </div>`; 
  })
  .catch((err)=>{
    console.log(err);
  })
 }

 static EditTransac(id){
  message.innerHTML = '';
  body.innerHTML = '';
  let params = ["hid="+id];
  Main.postData('POST','HTTP/GET/supplier/showtransac.php',params)
  .then((data)=>{
    let d = JSON.parse(data);
    ////console.log(d));
    //console.log(d).unit_price);
    body.innerHTML += `<form id="UpdateTransac" class="text-info">
  <center><h1><b>Edit Section</b></h1></center>
  
  <div class="form-group">
  <label for="exampleInputEmail1"><b>Supplier's Name</b></label>
  <select class="form-control" name="supply_name" id="supply_name">
  </select>
  </div>

  <div class="form-group">
  <label for="exampleInputEmail1"><b>Quantity</b></label>
  <input type="text" autocomplete="off" class="form-control" id="quantity" name="quantity" placeholder="Required a maximum of 10 value" value="${d.quantity}">
  </div>

  <div class="form-group">
  <label for="exampleInputEmail1"><b>Unit Price</b></label>
  <input type="text" autocomplete="off" class="form-control" id="unit_price" name="unit_price" placeholder="Required a maximum of 10 value" value="${d.unit_price}">
  </div>

  <input type="submit" class="mt-2 col-12 btn btn-outline-info" name="submit" value="Submit">
  <input type="button" class="mt-2 col-12 btn btn-outline-secondary" onclick="Supplier.fetchTransac()" value="Back">
  </form>`;

  Main.getData('GET','HTTP/GET/supplier/suppliernamefetch.php')
  .then((data)=>{
   let list = JSON.parse(data);
   const supply_name = document.querySelector('#supply_name');
   for(let i = 0;i < list.name.length;i++) {
     supply_name.innerHTML += `<option value="${list.id[i]}">${list.name[i]}</option>`;
   }
   });


    const UpdateTransac = document.querySelector('#UpdateTransac');

    UpdateTransac.addEventListener('submit',function(x){
      x.preventDefault();
      console.log('OK');
      Supplier.UpdateTransac(id);
    });
  }).catch((err)=>{
    console.log(err);
  });

  /*  */
 }

 static UpdateTransac(id){
  const supply_name = document.querySelector('#supply_name').value;
  const quantity = document.querySelector('#quantity').value;
  const unit_price = document.querySelector('#unit_price').value;

  let params = ['uid=',id,'&supply_name=',supply_name,
  '&quantity=',quantity,'&unit_price=',unit_price];
  console.log(unit_price);
  Main.postData('POST','HTTP/PUT/supplier/updatetransac.php',params)
  .then((data)=>{
    //console.log(d)ata);
    if(data == 'success') {
      message.innerHTML = '';
      body.innerHTML = `<center><h1 class="text-info"><b>Transaction was updated</b></h1></center>
        <input type="button" class="col-12 btn btn-outline-secondary mt-2" value="Back to supply transaction table" onclick="Supplier.fetchTransac()">`;
      // console.log(xhr.responseText);
      } else if(data == 'empty') {
        message.innerHTML = `<center><h3 class="text-danger"><b>Please fill out all forms</b></h3></center>`;
      } 
      else if(data == 'cannot') {
        message.innerHTML = `<center><h3 class="text-danger"><b>Some of the field not required to put special characters or not related to field</b></h3></center>`;
      } else if(data == 'not exist') {
        message.innerHTML = `<center><h3 class="text-danger"><b>The supply id is invalid</b></h3></center>`;
      } else if(data == 'count') {
        message.innerHTML = `<center><h3 class="text-danger"><b>Please follow the requirement of the fields</b></h3></center>`;
      }
  })
  .catch((err)=>{
    console.log(err);
  })
 }

}

class Inventory {
  static MainInventory() {
    const body = document.querySelector('#body');
    const options = document.querySelector('#options');
    const message = document.querySelector('#message');
    const inventory = document.querySelector('#inventory');
    const category = document.querySelector('#category');
    const fetchs = document.querySelector('#fetchs');

    const title = document.querySelector('#title');

    mainElement.innerHTML = `<div class="card border-warning mb-3" style="max-width: 54rem;">
    <div class="card-header bg-warning-opacity">
    <i class="float-right mt-3 ml-4 fas text-dark fa-times-circle fa-2x " onclick="Main.closeAll()"></i>
    <i  id="fetchs" class="float-right mt-3 ml-4 fas text-success fas fas fa-table faa-fast fa-2x" onclick="Supplier.FetchingSupply()"></></i>
    <i id="category" class="float-right mt-3 ml-4 fas text-info fas fa-th-list fa-2x" onclick="Inventory.BtnCategory()"></i>
    <i id="inventory" class="float-right mt-3 ml-4 fas text-primary fas fa-cube fa-2x" onclick="Inventory.BtnInventory()"></i>
    <h1 id="title" class="text-dark"><b> Inventory Section</b></h1>
    <small class="float-right text-dark mr-2 ml-4"><b>Close</b></small>
    <small class="float-right text-success mr-2 ml-1"><b>Table</b></small>
    <small class="float-right text-info mr-3"><b>Category</b></small>
    <small class="float-right text-primary mr-3"><b>Inventory</b></small>
    </div>

    <div class="card-body text-light">
    <div class="card text-white bg-dark-opacity text-light mt-2 mb-2" style="max-width: 54rem;">
    <div class="card-body">
    <div id="message" class="mb-2"></div>
    <div class="mb-1 mt-1" id="options"></div>
    <div id="body"></div>
    </div>
    </div>
    </div>
    </div>`;
  }

  static BtnCategory() {
    options.innerHTML = '';
    body.innerHTML = '';
    message.innerHTML = '';
    Inventory.formCategory();
  
    inventory.classList.remove('faa-bounce')
    inventory.classList.remove('animated');
 
    category.classList.add('faa-horizontal');
    category.classList.add('animated');
 
    fetchs.classList.remove('faa-pulse');
    fetchs.classList.remove('animated');
  }

  static BtnInventory() {
    options.innerHTML = '';
    body.innerHTML = '';
    message.innerHTML = '';
    Inventory.formInventory();
    options.innerHTML =  `<div onclick="Inventory.formInventory()" class="float-left form-inline text-primary">
   <button class="btn btn-outline-primary mr-2"><i class="fas fa-registered"> Register</i></h5></button>
   </div>
   
   <div onclick="Inventory.formStock()" class="float-left form-inline text-primary">
   <button class="btn btn-outline-primary mr-2"><i class="fas fa-archive""> Add stock</i></h5></button>
   </div>`
    ;
  
    inventory.classList.add('faa-bounce')
    inventory.classList.add('animated');
 
    category.classList.remove('faa-horizontal');
    category.classList.remove('animated');
 
    fetchs.classList.remove('faa-pulse');
    fetchs.classList.remove('animated');
  
  }


  // Category 
  static formCategory(){
    message.innerHTML = '';
    body.innerHTML = '';
    title.innerHTML = `<b>Add Category</b>`;
    body.innerHTML = `
    <form id="createCategory" class="text-info">
    <div class="form-group">
    <label for="exampleInputEmail1"><b>Category Name</b></label>
    <input type="text" autocomplete="off" class="form-control form-control-info text-info bg-dark" id="category_name" name="category_name" placeholder="Required a maximun of 25 value">
    </div>
    <input type="submit" class="col-12 btn btn-outline-info" name="submit" value="Submit">
    </form>`;
    const createCategory = document.querySelector('#createCategory');

    createCategory.addEventListener('submit',function(x){
      x.preventDefault();
      console.log('Ok');
      Inventory.createCategory();
    });
  }

  static createCategory(){
      let category_name = document.querySelector('#category_name').value;
      let params = ['category_name=',category_name];
      Main.postData('POST','HTTP/POST/inventory/category.php',params)
      .then((data)=>{
        if(data == 'success') {
          message.innerHTML = '';
          body.innerHTML = `<center><h1 class="text-info"><b>New category was added</b></h1></center>
            <input type="button" class="col-12 btn btn-outline-secondary mt-2" value="Back to Supply ID" onclick="Inventory.formCategory()">`;
          
          } else if(data == 'empty') {
            message.innerHTML = `<center><h3 class="text-danger"><b>Please fill out all the forms</b></h3></center>`;
          } 
          else if(data == 'cannot') {
            message.innerHTML = `<center><h3 class="text-danger"><b>Do not include any inappropriate characters</b></h3></center>`;
          } else if(data == 'taken') {
            message.innerHTML = `<center><h3 class="text-danger"><b>The value was taken</b></h3></center>`;
          } else if(data == 'count') {
            message.innerHTML = `<center><h3 class="text-danger"><b>Please follow the requirement of the field</b></h3></center>`;
          }
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  //Inventory
  static formInventory(){
    message.innerHTML = '';
    body.innerHTML = '';
    title.innerHTML = `<b>Register</b>`;
    body.innerHTML = `<br><br><br>
            <div class="form-group text-primary mb-4">
            <h5><b>Supply ID(not assigned)</b></h5>
            <select class="form-control bg-dark text-primary" id="getSupply">
            </select>
            </div>

            <div class="form-group">
         
            </div>
            </div>

        </div>
 
  
            <form id="inventoryForm" class="text-primary">
              <div class="row">

              <div class="col-6">

            <div class="form-group">
            <label for="exampleInputEmail1"><b>Supply ID</b></label>
            <input type="text" autocomplete="off" class="bg-dark text-primary form-control" name="supply_id" id="supply_id">
            </div>

            <div class="form-group">
            <label for="exampleInputEmail1"><b>Select Category</b></label>
            <select class="bg-dark text-primary form-control" id="getCategory" name="getCategory">
            </select>
            </div>

            <div class="form-group">
            <label for="exampleInputEmail1"><b>Product Code</b></label>
            <input class="bg-dark text-primary form-control" type="text" autocomplete="off" name="code" id="code" value="">
            </div>

            <div class="form-group">
            <label for="exampleInputEmail1"><b>Product Name</b></label>
            <input class="form-control bg-dark text-primary" type="text" autocomplete="off" name="name" id="name" value="">
            </div>
          
          </div>

          <div class="col-6 text-primary">

            <div class="form-group">
            <label for="exampleInputEmail1"><b>Product Description</b></label>
            <textarea class="form-control bg-dark text-primary" name="description" id="description" style="height:123px;"></textarea>
            </div>

            <div class="form-group">
            <label for="exampleInputEmail1"><b>Product Price</b></label>
            <input class="form-control bg-dark text-primary" type="text" autocomplete="off" name="price" id="price" value="">
            </div>

            <div class="form-group">
            <label for="exampleInputEmail1"><b>Put a Stock</b></label>
            <input class="form-control bg-dark text-primary" type="text" name="inv_stock" id="inv_stock" min="0">
            </div>

            </div> 
            <input type="submit" class="btn btn-outline-primary col-11 m-auto" id="btnSub" name="submit" value="Submit">
            </div>
            </form>`;

      const btnSub = document.querySelector('#btnSub');

      Main.getData('GET','HTTP/GET/inventory/getsupplynotassigned.php')
      .then((data)=>{
        let d = JSON.parse(data);
        //console.log(d).id);
        if(d.id == 0){
          btnSub.disabled = true;
          message.innerHTML = `<center><h1 class="text-warning"><b>
          Add supply id in supply section that not assigned in the inventory
          </b></h1></center>
          <input type="button" class="btn btn-outline-warning col-12 mt-2" onclick="Main.RedirectSupply()" value="redirect to supply section">`;
        } else {
          //////console.log(d));
          const getSupply = document.querySelector('#getSupply');
          const inv_stock = document.querySelector('#inv_stock');
          const supply_id = document.querySelector('#supply_id');
          const name = document.querySelector('#name');
          const getCategory = document.querySelector('#getCategory');

          let output = '';
          output += `<option value="0">None</option>`;
          for(let i =0; i < d.supply_id.length;i++){
            output += `<option value="${d.id[i]}">${d.supply_id[i]}</option>`;
          }
          
          inv_stock.placeholder = `Max stock(None)`;
          getSupply.innerHTML = output;
          getCategory.innerHTML = `<option value="0">None</option>`;
          getSupply.addEventListener('change',(x)=>{
            x.preventDefault();

            let i = d.id.indexOf(getSupply.value);
            if(i == -1){
              inv_stock.placeholder = `Max stock(None)`;
              supply_id.value = '';
              name.value = '';
              getCategory.innerHTML = `<option value="0">None</option>`;
            } else {
              supply_id.value = d.supply_id[i];
              inv_stock.placeholder = `Max stock(${d.stock[i]})`;
              name.value = d.ref_name[i];

              Main.getData('GET','HTTP/GET/inventory/getcategory.php')
              .then((data)=>{
                getCategory.innerHTML = '';
                let d = JSON.parse(data);
                for(let i = 0; i < d.category_id.length;i++){
                  getCategory.innerHTML += `<option value="${d.category_id[i]}">${d.category_name[i]}</option>`;
                }
                //////console.log(d));
              }).catch((err)=>{
                console.log(err);
              });

            }
          });
        }
 
      })
      .catch((err)=>{
        console.log(err);
      });      

  

      inventoryForm.addEventListener('submit',function(x){
        x.preventDefault();
        console.log('Ok');
       Inventory.createInventory();
      });
     

  }

  static createInventory(){
    const supply_id = document.querySelector('#supply_id').value;
    const category_id = document.querySelector('#getCategory').value;
    const code = document.querySelector('#code').value;
    const name = document.querySelector('#name').value;
    const description = document.querySelector('#description').value;
    const price = document.querySelector('#price').value;
    const inv_stock = document.querySelector('#inv_stock').value;

    let params = ['supply_id=',supply_id,
    '&getCategory=',category_id,'&code=',code,
    '&name=',name,'&description=',description,
    '&price=',price,'&inv_stock=',inv_stock
    ];

    Main.postData('POST','HTTP/POST/inventory/inventory.php',params)
    .then((data)=>{
      //console.log(d)ata);
      if(data == 'success') {
        message.innerHTML = '';
        body.innerHTML = `<center><h1 class="text-primary"><b>Successfully Added</b></h1></center>
          <input type="button" class="col-12 btn btn-outline-secondary mt-2" value="Back to inventory section" onclick="Inventory.formInventory()">`;
        } else if(data == 'empty') {
          message.innerHTML = `<center><h3 class="text-danger"><b>Please fill out all the forms</b></h3></center>`;
        } 
        else if(data == 'cannot') {
          message.innerHTML = `<center><h3 class="text-danger"><b>Do not include any inappropriate characters</b></h3></center>`;
        } else if(data == 'taken') {
          message.innerHTML = `<center><h3 class="text-danger"><b>The value was taken</b></h3></center>`;
        } else if(data == 'count') {
          message.innerHTML = `<center><h3 class="text-danger"><b>Please follow the requirement of the field</b></h3></center>`;
        } else if(data == 'enough') {
          message.innerHTML = `<center><h3 class="text-danger"><b>The supply stock is not enough</b></h3></center>`;
        }
        
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  static formStock(){
    message.innerHTML = '';
    body.innerHTML = '';
    title.innerHTML = `<b>Stock Section</b>`;
    body.innerHTML = `<br><br><br>
            <div class="form-group text-primary mb-4">
            <h5><b>Supply ID(assigned)</b></h5>
            <select class="form-control bg-dark text-primary" id="getSupply" name="getSupply">
            </select>
            </div>

        </div>
 
            <div class="form-group text-primary">
              <label for="exampleInputEmail1"><b>Reference Name</b></label>
              <h5 id="ref_name"></h5>
            </div>
            <form id="stockForm" class="text-primary">

            <div class="form-group">
              <label for="exampleInputEmail1"><b>Increase/Decrease</b></label>
              <select class="bg-dark text-primary form-control" id="operator" name="operator">
                <option value="">None</option>
                <option value="increase">Increase</option>
                <option value="decrease">Decrease</option>
              </select>
            </div>

              <div class="form-group">
                <label for="exampleInputEmail1"><b>Value of Stock</b></label>
                <input type="text" autocomplete="off" class="bg-dark text-primary form-control" name="stock" id="stock" placeholder="Max stock(None)">
              </div>
  
              <input type="submit" class="btn btn-outline-primary col-12 mt-2" name="submit" value="Submit">

            </form>`;

      Main.getData('GET','HTTP/GET/inventory/getsupplyassigned.php')
      .then((data)=>{
        let d = JSON.parse(data);
        //console.log(d).id);
        if(d.id == 0){
          message.innerHTML = `<center><h1 class="text-warning"><b>
          Register product first in Inventory Section
          </b></h1></center>
          <input type="button" class="btn btn-outline-warning col-12 mt-2" onclick="Inventory.formInventory()" value="redirect to inventory section">`;
        } else {
          ////console.log(d));
          const getSupply = document.querySelector('#getSupply');
          const stock = document.querySelector('#stock');
          const ref_name = document.querySelector('#ref_name');
          

          let output = '';
          output += `<option value="">None</option>`;
          for(let i =0; i < d.supply_id.length;i++){
            output += `<option value="${d.supply_id[i]}">${d.supply_id[i]}</option>`;
          }
          
          getSupply.innerHTML = output;
        //  stock.placeholder = `Max stock(None)`;
          ref_name.innerHTML = `None`;
          stock.disabled = true;
          stock.value = '';

          getSupply.addEventListener('change',(x)=>{
            x.preventDefault();
            const operator = document.querySelector('#operator');
            let i = d.supply_id.indexOf(getSupply.value);
            if(i == -1){
              stock.placeholder = `Max supply stock(None)`;
              ref_name.innerHTML = `None`;
            } else {
             // stock.placeholder = `Max stock(None)`;

             if(operator.value == ''){
              //   stock.disabled = true;
               }
               else if(operator.value == 'increase'){
               //  stock.disabled = false;
                 stock.placeholder = `Max supply stock(${d.stock[i]})`;
               } else if(operator.value == 'decrease'){
              //   stock.disabled = false;
                 stock.placeholder = `Max inventory stock(${d.inv_stock[i]})`;
               }
              
              operator.addEventListener('change',(x)=>{
                x.preventDefault();
        
                if(operator.value == ''){
                 stock.disabled = true;
                 stock.value = '';
                 stock.placeholder = `Max stock(None)`;
                }
                else if(operator.value == 'increase'){
                  stock.disabled = false;
                  stock.placeholder = `Max supply stock(${d.stock[i]})`;
                } else if(operator.value == 'decrease'){
                  stock.disabled = false;
                  stock.placeholder = `Max inventory stock(${d.inv_stock[i]})`;
                }
              })
              ref_name.innerHTML = d.ref_name[i];
            }
          })
        }
      })
      .catch((err)=>{
        console.log(err);
      });

      

      const stockForm = document.querySelector('#stockForm');
      stockForm.addEventListener('submit',function(x){
      x.preventDefault();
      //console.log('Ok');
      Inventory.updateStock();
      });
     

  }

  static updateStock(){
    const supply_id = document.querySelector('#getSupply').value;
    const stock = document.querySelector('#stock').value;
    const operator = document.querySelector('#operator').value;

    let params = ['getSupply=',supply_id,
    '&operator=',operator,'&stock=',stock
    ];

    Main.postData('POST','HTTP/POST/inventory/updatestock.php',params)
    .then((data)=>{
      //console.log(d)ata);
      if(data == 'success') {
        message.innerHTML = '';
        body.innerHTML = `<center><h1 class="text-primary"><b>Successfully Sumbit</b></h1></center>
          <input type="button" class="col-12 btn btn-outline-secondary mt-2" value="Back to stock section" onclick="Inventory.formStock()">`;
        } else if(data == 'empty') {
          message.innerHTML = `<center><h3 class="text-danger"><b>Please fill out all the forms</b></h3></center>`;
        } 
        else if(data == 'cannot') {
          message.innerHTML = `<center><h3 class="text-danger"><b>Do not include any inappropriate characters</b></h3></center>`;
        } else if(data == 'taken') {
          message.innerHTML = `<center><h3 class="text-danger"><b>The value was taken</b></h3></center>`;
        } else if(data == 'count') {
          message.innerHTML = `<center><h3 class="text-danger"><b>Please follow the requirement of the field</b></h3></center>`;
        } else if(data == 'enough') {
          message.innerHTML = `<center><h3 class="text-danger"><b>The supply stock is not enough</b></h3></center>`;
        }
        
    })
    .catch((err)=>{
      console.log(err);
    })
  }
}





// Button 
btnTodo.addEventListener('click',function(x){
  x.preventDefault();
  if(bolTodo) {
    Todo.MainTodo();
    bolTodo = false;
    bolSupplier = true;
    bolInventory = true;
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
    bolInventory = true;
  } else {
    mainElement.innerHTML = '';
    bolSupplier = true;
  }
})

btnInventory.addEventListener('click',function(x){
  x.preventDefault();
  if(bolInventory) {
    Inventory.MainInventory();
    bolInventory = false;
    bolSupplier = true;
    bolTodo = true;
  } else {
    mainElement.innerHTML = '';
    bolInventory = true;
  }
})


