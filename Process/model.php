<?php 


require_once 'config.php';

class Model extends Database {
    use Users;
    use LogBook;
    use Supplier;
    use Announcement;
    use Todo;

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

$new = new TodoModel();
//$new->modelDeleteTodo(2);
//$new->modelTodoCreate('Hello I am Janrey from SoftJan');

//$new->modelTodoFetch();
//$new->modelDeleteAnnounce(40);
//$new->modelCreateAnnounce('janrey','hello guys');

//$new->modelUserFetchTime('','user',20,true);
//$new->modelSettingCredential('','123456');
