<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
  <div id="know"></div>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarColor02">
    <ul class="navbar-nav mr-auto noselect">
    <li class="nav-item active text-white ">
    <i id="btnTodo" class="fas fa-clipboard-list fa-2x ml-5 mt-2 faa-wrench animated-hover"></i>
    <br>
      <small class="ml-5 noselect"><b>Todo</b></small>
     </li>
      <li class="nav-item active text-primary">
      <i id="btnSupplier" class="fas fa-truck fa-2x mt-2 ml-5 faa-horizontal animated-hover"></i>
      <br>
      <small class="ml-5 noselect"><b>Supplier</b></small>
      </li>

      <li class="nav-item active text-warning">
      <i class="fas fa-box-open fa-2x mt-2 ml-5 faa-pulse animated-hover"></i>
      <br>
      <small class="ml-5"><b>Inventory</b></small>
      </li>

      </li>
      <li class="nav-item active text-danger">
     <i class="fas fa-shopping-cart fa-2x mt-2 ml-5 faa-vertical animated-hover"></i>
      <br>
      <small class="ml-5"><b>Transaction</b></small>
      </li>
      <li class="nav-item">

       <li class="nav-item active text-info">
     <i class="fas fa-chart-line fa-2x mt-2 ml-5 faa-flash animated-hover faa-fast"></i>
      <br>
      <small class="ml-5"><b>Chart</b></small>
      </li>
    
        
    </ul>
    <div class="form-inline my-2 my-lg-0">
    <button class="btn btn-outline-success ml-2" id="user"><i class="fas fa-cog faa-spin animated faa-slow mr-2 mb-1"></i>Account Setting</button>
    <form action="HTTP\POST\users\logout.php" method="POST">
    <button class="btn btn-outline-success ml-2" type="submit" name="logout"><i class="fas fa-sign-out-alt faa-passing animated mr-3 mb-1"></i> Log out</button>
    </form>
    </div>
  </div>
</nav>