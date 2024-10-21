import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from './firebase-config';

// Nombre de la colección
const COLLECTION_NAME = 'Negocios 2';

// Obtener todos los productos
export const getProducts = async () => {
  try {
    const productsCol = collection(db, COLLECTION_NAME);
    const productSnapshot = await getDocs(productsCol);
    return productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

// Añadir un nuevo producto
export const addProduct = async (product) => {
  try {
    const productsCol = collection(db, COLLECTION_NAME);
    const docRef = await addDoc(productsCol, product);
    return docRef.id;
  } catch (error) {
    console.error("Error al añadir producto:", error);
    throw error;
  }
};

// Actualizar un producto existente
export const updateProduct = async (productId, updatedData) => {
  try {
    const productRef = doc(db, COLLECTION_NAME, productId);
    await updateDoc(productRef, updatedData);
    return true;
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    throw error;
  }
};

// Eliminar un producto
export const deleteProduct = async (productId) => {
  try {
    const productRef = doc(db, COLLECTION_NAME, productId);
    await deleteDoc(productRef);
    return true;
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    throw error;
  }
};

// Obtener productos por categoría
export const getProductsByCategory = async (category) => {
  try {
    const productsCol = collection(db, COLLECTION_NAME);
    const q = query(productsCol, where("categoria", "==", category));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener productos por categoría:", error);
    throw error;
  }
};

// Buscar productos por nombre
export const searchProductsByName = async (searchTerm) => {
  try {
    const products = await getProducts();
    return products.filter(product => 
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error("Error al buscar productos:", error);
    throw error;
  }
};