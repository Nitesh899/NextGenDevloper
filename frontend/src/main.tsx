import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import "./styles/theme.css";
import "./styles/utilities.css";
import App from './App.tsx'
import { AuthProvider } from "./context/AuthContext";
import { PortfolioProvider } from "./context/PortfolioContext";


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <PortfolioProvider>
        <App />
      </PortfolioProvider>
    </AuthProvider>
</React.StrictMode>
)
