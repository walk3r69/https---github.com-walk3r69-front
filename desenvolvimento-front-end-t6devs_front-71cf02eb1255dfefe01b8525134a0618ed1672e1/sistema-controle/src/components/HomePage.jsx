import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

function HomePage() {
  return (
    <div className="container">
      <header className="navbar">
        <h1>T6Devs_Back</h1>
        <ThemeToggle />
      </header>
      <main className="main-content">
        <div className="square-box">
          <h2 className="box-title">Bem-vindo ao Sistema de Controle de Software</h2>
          <p>Escolha o tipo de login:</p>
          <div className="button-gap">
            <Link to="/login/admin" className="button">
              Login Administrador
            </Link>
            <Link to="/login/professor" className="button">
              Login Professor
            </Link>
          </div>
        </div>
      </main>
      <footer className="footer">
        <p>© 2025 T6Devs_Back</p>
      </footer>
    </div>
  );
}

export default HomePage;