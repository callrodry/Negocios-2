import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getProducts, addProduct, updateProduct, deleteProduct } from './firebase-functions';
import { getProducts, addProduct } from './firebase-functions';
import { getProducts, addProduct, updateProduct, deleteProduct, getProductsByCategory } from './firebase-functions';

const firebaseConfig = {
  // Reemplaza esto con tu configuración real de Firebase
  apiKey: "AIzaSyDQ_Q4CvLPxPwFQap6hpBSx1yB5lE8f6I0",
  authDomain: "negocios-2-10d3a.firebaseapp.com",
  projectId: "negocios-2-10d3a",
  storageBucket: "negocios-2-10d3a.appspot.com",
  messagingSenderId: "668496458721",
  appId: "1:668496458721:web:d155a462cb1611e96d58a0",
  measurementId: "G-WSLQZB37VG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para renderizar productos
function renderProducts(products) {
  const productGrid = document.getElementById('productGrid');
  productGrid.innerHTML = '';
  products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
          <img src="${product.imagen || '/api/placeholder/200/200'}" alt="${product.nombre}">
          <h4>${product.nombre}</h4>
          <p>$${product.precio.toFixed(2)}</p>
          <button onclick="addToCart('${product.id}')">Añadir al carrito</button>
      `;
      productGrid.appendChild(productCard);
  });
}

// Función para cargar y mostrar productos
async function filterProducts() {
  const checkedFilters = Array.from(document.querySelectorAll('.filter:checked')).map(el => el.value);
  const productGrid = document.getElementById('productGrid');
  productGrid.innerHTML = ''; // Limpiar el grid

  try {
      const querySnapshot = await getDocs(collection(db, "Negocios 2"));
      querySnapshot.forEach((doc) => {
          const product = doc.data();
          if (checkedFilters.length === 0 || checkedFilters.includes(product.categoria)) {
              const productCard = document.createElement('div');
              productCard.className = 'product-card';
              productCard.innerHTML = `
                  <img src="${product.imagen || '/api/placeholder/200/200'}" alt="${product.nombre}">
                  <h4>${product.nombre}</h4>
                  <p>$${product.precio.toFixed(2)}</p>
                  <button onclick="addToCart('${doc.id}')">Añadir al carrito</button>
              `;
              productGrid.appendChild(productCard);
          }
      });
  } catch (error) {
      console.error("Error al filtrar productos:", error);
  }
}

// Función para filtrar productos
async function filterProducts() {
  const checkedFilters = Array.from(document.querySelectorAll('.filter:checked')).map(el => el.value);
  try {
      let products = [];
      if (checkedFilters.length > 0) {
          for (let category of checkedFilters) {
              const categoryProducts = await getProductsByCategory(category);
              products = [...products, ...categoryProducts];
          }
      } else {
          products = await getProducts();
      }
      renderProducts(products);
  } catch (error) {
      console.error("Error al filtrar productos:", error);
  }
}

// Función para buscar productos
async function searchProducts() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  try {
      const products = await getProducts();
      const searchedProducts = products.filter(product => 
          product.nombre.toLowerCase().includes(searchTerm)
      );
      renderProducts(searchedProducts);
  } catch (error) {
      console.error("Error al buscar productos:", error);
  }
}


// Función para añadir al carrito (simulada)
window.addToCart = function(productId) {
  alert(`Producto ${productId} añadido al carrito`);
  // Aquí podrías implementar la lógica real del carrito
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

// Función para manejar la adición de un nuevo producto
async function handleAddProduct(event) {
  event.preventDefault();
  
  const newProduct = {
    name: document.getElementById('productName').value,
    price: parseFloat(document.getElementById('productPrice').value),
    category: document.getElementById('productCategory').value,
    image: document.getElementById('productImage').value || '/api/placeholder/200/200'
  };

  try {
    await addProduct(newProduct);
    alert('Producto añadido con éxito');
    document.getElementById('addProductForm').reset(); // Limpiar el formulario
    loadAndDisplayProducts(); // Recargar la lista de productos
  } catch (error) {
    console.error("Error al añadir producto:", error);
    alert('Error al añadir producto');
  }
}


async function loadProducts() {
  try {
      const products = await getProducts();
      renderProducts(products);
  } catch (error) {
      console.error("Error al cargar productos:", error);
  }
}

// Agregar event listener para el formulario de añadir producto
document.getElementById('addProductForm').addEventListener('submit', handleAddProduct);

// Cargar productos cuando se carga la página
document.addEventListener('DOMContentLoaded', loadProducts);

