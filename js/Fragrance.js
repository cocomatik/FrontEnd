document.addEventListener("DOMContentLoaded", async () => {
    const apiUrl = "https://cocomatik-b.vercel.app/api/pocos/";

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Filter only 5 products from category "Skin care"
        const Fragrance = data.filter(product => product.category === "Fragrances").slice(0, 4);

        // Get the container where we will insert the cards
        const container = document.getElementById("products-container2");

        // Loop through filtered products and create cards
        Fragrance.forEach(product => {
            const productCard = document.createElement("div");
            productCard.id = "products-card";

            productCard.innerHTML = `
                <div id="products-img">
                    <img src="https://res.cloudinary.com/cocomatik/${product.display_image}" alt="${product.title}" width="100">
                </div>
                <div id="products-dtls">
                    <h3 id="product-title">${product.title}</h3>
                    <p id="product-category">${product.category}</p>
                    <p id="product-price">$${product.price}</p>
                    <button id="add-to-cart">Add to Cart</button>
                </div>
            `;

            container.appendChild(productCard);
        });
    } catch (error) {
        console.error("Error fetching products:", error);
    }
});