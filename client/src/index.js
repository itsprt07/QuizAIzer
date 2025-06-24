import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { validateToken, removeToken } from './utils/auth';

// Wrapper component to validate token before rendering app
const AppInitializer = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const isValid = await validateToken();
      if (!isValid) {
        removeToken(); // Clear invalid token
        window.location.href = "/login"; // Force redirect
      } else {
        setReady(true);
      }
    };

    checkToken();
  }, []);

  return ready ? <App /> : <div style={{ textAlign: "center", paddingTop: "2rem" }}>Checking session...</div>;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppInitializer />
  </React.StrictMode>
);
