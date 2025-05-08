import axios from "axios";
import { signOut } from '@aws-amplify/auth'; // Importar signOut

// URL base do seu backend
const API_URL = 'http://localhost:8080/api';

// Cria uma instância do Axios com a URL base
const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para adicionar token JWT automaticamente nas requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// ==================== Softwares ====================
export const getSoftwares = async () => {
  const response = await api.get('/softwares');
  return response.data; // Retorna List<SoftwareDTO>
};

export const getSoftwaresDisponiveis = async () => {
  const response = await api.get('/softwares/disponiveis');
  return response.data; // Retorna List<SoftwareDTO>
};

export const createSoftware = async (software) => {
  const response = await api.post('/softwares', software);
  return response.data; // Retorna SoftwareDTO
};

export const toggleSoftwareAvailability = async (id) => {
  const response = await api.put(`/softwares/${id}/toggle-availability`);
  return response.data; // Retorna SoftwareDTO
};

export const deleteSoftware = async (id) => {
  const response = await api.delete(`/softwares/${id}`);
  return response.data; // Retorna void (status 204)
};

export const removeSoftwareFromLab = async (softwareId, labId) => {
  const response = await api.delete(`/softwares/${softwareId}/laboratorios/${labId}`);
  return response.data; // Retorna void (status 204)
};

export const getSoftwaresByLab = async (labId) => {
  const response = await api.get(`/softwares/laboratorios/${labId}/softwares`);
  return response.data; // Retorna List<SoftwareDTO>
};

export const confirmSoftwareUsage = async (softwareId) => {
  const response = await api.post('/softwares/confirmar-uso', { softwareId });
  return response.data;
};

// ==================== Professores ====================
export const getProfessores = async () => {
  const response = await api.get('/professors');
  return response.data; // Retorna List<ProfessorDTO>
};

export const createProfessor = async (professor) => {
  const response = await api.post('/professors', professor);
  return response.data; // Retorna ProfessorDTO
};

export const deleteProfessor = async (id) => {
  const response = await api.delete(`/professors/${id}`);
  return response.data; // Retorna void (status 204)
};

// ==================== Laboratórios ====================
export const getLaboratorios = async () => {
  const response = await api.get('/laboratories');
  return response.data; // Retorna List<LaboratoryDTO>
};

export const createLaboratorio = async (laboratorio) => {
  const response = await api.post('/laboratories', laboratorio);
  return response.data; // Retorna LaboratoryDTO
};

export const deleteLaboratorio = async (id) => {
  const response = await api.delete(`/laboratories/${id}`);
  return response.data; // Retorna void
};

// ==================== Solicitações ====================
export const getSolicitacoes = async () => {
  const response = await api.get('/solicitacoes');
  return response.data; // Retorna List<SolicitacaoDTO>
};

export const getMinhasSolicitacoes = async () => {
  const response = await api.get('/solicitacoes/minhas');
  return response.data; // Retorna List<SolicitacaoDTO>
};

export const createSolicitacao = async (solicitacao) => {
  const response = await api.post('/solicitacoes', solicitacao);
  return response.data; // Retorna SolicitacaoDTO
};

export const updateSolicitacao = async (id, solicitacao) => {
  const response = await api.put(`/solicitacoes/${id}`, solicitacao);
  return response.data; // Retorna SolicitacaoDTO
};

export const deleteSolicitacao = async (id) => {
  const response = await api.delete(`/solicitacoes/${id}`);
  return response.data; // Retorna void (status 204)
};

// ==================== Relatos de Problema ====================
export const createRelatoProblema = async (relato) => {
  const response = await api.post('/relatos', relato);
  return response.data; // Retorna RelatoProblemaDTO
};

// ==================== Logout ====================
export const logout = async () => {
  await signOut(); // Usar signOut diretamente
  localStorage.removeItem('token');
  localStorage.removeItem('userType');
};