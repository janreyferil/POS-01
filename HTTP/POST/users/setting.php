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

    if(empty($uid) || empty($cpwd) || empty($npwd)) {
        if(!isset($_SESSION['u_id'])) {
            header('Location: ../../../admin.php?home=empty');
            exit();
        } elseif(!isset($_SESSION['a_id'])) {
           header('Location: ../../../user.php?home=empty');
           exit();
        }
    } else {
        $data = new UserModel();
        $arr = $data->modelSetting($uid,$cpwd,$npwd);
    }
}


