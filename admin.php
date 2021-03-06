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
    <link rel="stylesheet" href="CSS/lib/bootstrap.css">
    <script src="JS/lib/jquery-3.2.1.min.js"></script>
    <script src="JS/lib/bootstrap.min.js"></script>
    <link rel="stylesheet" href="CSS/lib/fontawesome/web-fonts-with-css/css/fontawesome-all.min.css">
    <link rel="stylesheet" href="CSS/lib/fontawesome/web-fonts-with-css/css/font-awesome-animation.css">
</head>
<body id="loader">
    <?php 
        if(!isset($_SESSION['a_id'])) {
            echo '<h1>Unauthorized Page</h1>';
        } else {
            include_once 'HTTP/GET/users/fetch.php';
            include_once 'layout/adminnavbar.php';
            echo '<div class="container">';
            include_once 'HTTP/GET/validate.php';
            
            echo '
            <div id="go"></div>
            <div id="status"></div>
            <input type="hidden" id="username" value="'.$username.'">
            <div id="setting"></div>
            <div class="card border-success mt-3 mb-3" style="max-width: 54rem;">
            <div class="card-header text-success">

            <div id="popShow" class="float-right form-inline text-success">
            <i class="fas fa-newspaper ml-3 mr-2 mb-1"></i><h5 class="noselect mt-1">Announcement</h5>
            </div>

            <div id="popCreate" class="float-right form-inline text-success">
            <i class="fas fa-plus ml-3 mr-2 mb-1"></i><h5 class="noselect mt-1">Create</h5>
            </div>

            <h1><b>Create Announcement<b></h1>
            </div>
            <div class="card-body">
            <div class="text-light" id="createAnn"></div>
            </div>

            </div>
            <div class="card border-success mt-3 mb-3" style="max-width: 54rem;">
            <div class="card-header">
            <div id="userlogbook" class="float-right form-inline text-success">
            <i class="fas fa-book ml-3 mr-2 mb-1"></i><h5 class="noselect mt-1">User Logbook</h5>
            </div>
            <div id="adminlogbook" class="float-right form-inline text-success">
            <i class="fas fa-book ml-3 mr-2 mb-1"></i><h5 class="noselect mt-1">Admin Logbook</h5>
            </div>
            <h1 class="text-success"><b>Logbook</b></h1>
            </div>

            <div class="card-body">
        
            
            <div class="form-inline mb-2">
                   <form id="myForm">
                      <div class="form-group">
                        <div class="text-light input-group-addon"><i id="lighten1" class="fas fa-search"></i></div>
                        <input class="form-control" type="text" name="search" id="search">

                        <div class="text-light input-group-addon ml-2"><i id="lighten2" class="fas fa-database"></i></div>
                        <input class="form-control" type="text" name="val" id="val">
                        </div>
                        </form>

                    <form id="myForm_2">
                    <div class="form-group">
                        <div class="text-light input-group-addon ml-2"><i id="lighten3" class="fas fa-sort"></i></div>
                        <select class="form-control" id="order" name="order">
                        <option value="DESC">DESECENDING ORDER</option>
                        <option value="ASC">ASCENDING ORDER</option>
                        </select>
                    </div>
                    </form>
             </div>
       
            <div id="userfetchtime"></div>   
            <div id="adminfetchtime"></div>
            </div>
            </div>
            <div class="modal fade" id="del"></div>
            </div>';
            echo '<script src="JS/timer.js"></script>';
            echo '<script src="JS/admin/main.js"></script>';
        }
    ?>
</body>
</html>