<?php

if(!isset($_POST['vat'])) {
    header('Location: ../../../');
    exit(); 
} else {
    session_start();
    require_once '../../../Process/model.php';
    $id = $_POST['id'];
    $vat = $_POST['vat'];
    $discount = $_POST['discount'];
    $vatable = $_POST['vatable'];
    $discountable = $_POST['discountable'];

    if($vat == '' || $discount == ''){
        echo 'empty';
        exit();
    } else {
        if(!preg_match('/^[0-9]+$/u',$vat) || !preg_match('/^[0-9]+$/u',$discount)) {
         echo 'cannot';
         exit();
        }  else {
            if(strlen($vat) > 3 || strlen($discount) > 3) {
                echo 'count';
                exit();
            } else {
                $data = new InventoryModel();
                $data->modelUpdateDiscount($id,$vat,$discount,$vatable,$discountable);
            }
        }
    }
}