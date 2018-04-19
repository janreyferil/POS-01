<?php
    
    require_once '../../../Process/model.php';
    $data = new LogBookModel();
    $id = $_POST['hid'];
    $data->modelDeleteTime($id);


