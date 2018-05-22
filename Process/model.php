<?php 

//session_start();
require_once 'config.php';

class Model extends Database {
    use Users;
    use LogBook;
    use Announcement;
    use Todo;
    use Supplier;
    use Inventory;
 

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

    // Insert Data
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

    // Fetch Data
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
    
    public function modelSearchSupply($search){
        $conn = $this->connection();
        $this->SearchSupply($conn,$search);
    }

    // Delete Data
    public function modelDeleteSupply($id){
        $conn = $this->connection();
        $this->DeleteSupply($conn,$id);
    }

    public function modelDeleteSupplier($id){
        $conn = $this->connection();
        $this->DeleteSupplier($conn,$id);
    }

    public function modelDeleteSupp_Transac($id) {
        $conn = $this->connection();
        $this->DeleteSupp_Transac($conn,$id);
    }

    // Show Data
    public function modelShowSupply($id){
        $conn = $this->connection();
        $this->ShowSupply($conn,$id);
    }

    public function modelShowSupplier($id){
        $conn = $this->connection();
        $this->ShowSupplier($conn,$id);
    }

    public function modelShowTransaction($id){
        $conn = $this->connection();
        $this->ShowTransaction($conn,$id);
    }

    // Update Data
    public function modelUpdatedSupply($id,$supply_id,$ref_name){
        $conn = $this->connection();
        $this->UpdatedSupply($conn,$id,$supply_id,$ref_name);
    }

    public function modelUpdatedSupplier($id,$first,$last,$company,$contact){
        $conn = $this->connection();
        $u_id = $_SESSION['u_id'];
        $this->UpdatedSupplier($conn,$id,$u_id,$first,$last,$company,$contact);
    }

    public function modelUpdateTransaction($id,$supply_id,$quantity,$unit_price){
        $conn = $this->connection();
        $u_id = $_SESSION['u_id'];
        $this->UpdateTransaction($conn,$id,$u_id,$supply_id,$quantity,$unit_price);
    }
}

class InventoryModel extends Model {
    public function modelCreateCategory($name){
        $conn = $this->connection();
        $this->CreateCategory($conn,$name);
    }

    public function modelGetSupply($status){
        $conn = $this->connection();
        $this->getSupply($conn,$status);
    }

    public function modelGetCategory(){
        $conn = $this->connection();
        $this->GetCategory($conn);
    }

    public function modelCreateInventory($supply_id,$category_id,$code,$name,$description,$price,$stock){
        $conn = $this->connection();
        $id = $_SESSION['u_id'];
        $this->CreateInventory($conn,$id,$supply_id,$category_id,$code,$name,$description,$price,$stock);
    }

    public function modelInventoryStock($supply_id,$operator,$stock){
        $conn = $this->connection();
        $this->InventoryStock($conn,$supply_id,$operator,$stock);
    }

    public function modelGetInventory($search){
        $conn = $this->connection();
        $this->GetInventory($conn,$search);
    }

    public function modelUpdateDiscount($id,$vat,$discount,$vatable,$discountable){
        $conn = $this->connection();
        $this->UpdateDiscount($conn,$id,$vat,$discount,$vatable,$discountable);
    }

    public function modelFetchInventory($search,$limit,$order){
        $conn = $this->connection();
        $http = 'post';
        $this->FetchInventory($conn,$search,$limit,$order,$http);
    }

    public function modelShowInventory(){
        $conn = $this->connection();
        $http = 'get';
        $this->FetchInventory($conn,'','','',$http);
        
    }

    public function modelDeleteInventory($id){
        $conn = $this->connection();
        $this->DeleteInventory($conn,$id);
    }

    public function modelUpdateInventory($id,$category,$code,$name,$description,$price){
        $conn = $this->connection();
        $this->UpdateInventory($conn,$id,$category,$code,$name,$description,$price);
    }

    public function modelDeleteCategory($id){
        $conn = $this->connection();
        $this->DeleteCategory($conn,$id);
    }

    public function modelUpdateCategory($id,$category){
        $conn = $this->connection();
        $this->UpdateCategory($conn,$id,$category);
    }
}

$new = new InventoryModel();

//$new->modelDeleteCategory(2);
//$new->modelFetchInventory('Vita','','ASC');
//$new->modelUpdateInventory(1,3,'Vita Vita','Dead food');
//$new->modelFetchInventory();
//$new->modelGetInventory('Coca');
//$new->modelInventoryStock('QW133','decrease',100);
//$ge = new SupplierModel();
//$ge->modelSearchSupply('c');
//$new->modelCreateInventory('112AS',3,'3ds21','Mocha Cake','Chocolaty and sweety','5.0','0');
//$new->modelGetCategory();
//$new->modelGetSupply('assigned');
//$new->modelCreateCategory('fresh meat');
//$new->modelUpdateTransaction(1,2,600,5000);
//$new->modelShowSupplier(2);
//$new->modelUpdatedSupply('28','12345','Milo');
//$new->modelShowSupply('28');
//$new->modelDeleteSupply(18);
//$new->modelFetchTransaction('',4,'ASC');
//$new->modelFetchSupply('');
//$new->modelFetchSupplierName();
//$new->modelSupplierSupplyID('a5310','mang juan');
//$new->modelSupplierSupply('A2310','Jose Manalo',400,2300);

