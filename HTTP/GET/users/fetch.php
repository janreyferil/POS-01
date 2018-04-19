<?php



  if(!isset($_SESSION['u_id']) && !isset($_SESSION['a_id'])) {
      header('Location: ../../../');
      exit();
  } else {
    require_once 'Process/model.php';

    $data = new UserModel();
    $arr = $data->modelFetch();
    $username = $arr[0];
  }


    
