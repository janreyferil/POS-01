<?php
   
   if(!isset($_POST['search'])) {
    header('Location: ../../../');
    exit(); 
   } else {
    require_once '../../../Process/model.php';
    $search = $_POST['search'];
    $data = new SupplierModel();
    $data->modelSearchSupply($search);
   }

        
