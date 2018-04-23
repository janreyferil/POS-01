<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="CSS/lib/bootstrap.css">
    <script src="JS/lib/jquery-3.2.1.min.js"></script>
    <script src="JS/lib/bootstrap.min.js"></script>
    <link rel="stylesheet" href="CSS/lib/fontawesome/web-fonts-with-css/css/fontawesome-all.min.css">
    <link rel="stylesheet" href="CSS/lib/fontawesome/web-fonts-with-css/css/font-awesome-animation.css">
    <title>
    <?php
        if(!isset($_SESSION['u_id'])) {
            echo 'Unauthorized Page';
        } else {
            echo 'User Page';
        }
    ?>
    </title>
    <style>
        table {
            margin-bottom: 10px;
            margin-top: 10px;
        }
        table, th, td {
                border: 1px solid teal;
       }
       th {
           font-weight : bold;
       }
    </style>
</head>
<body>
    <?php
        if(!isset($_SESSION['u_id'])) {
            echo '<h1>Unauthorized Page</h1>';
        } else {
            include_once 'HTTP/GET/users/fetch.php';
            include_once 'layout/usernavbar.php';
            echo '<div class="container">';
            include_once 'HTTP/GET/validate.php';
            echo '
            <div id="status"></div>
            <input type="hidden" id="username" value="'.$username.'">
            <div id="setting"></div>
            <div class="card text-white border-success mb-3" style="max-width: 25rem;">
            <div class="card-header">
            <i class="float-right faa-shake animated-hover mt-4 fa fa-plus-square fa-2x " id="create"></i>
            <i class="float-right mt-4 mr-4 fas fa-eye faa-burst animated-hover faa-fast fa-2x" id="show"></i>
            <h1><b><i class="fas fa-clipboard-list fa-lg mt-3 faa-wrench animated"></i> To-Do List</b></h1></div>
            <div class="card-body">
            <div id="todo"></div>
            </div>
            </div> 
     
            
            <div class="modal fade" id="del">
        </div>';
            echo '<script src="JS/timer.js"></script>';
            echo '<script src="JS/user/main.js"></script>';
            echo '<script src="JS/user/todo.js"></script>';
        }
    ?>
</body>
</html>
