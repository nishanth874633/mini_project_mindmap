function signup(){

const user=document.getElementById("newUser").value;
const pass=document.getElementById("newPass").value;

localStorage.setItem("username",user);
localStorage.setItem("password",pass);

document.getElementById("msg").innerText="Account created. Login now.";

}

function login(){

const user=document.getElementById("username").value;
const pass=document.getElementById("password").value;

const savedUser=localStorage.getItem("username");
const savedPass=localStorage.getItem("password");

if(user===savedUser && pass===savedPass){

localStorage.setItem("loggedIn","true");

window.location.href="index.html";

}else{

document.getElementById("error").innerText="Invalid login";

}

}
