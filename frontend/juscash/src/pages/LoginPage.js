import React, { useState } from "react";
import "../styles/LoginPage.css";  // Importando o arquivo CSS

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Limpar mensagens de erro anteriores
    setIsLoading(true); // Ativar o estado de loading

    const payload = {
      email,
      password,
    };

    try {
      console.log("Enviando requisição de login com os dados:", payload);

      // Use a variável de ambiente para a URL da API
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Verifica se a resposta é JSON
      const contentType = response.headers.get("Content-Type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("A resposta não é um JSON válido");
      }

      if (response.ok) {
        const data = await response.json();
        console.log("Login realizado com sucesso:", data);

        // Salvar os tokens no localStorage
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        // Redirecionar após login
        window.location.href = "/"; // Substitua pela sua rota desejada
      } else {
        const errorData = await response.json();
        console.error("Erro no login:", errorData);
        setErrorMessage(errorData.error || "Erro no login");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setErrorMessage("Erro ao tentar logar. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false); // Finaliza o estado de loading
    }
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
          {isLoading ? "Carregando..." : "Login"}
        </button>
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      </form>
      <p className="registerText">
        Não possui uma conta? <a href="/signup">Cadastre-se</a>
      </p>
    </div>
  );
};

export default LoginPage;
