<?php 

session_start();
require_once '../../../Process/model.php';

$data = new UserModel();
$data->modelStatus();

?>