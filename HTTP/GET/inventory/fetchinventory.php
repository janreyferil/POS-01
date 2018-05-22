<?php 

        if(!isset($_POST['search'])) {
        header('Location: ../../../');
        exit(); 
       } else {
        require_once '../../../Process/model.php';
        $search = $_POST['search'];
        $val = $_POST['val'];
        $order = $_POST['order'];
        $data = new InventoryModel();
        $data->modelFetchInventory($search,$val,$order);
       }
        
?>