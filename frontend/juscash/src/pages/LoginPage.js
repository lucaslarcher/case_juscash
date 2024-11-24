import React, { useState } from "react";
import "../styles/LoginPage.css";  // Importando o arquivo CSS

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados para o servidor
    console.log("Email:", email);
    console.log("Senha:", password);
  };

  return (
    <div className="login-container">
      <h1 className="title">JusCash</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="inputGroup">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Senha:</label>
          <div className="passwordContainer">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="eyeButton"
            >
              👁️
            </button>
          </div>
        </div>
        <button type="submit" className="button">
          Login
        </button>
      </form>
      <p className="registerText">
        Não possui uma conta? <a href="/signup">Cadastre-se</a>
      </p>
    </div>
  );
};

export default LoginPage;