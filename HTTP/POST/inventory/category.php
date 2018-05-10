<?php

if(!isset($_POST['category_name'])) {
    header('Location: ../../../');
    exit(); 
} else {
    session_start();
    require_once '../../../Process/model.php';
    $category = $_POST['category_name'];
    if(empty($category)) {
        echo 'empty';
        exit();
    } else {
        if(!preg_match('/^[a-zA-Z ]+$/u',$category)) {
         echo 'cannot';
         exit();
        }  else {
            if(strlen($category) > 25) {
                echo 'count';
                exit();
            } else {
                $data = new InventoryModel();
                $data->modelCreateCategory($category);
            }
        }
    }
}