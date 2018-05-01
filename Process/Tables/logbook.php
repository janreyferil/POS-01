<?php



trait LogBook
{
    
    protected function TimeIn($conn,$id){
        $login = date('F d Y h:i A');
        $logout = 'Not Log out';

        $sql = "INSERT INTO logbook(role_id,login,logout) VALUES(?,?,?);";
        $stmt = $conn->stmt_init();
        if(!$stmt->prepare($sql)) {
            die('Error with SQL');
            exit();
        } else {
            $stmt->bind_param('iss',$id,$login,$logout);
            if(!$stmt->execute()) {
                die('Error with Execution');
                exit();
            } 
        }
    }

    protected function Count($conn){
        $sql = "SELECT * FROM logbook ORDER BY log_id DESC LIMIT 1;";
        $result = $conn->query($sql);
        $tproduct =[];
        while ($row = $result->fetch_assoc())
        {
           $id = $row['log_id'];
        }
          return $id;
    }

    protected function TimeOut($conn) {

        $cont = $this->Count($conn);
        $logout = date('F d Y h:i A');
        $sql = "UPDATE logbook SET logout = ? WHERE log_id =?;";
        $stmt = $conn->stmt_init();
        if(!$stmt->prepare($sql)){
            die('Error with SQL');
            exit();
        } else {
            $stmt->bind_param('si',$logout,$cont);
            if(!$stmt->execute()){
                die('Error with Execution');
                exit();
            } else {
                session_start();
                session_unset();
                session_destroy();
                header('Location: ../../../');
                exit();  
            }
        }
    }

    protected function FetchTime($conn,$s,$r,$o,$ord){
        $val = mysqli_real_escape_string($conn,$o);
        if($ord == true) {
        $sql = "SELECT * 
        FROM users 
        INNER JOIN logbook 
        ON users.id = logbook.role_id 
        INNER JOIN roles ON logbook.role_id = roles.user_id
        WHERE users.username LIKE '$s%' AND roles.role = '$r' ORDER BY logbook.log_id DESC LIMIT ?;";

        }else {
        $sql = "SELECT * 
        FROM users 
        INNER JOIN logbook 
        ON users.id = logbook.role_id 
        INNER JOIN roles ON logbook.role_id = roles.user_id
        WHERE users.username LIKE '$s%' AND roles.role = '$r' ORDER BY logbook.log_id ASC LIMIT ?;";

        }

        $stmt = $conn->stmt_init();
        if(!$stmt->prepare($sql)) {
            die('Error with SQL');
            exit();
        } else {
            if($o == '') {
                $val = 5;
            }
            $stmt->bind_param('i',$val);
            if(!$stmt->execute()) {
            die('Error with Execution');
            exit();
            } else {
                $result = $stmt->get_result();
                $data = [];
                $id = [];
                $name = [];
                $login = [];
                $logout = [];
                if($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()){
                        $combine = $row['user_fn']. ' ' . $row['user_ln'];
                        array_push($id,$row['log_id']);
                        array_push($name,$combine);
                        array_push($login,$row['login']);
                        array_push($logout,$row['logout']);
                      }
                      $data = array("id"=>$id,"name"=>$name,"login"=>$login,"logout"=>$logout);
                      
                      echo json_encode($data);
                } else {
                    array_push($id,0);
                    array_push($name,'No Seach Found');
                    array_push($logout,'No Seach Found');
                    array_push($login,'No Seach Found');
                    $data = array("id"=>$id,"name"=>$name,"login"=>$login,"logout"=>$logout);
                    echo json_encode($data);
                }
            }
        }
    }

    protected function Clock(){
        $time = date('h:i:s A');
        $date = date('F d Y');
        $day = date('w');
        $list = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        $actualDay = $list[$day];
        $datas = ['time' => $time,'date'=>$date,'day'=>$actualDay];
        return json_encode($datas);

    }

    protected function DeleteTime($conn,$id) {

        $id = $conn->real_escape_string($id);
        $sql = "DELETE FROM logbook WHERE log_id = ?;";
        $stmt = $conn->stmt_init();
        if(!$stmt->prepare($sql)){
            die('Error with SQL');
            exit();
        } else {
            $stmt->bind_param('i',$id);
            if(!$stmt->execute()){
                die('Error with Execution');
                exit();
            } 
        }
    }
}

