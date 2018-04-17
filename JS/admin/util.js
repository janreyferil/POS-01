function AdminSetting(setting) {
    let val = document.querySelector('#username').value;
    let output = `<h1>Admin Setting</h1>
    <form action="HTTP/POST/users/setting.php" method="POST">
        <input type="text" name="uid" placeholder="username" value="${val}">
        <input type="password" name="cpwd" placeholder="confirm password">
        <input type="password" name="npwd" placeholder="new password">
        <input type="submit" name="update" value="Submit">
    </form>
    <h1>Admin Credential</h1>
    <form action="HTTP/POST/users/admincredential.php" method="POST">
        <input type="password" name="confcred" placeholder="confirm credential">
        <input type="password" name="newcred" placeholder="new credential">
        <input type="submit" name="credential" value="Submit">
    </form>`;
    setting.innerHTML = output;
  }
  function RemoveSetting(setting) {
    setting.innerHTML = '';
  }

  function TimeFetch(fetchtime,url){
    let xhr = new XMLHttpRequest();

    let s = document.getElementById('search').value;
    let param = "search="+s;
    xhr.open('POST',url,true);
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.onreadystatechange = function(){
      fetchtime.innerHTML = '';
      if(xhr.readyState == 4 && xhr.status == 200) {
       let data = JSON.parse(xhr.responseText);
       let output = '';
       output += `<table>
       <tr>
       <th>Names</th>
       <th>Log in</th>
       <th>Log out</th>
       </tr>`;
       for(let i =0; i < data.name.length;i++) {
          output += 
          `<tr>
          <td>${data.name[i]}</td>
          <td>${data.login[i]}</td>
          <td>${data.logout[i]}</td>
          </tr>`;
       }
        output += `</table>`;
        fetchtime.innerHTML = output;
        
        // fetchtime.innerHTML = data;
        }
   }
    xhr.send(param);
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


  export {AdminSetting,RemoveSetting,TimeFetch,getData};


  /*  function formEncode(obj) {
    var str = [];
    for(var p in obj)
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}

  function OtherTime(fetchtime){
    let s = document.getElementById('search').value;
    let obj = {search:s};
    let url = "HTTP/POST/logbooks/logbookfetch.php";
    fetch(url,{
      method : 'POST',
      headers: {
        'Content-type':'application/x-www-form-urlencoded'
      },
      body: formEncode(obj)
    })
    .then(res => res.text())
    .then(data => {
      fetchtime.innerHTML = data;
    })
    .catch(err => console.log(err));

  }
  function getData(url,method){
      return new Promise((resolve,reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(url,method);
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
  
  function Status(){
    getData('HTTP/POST/users/adminstatus.php','POST')
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }

  */