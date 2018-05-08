<?php
   
   if(!isset($_POST['hid'])) {
    header('Location: ../../../');
    exit(); 
   } else {
    require_once '../../../Process/model.php';
    $id = $_POST['hid'];
    $data = new SupplierModel();
    $data->modelDeleteSupplier($id);
   }
