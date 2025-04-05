
let Cosmetics = document.getElementById("Cosmetics");

Cosmetics.addEventListener("click", function () {
    window.location.href = "cosmeticHome.html";
});

document.addEventListener("DOMContentLoaded", async function () {
    const apiUrl = "https://engine.cocomatik.com/api/home/bestsellers";
    const container = document.getElementById("special-type-product-container-box");

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        data.forEach(category => {
            if (!Array.isArray(category.objs)) return;

            category.objs.forEach(product => {
                const title = product.title || "No Title Available";
                const description = product.description || "No Description Available";
                const price = product.price ? `$ ${product.price}` : "Price Unavailable";

                // Use a local image file instead of the API image
                const imageUrl = "data2/hair2.png"; // Replace with your local image path

                const productBox = document.createElement("div");
                productBox.id = "special-type-product-box";

                productBox.innerHTML = `
                    <div id="special-type-product-img">
                        <img src="${imageUrl}" alt="${title}">
                    </div>
                    <div id="special-type-product-details">
                        <div id="special-type-product-name">${title}</div>
                        <div id="special-type-product-about">${description}</div>
                        <div id="special-type-product-price">${price}</div>
                    </div>   
                `;

                container.appendChild(productBox);
            });
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});