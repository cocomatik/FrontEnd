let logout = document.getElementById("logout")
logout.addEventListener("click",function(){
    localStorage.clear();
    window.location.href = "../index.html";
})