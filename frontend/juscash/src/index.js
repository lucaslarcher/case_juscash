import React from 'react';
import ReactDOM from 'react-dom/client'; // Alterado para 'react-dom/client'
import App from './App';
import './index.css';

// Criar o root utilizando createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizar o componente dentro do root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);