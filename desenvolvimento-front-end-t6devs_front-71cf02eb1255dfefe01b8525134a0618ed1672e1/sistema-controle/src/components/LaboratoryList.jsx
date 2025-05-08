import React from "react";

const LaboratoryList = ({ laboratorios, onDelete }) => {
  return (
    <div>
      <h2>Laboratórios Cadastrados</h2>
      <ul>
        {laboratorios.map((laboratorio) => (
          <li key={laboratorio.id}>
            {laboratorio.nome} - {laboratorio.status}
            <button onClick={() => onDelete(laboratorio.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LaboratoryList;