import React from "react";

const SoftwareList = ({ softwares, onDelete }) => {
  return (
    <div className="meu-componente">
      <h2>Softwares Cadastrados</h2>
      <ul>
        {softwares.map((software) => (
          <li key={software.id}>
            {software.nome} - {software.versao} (
            {software.softwareLivre ? "Livre" : "Proprietário"})
            <button
              onClick={() => onDelete(software.id)}
              className="botao-excluir"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SoftwareList;