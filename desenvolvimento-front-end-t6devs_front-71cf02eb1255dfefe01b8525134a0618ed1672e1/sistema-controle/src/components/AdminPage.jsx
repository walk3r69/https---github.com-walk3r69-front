import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import SoftwareForm from "./SoftwareForm";
import SoftwareList from "./SoftwareList";
import ProfessorForm from "./ProfessorForm";
import ProfessorList from "./ProfessorList";
import LaboratoryForm from "./LaboratoryForm";
import LaboratoryList from "./LaboratoryList";
import Notification from "./Notification";
import { Link } from 'react-router-dom';
import {
  getSoftwares,
  createSoftware,
  deleteSoftware,
  getProfessores,
  createProfessor,
  deleteProfessor,
  getLaboratorios,
  createLaboratorio,
  deleteLaboratorio,
  logout,
} from "../api/Api";

const AdminPage = () => {
  const [softwares, setSoftwares] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (userType !== 'ADMIN') {
      navigate('/login/admin');
    } else {
      fetchSoftwares();
      fetchProfessores();
      fetchLaboratorios();
    }
  }, [navigate]);

  const fetchSoftwares = async () => {
    try {
      const response = await getSoftwares();
      setSoftwares(response);
    } catch (err) {
      setNotification({ message: err.response?.data?.message || "Erro ao carregar softwares.", type: "error" });
    }
  };

  const fetchProfessores = async () => {
    const data = await getProfessores();
    setProfessores(data);
  };

  const fetchLaboratorios = async () => {
    const data = await getLaboratorios();
    setLaboratorios(data);
  };

  const handleCreateSoftware = async (software) => {
    try {
      await createSoftware(software);
      await fetchSoftwares();
      setNotification({ message: "Software cadastrado com sucesso!", type: "success" });
    } catch (err) {
      setNotification({ message: err.response?.data?.message || "Erro ao cadastrar software.", type: "error" });
    }
  };

  const handleDeleteSoftware = async (id) => {
    await deleteSoftware(id);
    fetchSoftwares();
    setNotification({ message: "Software excluído com sucesso!", type: "success" });
  };

  const handleCreateProfessor = async (professor) => {
    await createProfessor(professor);
    fetchProfessores();
    setNotification({ message: "Professor cadastrado com sucesso!", type: "success" });
  };

  const handleDeleteProfessor = async (id) => {
    await deleteProfessor(id);
    fetchProfessores();
    setNotification({ message: "Professor excluído com sucesso!", type: "success" });
  };

  const handleCreateLaboratory = async (laboratory) => {
    await createLaboratorio(laboratory);
    fetchLaboratorios();
    setNotification({ message: "Laboratório cadastrado com sucesso!", type: "success" });
  };

  const handleDeleteLaboratory = async (id) => {
    await deleteLaboratorio(id);
    fetchLaboratorios();
    setNotification({ message: "Laboratório excluído com sucesso!", type: "success" });
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login/admin');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">T6Devs_Back - Painel do Administrador</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Sair
        </button>
      </header>
      <main className="flex-grow p-4">
        <div className="max-w-4xl mx-auto">
          <Notification message={notification.message} type={notification.type} />
          <div className="mb-4 flex flex-col space-y-2">
            <Link to="/softwares" className="text-blue-500 hover:underline">
              Gerenciar Softwares
            </Link>
            <Link to="/softwares/novo" className="text-blue-500 hover:underline">
              Cadastrar Novo Software
            </Link>
            <Link to="/professores" className="text-blue-500 hover:underline">
              Listar Professores
            </Link>
            <Link to="/solicitacoes/minhas" className="text-blue-500 hover:underline">
              Gerenciar Solicitações
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded shadow-md">
              <h2 className="text-xl font-bold mb-4">Cadastrar Software</h2>
              <SoftwareForm onSubmit={handleCreateSoftware} />
              <SoftwareList softwares={softwares} onDelete={handleDeleteSoftware} />
            </div>
            <div className="bg-white p-4 rounded shadow-md">
              <h2 className="text-xl font-bold mb-4">Cadastrar Professor</h2>
              <ProfessorForm onSubmit={handleCreateProfessor} />
              <ProfessorList professores={professores} onDelete={handleDeleteProfessor} />
            </div>
            <div className="bg-white p-4 rounded shadow-md">
              <h2 className="text-xl font-bold mb-4">Cadastrar Laboratório</h2>
              <LaboratoryForm onSubmit={handleCreateLaboratory} />
              <LaboratoryList laboratorios={laboratorios} onDelete={handleDeleteLaboratory} />
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-blue-500 text-white p-4 text-center">
        <p>© 2025 T6Devs_Back</p>
      </footer>
    </div>
  );
};

export default AdminPage;