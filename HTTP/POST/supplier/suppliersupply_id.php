<?php

if(!isset($_POST['supply_id'])) {
    header('Location: ../../../');
    exit(); 
} else {
    session_start();
    require_once '../../../Process/model.php';
    $supply_id = $_POST['supply_id'];
    $ref_name = $_POST['ref_name'];
    if(empty($supply_id) || empty($ref_name)) {
        echo 'empty';
        exit();
    } else {
        if(!preg_match("/[A-Za-z0-9]+$/u",$supply_id) || !preg_match("/[A-Za-z0-9 ]+$/u",$ref_name)) {
         echo 'cannot';
         exit();
        }  else {
            if(strlen($supply_id) != 5 || strlen($ref_name) > 25) {
                echo 'count';
                exit();
            } else {
                $data = new SupplierModel();
                $data->modelSupplierSupplyID($supply_id,$ref_name);
            }
        }
    }
}