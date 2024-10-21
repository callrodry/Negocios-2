// Datos de ejemplo para los productos
const products = [
    { id: 1, name: "Camiseta azul", price: 19.99, category: "hombre", image: "/api/placeholder/200/200" },
    { id: 2, name: "Vestido floral", price: 39.99, category: "mujer", image: "/api/placeholder/200/200" },
    { id: 3, name: "Pantalón vaquero", price: 49.99, category: "hombre", image: "/api/placeholder/200/200" },
    { id: 4, name: "Blusa blanca", price: 29.99, category: "mujer", image: "/api/placeholder/200/200" },
];

// Función para renderizar productos
function renderProducts(productsToRender) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Añadir al carrito</button>
        `;
        productGrid.appendChild(productCard);
    });
}

// Función para filtrar productos
function filterProducts() {
    const checkedFilters = Array.from(document.querySelectorAll('.filter:checked')).map(el => el.value);
    const filteredProducts = checkedFilters.length > 0
        ? products.filter(product => checkedFilters.includes(product.category))
        : products;
    renderProducts(filteredProducts);
}

// Función para buscar productos
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const searchedProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    renderProducts(searchedProducts);
}

// Función para añadir al carrito (simulada)
function addToCart(productId) {
    alert(`Producto ${productId} añadido al carrito`);
}

// Event listeners
document.querySelectorAll('.filter').forEach(filter => {
    filter.addEventListener('change', filterProducts);
});

document.getElementById('searchInput').addEventListener('input', searchProducts);

document.getElementById('favoritesIcon').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Has hecho clic en Favoritos');
});

// Renderizar productos inicialmente
renderProducts(products);

