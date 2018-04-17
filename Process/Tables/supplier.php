<?php 
    trait Supplier
    {
        public function person($conn,$name,$date) {
            $sql = 'INSERT INTO supplier_person(supp_name,supp_date) VALUES(?,?);';
            $stmt = $conn->stmt->init();
            if(!$stmt->prepare($sql)) {
                return 'No SQl';
            } else {
                $stmt->bind->param('ss',$name,$date);
                $stmt->execute();
            }
        }   
    }

