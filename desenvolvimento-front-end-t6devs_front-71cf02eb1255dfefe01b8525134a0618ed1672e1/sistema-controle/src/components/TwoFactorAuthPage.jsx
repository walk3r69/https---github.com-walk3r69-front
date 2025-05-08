import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Notification from "./Notification";
import ThemeToggle from "./ThemeToggle";

const TwoFactorAuthPage = () => {
  const [code, setCode] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const location = useLocation();
  const { email, userType } = location.state || {};
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      if (code === "123456") { // Substitua por verificação real de 2FA
        localStorage.setItem("userType", userType); // Armazena o userType
        if (userType === "ADMIN") {
          navigate("/admin");
        } else if (userType === "PROFESSOR") {
          navigate("/professor");
        }
      } else {
        setNotification({ message: "Código inválido. Tente novamente.", type: "error" });
      }
    } catch (error) {
      console.error("Erro na verificação:", error);
      setNotification({ message: "Erro ao verificar o código.", type: "error" });
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
          <h2 className="box-title">Verificação em Duas Etapas</h2>
          {notification.message && (
            <Notification message={notification.message} type={notification.type} />
          )}
          <form onSubmit={handleVerify}>
            <div className="form-group">
              <label htmlFor="code" className="form-label">
                Código de Verificação
              </label>
              <input
                type="text"
                id="code"
                className="form-input"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="button">
              Verificar
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

export default TwoFactorAuthPage;