import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMinhasSolicitacoes, getSolicitacoes, updateSolicitacao, deleteSolicitacao } from '../api/Api'; // Ajustado para importações nomeadas

const MinhasSolicitacoes = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [error, setError] = useState('');
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    setUserType(userType);

    if (!userType) {
      navigate('/login/admin');
      return;
    }

    const fetchSolicitacoes = async () => {
      try {
        const response = userType === 'ADMIN' ? await getSolicitacoes() : await getMinhasSolicitacoes(); // Ajustado
        setSolicitacoes(response.data);
      } catch (err) {
        setError('Erro ao carregar solicitações.');
      }
    };

    fetchSolicitacoes();
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      await deleteSolicitacao(id); // Ajustado
      setSolicitacoes(solicitacoes.filter((solicitacao) => solicitacao.id !== id));
    } catch (err) {
      setError('Erro ao excluir solicitação.');
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateSolicitacao(id, { status }); // Ajustado
      setSolicitacoes(
        solicitacoes.map((solicitacao) =>
          solicitacao.id === id ? { ...solicitacao, status } : solicitacao
        )
      );
    } catch (err) {
      setError('Erro ao atualizar solicitação.');
    }
  };

  if (!userType) return null;

  return (
    <div>
      <h2>{userType === 'ADMIN' ? 'Todas as Solicitações' : 'Minhas Solicitações'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {solicitacoes.map((solicitacao) => (
          <li key={solicitacao.id}>
            Software ID: {solicitacao.softwareId}, Laboratório ID: {solicitacao.laboratoryId}, Status: {solicitacao.status}
            {solicitacao.status === 'PENDENTE' && (
              <button onClick={() => handleDelete(solicitacao.id)}>Cancelar</button>
            )}
            {userType === 'ADMIN' && solicitacao.status === 'PENDENTE' && (
              <>
                <button onClick={() => handleUpdateStatus(solicitacao.id, 'APROVADA')}>
                  Aprovar
                </button>
                <button onClick={() => handleUpdateStatus(solicitacao.id, 'FINALIZADA')}>
                  Finalizar
                </button>
              </>
            )}
            {solicitacao.status === 'FINALIZADA' && userType === 'PROFESSOR' && (
              <Link to="/relatos/novo">Relatar Problema</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MinhasSolicitacoes;