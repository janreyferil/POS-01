<?php

/**
 * 
 */
trait Todo
{
    
    protected function timeAgo($time_ago) {
        $time_ago = strtotime($time_ago);
        $cur_time   = time();
        $time_elapsed   = $cur_time - $time_ago;
        $seconds    = $time_elapsed ;
        $minutes    = round($time_elapsed / 60 );
        $hours      = round($time_elapsed / 3600);
        $days       = round($time_elapsed / 86400 );
        $weeks      = round($time_elapsed / 604800);
        $months     = round($time_elapsed / 2600640 );
        $years      = round($time_elapsed / 31207680 );
        // Seconds
        if($seconds <= 60){
            return "just now";
        }
        //Minutes
        else if($minutes <=60){
            if($minutes==1){
                return "one minute ago";
            }
            else{
                return "$minutes minutes ago";
            }
        }
        //Hours
        else if($hours <=24){
            if($hours==1){
                return "an hour ago";
            }else{
                return "$hours hrs ago";
            }
        }
        //Days
        else if($days <= 7){
            if($days==1){
                return "yesterday";
            }else{
                return "$days days ago";
            }
        }
        //Weeks
        else if($weeks <= 4.3){
            if($weeks==1){
                return "a week ago";
            }else{
                return "$weeks weeks ago";
            }
        }
        //Months
        else if($months <=12){
            if($months==1){
                return "a month ago";
            }else{
                return "$months months ago";
            }
        }
        //Years
        else{
            if($years==1){
                return "one year ago";
            }else{
                return "$years years ago";
            }
        }
    }

    protected function FetchTodo($conn,$id){

        $sql = "SELECT * FROM todo WHERE user_id = ? GROUP BY id DESC;";
        $stmt = $conn->stmt_init();
        if(!$stmt->prepare($sql)) {
            die($stmt->error);
            exit();
        } else {
     
            $stmt->bind_param('i',$id);
            if(!$stmt->execute()) {
                die($stmt->error);
                exit();
            } else {
      
                $result = $stmt->get_result();
                $id = [];
                $body = [];
                $created_at = [];
                $updated_at = [];
                if($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                    array_push($id,$row['id']);
                    array_push($body,$row['body']);
                    array_push($created_at,$this->timeAgo($row['created_at']));
                    array_push($updated_at,$row['updated_at']);
                    }
                    $data = array("id"=>$id,"body"=>$body,
                    "created_at"=>$created_at,"updated_at"=>$updated_at);
                    echo json_encode($data);

                } else {
                    $data = array("id"=>0,"body"=>'',
                    "created_at"=>'',"updated_at"=>'');
                    echo json_encode($data);
                }
            }
        }
    }

    protected function CreateTodo($conn,$id,$b) {
        $body = $conn->real_escape_string($b);
        $sql = "INSERT INTO todo(user_id,body) VALUES(?,?);";
        $stmt = $conn->stmt_init();
        if(!$stmt->prepare($sql)) {
            die($stmt->error);
            exit();
        }  else {
            $stmt->bind_param('is',$id,$body);
            if(!$stmt->execute()) {
                die($stmt->error);
                exit();
            } else {
                echo 'success';
            }
        }
    }   

    protected function DeleteTodo($conn,$id) {
        $sql = "DELETE FROM supplier_supply WHERE id =?;";
        $stmt = $conn->stmt_init();
        if(!$stmt->prepare($sql)) {
            die($stmt->error);
            exit();
        } else {
            $stmt->bind_param('i',$id);
            if(!$stmt->execute()) {
                die($stmt->error);
                exit();
            } else {
                echo 'delete';
                exit();
            }
        }
    }
}
