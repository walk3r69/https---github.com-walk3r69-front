import React from "react";

const ProfessorList = ({ professores, onDelete }) => {
  return (
    <div className="meu-componente">
      <h2>Professores Cadastrados</h2>
      <ul>
        {professores.map((professor) => (
          <li key={professor.id}>
            {professor.nome} - {professor.escola}
            <button
              onClick={() => onDelete(professor.id)}
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

export default ProfessorList;