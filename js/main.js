
let AccountBTN=document.getElementById("AccountBTN")
let LoginBTN=document.getElementById("LoginBTN")
AccountBTN.style.display="none"
LoginBTN.style.display="none"

let authToken = localStorage.getItem("authToken");

if (authToken) {
    AccountBTN.style.display = "block";
    LoginBTN.style.display = "none";
} else {
    AccountBTN.style.display = "none";
    LoginBTN.style.display = "block";
}