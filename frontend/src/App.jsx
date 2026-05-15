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

      {/* Home */}
      <Route
        path="/"
        element={<Home />}
      />

      {/* Auth */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* Employee */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        }
      />

      <Route
        path="/timer"
        element={
          <ProtectedRoute>
            <Timer />
          </ProtectedRoute>
        }
      />

      <Route
        path="/deepwork"
        element={
          <ProtectedRoute>
            <DeepWork />
          </ProtectedRoute>
        }
      />

      {/* Manager */}
      <Route
        path="/team"
        element={
          <ProtectedRoute>
            <TeamDashboard />
          </ProtectedRoute>
        }
      />

      {/* Unknown Routes */}
      <Route
        path="*"
        element={<Navigate to="/" />}
      />

      <Route
  path="/weekly-report"
  element={
    <ProtectedRoute>
      <WeeklyReport />
    </ProtectedRoute>
  }
/>

<Route path="/privacy" element={<Privacy />} />
<Route path="/terms" element={<Terms />} />
<Route path="/contact" element={<Contact />} />

    </Routes>
  )
}

export default App