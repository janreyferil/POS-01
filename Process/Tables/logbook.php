<?php



trait LogBook
{
    
    public function TimeIn($conn,$id){
        $login = date('F d Y h:i A');
        $logout = '';
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

    public function Count($conn){
        $sql = "SELECT * FROM logbook ORDER BY id DESC LIMIT 1;";
        $result = $conn->query($sql);
        $tproduct =[];
        while ($row = $result->fetch_assoc())
        {
           $id = $row['id'];
        }
          return $id;
    }

    public function TimeOut($conn) {
        $cont = $this->Count($conn);
        $logout = date('F d Y h:i A');
        $sql = "UPDATE logbook SET logout = ? WHERE id=?;";
        $stmt = $conn->stmt_init();
        if(!$stmt->prepare($sql)){
            die('Error with SQL');
            exit();
        } else {
            $stmt->bind_param('si',$logout,$cont);
            if(!$stmt->execute()){
                die('Error with Execution');
                exit();
            }
        }
    }

    public function FetchTime($conn,$s,$r){
        $sql = "SELECT * 
        FROM users 
        INNER JOIN logbook 
        ON users.id = logbook.role_id 
        INNER JOIN roles ON logbook.role_id = roles.user_id
        WHERE users.username LIKE '$s%' AND roles.role = '$r' ORDER BY logbook.login DESC;";
        $result = $conn->query($sql);

        $data = [];
        $name = [];
        $login = [];
        $logout = [];
        if($result->num_rows > 0) {
            while($row = $result->fetch_assoc()){
                $combine = $row['user_fn']. ' ' . $row['user_ln'];
                array_push($name,$combine);
                array_push($login,$row['login']);
                array_push($logout,$row['logout']);
              }
              $data = array("name"=>$name,"login"=>$login,"logout"=>$logout);
              
              echo json_encode($data);
        } else {
            array_push($name,'No Seach Found');
            array_push($logout,'No Seach Found');
            array_push($login,'No Seach Found');
            $data = array("name"=>$name,"login"=>$login,"logout"=>$logout);
            echo json_encode($data);
        }
    }

    public function Clock(){
        $time = date('h:i:s A');
        $date = date('F d Y');
        $day = date('w');
        $list = ['Default','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
        $actualDay = $list[$day];
        $datas = ['time' => $time,'date'=>$date,'day'=>$actualDay];
        return json_encode($datas);

    }
}

