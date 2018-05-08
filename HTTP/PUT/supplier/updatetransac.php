<?php

if(!isset($_POST['quantity'])) {
    header('Location: ../../../');
    exit(); 
} else {
    session_start();
    require_once '../../../Process/model.php';
    $supply_name = $_POST['supply_name'];
    $id = $_POST['uid'];
    $quantity = $_POST['quantity'];
    $unit_price = $_POST['unit_price'];
    if(empty($quantity) || empty($unit_price)) {
        echo 'empty';
        exit();
    } else {
        if(!preg_match("/[0-9]+/",$quantity) || !preg_match("/[0-9.]+/",$unit_price)) {
         echo 'cannot';
         exit();
        }  else {
            if(strlen($quantity) > 10 || strlen($unit_price) > 10) {
                echo 'count';
                exit();
            } else {
                $data = new SupplierModel();
                $data->modelUpdateTransaction($id,$supply_name,$quantity,$unit_price);
            }
        }
    }
}