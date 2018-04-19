<?php

  if(!isset($_POST['credential'])) {
      header('Location: ../../../');
      exit(); 
  } else {
    session_start();
    require_once '../../../Process/model.php';
    $confcred = $_POST['confcred'];
    $newcred = $_POST['newcred'];
    
    if(empty($newcred ) || empty($confcred)) {
      header('Location: ../../../admin.php?home=empty');
      exit();
    } else {
      $data = new UserModel();
      $arr = $data->modelSettingCredential($confcred,$newcred);
    }
  }
