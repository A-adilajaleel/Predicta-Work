import API from './axios'

export const getDashboardStatsAPI = () => API.get('/ai/dashboard/')
export const getAIFeedbackAPI = () => API.get('/ai/feedback/')
export const getDeepWorkScoreAPI = () => API.get('/ai/deepwork/')
export const getWeeklyReportAPI = () =>
  API.get('/ai/weekly-report/')
