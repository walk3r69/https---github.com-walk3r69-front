import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Notification from "./Notification";
import ThemeToggle from "./ThemeToggle";
import { getSoftwaresDisponiveis, getLaboratorios, createSolicitacao, confirmSoftwareUsage, getSoftwaresByLab, logout } from '../api/Api';

const ProfessorPage = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [availableSoftwares, setAvailableSoftwares] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [selectedLabId, setSelectedLabId] = useState('');
  const [usedSoftwares, setUsedSoftwares] = useState([]);
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (userType !== 'PROFESSOR') {
      navigate('/login/professor');
    } else {
      fetchAvailableSoftwares();
      fetchLaboratorios();
    }
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchAvailableSoftwares = async () => {
    try {
      const response = await getSoftwaresDisponiveis();
      setAvailableSoftwares(response);
    } catch (err) {
      setNotification({ message: "Erro ao carregar softwares disponíveis.", type: "error" });
    }
  };

  const fetchLaboratorios = async () => {
    try {
      const response = await getLaboratorios();
      setLaboratorios(response);
    } catch (err) {
      setNotification({ message: "Erro ao carregar laboratórios.", type: "error" });
    }
  };

  const fetchUsedSoftwares = async (labId) => {
    try {
      const response = await getSoftwaresByLab(labId);
      setUsedSoftwares(response);
    } catch (err) {
      setNotification({ message: "Erro ao carregar softwares instalados.", type: "error" });
    }
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login/professor');
  };

  const handleInstallSoftware = async (e) => {
    e.preventDefault();

    const softwareId = e.target.elements["software-id"].value;
    const laboratoryId = e.target.elements["laboratory-id"].value;
    const dataUso = e.target.elements["data-uso"].value;
    const horarioUso = e.target.elements["horario-uso"].value;

    if (!softwareId || !laboratoryId || !dataUso || !horarioUso) {
      setNotification({ message: "Por favor, preencha todos os campos.", type: "error" });
      return;
    }

    try {
      await createSolicitacao({
        softwareId: Number(softwareId),
        laboratoryId: Number(laboratoryId),
        dataUso,
        horarioUso,
      });
      setNotification({ message: "Solicitação de instalação enviada com sucesso!", type: "success" });
    } catch (err) {
      setNotification({ message: "Erro ao enviar solicitação de instalação.", type: "error" });
    }
  };

  const handleConfirmUsage = async (software) => {
    try {
      await confirmSoftwareUsage(software.id);
      setNotification({ message: `Uso do Software ${software.nome} (v${software.versao}) confirmado!`, type: "success" });
    } catch (err) {
      setNotification({ message: "Erro ao confirmar uso do software.", type: "error" });
    }
  };

  const handleInstallClick = (software) => {
    setNotification({ message: `Iniciando Download do ${software.nome} (v${software.versao})...`, type: "info" });
    setTimeout(() => {
      setNotification({ message: `Download do ${software.nome} (v${software.versao}) concluído!`, type: "success" });
    }, 3000);
  };

  const handleLabChange = (e) => {
    const labId = e.target.value;
    setSelectedLabId(labId);
    if (labId) {
      fetchUsedSoftwares(labId);
    } else {
      setUsedSoftwares([]);
    }
  };

  return (
    <div className="container">
      <header className="navbar">
        <h1>Dashboard do Professor - T6Devs_Back</h1>
        <div className="header-actions">
          <ThemeToggle />
          <div className={`profile-menu-container ${isProfileMenuOpen ? 'active' : ''}`} ref={profileMenuRef}>
            <button onClick={toggleProfileMenu} className="focus:outline-none text-white">
              <i className="fas fa-user"></i>
            </button>
            {isProfileMenuOpen && (
              <div className="profile-menu">
                <Link to="/perfil" className="block px-4 py-2 hover:bg-gray-200">Perfil</Link>
                <Link to="/configuracoes" className="block px-4 py-2 hover:bg-gray-200">Configurações</Link>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="grid-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <section className="software-list bg-white p-4 rounded shadow h-full">
              <h2 className="text-xl font-semibold mb-4">Listagem de Softwares Disponíveis</h2>
              <ul className="space-y-2">
                {availableSoftwares.map((software) => (
                  <li key={software.id} className="flex items-center justify-between">
                    <div>
                      <span className="block software-name">{software.nome}</span>
                      <span className="block text-sm software-version">Versão: {software.versao}</span>
                    </div>
                    <button
                      onClick={() => handleInstallClick(software)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Instalar
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            <section className="installation-request bg-white p-4 rounded shadow h-full">
              <h2 className="text-xl font-semibold mb-4">Solicitação de Instalação de Softwares</h2>
              <form onSubmit={handleInstallSoftware}>
                <div className="form-group mb-4">
                  <label htmlFor="software-id" className="block text-sm font-medium text-gray-700">Software</label>
                  <select id="software-id" className="mt-1 block w-full p-2 border border-gray-300 rounded" required>
                    <option value="">Selecione um software</option>
                    {availableSoftwares.map((software) => (
                      <option key={software.id} value={software.id}>
                        {software.nome} (v{software.versao})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="laboratory-id" className="block text-sm font-medium text-gray-700">Laboratório</label>
                  <select id="laboratory-id" className="mt-1 block w-full p-2 border border-gray-300 rounded" required>
                    <option value="">Selecione um laboratório</option>
                    {laboratorios.map((lab) => (
                      <option key={lab.id} value={lab.id}>{lab.nome}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="data-uso" className="block text-sm font-medium text-gray-700">Data de Uso</label>
                <input type="date" id="data-uso" className="mt-1 block w-full p-2 border border-gray-300 rounded" required />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="horario-uso" className="block text-sm font-medium text-gray-700">Horário de Uso</label>
                  <input type="time" id="horario-uso" className="mt-1 block w-full p-2 border border-gray-300 rounded" required />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Solicitar Instalação</button>
              </form>
              <div className="mt-4 flex flex-col space-y-2">
                <Link to="/softwares" className="text-blue-500 hover:underline">Listar Softwares</Link>
                <Link to="/solicitacoes/novo" className="text-blue-500 hover:underline">Solicitar Instalação de Software</Link>
                <Link to="/solicitacoes/minhas" className="text-blue-500 hover:underline">Minhas Solicitações</Link>
                <Link to="/softwares/remover-do-lab" className="text-blue-500 hover:underline">Remover Software de Laboratório</Link>
                <Link to="/relatos/novo" className="text-blue-500 hover:underline">Relatar Problema</Link>
              </div>
            </section>

            <section className="usage-confirmation bg-white p-4 rounded shadow h-full">
              <h2 className="text-xl font-semibold mb-4">Confirmação de Uso de Softwares</h2>
              <div className="form-group mb-4">
                <label htmlFor="laboratory-id" className="block text-sm font-medium text-gray-700">Laboratório</label>
                <select
                  id="laboratory-id"
                  value={selectedLabId}
                  onChange={handleLabChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Selecione um laboratório</option>
                  {laboratorios.map((lab) => (
                    <option key={lab.id} value={lab.id}>{lab.nome}</option>
                  ))}
                </select>
              </div>
              {selectedLabId && (
                <ul className="space-y-2">
                  {usedSoftwares.map((software) => (
                    <li key={software.id} className="flex items-center justify-between">
                      <div>
                        <span className="block software-name">{software.nome}</span>
                        <span className="block text-sm software-version">Versão: {software.versao}</span>
                      </div>
                      <button onClick={() => handleConfirmUsage(software)} className="bg-green-500 text-white px-2 py-1 rounded">
                        Confirmar Uso
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </div>
      </main>

      {notification.message && (
        <div className="notifications">
          <Notification message={notification.message} type={notification.type} />
        </div>
      )}

      <footer className="footer">
        <p>© 2025 T6Devs_Back</p>
      </footer>
    </div>
  );
};

export default ProfessorPage;