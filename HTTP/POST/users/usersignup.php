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
    if(empty($uid) || empty($pwd)) {
        header("Location: ../../../admin.php?signup=empty");
        exit();
    } else {
        $data = new UserModel();
        $data->modelRegisUser($uid,$pwd,$role,$cred,$fn,$ln);
    }
}