<?php 

require_once '../../../Process/model.php';
        $search = $_POST['search'];
        $data = new LogBookModel();
        $role = 'admin';
        $data->modelUserFetchTime($search,$role);
?>