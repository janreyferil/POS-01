<?php

  if(!isset($_POST['credential'])) {
      header('Location: ../../../');
      exit(); 
  } else {
    session_start();
    require_once '../../../Process/model.php';
    $confcred = $_POST['confcred'];
    $newcred = $_POST['newcred'];
    $data = new UserModel();
    $arr = $data->modelSettingCredential($confcred,$newcred);
  }
