<?php

trait Announcement
{
    protected function CreateAnnounce($conn,$t,$b) {

        $title = $conn->real_escape_string(ucfirst($t));
     
        if(substr($b,-1) == '.') {
            $body = $conn->real_escape_string(ucfirst($b));
        } else {
            $body = $conn->real_escape_string(ucfirst($b).'.');
        }
        $created_at = date('F d Y h:i A');
        $updated_at = date('F d Y h:i A');
        
        $sql = "INSERT INTO admin_announce(title,body,created_at,updated_at) VALUES(?,?,?,?);";
        $stmt = $conn->stmt_init();  
        if(!$stmt->prepare($sql)){
            die($stmt->error);
            exit();
        } else {
            $stmt->bind_param('ssss',$title,$body,$created_at,$updated_at);
            if(!$stmt->execute()){
                die($stmt->error);
                exit();
            } else {
                echo 'success';
                exit();
            }
        }
    }   

    protected function FetchAnnounce($conn){        
        $sql = "SELECT * FROM admin_announce ORDER BY ann_id DESC;";
        $result = $conn->query($sql);
        $data = [];
        $id = [];
        $title = [];
        $body = [];
        $created_at = [];
        $updated_at = [];
        if($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                array_push($id,$row['ann_id']);
                array_push($title,$row['title']);
                array_push($body,$row['body']);
                array_push($created_at,$this->timeAgo($row['created_at']));
                array_push($updated_at,$this->timeAgo($row['updated_at']));
            }
            $data = array("id"=>$id,"title"=>$title,"body"=>$body,"created_at"=>$created_at,
            "updated_at"=>$updated_at);
            echo json_encode($data);
        } else {
            array_push($id,0);
            array_push($title,'Sorry but theirs no announcement today.');
            array_push($body,'');
            array_push($created_at,'');
            array_push($created_at,'');
            $data = array("id"=>$id,"title"=>$title,"body"=>$body,"created_at"=>$created_at,
            "updated_at"=>$updated_at);
            echo json_encode($data);
        }
    }

    protected function EditAnnounce($conn,$id,$t,$b) {
        $title = $conn->real_escape_string(ucfirst($t));
     
        if(substr($b,-1) == '.') {
            $body = $conn->real_escape_string(ucfirst($b));
        } else {
            $body = $conn->real_escape_string(ucfirst($b).'.');
        }

        $sql = "UPDATE admin_announce SET title = ?,body = ?,updated_at = ? WHERE ann_id = ?;";
        $stmt = $conn->stmt_init();
        $updated_at = date('F d Y h:i A');
    
        if(!$stmt->prepare($sql)){
            die('Error with SQL');
            exit();
        } else {
            $stmt->bind_param('sssi',$title,$body,$updated_at,$id);
            if(!$stmt->execute()){
                die('Error with Execution');
                exit();
            } else {
                echo 'update';
                exit();
            }
        }
    }

    protected function DeleteAnnounce($conn,$id) {
        $sql = "DELETE FROM admin_announce WHERE ann_id = ?;";
        $stmt = $conn->stmt_init();
        if(!$stmt->prepare($sql)) {
            die($stmt->error);
            exit();
        } else {
            $stmt->bind_param('i',$id);
            if(!$stmt->execute()){
            die($stmt->error);
            exit();
            } else {
                echo 'delete';
            }
        }
    }
}
