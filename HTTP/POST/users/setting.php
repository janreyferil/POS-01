<?php

if(!isset($_POST['update'])) {
    header('Location: ../../../');
    exit(); 
}  else {
    session_start();
    require_once '../../../Process/model.php';
    $uid = $_POST['uid'];
    $cpwd = $_POST['cpwd'];
    $npwd = $_POST['npwd'];
    $data = new UserModel();
    $arr = $data->modelSetting($uid,$cpwd,$npwd);
}


