// ✅ Save JWT token to localStorage
export const saveToken = (token) => {
  if (typeof token === "string" && token.length > 10) {
    localStorage.setItem("token", token);
  } else {
    console.warn("⚠️ Tried to save an invalid token:", token);
  }
};

// ✅ Retrieve JWT token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// ✅ Remove JWT token from localStorage
export const removeToken = () => {
  localStorage.removeItem("token");
};

// ✅ Check if user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  return Boolean(token && token.length > 10);
};

// ✅ Log out user
export const logout = () => {
  removeToken();
};

// ✅ Optional: Validate token with backend
export const validateToken = async () => {
  const token = getToken();
  if (!token) return false;

  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || "https://quizaizer-backend.onrender.com"}/api/auth/validate-token`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.ok;
  } catch (err) {
    console.error("❌ Token validation failed:", err);
    return false;
  }
};
