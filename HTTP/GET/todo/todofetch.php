<?php 

    session_start();

    require_once '../../../Process/model.php';

    $data = new TodoModel();
    $data->modelTodoFetch();
