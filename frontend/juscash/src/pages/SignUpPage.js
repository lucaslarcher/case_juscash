import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUpPage.css';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validações de e-mail e senha
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push('no mínimo 8 caracteres');
    if (!/[A-Z]/.test(password)) errors.push('uma letra maiúscula');
    if (!/[a-z]/.test(password)) errors.push('uma letra minúscula');
    if (!/[0-9]/.test(password)) errors.push('um número');
    if (!/[!@#$]/.test(password)) errors.push('um caractere especial (!@#$)');
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Validações
    if (!validateEmail(email)) {
      setErrors({ email: 'Por favor, insira um e-mail válido.' });
      setLoading(false);
      return;
    }

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      setErrors({ password: `A senha deve conter: ${passwordErrors.join(', ')}.` });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: 'A confirmação de senha não corresponde.' });
      setLoading(false);
      return;
    }

    // Envia o formulário para o backend
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/usuarios/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: name, email, senha: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ form: data.error || 'Erro ao criar a conta. Tente novamente.' });
      } else {
        alert('Cadastro realizado com sucesso!');
        navigate('/login');
      }
    } catch (error) {
      setErrors({ form: 'Erro no servidor. Tente novamente mais tarde.' });
    }
    setLoading(false);
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up-form">
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
            {errors.email && <p className="error-message">{errors.email}</p>}
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
            {errors.password && <p className="error-message">{errors.password}</p>}
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
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          </div>

          {errors.form && <p className="error-message">{errors.form}</p>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Processando...' : 'Criar conta'}
          </button>
        </form>

        <p>
          Já possui uma conta? <a href="/login">Fazer o login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;