import {SignUp,UserLogIn,AdminLogIn,RemoveAll} from './util.js';
   
    let signup = document.querySelector('#signup');
    let ulogin = document.querySelector('#ulogin');
    let alogin = document.querySelector('#alogin');
    let signbtn = document.querySelector('#signbtn');
    let uloginbtn = document.querySelector('#uloginbtn');
    let aloginbtn = document.querySelector('#aloginbtn');
    let cross = document.querySelector('#cross');
    let close = document.querySelector('.close');

    let showA = true;
    let showB = true;
    let showC = true;

    if(close != null) {
        close.addEventListener('click',function(x){
            x.preventDefault();
            cross.style.display = 'none';
        });
    }

 
 
    signbtn.addEventListener('click',function(x){
        x.preventDefault();
        if(showA == true) {
            SignUp(signup,ulogin,alogin);
            showA = false;
            showB = true;
            showC = true;
            return false;
        } else {
            RemoveAll();
            showA = true;
            return false;
        }
    });

    uloginbtn.addEventListener('click',function(x){
        x.preventDefault();
        if(showB == true) {
            UserLogIn(ulogin,alogin,signup);
            showB = false;
            showA = true;
            showC = true;
            return false;
        } else {
            RemoveAll();
            showB = true;
            return false;
        }
    });

    aloginbtn.addEventListener('click',function(x){
        x.preventDefault();
        if(showC == true) {
            AdminLogIn(alogin,ulogin,signup);
            showC = false;
            showA = true;
            showB = true;
            return false;
        } else {
            RemoveAll();
            showC = true;
            return false;
        }
        
    });



   
   