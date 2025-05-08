import React, { useState } from "react";

const LaboratoryForm = ({ onSubmit, initialData = {} }) => {
  const [nome, setNome] = useState(initialData.nome || "");
  const [status, setStatus] = useState(initialData.status || "Disponível");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nome, status });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome do Laboratório"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Disponível">Disponível</option>
        <option value="Indisponível">Indisponível</option>
      </select>
      <button type="submit">Salvar</button>
    </form>
  );
};

export default LaboratoryForm;