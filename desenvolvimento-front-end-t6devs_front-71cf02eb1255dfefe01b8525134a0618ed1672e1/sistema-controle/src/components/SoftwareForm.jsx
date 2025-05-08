import React, { useState } from "react";

const SoftwareForm = ({ onSubmit, initialData = {} }) => {
  const [nome, setNome] = useState(initialData.nome || "");
  const [link, setLink] = useState(initialData.link || "");
  const [versao, setVersao] = useState(initialData.versao || "");
  const [softwareLivre, setSoftwareLivre] = useState(initialData.softwareLivre || false);
  const [dataSolicitacao, setDataSolicitacao] = useState(initialData.dataSolicitacao || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nome, link, versao, softwareLivre, dataSolicitacao });
  };

  return (
    <form onSubmit={handleSubmit} style={{ color: "var(--text-color)" }}>
      <input
        type="text"
        placeholder="Nome do Software"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }}
      />
      <input
        type="text"
        placeholder="Link para Instalação"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }}
      />
      <input
        type="text"
        placeholder="Versão"
        value={versao}
        onChange={(e) => setVersao(e.target.value)}
        style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }}
      />
      <label>
        Software Livre?
        <input
          type="checkbox"
          checked={softwareLivre}
          onChange={(e) => setSoftwareLivre(e.target.checked)}
        />
      </label>
      <input
        type="date"
        value={dataSolicitacao}
        onChange={(e) => setDataSolicitacao(e.target.value)}
        style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }}
      />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default SoftwareForm;