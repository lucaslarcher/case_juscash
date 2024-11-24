import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Criar o arquivo de estilos para o cabeçalho

const Header = () => (
  <header className="header">
    <div className="logo">
      <h1>JusCash</h1>
    </div>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
    </nav>
    <div className="logout">
      <Link to="/logout">
        <img src="https://img.icons8.com/ios-filled/50/000000/logout-rounded.png" alt="Sair" />
      </Link>
    </div>
  </header>
);

export default Header;
