import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Mail,
  Lock,
  User,
  ArrowRight,
} from 'lucide-react'

import { registerAPI } from '../api/auth'

const Register = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('employee')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setError('')

    try {
      await registerAPI({
        username,
        email,
        password,
        role,
      })

      navigate('/login')

    } catch (err) {
      console.error(err)

      setError(
        err?.response?.data?.error ||
        'Registration failed'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050816] relative overflow-hidden flex items-center justify-center px-4 py-10">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-100 h-100 bg-indigo-500/10 blur-[140px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-100 h-100 bg-violet-500/10 blur-[140px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >

        {/* Logo */}
        <div className="text-center mb-8">

          <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-indigo-500 to-violet-500 flex items-center justify-center mx-auto shadow-2xl shadow-indigo-500/30">

            <span className="text-white text-3xl font-bold">
              ✦
            </span>
          </div>

          <h1 className="text-5xl font-black text-white mt-6 tracking-tight">
            Predicta Work
          </h1>

          <p className="text-gray-400 mt-3 text-lg">
            Ethical AI Productivity Platform
          </p>
        </div>

        {/* Register Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[36px] p-8 md:p-10 shadow-[0_0_60px_rgba(99,102,241,0.15)]"
        >

          <h2 className="text-4xl font-bold text-white">
            Create Account
          </h2>

          <p className="text-gray-400 mt-2 mb-8">
            Start tracking productivity intelligently.
          </p>

          {/* Error */}
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl text-sm">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Username */}
            <div>
              <label className="text-gray-300 text-sm mb-2 block">
                Username
              </label>

              <div className="relative">
                <User
                  size={20}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type="text"
                  placeholder="yourname"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full h-16 pl-14 pr-4 rounded-2xl bg-[#0B1120]/80 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-300 text-sm mb-2 block">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-16 pl-14 pr-4 rounded-2xl bg-[#0B1120]/80 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-300 text-sm mb-2 block">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-16 pl-14 pr-4 rounded-2xl bg-[#0B1120]/80 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* Role */}
                    <div>
                 <label className="text-gray-300 text-sm mb-2 block">
              Account Type
          </label>

  <select
    value={role}
    onChange={(e) => setRole(e.target.value)}
    className="w-full h-16 px-5 rounded-2xl bg-[#0B1120]/80 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
  >
    <option value="employee">Employee</option>
    <option value="team_leader">Team Leader</option>
    <option value="manager">Manager</option>
  </select>
</div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="w-full h-16 rounded-2xl bg-linear-to-r from-indigo-500 to-violet-500 text-white font-bold text-lg shadow-2xl shadow-indigo-500/30 hover:opacity-90 transition-all flex items-center justify-center gap-3"
            >
              {loading ? (
                'Creating Account...'
              ) : (
                <>
                  Create Account
                  <ArrowRight size={22} />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <p className="text-gray-400 text-center mt-8">
            Already have an account?{' '}

            <Link
              to="/login"
              className="text-indigo-400 hover:text-indigo-300 font-semibold transition"
            >
              Sign In
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Register