import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import {
  Brain,
  Timer,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Activity,
  Users,
  BarChart3,
  MessageSquareQuote,
  ChevronRight,
  Star,
  Building2,
  CheckCircle2,
} from 'lucide-react'

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-white overflow-x-hidden relative transition-colors duration-300">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-62.5 sm:w-125 h-62.5 sm:h-125 bg-indigo-500/10 blur-[120px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-62.5 sm:w-125 h-62.5 sm:h-125 bg-violet-500/10 blur-[120px] rounded-full" />

      {/* Navbar */}
      <header className="relative z-10 flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 lg:px-20 py-5 gap-5">

        {/* Logo */}
        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-2xl">
            <Sparkles size={20} className="text-white" />
          </div>

          <div>
            <h1 className="font-bold text-lg sm:text-xl">
              Predicta Work
            </h1>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              AI Productivity Platform
            </p>
          </div>
        </div>

        {/* Nav Buttons */}
        <div className="flex items-center gap-3 sm:gap-4">

          <Link
            to="/login"
            className="text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-linear-to-r from-indigo-500 via-violet-500 to-purple-500 hover:scale-105 transition-all duration-300 shadow-2xl text-white text-sm sm:text-base"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-20 pt-10 sm:pt-16 lg:pt-20 pb-20 lg:pb-28">

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 dark:text-indigo-300 text-xs sm:text-sm mb-6">

              <Sparkles size={16} />

              Ethical AI Productivity Tracking
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight font-black mb-6">

              The Future Of

              <span className="bg-linear-to-r from-indigo-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">
                {' '}Remote Work
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8 sm:mb-10 max-w-xl">

              AI-powered productivity insights for remote teams —
              without invasive employee surveillance.

            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">

              <Link
                to="/register"
                className="group px-6 sm:px-7 py-4 rounded-2xl bg-linear-to-r from-indigo-500 via-violet-500 to-purple-500 hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center gap-2 font-semibold text-white text-sm sm:text-base"
              >
                Start Free

                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition"
                />
              </Link>

              <Link
                to="/login"
                className="px-6 sm:px-7 py-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-all text-center text-sm sm:text-base"
              >
                Live Demo
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-5 mt-12 sm:mt-16">

              <div>
                <h3 className="text-2xl sm:text-4xl font-bold">
                  AI
                </h3>

                <p className="text-gray-500 text-xs sm:text-sm mt-1">
                  Smart Insights
                </p>
              </div>

              <div>
                <h3 className="text-2xl sm:text-4xl font-bold">
                  100%
                </h3>

                <p className="text-gray-500 text-xs sm:text-sm mt-1">
                  Privacy Focused
                </p>
              </div>

              <div>
                <h3 className="text-2xl sm:text-4xl font-bold">
                  Real
                </h3>

                <p className="text-gray-500 text-xs sm:text-sm mt-1">
                  Team Analytics
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative order-1 lg:order-2"
          >

            <div className="bg-white dark:bg-white/5 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-[30px] sm:rounded-[40px] p-4 sm:p-6 lg:p-8 shadow-2xl">

              {/* Top Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-5">

                <div className="bg-[#F1F5F9] dark:bg-[#111827]/80 rounded-3xl p-5 border border-gray-200 dark:border-white/5">

                  <div className="flex items-center justify-between mb-5">

                    <Brain className="text-violet-500" />

                    <span className="text-violet-500 text-xs">
                      AI
                    </span>
                  </div>

                  <p className="text-gray-500 text-sm">
                    Deep Work Score
                  </p>

                  <h2 className="text-4xl sm:text-5xl font-bold mt-2">
                    92
                  </h2>
                </div>

                <div className="bg-[#F1F5F9] dark:bg-[#111827]/80 rounded-3xl p-5 border border-gray-200 dark:border-white/5">

                  <div className="flex items-center justify-between mb-5">

                    <Timer className="text-indigo-500" />

                    <span className="text-indigo-500 text-xs">
                      Focus
                    </span>
                  </div>

                  <p className="text-gray-500 text-sm">
                    Focus Time
                  </p>

                  <h2 className="text-4xl sm:text-5xl font-bold mt-2">
                    4.8h
                  </h2>
                </div>
              </div>

              {/* Analytics */}
              <div className="bg-[#F1F5F9] dark:bg-[#111827]/80 rounded-3xl p-5 sm:p-6 border border-gray-200 dark:border-white/5 mb-5">

                <div className="flex items-center justify-between mb-6">

                  <h3 className="font-semibold text-sm sm:text-base">
                    Team Analytics
                  </h3>

                  <Activity className="text-emerald-500" />
                </div>

                <div className="space-y-4">

                  <div>

                    <div className="flex justify-between mb-2 text-sm">

                      <span className="text-gray-500">
                        Productivity
                      </span>

                      <span className="text-emerald-500">
                        87%
                      </span>
                    </div>

                    <div className="h-3 bg-gray-200 dark:bg-[#1e293b] rounded-full overflow-hidden">

                      <div className="h-full w-[87%] bg-linear-to-r from-emerald-500 to-green-400 rounded-full" />

                    </div>
                  </div>

                  <div>

                    <div className="flex justify-between mb-2 text-sm">

                      <span className="text-gray-500">
                        Burnout Risk
                      </span>

                      <span className="text-yellow-500">
                        Low
                      </span>
                    </div>

                    <div className="h-3 bg-gray-200 dark:bg-[#1e293b] rounded-full overflow-hidden">

                      <div className="h-full w-[20%] bg-linear-to-r from-yellow-400 to-orange-400 rounded-full" />

                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Grid */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">

                <div className="bg-[#F1F5F9] dark:bg-[#111827]/80 rounded-2xl p-3 sm:p-4 border border-gray-200 dark:border-white/5 text-center">
                  <Users className="mx-auto mb-2 text-indigo-500 w-5 h-5 sm:w-6 sm:h-6" />

                  <p className="text-xs sm:text-sm text-gray-500">
                    Teams
                  </p>
                </div>

                <div className="bg-[#F1F5F9] dark:bg-[#111827]/80 rounded-2xl p-3 sm:p-4 border border-gray-200 dark:border-white/5 text-center">
                  <ShieldCheck className="mx-auto mb-2 text-emerald-500 w-5 h-5 sm:w-6 sm:h-6" />

                  <p className="text-xs sm:text-sm text-gray-500">
                    Ethical
                  </p>
                </div>

                <div className="bg-[#F1F5F9] dark:bg-[#111827]/80 rounded-2xl p-3 sm:p-4 border border-gray-200 dark:border-white/5 text-center">
                  <BarChart3 className="mx-auto mb-2 text-violet-500 w-5 h-5 sm:w-6 sm:h-6" />

                  <p className="text-xs sm:text-sm text-gray-500">
                    Insights
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

     

      {/* FEATURES */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-20 py-20">

        <div className="text-center mb-16">

          <p className="text-indigo-500 font-medium mb-4">
            FEATURES
          </p>

          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            Smarter Productivity Intelligence
          </h2>

          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Powerful AI tools designed to improve productivity without invading employee privacy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {[
            {
              icon: <Brain className="text-violet-500" />,
              title: 'AI Insights',
              desc: 'Smart recommendations powered by AI productivity analysis.',
            },

            {
              icon: <Timer className="text-indigo-500" />,
              title: 'Deep Work Tracking',
              desc: 'Pomodoro-based focus sessions for healthier productivity.',
            },

            {
              icon: <ShieldCheck className="text-emerald-500" />,
              title: 'Privacy Safe',
              desc: 'No screenshots, no spyware, no invasive employee surveillance.',
            },

            {
              icon: <BarChart3 className="text-pink-500" />,
              title: 'Advanced Analytics',
              desc: 'Track productivity trends and work patterns intelligently.',
            },

            {
              icon: <Users className="text-yellow-500" />,
              title: 'Team Dashboard',
              desc: 'Managers get ethical workforce insights in real-time.',
            },

            {
              icon: <Sparkles className="text-orange-500" />,
              title: 'Weekly Reports',
              desc: 'AI-generated summaries for better decision-making.',
            },
          ].map((feature, index) => (

            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-4xl p-8 backdrop-blur-2xl shadow-xl"
            >

              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-20 py-24">

        <div className="bg-linear-to-r from-indigo-500 via-violet-500 to-purple-500 rounded-[40px] p-10 sm:p-16 text-center text-white shadow-2xl">

          <h2 className="text-4xl sm:text-6xl font-black mb-6">
            Start Building Healthier Remote Teams
          </h2>

          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-10">
            AI-powered productivity intelligence designed for modern remote work.
          </p>

          <Link
            to="/register"
            className="inline-flex items-center gap-3 px-8 py-5 rounded-2xl bg-white text-black font-bold hover:scale-105 transition-all duration-300 shadow-2xl"
          >

            Start Free Trial

            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-gray-200 dark:border-white/10 py-10 px-4 sm:px-6 lg:px-20">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div>

            <h2 className="text-2xl font-black">
              Predicta Work
            </h2>

            <p className="text-gray-500 mt-2">
              Ethical AI Productivity Platform
            </p>
          </div>

          <div className="flex items-center gap-6 text-gray-500">

            <a href="/privacy">
              Privacy
            </a>

            <a href="/terms">
              Terms
            </a>

            <a href="/contact">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing