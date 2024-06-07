import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Changez cela si nécessaire
});

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/users/login', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (email, password) => {
  try {
    const response = await api.post('/users/register', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchBooks = async (token) => {
  try {
    const response = await api.get('/books', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/users'); // Ensure the URL is correct
    return response.data;
  } catch (error) {
    throw new Error('Error fetching users');
  }
};
export const fetchLoans = async (token) => {
  try {
    const response = await api.get('/loans', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Ajoutez d'autres fonctions pour les autres endpoints si nécessaire
