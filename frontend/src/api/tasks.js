import API from './axios'

export const getTasksAPI = () => API.get('/tasks/')
export const createTaskAPI = (data) => API.post('/tasks/', data)
export const updateTaskAPI = (id, data) => API.put(`/tasks/${id}/`, data)
export const deleteTaskAPI = (id) => API.delete(`/tasks/${id}/`)

// Team Leader
export const assignTaskAPI = (data) => API.post('/tasks/assign/', data)
export const getTLAssignedTasksAPI = () => API.get('/tasks/tl/assigned/')
export const getTLMembersAPI = () => API.get('/tasks/tl/members/')