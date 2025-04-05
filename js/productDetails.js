
document.addEventListener("DOMContentLoaded", async function () {
    const productDetails = JSON.parse(localStorage.getItem("productDetailsId"));
    
    if (!productDetails || !productDetails.sku) {
        console.error("Product ID not found in localStorage");
        return;
    }
    
    const productId = productDetails.sku;
    const apiUrl = "https://engine.cocomatik.com/api/pocos";
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch product data");
        }
        
        const products = await response.json();
        const product = products.find(item => item.sku === productId);
        
        if (!product) {
            console.error("Product not found");
            return;
        }

        // Update HTML with product details
        // document.getElementById("productDetailsImg").innerHTML = ` <img src="https://res.cloudinary.com/cocomatik/${product.display_image}" width="40%" alt="${product.title}"> `;
        document.getElementById("productDetailName").innerText = product.title;
        document.getElementById("productDetailDescription").innerText = product.description;
        document.getElementById("productDetailSize").innerText = `Size: ${product.size}`;
        document.getElementById("productDetailMRP").innerText = `MRP ₹${parseFloat(product.mrp).toFixed(2)}`;
        document.getElementById("productDetailPrice").innerText = `₹${parseFloat(product.price).toFixed(2)}`;
        document.getElementById("productDetailDiscount").innerText = `Discount: ${product.discount}%`;
        document.getElementById("productDetailStaock").innerText = `Stock: ${product.stock} available`;
        document.getElementById("productDetailBrand").innerText = `Brand: ${product.brand}`;
        document.getElementById("productDetailRating").innerText = `Rating: ⭐${product.rating}`;
        
    } catch (error) {
        console.error("Error fetching product data:", error);
    }
});

