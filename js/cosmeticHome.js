let Skincare = document.getElementById("Skincare");
Skincare.addEventListener("click", function () {
    localStorage.setItem("category", "Skincare");
    window.location.href=("allProduct.html");
});

let Haircare= document.getElementById("Haircare");

Haircare.addEventListener("click", function () {
    localStorage.setItem("category", "Haircare");
    window.location.href=("allProduct.html");
});