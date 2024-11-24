import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css'; // Criar o arquivo de estilos para o cabeçalho

const Header = () => {
  const navigate = useNavigate();

  // Função de logout
  const handleLogout = () => {
    // Remove o token de autenticação do localStorage
    localStorage.removeItem('accessToken');
    
    // Redireciona o usuário para a página de login após o logout
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>JusCash</h1>
      </div>
      <div className="logout">
        <button onClick={handleLogout} className="logout-button">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/logout-rounded.png"
            alt="Sair"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;