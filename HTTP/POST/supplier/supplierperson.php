<?php

if(!isset($_POST['first'])) {
    header('Location: ../../../');
    exit(); 
} else {
    session_start();

    require_once '../../../Process/model.php';
    $first = $_POST['first'];
    $last = $_POST['last'];
    $company = $_POST['company'];
    $contact = $_POST['contact'];

    if(empty($first) || empty($last) || empty($company) || empty($contact)) {
        echo 'empty';
    } else {
        if(!preg_match("/[A-Za-z ]+/",$first) || !preg_match("/[A-Za-z ]+/",$last) || !preg_match("/[A-Za-z0-9 ]+/",$company) || !preg_match("/[0-9]+/",$contact)) {
         echo 'cannot';
        }  else {
        $data = new SupplierModel();
        $data-> modelSupplierPerson($first,$last,$company,$contact);
        }
    }
}