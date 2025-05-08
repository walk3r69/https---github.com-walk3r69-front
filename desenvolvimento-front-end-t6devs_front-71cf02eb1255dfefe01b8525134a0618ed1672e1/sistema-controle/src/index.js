import React from "react";
import ReactDOM from "react-dom/client"; // Importação correta para React v18
import App from "./App";
import "./index.css";

// Cria uma raiz para a aplicação
const root = ReactDOM.createRoot(document.getElementById("root"));

// Renderiza a aplicação
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);