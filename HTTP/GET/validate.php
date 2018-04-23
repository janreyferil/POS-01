<?php 

    if(isset($_GET['home'])) {
        $home = $_GET['home'];
        if($home == 'empty') {
            echo '<div class="card border-warning text-warning form-control mb-3" id="cross">
            <button type="button" id="closer" class="close text-warning" style="position:absolute;"><b><i class="fas fa-times-circle mt-2"></i></b></button>
            <h4 class="alert-heading ml-5 mt-2">Please fill up all the forms</h4>
          </div>';
        } elseif($home == 'mismatch') {
            echo '<div class="card border-warning text-warning form-control mb-3" id="cross">
            <button type="button" id="closer"  class="close text-warning" style="position:absolute;"><b><i class="fas fa-times-circle mt-2"></i></b></button>
            <h4 class="alert-heading ml-5 mt-2">Please put a letter only in the name fields</h4>
          </div>';
        } elseif($home == 'username') {
            echo '<div class="card border-warning text-warning form-control mb-3" id="cross">
            <button type="button" id="closer"  class="close text-warning" style="position:absolute;"><b><i class="fas fa-times-circle mt-2"></i></b></button>
            <h4 class="alert-heading ml-5 mt-2">Incorrect Username</h4>
          </div>';
        } elseif($home == 'password') {
            echo '<div class="card border-warning text-warning form-control mb-3" id="cross">
            <button type="button" id="closer" class="close text-warning" style="position:absolute;"><b><i class="fas fa-times-circle mt-2"></i></b></button>
            <h4 class="alert-heading ml-5 mt-2">Incorrect Password</h4>
          </div>';
        } elseif($home == 'success') {
            echo '<div class="card border-light text-light form-control mb-3" id="cross">
            <button type="button" id="closer" class="close text-light" style="position:absolute;"><b><i class="fas fa-times-circle mt-2"></i></b></button>
            <h4 class="alert-heading ml-5 mt-2">You are successfully log in</h4>
          </div>';
        } elseif($home == 'taken') {
          echo '<div class="card border-warning text-warning form-control mb-3" id="cross">
          <button type="button" id="closer" class="close text-warning" style="position:absolute;"><b><i class="fas fa-times-circle mt-2"></i></b></button>
          <h4 class="alert-heading ml-5 mt-2">The username has been taken</h4>
        </div>';
      } elseif($home == 'credential') {
        echo '<div class="card border-warning text-warning form-control mb-3" id="cross">
        <button type="button" id="closer"  class="close text-warning" style="position:absolute;"><b><i class="fas fa-times-circle mt-2"></i></b></button>
        <h4 class="alert-heading ml-5 mt-2">The credential did not matched</h4>
      </div>';
    } elseif($home == 'signup') {
      echo '<div class="card border-warning text-warning form-control mb-3" id="cross">
      <button type="button" id="closer"  class="close text-warning" style="position:absolute;"><b><i class="fas fa-times-circle mt-2"></i></b></button>
      <h4 class="alert-heading ml-5 mt-2">You are now registered, you can log in now</h4>
    </div>';
  } 
    
    }

?>