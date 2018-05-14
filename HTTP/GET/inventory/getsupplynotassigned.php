<?php 

        require_once '../../../Process/model.php';
        $status = 'not assigned';
        $data = new InventoryModel();
        $data->modelGetSupply($status);
        
?>