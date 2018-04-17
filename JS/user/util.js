function UserSetting(setting) {
  let val = document.querySelector('#username').value;  
  let output = `<h1>User Setting</h1>
  <form action="HTTP/POST/users/setting.php" method="POST">
      <input type="text" name="uid" placeholder="username" value="${val}">
      <input type="password" name="cpwd" placeholder="confirm password">
      <input type="password" name="npwd" placeholder="new password">
      <input type="submit" name="update" value="Submit">
  </form>`;
  setting.innerHTML = output;
}

  function getData(method,url){
    return new Promise((resolve,reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(method,url);
      xhr.onload = function(){
        if(xhr.status == 200) {
          resolve(xhr.responseText);
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.status
          });
        }
      }
      xhr.onerror = function(){
        reject({
          status: xhr.status,
          statusText: xhr.status
        });
      }
      xhr.send();
    });
}
function RemoveSetting(setting) {
  setting.innerHTML = '';
}

  export {getData,UserSetting,RemoveSetting};

