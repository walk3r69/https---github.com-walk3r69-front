import React from "react";

const Notification = ({ message, type }) => {
  if (!message) return null;

  const notificationStyle = {
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    backgroundColor:
      type === "success"
        ? "#d4edda" // Verde para sucesso
        : type === "error"
        ? "#f8d7da" // Vermelho para erro
        : "#d1ecf1", // Azul para info
    color:
      type === "success"
        ? "#155724" // Verde escuro para sucesso
        : type === "error"
        ? "#721c24" // Vermelho escuro para erro
        : "#0c5460", // Azul escuro para info
    border: `1px solid ${
      type === "success"
        ? "#c3e6cb" // Borda verde para sucesso
        : type === "error"
        ? "#f5c6cb" // Borda vermelha para erro
        : "#bee5eb" // Borda azul para info
    }`,
  };

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;