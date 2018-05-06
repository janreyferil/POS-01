<?php 

//session_start();
require_once 'config.php';

class Model extends Database {
    use Users;
    use LogBook;
    use Announcement;
    use Todo;
    use Supplier;
 

    public function __construct() {
        date_default_timezone_set("Asia/Manila");
    }
        
}

class UserModel extends Model {
    public function modelRegisUser($uid,$pwd,$role,$credential,$fn,$ln) {
        $conn = $this->connection();
        $this->regisUser($conn,$uid,$pwd,$role,$credential,$fn,$ln);  
    }

    public function SuppPerson($name,$date) {
        $conn = $this->connection();
        $this->person($conn,$name,$date);
    }

    public function modelAdminDefault($r) {
        $conn = $this->connection();
        $this->adminDefault($conn,$r);
    }

    public function modelLoginAdmin($uid,$pwd) {
        $conn = $this->connection();
        $role = 'admin';
        $this->Login($conn,$uid,$pwd,$role);
    }

    public function modelFetch() {
        $conn = $this->connection();
        if(!isset($_SESSION['u_id'])) {
            $id = $_SESSION['a_id'];
            return $this->Fetch($conn,$id);
            exit();
        } elseif(!isset($_SESSION['a_id'])) {
          $id = $_SESSION['u_id'];
          return $this->Fetch($conn,$id);
          exit();
        }
  
    }

    public function modelSetting($uid,$cpwd,$npwd) {
        $conn = $this->connection();
        if(!isset($_SESSION['u_id'])) {
            $id = $_SESSION['a_id'];
            $header =  header("Location: ../../../admin.php?home=password");
            $this->Setting($conn,$id,$uid,$cpwd,$npwd,$header);
            header("Location: ../../../admin.php?update=success");
            exit();
        } elseif(!isset($_SESSION['a_id'])) {
          $id = $_SESSION['u_id'];
          $header =  header("Location: ../../../user.php?home=password");
          $this->Setting($conn,$id,$uid,$cpwd,$npwd,$header);
          header("Location: ../../../user.php?update=success");
          exit();
        }
    }

    public function modelSettingCredential($ccred,$ncred) {
        $conn = $this->connection();
        $sessionID = $_SESSION['a_id'];
        return  $this->SettingCredential($conn,$sessionID,$ccred,$ncred);
    }

    public function modelLoginUser($uid,$pwd) {
        $conn = $this->connection();
        $role = 'user';
        $this->Login($conn,$uid,$pwd,$role);
    }

    
  public function modelStatus() {
      $conn = $this->connection();
      if(!isset($_SESSION['u_id'])) {
          $id = $_SESSION['a_id'];
          $this->Status($conn,$id);
          exit();
      } elseif(!isset($_SESSION['a_id'])) {
        $id = $_SESSION['u_id'];
        $this->Status($conn,$id);
        exit();
      }
  }
} 

class LogBookModel extends Model {

  public function modelTimeOut(){
      $conn = $this->connection();
      $this->TimeOut($conn);
  }

  public function modelUserFetchTime($search,$role,$offset,$order) {
    $conn = $this->connection();
    $this->FetchTime($conn,$search,$role,$offset,$order);
  }

  public function modelClock(){
     echo $this->Clock();
  }

  public function modelDeleteTime($id) {
      $conn = $this->connection();
      $this->DeleteTime($conn,$id);
  }
}

class AnnouncementModel extends Model {
    public function modelCreateAnnounce ($title,$body){
        $conn = $this->connection();
        $this->createAnnounce($conn,$title,$body);
    }

    public function modelFetchAnnounce (){
        $conn = $this->connection();
       $this->FetchAnnounce($conn);
    }

    public function modelEditAnnounce($id,$title,$body){
        $conn = $this->connection();
        $this->EditAnnounce($conn,$id,$title,$body);
    }

    public function modelDeleteAnnounce($id) {
        $conn = $this->connection();
        $this->DeleteAnnounce($conn,$id);
    }
}

class TodoModel extends Model {

    public function modelTodoFetch(){
        $conn = $this->connection();
        if(isset($_SESSION['u_id'])) {
            $id = $_SESSION['u_id'];
        }
        $this->FetchTodo($conn,$id);
    }

    public function modelTodoCreate($body) {
        $conn = $this->connection();
        if(isset($_SESSION['u_id'])) {
            $id = $_SESSION['u_id'];
        }
        $this->CreateTodo($conn,$id,$body);
    }

    public function modelDeleteTodo($id) {
        $conn = $this->connection();
        $this->DeleteTodo($conn,$id);
    }
}

class SupplierModel extends Model {
    public function modelSupplierPerson($fn,$ln,$company,$contact) {
        $conn = $this->connection();
        $id = $_SESSION['u_id'];
        $this->SupplierPerson($conn,$id,$fn,$ln,$company,$contact);
    }

    public function modelSupplierSupplyID($s_id,$ref_name) {
        $conn = $this->connection();
        $this->SupplierSupplyID($conn,$s_id,$ref_name);
    }

    public function modelSupplierSupply($person_name,$supply_id,$quantity,$unit_price) {
        $conn = $this->connection();
        $id = $_SESSION['u_id'];
        $this->SupplierSupply($conn,$person_name,$id,$supply_id,$quantity,$unit_price);
    }

    public function modelFetchSupplierName(){
        $conn = $this->connection();
        $this->FetchSupplierName($conn);
    }

    public function modelFetchSupply($search,$limit,$order){
        $conn = $this->connection();
        $this->FetchSupply($conn,$search,$limit,$order);
    }

    public function modelFetchSupplier($search,$limit,$order){
        $conn = $this->connection();
        $this->FetchSupplier($conn,$search,$limit,$order);
    }

    public function modelFetchTransaction($search,$limit,$order){
        $conn = $this->connection();
        $this->FetchTransaction($conn,$search,$limit,$order);
    }

    public function modelDeleteSupply($id){
        $conn = $this->connection();
        $this->DeleteSupply($conn,$id);
    }

    public function modelShowSupply($id){
        $conn = $this->connection();
        $this->ShowSupply($conn,$id);
    }
}

$new = new SupplierModel();
//$new->modelShowSupply('28');
//$new->modelDeleteSupply(18);
//$new->modelFetchTransaction('',4,'ASC');
//$new->modelFetchSupply('');
//$new->modelFetchSupplierName();
//$new->modelSupplierSupplyID('a5310','mang juan');
//$new->modelSupplierSupply('A2310','Jose Manalo',400,2300);

