<?php 

    /**
     * 
     */
trait Inventory
{       
    // Category
    protected function CreateCategory($conn,$n){
        $name = $conn->real_escape_string(ucwords($n));
        $sqlExist = "SELECT * FROM inventory_category WHERE category_name = ?;";
        $stmtExist = $conn->stmt_init();
        if(!$stmtExist->prepare($sqlExist)){
            die($stmtExist->error);
            exit();
        } else {
            $stmtExist->bind_param('s',$name);
            if(!$stmtExist->execute()){
                die($stmtExist->error);
                exit();
            }else {
                $result = $stmtExist->get_result();
                if($result->num_rows >= 1){
                    echo 'taken'; 
                    exit();
                } else {
                    $sql = "INSERT INTO inventory_category(category_name) VALUES(?);";
                    $stmt = $conn->stmt_init();
                    if(!$stmt->prepare($sql)){
                        die($stmt->error);
                        exit();
                    }else{
                        $stmt->bind_param('s',$name);
                        if(!$stmt->execute()){
                            die($stmt->error);
                            exit();
                        }else{
                            echo 'success';
                            exit();
                        }
                    }
                }
            }
        }
    } 

    protected function GetCategory($conn){
        $sql = "SELECT * FROM inventory_category;";
        $result = $conn->query($sql);
        $category_id = [];
        $category_name = [];
        if($result->num_rows > 0){
            while($row = $result->fetch_assoc()){
                array_push($category_id,$row['category_id']);
                array_push($category_name,$row['category_name']);
            }
        } else {
            array_push($category_id,0);
            array_push($category_name,'None');
        }
        $data = array(
            "category_id" => $category_id,
            "category_name" => $category_name
        );
        echo json_encode($data);

    }

    //Inventory
    protected function GetSupply($conn,$s){
        if($s == 'not assigned'){
            $info = $conn->real_escape_string('not assigned');
            $sql = "SELECT * FROM supplier_supply WHERE status = '$info';";
        } elseif($s == 'assigned'){
        $info = $conn->real_escape_string('assigned');
        $sql = "SELECT * FROM supplier_supply 
        INNER JOIN inventory_product 
        ON supplier_supply.supply_id = inventory_product.supp_product_id
        WHERE supplier_supply.status = '$info';";
        }
      
        $result = $conn->query($sql);
        $id = [];
        $supply_id = [];
        $ref_name = [];
        $stock = [];
        $inv_stock = [];
        if($result->num_rows > 0){
        
            while($row = $result->fetch_assoc()){
               array_push($id,$row['id']);
               array_push($supply_id,$row['supply_id']);
               array_push($ref_name,$row['ref_name']);
               array_push($stock,$row['stock']);
               array_push($inv_stock,$row['inventory_stock']);
            }
            $data = array("id"=>$id,
            "supply_id"=>$supply_id,
            "ref_name"=>$ref_name,
            "stock"=>$stock,
            "inv_stock"=>$inv_stock);
        } else {
            $data = array("id"=>0,
            "supply_id"=>'no result',
            "ref_name"=>'no result',
            "stock"=>'no result',
            "inv_stock"=>'no result');
        }
        echo json_encode($data);
        exit();
    }

    protected function CreateInventory($conn,$u_id,$s_id,$c_id,$c,$n,$d,$p,$st){
        $user_id = $conn->real_escape_string($u_id);
        $supply_id = $conn->real_escape_string($s_id);
        $category_id = $conn->real_escape_string($c_id);
        $code = $conn->real_escape_string(strtoupper($c));
        $name = $conn->real_escape_string(ucwords($n));
        $description = $conn->real_escape_string(ucwords($d));
        $price = $conn->real_escape_string($p);
        $stock = $conn->real_escape_string($st);
        $updated_at = date('Y-m-d H:i:s');
        $status = $conn->real_escape_string('assigned');

        $sqlExist = "SELECT * FROM inventory_product WHERE code = ?;";
        $stmtExist = $conn->stmt_init();
        if(!$stmtExist->prepare($sqlExist)){
            die($stmt->error);
            exit();
        } else {
            $stmtExist->bind_param('s',$code);
            if(!$stmtExist->execute()){
                die($stmt->error);
                exit();
            } else {
                $resultExist = $stmtExist->get_result();
                if($resultExist->num_rows == 1){
                    echo 'taken';
                    exit();
                } else {
                    $sql = "INSERT INTO inventory_product(
                        user_id,
                        supp_product_id,
                        inventory_category_id,
                        code,
                        name,
                        description,
                        price,
                        inventory_stock
                   ) VALUES(?,?,?,?,?,?,?,?);";
                   
                   $stmt = $conn->stmt_init();
                   if(!$stmt->prepare($sql)){
                       die($stmt->error .' --code 124');
                       exit();
                   } else {
                       $sqlSupply = "SELECT * FROM supplier_supply WHERE supply_id = ?;";
                       $stmtSupply = $conn->stmt_init();
                       if(!$stmtSupply->prepare($sqlSupply)){
                           die($stmt->error .' --code 130');
                           exit();
                       }else{
                           $stmtSupply->bind_param('s',$supply_id);
                           if(!$stmtSupply->execute()){
                               die($stmt->error .' --code 135');
                               exit();  
                           } else {
                               $result = $stmtSupply->get_result();
                               if($result->num_rows >0){
                                   if($rowSupply=$result->fetch_assoc()){
                                       $get_stock = $rowSupply['stock'];
                                   }
                               }
                               if($get_stock < $stock){
                                   echo 'enough';
                                   exit();
                               }
                               $new_stock = $get_stock - $stock;
                               $sqlUpdate = "UPDATE supplier_supply SET stock=?,supply_updated_at=?,status=? WHERE supply_id = ?;";
                               $stmtUpdate = $conn->stmt_init();
                               if(!$stmtUpdate->prepare($sqlUpdate)){
                                   die($stmtUpdate->error .' --code 147');
                                   exit();
                               }else{
                                   $stmtUpdate->bind_param('isss',$new_stock,$updated_at,$status,$supply_id);
                                   if(!$stmtUpdate->execute()){
                                       die($stmtUpdate->error .' --code 154');
                                       exit();
                                   } else {
                                       $stmt->bind_param('isisssdi',$user_id,
                                       $supply_id,$category_id,$code,$name,$description,
                                       $price,$stock);
                                       if(!$stmt->execute()){
                                           die($stmt->error .' --code 160');
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
            }
        }

       
    }

    protected function InventoryStock($conn,$s_id,$o,$s){
        $supply_id = $conn->real_escape_string($s_id);
        $stock = $conn->real_escape_string($s);
            $sqlGet = "SELECT * from inventory_product WHERE supp_product_id = ?;";
            $stmtGet = $conn->stmt_init();
            if(!$stmtGet->prepare($sqlGet)){
                die($stmtGet->error);
                exit();
            } else{

                $stmtGet->bind_param('s',$supply_id);
                if(!$stmtGet->execute()){
                    die($stmtGet->error);
                    exit();
                } else{

                    $result = $stmtGet->get_result();
                    if($result->num_rows > 0){
                        
                        if($row = $result->fetch_assoc()){
                            $get_stock = $row['inventory_stock'];
                        }
                        
                        $sqlSupply = "SELECT * FROM supplier_supply WHERE supply_id = '$supply_id';";
                        $resultGet = $conn->query($sqlSupply);
                        if($resultGet->num_rows >0){
                            if($rowSupply = $resultGet->fetch_assoc()){
                                $max = $rowSupply['stock'];
                            }
                        }
                       
                            if($o == 'increase'){
                                if($max < $stock){
                                    echo 'enough';
                                    exit();
                                } else {
                                    $inv_new_stock = $get_stock + $stock;
                                    $supp_new_stock = $max - $stock;
                                }
                
                            } elseif($o == 'decrease') {
                                if($get_stock < $stock){
                                    echo 'enough';
                                    exit();
                                } else {
                                $inv_new_stock = $get_stock - $stock;
                                $supp_new_stock = $max + $stock;
                                }
                            }

                            $sqlUpdateInv = "UPDATE inventory_product SET inventory_stock = $inv_new_stock WHERE supp_product_id = '$supply_id';";
                            $sqlUpdateSupp = "UPDATE supplier_supply SET stock = $supp_new_stock WHERE supply_id = '$supply_id';";
                            $conn->query($sqlUpdateInv);
                            $conn->query($sqlUpdateSupp);
                            echo 'success';
                            exit();
                         
                       
                    }
                }
            }
        }

}
