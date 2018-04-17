function SignUp(signup,ulogin,alogin) {
    let output = `<h1>Signup</h1>
    <form action="HTTP/POST/users/usersignup.php" method="post">
        <input type="text" name="fn" placeholder="firstname">
        <input type="text" name="ln" placeholder="lastname">
        <input type="text" name="uid" placeholder="username">
        <input type="password" name="pwd" placeholder="password">
        <input type="password" name="cred" placeholder="credential">
        <input type="submit" name="signup" value="Submit">
    </form>`;
    ulogin.innerHTML = '';
    alogin.innerHTML = '';
    signup.innerHTML = output;
}

function UserLogIn(ulogin,alogin,signup) {
    let output = `<h1>User Login</h1>
    <form action="HTTP/POST/users/userlogin.php" method="post">
        <input type="text" name="uid" placeholder="username">
        <input type="password" name="pwd" placeholder="password">
        <input type="submit" name="ulogin" value="Submit">
    </form>`;
    signup.innerHTML = '';
    alogin.innerHTML = '';
    ulogin.innerHTML = output;
}

function AdminLogIn(alogin,ulogin,signup) {
    let output = `<h1>Admin Login</h1>
    <form action="HTTP/POST/users/adminlogin.php" method="POST">
        <input type="text" name="uid" placeholder="username">
        <input type="password" name="pwd" placeholder="password">
        <input type="submit" name="alogin" value="Submit">
    </form>`;
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