// src/utils/auth.js

// Save JWT token to localStorage
export const saveToken = (token) => {
  if (typeof token === "string") {
    localStorage.setItem("token", token);
  } else {
    console.warn("⚠️ Tried to save an invalid token:", token);
  }
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
  // Optionally: Check for token expiry or pattern
  return Boolean(token && token.length > 10); // mild safety
};

// Log out user
export const logout = () => {
  removeToken();
};
