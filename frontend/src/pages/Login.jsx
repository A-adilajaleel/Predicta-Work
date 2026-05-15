import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import { loginAPI } from '../api/auth'
import { setCredentials } from '../store/authSlice'

import {
  ArrowLeft,
} from 'lucide-react'

import {
  Sparkles,
  Mail,
  Lock,
  ArrowRight,
} from 'lucide-react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setError('')

    try {
      const res = await loginAPI({
        email,
        password,
      })

      // SAVE TOKEN + USER
      dispatch(setCredentials(res.data))

      // ROLE BASED NAVIGATION
      if (res.data.user.role === 'manager') {
        navigate('/team')
      } else {
        navigate('/dashboard')
      }

    } catch (err) {
      console.error(err)

      setError(
        err?.response?.data?.error ||
        'Invalid email or password'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center overflow-hidden relative px-4 py-10">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-75 sm:w-112.5 h-75 sm:h-112.5 bg-indigo-500/10 blur-[140px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-75 sm:w-112.5 h-75 sm:h-112.5 bg-violet-500/10 blur-[140px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md"
      >
        <motion.button
        type='button'
  whileHover={{ x: -4 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => navigate('/')}
  className="
    mb-6
    flex items-center gap-2
    text-gray-300
    hover:text-white
    bg-white/5
    border border-white/10
    px-5 py-3
    rounded-2xl
    backdrop-blur-xl
    transition-all
    hover:border-indigo-500/40
    hover:bg-indigo-500/10
  "
>
  <ArrowLeft size={18} />

  Back
</motion.button>
        {/* LOGO */}
        <div className="text-center mb-7 sm:mb-8">

          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-linear-to-br from-indigo-500 to-violet-500 shadow-2xl shadow-indigo-500/30 mb-5">

            <Sparkles
              size={30}
              className="text-white"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Predicta Work
          </h1>

          <p className="text-gray-400 mt-3 text-sm sm:text-base px-4">
            Ethical AI Productivity Platform
          </p>
        </div>

        {/* LOGIN CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-4xl p-6 sm:p-8 shadow-[0_0_60px_rgba(99,102,241,0.15)]"
        >

          {/* TITLE */}
          <div className="mb-8">

            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Welcome Back
            </h2>

            <p className="text-gray-400 mt-2 text-sm sm:text-base">
              Sign in to continue your productivity journey.
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl mb-5 text-sm">
              {error}
            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* EMAIL */}
            <div>

              <label className="text-sm text-gray-400 mb-2 block">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={20}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="
                    w-full
                    bg-[#111827]/80
                    border border-white/10
                    text-white
                    pl-14 pr-4
                    py-4
                    rounded-2xl
                    outline-none
                    focus:border-indigo-500
                    focus:ring-2
                    focus:ring-indigo-500/20
                    transition-all
                  "
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>

              <label className="text-sm text-gray-400 mb-2 block">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={20}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="
                    w-full
                    bg-[#111827]/80
                    border border-white/10
                    text-white
                    pl-14 pr-4
                    py-4
                    rounded-2xl
                    outline-none
                    focus:border-indigo-500
                    focus:ring-2
                    focus:ring-indigo-500/20
                    transition-all
                  "
                />
              </div>
            </div>

            {/* BUTTON */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="
                group
                w-full
                py-4
                rounded-2xl
                bg-linear-to-r from-indigo-500 to-violet-500
                shadow-2xl shadow-indigo-500/30
                font-semibold
                text-white
                flex items-center justify-center gap-3
                transition-all
              "
            >
              {loading ? (
                'Signing In...'
              ) : (
                <>
                  Sign In

                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition"
                  />
                </>
              )}
            </motion.button>
          </form>

          {/* FOOTER */}
          <p className="text-center text-gray-400 text-sm mt-8 leading-relaxed">

            Don’t have an account?{' '}

            <Link
              to="/register"
              className="text-indigo-400 hover:text-indigo-300 font-semibold transition"
            >
              Create Account
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Login