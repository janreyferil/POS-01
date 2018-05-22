<?php

if(!isset($_POST['code'])) {
    header('Location: ../../../');
    exit(); 
} else {
    session_start();
    require_once '../../../Process/model.php';
    $id = $_POST['uid'];
    $code = $_POST['code'];
    $category_id = $_POST['getCategory'];
    $name = $_POST['name'];
    $description = $_POST['description'];
    $price = $_POST['price'];


    if(empty ($code) ||empty($category_id) || empty($name) || empty($description) || empty($price)){
        echo 'empty';
        exit();
    } else {
        if(!preg_match('/^[a-zA-Z0-9 ]+$/u',$name) || !preg_match('/^[a-zA-Z0-9]+$/u',$code) ||
        !preg_match('/^[0-9.]+$/u',$price)) {
         echo 'cannot';
         exit();
        }  else {
            if(strlen($code) != 5) {
                echo 'count';
                exit();
            } else {
                $data = new InventoryModel();
                $data->modelUpdateInventory($id,$category_id,$code,$name,$description,$price);
            }
        }
    }
}