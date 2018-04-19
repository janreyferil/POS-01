

function SignUp(signup,ulogin,alogin) {
    let output = `
  <div class="card border-success mb-3 mx-auto" style="max-width: 30rem;">
  <div class="card-header"><h3 class="text-success">Sign up</b></h3></div>
  <div class="card-body text-success">
  <form action="HTTP/POST/users/usersignup.php" method="post">
    <div class="form-group">
    <label for="exampleInputEmail1"><b>First Name</b></label>
    <input class="form-control" type="text" name="fn">
    </div>
    <div class="form-group">
    <label for="exampleInputEmail1"><b>Last Name</b></label>
    <input class="form-control" type="text" name="ln">
    </div>
    <div class="form-group">
    <label for="exampleInputEmail1"><b>Username</b></label>
    <input class="form-control" type="text" name="uid">
    </div>
    <div class="form-group">
    <label for="exampleInputEmail1"><b>Password</b></label>
    <input class="form-control" type="password" name="pwd">
    </div>
    <div class="form-group">
    <label for="exampleInputEmail1"><b>Confirmation to Admin</b></label>
    <input class="form-control" type="password" name="cred">
    </div>
    <input class="btn btn-outline-success form-control" type="submit" name="signup" value="Submit">
</form>
  </div>
</div>`;
    ulogin.innerHTML = '';
    alogin.innerHTML = '';
    signup.innerHTML = output;
}

function UserLogIn(ulogin,alogin,signup) {
    let output = `<div class="card border-success mb-3 mx-auto" style="max-width: 30rem;">
    <div class="card-header"><h3 class="text-success">User Login</b></h3></div>
    <div class="card-body text-success">
    <form action="HTTP/POST/users/userlogin.php" method="post">
        <div class="form-group">
        <label for="exampleInputEmail1"><b>Username</b></label>
        <input class="form-control" type="text" name="uid">
        </div>
        <div class="form-group">
        <label for="exampleInputEmail1"><b>Password</b></label>
        <input class="form-control" type="password" name="pwd">
        </div>
        <input class="btn btn-outline-success form-control" type="submit" name="ulogin" value="Submit">
    </form>
    </div>
    </div>`;
    signup.innerHTML = '';
    alogin.innerHTML = '';
    ulogin.innerHTML = output;
}

function AdminLogIn(alogin,ulogin,signup) {
    let output = `<div class="card border-success mb-3 mx-auto" style="max-width: 30rem;">
    <div class="card-header"><h3 class="text-success">Admin Login</b></h3></div>
    <div class="card-body text-success">
    <form action="HTTP/POST/users/adminlogin.php" method="POST">
        <div class="form-group">
        <label for="exampleInputEmail1"><b>Username</b></label>
        <input class="form-control" type="text" name="uid">
        </div>
        <div class="form-group">
        <label for="exampleInputEmail1"><b>Password</b></label>
        <input class="form-control" type="password" name="pwd">
        </div>
        <input class="btn btn-outline-success form-control" type="submit" name="alogin" value="Submit">
    </form>
    </div>
    </div>`;
    signup.innerHTML = '';
    ulogin.innerHTML = '';
    alogin.innerHTML = output;
} 

function RemoveAll() {
    signup.innerHTML = '';
    ulogin.innerHTML = '';
    alogin.innerHTML = '';
}

export {SignUp,UserLogIn,AdminLogIn,RemoveAll};