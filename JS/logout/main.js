function doUnload(){

        let xhr = new XMLHttpRequest();
        xhr.open('GET','HTTP/POST/users/logout.php','true');
        xhr.send(); 
        console.log('Logout');

  }