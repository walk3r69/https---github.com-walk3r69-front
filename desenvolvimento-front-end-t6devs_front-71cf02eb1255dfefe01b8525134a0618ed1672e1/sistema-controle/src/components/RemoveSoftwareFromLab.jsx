import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSoftwares, getLaboratorios, removeSoftwareFromLab } from '../api/Api';

const RemoveSoftwareFromLab = () => {
  const [softwares, setSoftwares] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [softwareId, setSoftwareId] = useState('');
  const [laboratoryId, setLaboratoryId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (userType !== 'PROFESSOR') {
      navigate('/login/professor');
    } else {
      fetchSoftwares();
      fetchLaboratorios();
    }
  }, [navigate]);

  const fetchSoftwares = async () => {
    try {
      const response = await getSoftwares();
      setSoftwares(response);
    } catch (err) {
      setError('Erro ao carregar softwares.');
    }
  };

  const fetchLaboratorios = async () => {
    try {
      const response = await getLaboratorios();
      setLaboratorios(response);
    } catch (err) {
      setError('Erro ao carregar laboratórios.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!softwareId || !laboratoryId) {
      setError('Por favor, selecione um software e um laboratório.');
      setSuccess('');
      return;
    }

    try {
      await removeSoftwareFromLab(Number(softwareId), Number(laboratoryId));
      setSuccess('Software removido do laboratório com sucesso!');
      setError('');
    } catch (err) {
      setError('Erro ao remover software do laboratório.');
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl font-bold">Remover Software de Laboratório</h1>
      </header>
      <main className="flex-grow p-4">
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && <div className="text-green-500 mb-4">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="software" className="block text-sm font-medium text-gray-700">Software</label>
              <select
                id="software"
                value={softwareId}
                onChange={(e) => setSoftwareId(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Selecione um software</option>
                {softwares.map((software) => (
                  <option key={software.id} value={software.id}>
                    {software.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="laboratory" className="block text-sm font-medium text-gray-700">Laboratório</label>
              <select
                id="laboratory"
                value={laboratoryId}
                onChange={(e) => setLaboratoryId(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Selecione um laboratório</option>
                {laboratorios.map((lab) => (
                  <option key={lab.id} value={lab.id}>
                    {lab.nome}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Remover Software
            </button>
          </form>
        </div>
      </main>
      <footer className="bg-blue-500 text-white p-4 text-center">
        <p>© 2025 T6Devs_Back</p>
      </footer>
    </div>
  );
};

export default RemoveSoftwareFromLab;