<?php

if(!isset($_POST['title'])) {
    header('Location: ../../../');
    exit(); 
} else {
    require_once '../../../Process/model.php';
    $title = $_POST['title'];
    $body = $_POST['body'];
    if(empty($title) || empty($body)) {
        echo 'empty';
    } else {
        $data = new AnnouncementModel();
        $data->modelCreateAnnounce($title,$body);
    }
}

