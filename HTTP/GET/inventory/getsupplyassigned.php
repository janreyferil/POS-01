<?php 

        require_once '../../../Process/model.php';
        $status = 'assigned';
        $data = new InventoryModel();
        $data->modelGetSupply($status);
        
?>