import API from './axios'

export const getSessionsAPI = () => API.get('/sessions/')
export const createSessionAPI = (data) => API.post('/sessions/', data)