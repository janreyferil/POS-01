<?php


require_once '../../../Process/model.php';

if(!isset($_POST['signup'])) {
    header("Location: ../../../admin.php");
    exit();
} else {
    $uid = $_POST['uid'];
    $pwd = $_POST['pwd'];
    $cred = $_POST['cred'];
    $fn = ucwords($_POST['fn']);
    $ln = ucwords($_POST['ln']);
    $role = 'user';

    if(empty($fn) || empty($ln) || empty($uid) || empty($pwd) || empty($cred)) {
        header("Location: ../../../?home=empty");
        exit();
    }else {
        if(!preg_match("/[A-Za-z ]+/",$fn) || !preg_match("/[A-Za-z0-9]+/",$ln)) {
            header("Location: ../../../?home=mismatch");
            exit();
        } else {
            $data = new UserModel();
            $data->modelRegisUser($uid,$pwd,$role,$cred,$fn,$ln);
        }
      
    }
}