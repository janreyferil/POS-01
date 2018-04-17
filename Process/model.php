<?php 


require_once 'config.php';

class Model extends Database {
    use Users;
    use LogBook;
    use Supplier;
        
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
        $this->Login($conn,$uid,$pwd);
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
            $this->Setting($conn,$id,$uid,$cpwd,$npwd);
            header("Location: ../../../admin.php?update=success");
            exit();
        } elseif(!isset($_SESSION['a_id'])) {
          $id = $_SESSION['u_id'];
          $this->Setting($conn,$id,$uid,$cpwd,$npwd);
          header("Location: ../../../user.php?update=success");
          exit();
        }
    }

    public function modelSettingCredential($ccred,$ncred) {
        $conn = $this->connection();
        $sessionID = $_SESSION['a_id'];
        return  $this->SettingCredential($conn,$sessionID,$ccred,$ncred);
    }

    public function modelLoginUser() {
        $conn = $this->connection();
        $this->Login($conn,$uid,$pwd);
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

  public function modelUserFetchTime($search,$role) {
    $conn = $this->connection();
    $this->FetchTime($conn,$search,$role);
  }

  public function modelClock(){
     echo $this->Clock();
  }

}

$new = new UserModel();

//$new->modelSettingCredential('','123456');
