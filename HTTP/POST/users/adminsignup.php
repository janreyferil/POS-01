<?php


require_once 'Process/model.php';

$role = 'admin';
$data = new UserModel();
$data->modelAdminDefault($role);


