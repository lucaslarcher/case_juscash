import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getProcessos = async () => {
  try {
    const response = await api.get('/processos');
    return response.data;
  } catch (error) {
    console.error('Erro ao carregar processos:', error);
    return [];
  }
};

export const updateProcessoStatus = async (id, status) => {
  try {
    await api.put(`/processos/${id}/status`, { status });
  } catch (error) {
    console.error('Erro ao atualizar status do processo:', error);
  }
};
