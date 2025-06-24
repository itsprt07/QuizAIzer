// src/utils/auth.js

// Save JWT token to localStorage
export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

// Retrieve JWT token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Remove JWT token from localStorage
export const removeToken = () => {
  localStorage.removeItem("token");
};

// Check if the user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  return Boolean(token); // clearer than !!
};

// Log out user
export const logout = () => {
  removeToken();
};
