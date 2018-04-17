<?php

    trait Users
    {   
        public function adminDefault($conn,$r) {
            $uid = 'admin';
            $pwd = 'admin';
            $fn = 'Admin';
            $ln = 'Admin';
            $created_at = date('m/d/Y h:i A');
            $updated_at = date('m/d/Y h:i A');
            $sql = "SELECT * FROM users;";
            $stmt = $conn->stmt_init();
            if(!$stmt->prepare($sql)) {
                die('Error with SQL');
                exit();
            } else {
                if(!$stmt->execute()) {
                die('Error with Execute');
                exit();
                } else {
                $result = $stmt->get_result();
                if($result->num_rows != 0) {
                    exit();
                } else {
                    $sqlDef = "INSERT INTO users(user_fn,user_ln,username,password,created_at,updated_at) VALUES(?,?,?,?,?,?);";
                    $stmtDef = $conn->stmt_init();
                    if(!$stmtDef->prepare($sqlDef)) {
                        die('Error with SQL');
                        exit();
                    } else {
                        $hashpwd = password_hash($pwd,PASSWORD_DEFAULT);
                        $stmtDef->bind_param('ssssss',$fn,$ln,$uid,$hashpwd,$created_at,$updated_at);
                        $stmtDef->execute();
                        $this->roleUser($conn,$uid,$r);
                        $this->Credential($conn,$r);
                        echo "<h1>Admin account was created and the default value of the username,password and credential are admin.</h1>";
                        exit();
                    }
                }
             } }
        }
        
        public function regisUser($conn,$u,$p,$r,$c,$f,$n) {
            $uid = mysqli_real_escape_string($conn,$u);
            $pwd = mysqli_real_escape_string($conn,$p);
            $fn = mysqli_real_escape_string($conn,$f);
            $ln = mysqli_real_escape_string($conn,$n);
            $cred = mysqli_real_escape_string($conn,$c);
            $created_at = date('m/d/Y h:i A');
            $updated_at = date('m/d/Y h:i A');

            $sql = "SELECT * FROM admin_credential;";
            $stmt = $conn->stmt_init();
            if(!$stmt->prepare($sql)) {
                die('Error with SQL');
                exit();
            } else {
                if(!$stmt->execute()) {
                    die('Error with Execute');
                    exit();
                } else {
                    $result = $stmt->get_result();
                    if($result->num_rows ==  1) {
                        if($row = $result->fetch_assoc()) {
                           $checkCred = password_verify($c,$row['credential']);
                    }
                        if($checkCred == false){
                            header("Location: ../../../?signup=credential");
                            exit();
                        } elseif($checkCred == true) {
                            
                            $sqlExist = "SELECT * FROM users WHERE username = ?;";
                            $stmtExist = $conn->stmt_init();
                            if(!$stmtExist->prepare($sqlExist)) {
                                header("Location: ../../../?signup=error");
                                exit();
                            } else {
                                $stmtExist->bind_param('s',$uid);
                                if(!$stmtExist->execute()) {
                                    header("Location: ../../../?signup=error");
                                    exit();
                                } else {
                                    $result = $stmtExist->get_result();
                                    if($result->num_rows == 1) {
                                        header("Location: ../../../?signup=taken");
                                        exit();
                                    } else {
                                        $sql = "INSERT INTO users(user_fn,user_ln,username,password,created_at,updated_at) VALUES(?,?,?,?,?,?);";
                                        $stmt = $conn->stmt_init();
                                        if(!$stmt->prepare($sql)) {
                                            header("Location: ../../../?signup=error");
                                            exit();
                                        } else {
                                            $hashpwd = password_hash($pwd,PASSWORD_DEFAULT);
                                            $stmt->bind_param('ssssss',$fn,$ln,$uid,$hashpwd,$created_at,$updated_at);
                                            $stmt->execute();
                                            $this->roleUser($conn,$uid,$r);
                                            header("Location: ../../../?signup=success");
                                            exit();
                                          }
                                    }
                                }
                            }
                         }   
            } } }
        }

        public function roleUser($conn,$u,$r) {
            $sql = "SELECT * FROM users WHERE username = ?;";

            $stmt = $conn->stmt_init();
            if(!$stmt->prepare($sql)) {
                header("Location: ../../../?signup=error");
                exit();
            } else {
                $stmt->bind_param('s',$u);
                if(!$stmt->execute()) {
                    header("Location: ../../../?signup=error");
                    exit();
                } else {
                    $result = $stmt->get_result();
                    if(!$result->num_rows >= 1) {
                        header("Location: ../../../?signup=error");
                        exit();
                    } else {
                        if($row = $result->fetch_assoc()) {
                            $user_id = $row['id'];
                            $sql = "INSERT INTO roles(user_id,role) VALUES(?,?);"; 
                            $stmtRole = $conn->stmt_init();
                            if(!$stmt->prepare($sql)) {
                                header("Location: ../../../?signup=error");
                                exit();
                            } else {
                                $stmt->bind_param('is',$user_id,$r);
                                $stmt->execute();
                            }
                        }
                    }
                }
            }
        }

        public function Credential($conn,$role) {
            $sql = "SELECT * FROM roles WHERE role = ?;";
            $stmt = $conn->stmt_init();
            $updated_at = date('m/d/Y h:i A');
            if(!$stmt->prepare($sql)) {
                die('Error with SQL');
                exit();
            }else {
                $stmt->bind_param('s',$role);
                if(!$stmt->execute()) {
                    die('Error with execute');
                    exit();
                } else {
                    $result = $stmt->get_result();
                    if(!$result->num_rows >= 1) {
                        die('Error with Data');
                        exit();
                    } else {
                        if($row = $result->fetch_assoc()) {
                            $role_id = $row['id'];
                            $credential = 'admin';
                            $sqlCred = "INSERT INTO admin_credential(role_id,credential,updated_at) VALUES(?,?,?);";
                            $stmtCred = $conn->stmt_init();
                            if(!$stmtCred->prepare($sqlCred)) {
                                die('Error with SQL');
                                exit(); 
                            } else {
                                $hashCred = password_hash($credential,PASSWORD_DEFAULT);
                                $stmtCred->bind_param('iss',$role_id,$hashCred,$updated_at);
                                if(!$stmtCred->execute()) {
                                    die('Error with Execute');
                                    exit();
                                }
                            }
                        }
                    }
                }
            }
        }

        public function Login($conn,$u,$p) {
            $uid = mysqli_real_escape_string($conn,$u);
            $pwd = mysqli_real_escape_string($conn,$p);

            $sql = "SELECT * FROM users WHERE username=?;";
            $stmt = $conn->stmt_init();
            if(!$stmt->prepare($sql)) {
                header("Location: ../../?login=error");
                exit();
            } else {
                $stmt->bind_param('s',$uid);
                if(!$stmt->execute()) {
                    header("Location: ../../?login=error");
                    exit();
                } else {
                    $result = $stmt->get_result();
                    if(!$result->num_rows >= 1) {
                       
                        header("Location: ../../../?login=username");
                        exit();
                    } else {
                        if($row = $result->fetch_assoc()) {
                            $id = $row['id'];
                            $verify = password_verify($pwd,$row['password']);
                        }
                        if($verify == false) {
                            header("Location: ../../../?login=password");
                            exit();  
                        } elseif($verify == true) {
                           $sqlRole = "SELECT * FROM roles WHERE user_id = ?;";
                           $stmtRole = $conn->stmt_init();
                           if(!$stmtRole->prepare($sqlRole)){
                            die('Error with SQL');
                            exit();
                           } else {
                            $stmtRole->bind_param('i',$id);
                            if(!$stmtRole->execute()){
                                die('Error with Execution');
                                exit();
                            } else {
                                $resultRole = $stmtRole->get_result();
                                if($resultRole->num_rows > 0) {
                                    if($rowRole = $resultRole->fetch_assoc()){
                                        $role = $rowRole['role'];
                                    }
                                    if($role == 'admin') {
                                        $_SESSION['a_id'] = $id;
                                        $this->TimeIn($conn,$id);
                                        header("Location: ../../../admin.php?login=success");
                                        exit();  
                                    } elseif($role == 'user'){
                                        $_SESSION['u_id'] = $id;
                                        $this->TimeIn($conn,$id);
                                        header("Location: ../../../user.php?login=success");
                                        exit();  
                                    }
                                }
                            }
                           }
                        }
                    }
                }
            } 
        }

        public function Fetch($conn,$id) {
            $sql = "SELECT * FROM users WHERE id = ?;";
            $stmt = $conn->stmt_init();
            if(!$stmt->prepare($sql)) {
                die('Error with SQL');
                exit();    
            } else {
                $stmt->bind_param('i',$id);
                if(!$stmt->execute()) {
                die('Error with Execution');
                exit();    
                } else {
                 $result = $stmt->get_result();
                 if($result->num_rows > 0) {
                    $datas = [];
                    while($row = $result->fetch_assoc()) {
                     $uid = $row['username'];
                     $pwd = $row['password'];
                     $a_id = $row['id'];
                    }
                    array_push($datas,$uid,$pwd,$a_id);
                    return $datas;
                 }
                }
            }
        }

        public function Setting($conn,$sid,$u,$p,$n) {
            $uid = mysqli_real_escape_string($conn,$u);
            $confpwd = mysqli_real_escape_string($conn,$p);
            $newpwd =  mysqli_real_escape_string($conn,$n);
            $updated_at = date('m/d/Y h:i A');

            $sql = "SELECT * FROM users WHERE id = ?;";
            $stmt = $conn->stmt_init();
            if(!$stmt->prepare($sql)) {
                die('Error with SQL');
                exit();
            } else {
                $stmt->bind_param('i',$sid);
                if(!$stmt->execute()){
                    die('Error with Execution');
                    exit();
                } else {
                    $result = $stmt->get_result();
                    if($result->num_rows > 0) {
                        if($row = $result->fetch_assoc()) {
                            $id = $row['id'];
                            $checkPwd = password_verify($confpwd,$row['password']);
                            if($checkPwd == false) {
                                header("Location: ../../../admin.php?admin=password");
                                exit();  
                            } elseif($checkPwd == true) {
                                $sql = "UPDATE users SET username = ?,password = ?,updated_at = ?  WHERE id = ?;";
                                $stmt = $conn->stmt_init();
                                if(!$stmt->prepare($sql)) {
                                    die('Error with SQL');
                                    exit();
                                } else {
                                    $hashpwd = password_hash($newpwd,PASSWORD_DEFAULT);
                                    $stmt->bind_param('sssi',$uid,$hashpwd,$updated_at,$id);
                                    if(!$stmt->execute()) {
                                        die('Error with Execution');
                                        exit();
                                    }
                                }
                            }
                        }
                    }
                }
            }    
        }

        public function SettingCredential($conn,$sid,$c,$n) {
            $confcred = mysqli_real_escape_string($conn,$c);
            $newcred = mysqli_real_escape_string($conn,$n);
            $updated_at = date('m/d/Y h:i A');

            $sql = "SELECT * FROM admin_credential WHERE role_id = ?;";
            $stmt = $conn->stmt_init();
            if(!$stmt->prepare($sql)) {
                die('Error with SQL');
                exit();
            } else {
                $stmt->bind_param('i',$sid);
                if(!$stmt->execute()) {
                    die('Error with Execution');
                    exit();
                } else {
                    $result = $stmt->get_result();
                    if($result->num_rows > 0) {
                        if($row = $result->fetch_assoc()){
                            $checkCred = password_verify($confcred,$row['credential']);
                        }
                        if($checkCred == false) {
                            header("Location: ../../../admin.php?admin=credential");
                            exit();
                        } elseif($checkCred == true) {
                            $sqlUpdate = "UPDATE admin_credential SET credential = ?,updated_at = ? WHERE role_id = ?;";
                            $stmtUpdate = $conn->stmt_init();
                            if(!$stmtUpdate->prepare($sqlUpdate)) {
                                die('Error with SQL');
                                exit();
                            } else {
                                $credhash = password_hash($newcred,PASSWORD_DEFAULT);
                                $stmtUpdate->bind_param('ssi',$credhash,$updated_at,$sid);
                                if(!$stmtUpdate->execute()){
                                    die('Error with Execution');
                                    exit();
                                } else {
                                    header("Location: ../../../admin.php?admin=success");
                                    exit(); 
                                }
                            }
                        }
                    }
                }
            }
        }

        public function Status($conn,$id){
            $sql = "SELECT * FROM users WHERE id = ?;";
            $stmt = $conn->stmt_init();
            if(!$stmt->prepare($sql)) {
                die('Error with SQL');
                exit();
            } else {
                $stmt->bind_param('i',$id);
                if(!$stmt->execute()) {
                    die('Error with Execution');
                    exit();
                } else{
                    $result = $stmt->get_result();
                    if($result->num_rows > 0) {
                        $datas = [];
                        while($row = $result->fetch_assoc()){
                            $fn = $row['user_fn'];
                            $ln = $row['user_ln'];
                            $created_at = $row['created_at'];
                            $updated_at = $row['updated_at'];

                            $sqlCred = "SELECT * FROM admin_credential;";
                            $resultCred = $conn->query($sqlCred);
                            if($resultCred->num_rows > 0) {
                                if($rowCred = $resultCred->fetch_assoc()) {
                                    $credential = $rowCred['updated_at'];
                                }
                            }
                        }  
                            $datas = ['first'=>$fn,'last'=>$ln,'created_at'=>$created_at,'updated_at'=>$updated_at,'credential'=>$credential];           
                            echo json_encode($datas); 
                        }
                    }
                }
            }
    }


