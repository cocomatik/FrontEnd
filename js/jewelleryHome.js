let Necklace = document.getElementById("Necklace");
Necklace.addEventListener("click", function () {
    localStorage.setItem("category", "Necklace");
    window.location.href=("page/jewelery/allProduct.html")
});

let FingerRings= document.getElementById("FingerRings");

FingerRings.addEventListener("click", function () {
    localStorage.setItem("category", "Finger Rings");
    window.location.href=("page/jewelery/allProduct.html")
});

let Bangles= document.getElementById("Bangles");

Bangles.addEventListener("click", function () {
    localStorage.setItem("category", "Bangles");
    window.location.href=("page/jewelery/allProduct.html")
});
