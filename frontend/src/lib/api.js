const API_URL = 'http://localhost:5000/api';

// Fonction utilitaire pour les requêtes
async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erreur réseau');
  }

  return response.json();
}

// Produits
export async function getProducts() {
  return fetchWithAuth('/products');
}

export async function getProduct(id) {
  return fetchWithAuth(`/products/${id}`);
}

export async function createProduct(productData) {
  return fetchWithAuth('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  });
}

// Utilisateurs
export async function login(email, password) {
  return fetchWithAuth('/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function register(userData) {
  return fetchWithAuth('/users/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}