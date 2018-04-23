<?php

if(!isset($_POST['title'])) {
    header('Location: ../../../');
    exit(); 
} else {
    require_once '../../../Process/model.php';
    $title = $_POST['title'];
    $body = $_POST['body'];
    $id = $_POST['eid'];
    if(empty($title) || empty($body)) {
        echo 'empty';
    } else {
        $data = new AnnouncementModel();
        $data->modelEditAnnounce($id,$title,$body);
    }
}

