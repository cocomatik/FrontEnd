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

        // Store the product ID in a variable
        const fetchedProductId = product.sku;
        console.log("Fetched Product ID:", fetchedProductId);

        // Update HTML with product details
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
// // addtoCard
// let token = localStorage.getItem("authToken");

// let addtoCard = document.getElementById("addtoCard");

// if (!addtoCard) {
//     console.error("Add to Cart button not found in the DOM.");
//     return;
// }

// addtoCard.addEventListener("click", async function () {
//     if (!token || token.trim() === "") {
//         console.error("Auth token not found. Please log in.");
//         return;
//     }

//     const productDetails = JSON.parse(localStorage.getItem("productDetailsId"));
//     if (!productDetails || !productDetails.sku) {
//         console.error("Product ID not found in localStorage");
//         return;
//     }

//     const productId = productDetails.sku;
//     const apiUrl = "https://engine.cocomatik.com/api/orders/cart/add";

//     try {
//         const response = await fetch(apiUrl, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`
//             },
//             body: JSON.stringify({ productId })
//         });

//         if (!response.ok) {
//             throw new Error("Failed to add product to cart");
//         }

//         let result;
//         try {
//             result = await response.json();
//         } catch (jsonError) {
//             console.error("Failed to parse response JSON:", jsonError);
//             alert("Unexpected response from the server. Please try again.");
//             return;
//         }

//         console.log("Product added to cart successfully:", result);
//         alert("Product added to cart successfully!");
//     } catch (error) {
//         console.error("Error adding product to cart:", error);
//         alert("An error occurred while adding the product to the cart. Please try again later.");
//     }
// });