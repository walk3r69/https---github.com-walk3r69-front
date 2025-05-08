import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";
import ThemeToggle from "./ThemeToggle";
import { signIn, signOut, fetchAuthSession } from '@aws-amplify/auth'; // Nova API

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Autenticar com Amplify
      const user = await signIn({
        username: email,
        password,
      });

      // Obter a sessão atual
      const session = await fetchAuthSession();
      const idToken = session.tokens?.idToken?.toString();
      if (!idToken) {
        throw new Error("Token de autenticação não encontrado.");
      }
      localStorage.setItem("token", idToken);

      // Determinar o userType a partir dos grupos do Cognito
      const userGroups = session.tokens?.idToken?.payload['cognito:groups'] || [];
      const userType = userGroups.includes('ROLE_ADMIN') ? 'ADMIN' : 'PROFESSOR';
      localStorage.setItem("userType", userType);

      if (userType !== 'ADMIN') {
        setNotification({ message: "Acesso negado. Apenas administradores podem fazer login aqui.", type: "error" });
        await signOut();
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        return;
      }

      navigate("/2fa", { state: { email, userType } });
    } catch (error) {
      console.error("Erro no login:", error);
      setNotification({ message: "Erro ao fazer login. Verifique suas credenciais.", type: "error" });
    }
  };

  return (
    <div className="container">
      <header className="navbar">
        <h1>T6Devs_Back</h1>
        <ThemeToggle />
      </header>
      <main className="main-content">
        <div className="square-box">
          <h2 className="box-title">Login do Administrador</h2>
          {notification.message && (
            <Notification message={notification.message} type={notification.type} />
          )}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Senha
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="button">
              Entrar
            </button>
          </form>
        </div>
      </main>
      <footer className="footer">
        <p>© 2025 T6Devs_Back</p>
      </footer>
    </div>
  );
};

export default AdminLogin;