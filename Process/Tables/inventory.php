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
}
