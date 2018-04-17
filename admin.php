<?php  
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>
    <?php 
        if(!isset($_SESSION['a_id'])) {
            echo 'Unauthorized Page';
        } else {
            echo 'Admin Page';
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
        if(!isset($_SESSION['a_id'])) {
            echo '<h1>Unauthorized Page</h1>';
        } else {
            include_once 'HTTP/POST/users/fetch.php';
            echo '<h3 style="text-align: right;" id="timer"></h3>
            <div id="know"></div>
            <div id="status"></div>
            <input type="hidden" id="username" value="'.$username.'">
            <button id="admin">Account Setting</button>
            <form action="HTTP\POST\users\logout.php" method="POST">
            <input type="submit" name="logout" value="Logout">
            </form>
            <div id="setting"></div>
            <form id="myForm">
            <input type="text" name="search" id="search" placeholder="Search for Log">
            </form>
            <div id="userfetchtime"></div>    
            <div id="adminfetchtime"></div>';
            echo '<script src="JS/timer.js"></script>';
            echo '<script src="JS/admin/main.js" type="module"></script>';
        }
    ?>
</body>
</html>