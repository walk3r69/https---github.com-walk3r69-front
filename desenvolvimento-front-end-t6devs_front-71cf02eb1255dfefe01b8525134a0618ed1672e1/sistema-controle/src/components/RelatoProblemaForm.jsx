import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMinhasSolicitacoes, createRelatoProblema } from '../api/Api'; // Ajustado para importações nomeadas

const RelatoProblemaForm = () => {
  const [solicitacaoId, setSolicitacaoId] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataRelato, setDataRelato] = useState('');
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSolicitacoes = async () => {
      try {
        const response = await getMinhasSolicitacoes(); // Ajustado
        const finalizadas = response.data.filter((s) => s.status === 'FINALIZADA');
        setSolicitacoes(finalizadas);
      } catch (err) {
        setError('Erro ao carregar solicitações.');
      }
    };
    fetchSolicitacoes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRelatoProblema({ // Ajustado
        solicitacaoId: Number(solicitacaoId),
        descricao,
        dataRelato,
      });
      navigate('/solicitacoes/minhas');
    } catch (err) {
      setError('Erro ao relatar problema.');
    }
  };

  return (
    <div>
      <h2>Relatar Problema</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Solicitação:</label>
          <select
            value={solicitacaoId}
            onChange={(e) => setSolicitacaoId(e.target.value)}
            required
          >
            <option value="">Selecione uma solicitação</option>
            {solicitacoes.map((solicitacao) => (
              <option key={solicitacao.id} value={solicitacao.id}>
                Solicitação #{solicitacao.id} - Software ID: {solicitacao.softwareId}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Data do Relato:</label>
          <input
            type="date"
            value={dataRelato}
            onChange={(e) => setDataRelato(e.target.value)}
            required
          />
        </div>
        <button type="submit">Relatar</button>
      </form>
    </div>
  );
};

export default RelatoProblemaForm;