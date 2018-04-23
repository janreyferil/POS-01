<?php 


if(!isset($_POST['body'])) {
    header('Location: ../../../');
    exit(); 
} else {
    session_start();
    require_once '../../../Process/model.php';
    $body = $_POST['body'];
    if(empty($body)) {
        echo 'empty';
    } else {
        $data = new TodoModel();
        $data->modelTodoCreate($body);
    }
}
