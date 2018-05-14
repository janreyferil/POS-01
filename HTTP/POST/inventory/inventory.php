<?php

if(!isset($_POST['supply_id'])) {
    header('Location: ../../../');
    exit(); 
} else {
    session_start();
    require_once '../../../Process/model.php';
    $supply_id = $_POST['supply_id'];
    $category_id = $_POST['getCategory'];
    $code = $_POST['code'];
    $name = $_POST['name'];
    $description = $_POST['description'];
    $price = $_POST['price'];
    $stock = $_POST['inv_stock'];

    if(empty($supply_id) || empty($category_id) || empty($code) || empty($name) || empty($description) || empty($price) || $stock == ''){
        echo 'empty';
        exit();
    } else {
        if(!preg_match('/^[a-zA-Z0-9]+$/u',$code) || !preg_match('/^[a-zA-Z0-9 ]+$/u',$name) || !preg_match('/^[a-zA-Z0-9 ]+$/u',$description) || 
        !preg_match('/^[0-9.]+$/u',$price) || !preg_match('/^[0-9]+$/u',$stock)) {
         echo 'cannot';
         exit();
        }  else {
            if(strlen($code) != 5) {
                echo 'count';
                exit();
            } else {
                $data = new InventoryModel();
                $data->modelCreateInventory($supply_id,$category_id,$code,$name,$description,$price,$stock);
            }
        }
    }
}