import axios from 'axios';

const API_URL = 'http://localhost:3000';

// ✅ Create Product
export const createProduct = async (productData) => {
  const formData = new FormData();

  // Add product data
  for (const key in productData) {
    if (Array.isArray(productData[key])) {
      productData[key].forEach((item) => formData.append(key, item));
    } else {
      formData.append(key, productData[key]);
    }
  }

  // Send request
  return await axios.post(`${API_URL}/createProduct`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

// ✅ Get Products
export const getProducts = async () => {
  return await axios.get(`${API_URL}/`);
};

// ✅ Update Product
export const updateProduct = async (id, productData) => {
  return await axios.patch(`${API_URL}/updateProduct/${id}`, productData);
};

// ✅ Delete Product
export const deleteProduct = async (id) => {
  return await axios.delete(`${API_URL}/deleteProduct/${id}`);
};
