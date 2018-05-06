<?php 
    trait Supplier  {
     
        //Supply
        protected function SupplierSupplyID($conn,$s_i,$r_n) {
          $supply_id = $conn->real_escape_string(strtoupper($s_i));
          $ref_name = $conn->real_escape_string(ucwords($r_n));
          $s = 'not assigned';
          $status = $conn->real_escape_string($s);
          $sqlExist = "SELECT * FROM supplier_supply WHERE supply_id = ?;";
          $stmtExist = $conn->stmt_init();
          if(!$stmtExist->prepare($sqlExist)) {
            die($stmtExist->error);
            exit();
          } else {
            $stmtExist->bind_param('s',$supply_id);
            if(!$stmtExist->execute()) {
              die($stmtExist->error);
              exit();
            } else {
              $result = $stmtExist->get_result();
              if($result->num_rows >= 1) {
                echo 'taken';
                exit();
              } else {
                $sql = "INSERT INTO supplier_supply(supply_id,ref_name,status) VALUES(?,?,?);";
                $stmt = $conn->stmt_init();
                if(!$stmt->prepare($sql)) {
                    die($stmt->error);
                    exit();
                } else {
                  $stmt->bind_param('sss',$supply_id,$ref_name,$status);
                  if(!$stmt->execute()) {
                    die($stmt->error);
                    exit();
                  } else {
                    echo 'success';
                  }
                }
              }
              }
            }
        }

        protected function FetchSupply($conn,$s,$l,$o){
          if($l === ''){
            $l = 5;
          }
          if($o == 'ASC'){
            $sql ="SELECT * FROM supplier_supply WHERE ref_name LIKE '$s%' ORDER BY ref_name ASC LIMIT $l;";     
          } else if($o == 'DESC'){  
            $sql ="SELECT * FROM supplier_supply WHERE ref_name LIKE '$s%' ORDER BY ref_name DESC LIMIT $l;";
          }
          $stmt = $conn->stmt_init();
          if(!$stmt->prepare($sql)) {
            die($stmt->error);
            exit();
          } else{
            if(!$stmt->execute()){
              die($stmt->error);
              exit();
            }else {
              $result = $stmt->get_result();
              $id = [];
              $supply_id = [];
              $ref_name = [];
              $status = [];
              $stock = [];
              $created_at = [];
              $updated_at = [];
              if($result->num_rows > 0) {
                while($row = $result->fetch_assoc()){
                  array_push($id,$row['id']);
                  array_push($supply_id,$row['supply_id']);
                  array_push($ref_name,$row['ref_name']);
                  array_push($status,$row['status']);
                  array_push($stock,$row['stock']);
                  array_push($created_at,date( "F d Y h:i A", strtotime($row['supply_created_at'])));
                  array_push($updated_at,date( "F d Y h:i A", strtotime($row['supply_updated_at'])));
                }
              } else {
                array_push($id,0);
                array_push($supply_id,'no search found');
                array_push($ref_name,'no search found');
                array_push($status,'no search found');
                array_push($stock,'no search found');
                array_push($created_at,'no search found');
                array_push($updated_at,'no search found');
              }
              $data = array(
                "id" => $id,
                "supply_id" => $supply_id,
                "ref_name" => $ref_name,
                "status" => $status,
                "stock" => $stock,
                "created_at" => $created_at,
                "updated_at" => $updated_at
              );
               echo json_encode($data);
            }
          }
        }

        protected function DeleteSupply($conn,$id){
          $sqlGET = "SELECT * FROM supplier_supply WHERE id =$id;";
          $result = $conn->query($sqlGET);
          if($result->num_rows > 0){
            if($row = $result->fetch_assoc()){
              $stock = $row['stock'];
            }
            if($stock != 0){
              echo 'stock';
              exit();
            }
          }
          $sql = "DELETE FROM supplier_supply WHERE id =? AND stock = 0;";
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

        protected function ShowSupply($conn,$id){
          $sql = "SELECT * FROM supplier_supply INNER JOIN
          supplier_transac ON
          supplier_supply.supply_id = supplier_transac.supp_product_id
          WHERE  supplier_supply.id = $id;";
          $result = $conn->query($sql);
          if($result->num_rows > 0){
            if($row = $result->fetch_assoc()){
              $data = array("supply_id"=>$row['supply_id'],
              "ref_name"=>$row['ref_name'],
              "status"=>$row['status'],
              "stock"=>$row['stock'],
              "transaction"=>count($row['supp_product_id']),
              "created_at"=>date( "F d Y h:i A", strtotime($row['supply_created_at'])),
              "updated_at"=>date( "F d Y h:i A", strtotime($row['supply_updated_at']))
              );
              echo json_encode($data);
              exit();
            }
          }
        }

        //Supplier
        protected function FetchSupplier($conn,$s,$l,$o){
          if($l == ''){
            $l = 5;
          } 
          if($o == 'ASC'){
            $sql ="SELECT * FROM supplier_person
            INNER JOIN users
            ON supplier_person.user_id = users.id 
            WHERE supplier_person.fn 
            LIKE '$s%' 
            OR supplier_person.ln 
            LIKE '$s%'
            ORDER BY supplier_person.fn
            ASC
            LIMIT
            $l
            ;";
          } else if($o == 'DESC') {
            $sql ="SELECT * FROM supplier_person
            INNER JOIN users
            ON supplier_person.user_id = users.id 
            WHERE supplier_person.fn 
            LIKE '$s%'
            OR supplier_person.ln 
            LIKE '$s%'
            ORDER BY supplier_person.fn
            DESC
            LIMIT
            $l
            ;";
          }
        
          $stmt = $conn->stmt_init();
          if(!$stmt->prepare($sql)) {
            die($stmt->error);
            exit();
          } else{
            if(!$stmt->execute()){
              die($stmt->error);
              exit();
            }else {
              $result = $stmt->get_result();
              $user_name = [];
              $name = [];
              $company = [];
              $contact = [];
              $created_at = [];
              $updated_at = [];
              if($result->num_rows > 0) {
                while($row = $result->fetch_assoc()){
                  
                  array_push($user_name,$row['user_fn'] . ' ' . $row['user_ln']);
                  array_push($name,$row['fn'] . ' ' . $row['ln']);
                  array_push($company,$row['company']);
                  array_push($contact,$row['contact']);
                  array_push($created_at,date( "F d Y h:i A", strtotime($row['person_created_at'])));
                  array_push($updated_at,date( "F d Y h:i A", strtotime($row['person_updated_at'])));
                }
              } else {
                array_push($user_name,'no search found');
                array_push($name,'no search found');
                array_push($company,'no search found');
                array_push($contact,'no search found');
                array_push($created_at,'no search found');
                array_push($updated_at,'no search found');
              }
              $data = array(
                "user_name" => $user_name,
                "name" => $name,
                "company" => $company,
                "contact" => $contact,
                "created_at" => $created_at,
                "updated_at" => $updated_at
              );
               echo json_encode($data);
            }
          }
        }

        protected function SupplierPerson($conn,$i,$fn,$ln,$com,$cont) {
          $id = $conn->real_escape_string($i);
          $first = $conn->real_escape_string($fn);
          $last = $conn->real_escape_string($ln);
          $company = $conn->real_escape_string($com);
          $contact = $conn->real_escape_string($cont);

          $sql = "INSERT INTO supplier_person(user_id,fn,ln,company,contact)
            VALUES(?,?,?,?,?);";
          $stmt = $conn->stmt_init();
          if(!$stmt->prepare($sql)) {
            die($stmt->error);
            exit();
          } else {
            $stmt->bind_param('issss',$id,$first,$last,$company,$contact);
            if(!$stmt->execute()) {
                die($stmt->error);
                exit();
            } else {
                echo 'success';
            }
          } 
        }   

        //Trasnsaction
        protected function SupplierSupply($conn,$p_name,$u_id,$s_id,$q,$u_p) {
          $generate_id = strtoupper(substr(str_shuffle('abcdefghijklmnopqrstuvwxyz0123456789'),0,6));
          $trans_id = $conn->real_escape_string($generate_id);
          $user_id = $conn->real_escape_string($u_id);
          $supply_id = $conn->real_escape_string(strtoupper($s_id));
          $quantity = $conn->real_escape_string($q);
          $unit_price = $conn->real_escape_string($u_p);
      
          $arrString = explode(' ',$p_name);
          $first = $arrString[0];
          $last = $arrString[1];
    
          $sqlPerson = "SELECT * FROM supplier_person WHERE fn=? AND ln=?;";
          $stmtPerson = $conn->stmt_init();
          if(!$stmtPerson->prepare($sqlPerson)) {
            die($stmtPerson->error.' - code line 79');
            exit();
          } else {
            
            $stmtPerson->bind_param('ss',$first,$last);
            if(!$stmtPerson->execute()) {
              die($stmtPerson->error.' - code line 85');
              exit();
            } else {
              $resultPerson = $stmtPerson->get_result();
              if($resultPerson->num_rows > 0) {
                if($rowPerson = $resultPerson->fetch_assoc()){
                  $p_id = $rowPerson['person_id'];
                }
                $person_id = $conn->real_escape_string($p_id);
              }
            }
          }

          $sqlExist = "SELECT * FROM supplier_supply WHERE supply_id = ?;";
          $stmtExist = $conn->stmt_init();

          if(!$stmtExist->prepare($sqlExist)) {
            die($stmtExist->error.' - code line 103');
            exit();
          } else {
            $stmtExist->bind_param('s',$supply_id);
            if(!$stmtExist->execute()) {
              die($stmtExist->error.' - code line 108');
              exit();
            } else {
              $result = $stmtExist->get_result();
              if($result->num_rows >= 1) {
                $sql = "INSERT INTO supplier_transac(transac_id,supp_person_id,supp_user_id,supp_product_id,quantity,unit_price) 
                VALUES(?,?,?,?,?,?);";
                $stmt = $conn->stmt_init();
                if(!$stmt->prepare($sql)) {
                  die($stmt->error.' - code line 118');
                  exit();
                } else {
                  $stmt->bind_param('siisid',$trans_id,$person_id,$user_id,$supply_id,$quantity,$unit_price);
                  if(!$stmt->execute()) {
                    die($stmt->error);
                    exit();
                  } else {
                 
                    $sqlGet = "SELECT * FROM supplier_transac
                    INNER JOIN supplier_supply 
                    ON supplier_transac.supp_product_id = supplier_supply.supply_id
                    where supplier_transac.supp_product_id = ?;";
                    $stmtGet = $conn->stmt_init();
                    if(!$stmtGet->prepare($sqlGet)) {
                      die($stmtGet->error);
                      exit();
                    } else {
                      $stmtGet->bind_param('s',$supply_id);
                      if(!$stmtGet->execute()) {
                        die($stmtGet->error);
                        exit();
                      } else {
                        $result = $stmtGet->get_result();
                        if($result->num_rows > 0) {
                          if($row = $result->fetch_assoc()) {
                            $get_stock = $row['stock'];
                            $get_quantity = $row['quantity'];
                          }
                        
                          $new_stock = $get_stock + $get_quantity;
                          $updated_at = date('Y-m-d H:i:s');
                          $sqlUpdate = "UPDATE supplier_supply SET stock = ?, supply_updated_at = ?
                          WHERE supply_id = ?;";
                          $stmtUpdate = $conn->stmt_init();
                          if(!$stmtUpdate->prepare($sqlUpdate)) {
                            die($stmtUpdate->error);
                            exit();
                          } else {
                            
                            $stmtUpdate->bind_param('iss',$new_stock,$updated_at,$supply_id);
                            if(!$stmtUpdate->execute()) {
                              die($stmtUpdate->error);
                              exit();
                            } else {
                              echo 'success';
                              exit();
                            }
                          }
                        }
                      }
                    }
                  }
                }
              } else {
                echo 'not exist';
                exit();
              }
          }
         }
        }

        protected function FetchTransaction($conn,$s,$l,$o){
          if($l == ''){
            $l = 5;
          }
          if($o == 'ASC'){
            $sql ="SELECT * FROM supplier_transac
            INNER JOIN supplier_person
            ON supplier_transac.supp_person_id = supplier_person.person_id
            INNER JOIN users
            ON supplier_transac.supp_user_id = users.id
            WHERE supplier_person.fn 
            LIKE '$s%' 
            OR supplier_person.ln 
            LIKE '$s%'
            ORDER BY supplier_transac.transac_created_at
            ASC
            LIMIT
            $l;";
          } else if($o == 'DESC'){
            $sql ="SELECT * FROM supplier_transac
            INNER JOIN supplier_person
            ON supplier_transac.supp_person_id = supplier_person.person_id
            INNER JOIN users
            ON supplier_transac.supp_user_id = users.id
            WHERE supplier_person.fn 
            LIKE '$s%' 
            OR supplier_person.ln 
            LIKE '$s%'
            ORDER BY supplier_transac.transac_created_at
            DESC
            LIMIT
            $l;";
          }
       
          $stmt = $conn->stmt_init();
          if(!$stmt->prepare($sql)) {
            die($stmt->error);
            exit();
          } else{
            if(!$stmt->execute()){
              die($stmt->error);
              exit();
            }else {
              $result = $stmt->get_result();
              $transac_id = [];
              $supp_person_name = [];
              $supp_user_name = [];
              $supp_product_id = [];
              $quantity = [];
              $unit_price = [];
              $created_at = [];
              $updated_at = [];
              if($result->num_rows > 0) {
                while($row = $result->fetch_assoc()){
                  array_push($transac_id,$row['transac_id']);
                  array_push($supp_person_name,$row['fn'] . ' ' . $row['ln']);
                  array_push($supp_user_name,$row['user_fn'] . ' ' . $row['user_ln']);
                  array_push($supp_product_id ,$row['supp_product_id']);
                  array_push($quantity,number_format($row['quantity'],2));
                  array_push($unit_price,number_format($row['unit_price'],2));
                  array_push($created_at,date( "F d Y h:i A", strtotime($row['transac_created_at'])));
                  array_push($updated_at,date( "F d Y h:i A", strtotime($row['transac_updated_at'])));
                }
              } else {
                array_push($transac_id,'no search found');
                array_push($supp_person_name,'no search found');
                array_push($supp_user_name,'no search found');
                array_push($supp_product_id ,'no search found');
                array_push($quantity,'no search found');
                array_push($unit_price,'no search found');
                array_push($created_at,'no search found');
                array_push($updated_at,'no search found');
              }
                $data = array(
                  "transac_id" =>   $transac_id,
                  "supp_person_name" =>  $supp_person_name,
                  "supp_user_name" =>  $supp_user_name,
                  "supp_product_id" => $supp_product_id,
                  "quantity" => $quantity,
                  "unit_price" => $unit_price,
                  "created_at" => $created_at,
                  "updated_at" => $updated_at
                );
                 echo json_encode($data);
              
            }
          }
        }    

        protected function FetchSupplierName($conn){
          $sql = "SELECT * FROM supplier_person;";
          $stmt = $conn->stmt_init();
          if(!$stmt->prepare($sql)){
            die($stmt->error.' - line code 181');
            exit();
          } else {
            if(!$stmt->execute()){
              die($stmt->error.' - line code 185');
              exit();
            } else {
              $result = $stmt->get_result();
              $name = [];
              if($result->num_rows > 0) {
                while($row = $result->fetch_assoc()){
                 array_push($name,$row['fn'] . ' ' . $row['ln']);
                }
                $data = array("name"=>$name);
                echo json_encode($data);
              }
            }
          }
        }
    }
