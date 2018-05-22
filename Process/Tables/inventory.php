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

        $result = $conn->query($sql);
        $id = [];
        $supply_id = [];
        $ref_name = [];
        $stock = [];
        if($result->num_rows > 0){

            while($row = $result->fetch_assoc()){
            array_push($id,$row['id']);
            array_push($supply_id,$row['supply_id']);
            array_push($ref_name,$row['ref_name']);
            array_push($stock,$row['stock']);
            }
            $data = array("id"=>$id,
            "supply_id"=>$supply_id,
            "ref_name"=>$ref_name,
            "stock"=>$stock);
        } else {
            $data = array("id"=>0,
            "supply_id"=>'no result',
            "ref_name"=>'no result',
            "stock"=>'no result');
        }


        } elseif($s == 'assigned'){
        $info = $conn->real_escape_string('assigned');
        $sql = "SELECT * FROM supplier_supply 
        INNER JOIN inventory_product 
        ON supplier_supply.supply_id = inventory_product.supp_product_id
        WHERE supplier_supply.status = '$info';";

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
        $description = $conn->real_escape_string(ucfirst($d));
        $price = $conn->real_escape_string(round($p,2));
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
                                    $sqlDis = "INSERT INTO inventory_discount(product_code,vatable,discountable) VALUES(?,?,?);";
                                    $stmtDis = $conn->stmt_init();
                                        if(!$stmtDis->prepare($sqlDis)){
                                            die($sqlDis->error);
                                            exit();
                                        } else {
                                            $vat = 0.12;
                                            $vatable = round($price + ($price * $vat),2);
                                            $discountable = $vatable;
                                            $stmtDis->bind_param('sdd',$code,$vatable,$discountable);
                                            if(!$stmtDis->execute()){
                                                die($sqlDis->error);
                                                exit();
                                            } else {     
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

    protected function GetInventory($conn,$s){
        $search = $conn->real_escape_string($s.'%');
        $sqlSearch = "SELECT * FROM inventory_product 
        INNER JOIN inventory_discount
        ON inventory_product.code = inventory_discount.product_code
         WHERE inventory_product.name LIKE ? GROUP BY inventory_product.name ASC LIMIT 1;";
        $stmtSearch = $conn->stmt_init();
        if(!$stmtSearch->prepare($sqlSearch)){
            die($stmtSearch->error);
            exit();
        } else  {
            $stmtSearch->bind_param('s',$search);
            if(!$stmtSearch->execute()){
                die($stmtSearch->error);
                exit();   
            } else {
                $result = $stmtSearch->get_result();
                if($result->num_rows > 0){
                    if($row = $result->fetch_assoc()){
                        $id = $row['discount_id'];
                        $code = $row['code'];
                        $name = $row['name'];
                        $price = floatval(number_format($row['price'],2));
                        $vat = floatval(number_format($row['vat'],2));
                        $discount = floatval(number_format($row['discount'],2));
                    }
                    $data = array(
                        "id"=>$id,
                        "code"=>$code,
                        "name"=>$name,
                        "price"=>$price,
                        "vat"=>$vat,
                        "discount"=>$discount
                    );
                } else {
                    $data = array(
                        "id"=>0,
                        "code"=>'no search found',
                        "name"=>'no search found',
                        "price"=>'no search found',
                        "vat"=>'no search found',
                        "discount"=>'no search found',
                    );
                }
                echo json_encode($data);
                exit();
            }
        }
    }

    protected function UpdateDiscount($conn,$id,$v,$d,$vable,$dable){
        $discount_id = $conn->real_escape_string($id);
        $vat = $conn->real_escape_string($v / 100);
        $discount = $conn->real_escape_string($d / 100);
        $vatable = $conn->real_escape_string($vable);
        $discountable = $conn->real_escape_string($dable);
        $updated_at = date('Y-m-d H:i:s');

        $sql ="UPDATE inventory_discount SET vat = ?,discount = ?,
        vatable = ?, discountable = ?, discount_updated_at = ? WHERE discount_id = ?;";

        $stmt = $conn->stmt_init();
        if(!$stmt->prepare($sql)){
            die($stmt->error);
            exit();
        }else{
            $stmt->bind_param('ddddsi',$vat,$discount,$vatable,
            $discountable,$updated_at,$discount_id);
            if(!$stmt->execute()){
                die($stmt->error);
                exit();
            }else{
                echo 'success';
                exit();
            }
        }
    }

    protected function FetchInventory($conn,$s,$l,$o,$http){
        if($http == 'post'){
            if($l == ''){
                $l = 5;
            }
            if($o == 'ASC'){
                $sql = "SELECT * FROM inventory_category 
                INNER JOIN inventory_product
                ON inventory_category.category_id = inventory_product.inventory_category_id
                INNER JOIN inventory_discount
                ON inventory_product.code = inventory_discount.product_code
                INNER JOIN users 
                ON inventory_product.user_id = users.id
                WHERE inventory_product.name
                LIKE '$s%'
                ORDER BY inventory_product.name
                ASC
                LIMIT $l;";
            } else if($o == 'DESC'){
                $sql = "SELECT * FROM inventory_category 
                INNER JOIN inventory_product
                ON inventory_category.category_id = inventory_product.inventory_category_id
                INNER JOIN inventory_discount
                ON inventory_product.code = inventory_discount.product_code
                INNER JOIN users 
                ON inventory_product.user_id = users.id
                WHERE inventory_product.name
                LIKE '$s%'
                ORDER BY inventory_product.name
                DESC
                LIMIT $l;";
            }

        } else if($http == 'get') {
            $sql = "SELECT * FROM inventory_category 
            INNER JOIN inventory_product
            ON inventory_category.category_id = inventory_product.inventory_category_id
            INNER JOIN inventory_discount
            ON inventory_product.code = inventory_discount.product_code
            INNER JOIN users 
            ON inventory_product.user_id = users.id;";
        }
       
        $result = $conn->query($sql);

        $id = [];
        $registrar = [];
        $supply_id = [];
        $category_id = [];
        $category = [];
        $code = [];
        $name = [];
        $description = [];
        $price = [];
        $stock = [];
        $vat = [];
        $discount = [];
        $vatable = [];
        $discountable = [];
        $created_at = [];
        $updated_at = [];

        if($result->num_rows > 0){
            while($row = $result->fetch_assoc()){
                array_push($id,$row['inventory_id']);
                array_push($registrar,$row['user_fn'] . ' ' .$row['user_ln']);      
                array_push($supply_id,$row['supp_product_id']);
                array_push($category_id,$row['category_id']);
                array_push($category,$row['category_name']);
                array_push($code,$row['code']);
                array_push($name,$row['name']);
                array_push($description,$row['description']);
                array_push($price,'₱ '.number_format($row['price'],2));
                array_push($vat,$row['vat']);
                array_push($discount,$row['discount']);  
                array_push($vatable,'₱ '.number_format($row['vatable'],2));
                array_push($discountable,'₱ '.number_format($row['discountable'],2)); 
                array_push($created_at,$row['product_created_at']);
                array_push($updated_at,$row['product_updated_at']);         
            }
            $data = array("id"=>$id,
            "registrar"=>$registrar, "supply_id"=>$supply_id,
            "category_id"=>$category_id, "category"=>$category, "code"=>$code,
            "name"=>$name, "description"=>$description,
            "price"=>$price, "vat"=>$vat, "discount"=>$discount,
            "vatable"=>$vatable, "discountable"=>$discountable,
            "created_at"=>$created_at,"updated_at"=>$updated_at);            
        } else {
            $data = array("id"=>[0],
            "registrar"=>['no search'], "supply_id"=>['no search'],
            "category_id"=>['no search'],"category"=>['no search'], "code"=>['no search'],
            "name"=>['no search'], "description"=>['no search'],
            "price"=>['no search'], "vat"=>['no search'], "discount"=>['no search'],
            "vatable"=>['no search'], "discountable"=>['no search'],
            "created_at"=>['no search'],"updated_at"=>['no search']);
        }
        echo json_encode($data);
        exit();
    }

    protected function DeleteInventory($conn,$i){
        $id = $conn->real_escape_string($i);
        
        $sql = "DELETE FROM inventory_product WHERE inventory_id = ?;";
        $stmt = $conn->stmt_init();
        if(!$stmt->prepare($sql)){
            die($stmt->error);
            exit();
        } else {
            $sqlGet = "SELECT * FROM inventory_product WHERE inventory_id = $id;";
            $result = $conn->query($sqlGet);
            if($result->num_rows > 0){
                if($row = $result->fetch_assoc()){
                    $code = $row['code'];
                    $stock = $row['inventory_stock'];
                }
                $sqlDel = "DELETE FROM inventory_discount WHERE product_code = ?;";
                $stmtDel = $conn->stmt_init();
                if(!$stmtDel->prepare($sqlDel)){
                    die($stmtDel->error);
                    exit();
                } else {
                    if($stock != 0){
                        echo 'cannot';
                        exit();
                    } else {
                        $stmt->bind_param('i',$id);
                        $stmtDel->bind_param('s',$code);
                        if(!$stmt->execute() || !$stmtDel->execute()){
                            die($stmtDel->error || $stmtDel->error);
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

    protected function UpdateInventory($conn,$i,$c,$co,$n,$d,$p){
        $id = $conn->real_escape_string($i);
        $code = $conn->real_escape_string($co);
        $category = $conn->real_escape_string($c);
        $name = $conn->real_escape_string(ucwords($n));
        $description = $conn->real_escape_string(ucfirst($d));
        $price =  $conn->real_escape_string($p);

        $updated_at = date('Y-m-d H:i:s');
        $sql = "UPDATE inventory_product SET inventory_category_id =$category,code = '$code',name = '$name', description = '$description',price='$price',product_updated_at = '$updated_at' WHERE inventory_id = $id;";
        $conn->query($sql);
        $sqlGet = "SELECT * FROM inventory_discount WHERE discount_id = $id;";
        $result = $conn->query($sqlGet);
        if($result->num_rows > 0){
            if($row = $result->fetch_assoc()){
                $vat = $row['vat'];
                $discount = $row['discount'];
            }
            
            $vatable = ($vat * $price) + $price;
            $discountable =  $vatable - ($vatable * $discount);

            $sqlUpdate = "UPDATE inventory_discount SET product_code = '$code',vatable = $vatable,discountable = $discountable WHERE discount_id = $id;";
            $conn->query($sqlUpdate);
            echo 'success';
            exit();
        }
    }

    protected function DeleteCategory($conn,$i){
        $id = $conn->real_escape_string($i);
        
        $sqlExist = "SELECT * FROM inventory_product WHERE inventory_category_id = $id;";
        $result = $conn->query($sqlExist);
        if($result->num_rows > 0){
            echo 'exist';
            exit();
        } else {
            $sql = "DELETE FROM inventory_category WHERE category_id = $id;";
            $conn->query($sql);
            echo 'success';
            exit();
        }
    }

    protected function UpdateCategory($conn,$i,$c){
        $updated_at = date('Y-m-d H:i:s');
        $id = $conn->real_escape_string($i);
        $category = $conn->real_escape_string($c);

        $sql = "UPDATE inventory_category SET category_name = '$category', updated_at = '$updated_at' WHERE category_id = $id;";
        
        if(!$conn->query($sql)){
            die($conn->error);
            exit();
        } else {
            echo 'success';
            exit();
        }
     
    }
}
