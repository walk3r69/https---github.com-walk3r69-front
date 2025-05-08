import React, { useState } from "react";

const ProfessorForm = ({ onSubmit, initialData = {} }) => {
  const [nome, setNome] = useState(initialData.nome || "");
  const [escola, setEscola] = useState(initialData.escola || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nome, escola });
  };

  return (
    <form onSubmit={handleSubmit} style={{ color: "var(--text-color)" }}>
      <input
        type="text"
        placeholder="Nome do Professor"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }}
      />
      <input
        type="text"
        placeholder="Escola"
        value={escola}
        onChange={(e) => setEscola(e.target.value)}
        style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }}
      />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default ProfessorForm;