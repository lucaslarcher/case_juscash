// src/pages/SignUpPage.js
import React, { useState } from 'react';
import '../styles/SignUpPage.css'; // Caso você tenha um arquivo de estilo para o formulário

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('As senhas não coincidem!');
    } else {
      setError('');
      // Lógica para criar usuário (salvar no banco de dados, enviar requisição para o backend)
      console.log('Usuário criado:', { name, email, password });
    }
  };

  return (
    <div className="sign-up-container">
      <h2>JusCash</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Seu nome completo:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirme sua senha:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="submit-btn">Criar conta</button>
      </form>

      <p>
        Já possui uma conta? <a href="/login">Fazer o login</a>
      </p>
    </div>
  );
};

export default SignUpPage;