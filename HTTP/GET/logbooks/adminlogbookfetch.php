<?php 

require_once '../../../Process/model.php';
        $search = $_POST['search'];
        $val = $_POST['val']; 

        $opt = $_POST['order'];
        
        if($opt == 'DESC') {
                $order = true;
        } elseif($opt == 'ASC') {
                $order = false;
        }

        $data = new LogBookModel();
        $role = 'admin';
        $data->modelUserFetchTime($search,$role,$val,$order);
?>