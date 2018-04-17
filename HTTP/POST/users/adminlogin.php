<?php

if(!isset($_POST['alogin'])) {
    header('Location: ../../../');
    exit(); 
} else {
    session_start();
    require_once '../../../Process/model.php';
    
    $uid = $_POST['uid'];
    $pwd = $_POST['pwd'];

    $data = new UserModel();
    $data->modelLoginAdmin($uid,$pwd);
}
