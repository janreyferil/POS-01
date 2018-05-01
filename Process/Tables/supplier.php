<?php 
    trait Supplier  {
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
                          $sqlUpdate = "UPDATE supplier_supply SET stock = ?, updated_at = ?
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