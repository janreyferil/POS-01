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
            include_once 'HTTP/POST/users/fetch.php';
            echo '<h3 style="text-align: right;" id="timer"></h3>
            <div id="know"></div>
            <div id="status"></div>
            <button id="user">Account Setting</button>
            <input type="hidden" id="username" value="'.$username.'">
            <form action="HTTP\POST\users\logout.php" method="POST">
            <input type="submit" name="logout" value="logout">
            </form>
            <div id="setting"></div>';
            echo '<script src="JS/timer.js"></script>';
            echo '<script src="JS/user/main.js" type="module"></script>';
        }
    ?>
</body>
</html>