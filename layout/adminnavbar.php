<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
  <div id="know"></div>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarColor02">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
      <div id="userlogbook" class="form-inline text-success">
      <i class="fas fa-book faa-wrench animated ml-5 mr-2 mb-1"></i><h5 class="noselect mt-1">User Logbook</h5>
      </div>
      </li>
      <li class="nav-item">
      <div id="adminlogbook" class="form-inline text-success">
      <i class="fas fa-book faa-wrench animated ml-3 mr-2 mb-1"></i><h5 class="noselect mt-1">Admin Logbook</h5>
      </div>
      </li>
      <li class="nav-item">
      
      </li>
      <li class="nav-item">
        
    </ul>
    <div class="form-inline my-2 my-lg-0">
    <button class="btn btn-outline-success ml-2" id="admin"><i class="fas fa-cog faa-spin animated faa-slow mr-2 mb-1"></i>Account Setting</button>
    <form action="HTTP\POST\users\logout.php" method="POST">
    <button class="btn btn-outline-success ml-2" type="submit" name="logout"><i class="fas fa-sign-out-alt faa-passing animated mr-3 mb-1"></i> Log out</button>
    </form>
    </div>
  </div>
</nav>