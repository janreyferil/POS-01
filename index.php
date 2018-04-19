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
    <link rel="stylesheet" href="CSS/lib/fontawesome/web-fonts-with-css/css/fontawesome-all.min.css">
    <link rel="stylesheet" href="CSS/lib/fontawesome/web-fonts-with-css/css/font-awesome-animation.css">
    <title>Home Page</title>

</head>
<body>
<?php 
        if(isset($_SESSION['a_id'])) {
        header('Location: admin.php');
        exit();
        } elseif(isset($_SESSION['u_id'])) {
        header('Location: user.php');
        exit();
        }
        else {
        include_once 'layout/navbar.php';
        echo '<div class="container mt-3 mb-3">';
        include_once 'HTTP/GET/validate.php';
        echo '<div id="signup">
        </div>
        <div id="ulogin">
        </div>
        <div id="alogin">
        </div>
        </div>';
        echo '<script type="module" src="JS/index/main.js"></script>';
        echo '<script type="text/javascript module" src="JS/index/sample.php"></script>';
        }
        echo '<div class="container">';
        require_once 'HTTP/POST/users/adminsignup.php'; 
?>
        </div>
</body>
</html>