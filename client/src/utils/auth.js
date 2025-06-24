// src/utils/auth.js
import API from '../api'; // ✅ CORRECTED PATH HERE

// Save JWT token to localStorage
export const saveToken = (token) => {
  if (typeof token === "string" && token.length > 10) {
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

// Check if the user is authenticated (simple localStorage check)
export const isAuthenticated = () => {
  const token = getToken();
  return Boolean(token && token.length > 10); // basic validity check
};

// Log out user
export const logout = () => {
  removeToken();
};

// Validate token with backend (now using the consistent API instance)
export const validateToken = async () => {
  const token = getToken();
  if (!token) return false;

  try {
    const res = await API.get("/auth/validate-token", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.status === 200;
  } catch (err) {
    console.error("❌ Token validation failed:", err);
    return false;
  }
};