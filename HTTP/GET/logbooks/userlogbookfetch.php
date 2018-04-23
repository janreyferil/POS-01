<?php 

        if(!isset($_POST['search']) || !isset($_POST['val']) || !isset($_POST['order'])) {
                header('Location: ../../../');
                exit(); 
        } else {
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
        $role = 'user';
        $data->modelUserFetchTime($search,$role,$val,$order);
}
?>