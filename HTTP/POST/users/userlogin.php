<?php

if(!isset($_POST['ulogin'])) {
    header('Location: ../../../');
    exit(); 


} else {
    session_start();

    require_once '../../../Process/model.php';
    $uid = $_POST['uid'];
    $pwd = $_POST['pwd'];
    
    if(empty($uid) || empty($pwd)) {
        header('Location: ../../../?home=empty');
        exit();  
    } else {

    $data = new UserModel();
    $data->modelLoginUser($uid,$pwd);
    }
}