<?php
   
   if(!isset($_POST['hid'])) {
    header('Location: ../../../');
    exit(); 
   } else {
    require_once '../../../Process/model.php';
    $data = new LogBookModel();
    $id = $_POST['hid'];
    $data->modelDeleteTime($id);
   }



