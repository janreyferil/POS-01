<?php 

    if(isset($_GET['home'])) {
        $home = $_GET['home'];
        if($home == 'empty') {
            echo '<div class="card border-success form-control mb-3" id="cross">
            <button type="button" class="close text-success" style="position:absolute;"><b><i class="fas fa-times-circle mt-2"></i></b></button>
            <h4 class="alert-heading ml-5 mt-2 text-success">Please fill up all the forms</h4>
          </div>';
        } elseif($home == 'mismatch') {
            echo '<div class="card border-success form-control mb-3" id="cross">
            <button type="button" class="close text-success" style="position:absolute;"><b><i class="fas fa-times-circle mt-2"></i></b></button>
            <h4 class="alert-heading ml-5 mt-2 text-success">Please put a letter only in the name fields</h4>
          </div>';
        } elseif($home == 'username') {
            echo '<div class="card border-success form-control mb-3" id="cross">
            <button type="button" class="close text-success" style="position:absolute;"><b><i class="fas fa-times-circle mt-2"></i></b></button>
            <h4 class="alert-heading ml-5 mt-2 text-success">Incorrect Username</h4>
          </div>';
        } elseif($home == 'password') {
            echo '<div class="card border-success form-control mb-3" id="cross">
            <button type="button" class="close text-success" style="position:absolute;"><b><i class="fas fa-times-circle mt-2"></i></b></button>
            <h4 class="alert-heading ml-5 mt-2 text-success">Incorrect Password</h4>
          </div>';
        } elseif($home == 'success') {
            echo '<div class="card border-info form-control mb-3" id="cross">
            <button type="button" class="close text-info" style="position:absolute;"><b><i class="fas fa-times-circle mt-2"></i></b></button>
            <h4 class="alert-heading ml-5 mt-2 text-info">You are successfully log in</h4>
          </div>';
        } elseif($home == 'taken') {
          echo '<div class="card border-info form-control mb-3" id="cross">
          <button type="button" class="close text-info" style="position:absolute;"><b><i class="fas fa-times-circle mt-2"></i></b></button>
          <h4 class="alert-heading ml-5 mt-2 text-info">The username has been taken</h4>
        </div>';
      } elseif($home == 'credential') {
        echo '<div class="card border-info form-control mb-3" id="cross">
        <button type="button" class="close text-info" style="position:absolute;"><b><i class="fas fa-times-circle mt-2"></i></b></button>
        <h4 class="alert-heading ml-5 mt-2 text-info">The credential did not matched</h4>
      </div>';
    } elseif($home == 'signup') {
      echo '<div class="card border-info form-control mb-3" id="cross">
      <button type="button" class="close text-info" style="position:absolute;"><b><i class="fas fa-times-circle mt-2"></i></b></button>
      <h4 class="alert-heading ml-5 mt-2 text-info">You are now registered, you can log in now</h4>
    </div>';
  } 
    
    }

?>