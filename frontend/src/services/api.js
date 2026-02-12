import axios from 'axios'

// const API_URL = 'http://localhost:5000/api'

const API_URL = import.meta.env.VITE_API_URL


const getToken = () => localStorage.getItem('token')

const api = axios.create({
  baseURL: API_URL,
})

// Add token to all requests
api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/me'),
}

export const documentService = {
  upload: (formData) => api.post('/documents/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  list: () => api.get('/documents/list'),
  get: (id) => api.get(`/documents/${id}`),
  delete: (id) => api.delete(`/documents/${id}`),
}

export const searchService = {
  query: (query) => api.post('/search/query', { query }),
  ask: (question) => api.post('/search/ask', { question }),
}

export const chatService = {
  createSession: (title) => api.post('/chat/sessions', { title }),
  getSessions: () => api.get('/chat/sessions'),
  sendMessage: (sessionId, message) => api.post('/chat/send', { sessionId, message }),
  getHistory: (sessionId) => api.get(`/chat/history/${sessionId}`),
}

export const adminService = {
  getDashboardStats: () => api.get('/admin/stats/dashboard'),
  getAllUsers: (page = 1, limit = 10) => api.get(`/admin/users/list?page=${page}&limit=${limit}`),
  getDocumentAnalytics: () => api.get('/admin/documents/analytics'),
  getChatAnalytics: () => api.get('/admin/chat/analytics'),
  getSystemHealth: () => api.get('/admin/system/health'),
}

export default api
