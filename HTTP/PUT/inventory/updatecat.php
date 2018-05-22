<?php

if(!isset($_POST['get_category'])) {
    header('Location: ../../../');
    exit(); 
} else {
    require_once '../../../Process/model.php';
    $category = $_POST['get_category'];
    $id = $_POST['hid'];
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
                $data->modelUpdateCategory($id,$category);
            }
        }
    }
}