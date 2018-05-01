<?php

if(!isset($_POST['supply_id'])) {
    header('Location: ../../../');
    exit(); 
} else {
    session_start();
    require_once '../../../Process/model.php';
    $supply_name = $_POST['supply_name'];
    $supply_id = $_POST['supply_id'];
    $quantity = $_POST['quantity'];
    $unit_price = $_POST['unit_price'];
    if(empty($supply_id) || empty($quantity) || empty($unit_price)) {
        echo 'empty';
        exit();
    } else {
        if(!preg_match("/[A-Za-z0-9]+/",$supply_id) || !preg_match("/[0-9]+/",$quantity) || !preg_match("/[0-9.]+/",$unit_price)) {
         echo 'cannot';
         exit();
        }  else {
            if(strlen($supply_id) != 5 || strlen($quantity) > 10 || strlen($unit_price) > 10) {
                echo 'count';
                exit();
            } else {
                $data = new SupplierModel();
                $data->modelSupplierSupply($supply_name,$supply_id,$quantity,$unit_price);
            }
        }
    }
}