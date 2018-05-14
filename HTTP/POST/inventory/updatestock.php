<?php

if(!isset($_POST['stock'])) {
    header('Location: ../../../');
    exit(); 
} else {
    require_once '../../../Process/model.php';
    $supply_id = $_POST['getSupply'];
    $stock = $_POST['stock'];
    $operator = $_POST['operator'];
    if(empty($stock) || empty($supply_id)) {
        echo 'empty';
        exit();
    } else {
        if(!preg_match('/^[0-9]+$/u',$stock)) {
         echo 'cannot';
         exit();
        }  else {
            if(strlen($stock) > 10) {
                echo 'count';
                exit();
            } else {
                $data = new InventoryModel();
                $data->modelInventoryStock($supply_id,$operator,$stock);
            }
        }
    }
}