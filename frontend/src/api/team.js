import API from './axios'

export const createTeamAPI = (data) =>
  API.post('/teams/', data)

export const addMemberAPI = (teamId, data) =>
  API.post(`/teams/${teamId}/add-member/`, data)

export const getTeamDashboardAPI = () =>
  API.get('/teams/dashboard/')