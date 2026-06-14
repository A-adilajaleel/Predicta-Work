import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Timer from './pages/Timer'
import DeepWork from './pages/DeepWork'
import TeamDashboard from './pages/TeamDashboard'
import TeamLeaderDashboard from './pages/TeamLeaderDashboard'
import WeeklyReport from './pages/WeeklyReport'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Contact from './pages/Contact'

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth)
  return token ? children : <Navigate to="/login" />
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
      <Route path="/timer" element={<ProtectedRoute><Timer /></ProtectedRoute>} />
      <Route path="/deepwork" element={<ProtectedRoute><DeepWork /></ProtectedRoute>} />
      <Route path="/weekly-report" element={<ProtectedRoute><WeeklyReport /></ProtectedRoute>} />

      {/* Manager */}
      <Route path="/team" element={<ProtectedRoute><TeamDashboard /></ProtectedRoute>} />

      {/* Team Leader */}
      <Route path="/tl-dashboard" element={<ProtectedRoute><TeamLeaderDashboard /></ProtectedRoute>} />

      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App