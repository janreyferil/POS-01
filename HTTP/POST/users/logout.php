<?php 
   
     /* if(!isset($_POST['logout'])) {
        header('Location: ../../../');
        exit(); 
      } else {        } */

      require_once '../../../Process/model.php';
      $time = new LogBookModel();
      $time->modelTimeOut();    
      session_start();
      session_unset();
      session_destroy();
      header('Location: ../../../');
      exit();    
?>