import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getDeepWorkScoreAPI } from '../api/dashboard'

import {
  Brain,
  Flame,
  Timer,
  CheckCircle2,
  Activity,
  Sparkles,
  TrendingUp,
} from 'lucide-react'

const DeepWork = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const res = await getDeepWorkScoreAPI()
        setData(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchScore()
  }, [])

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400'
    if (score >= 50) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Elite Focus'
    if (score >= 60) return 'Strong Performance'
    if (score >= 40) return 'Moderate Focus'
    return 'Needs Improvement'
  }

  return (
    <div className="flex min-h-screen bg-[#0B1120] overflow-x-hidden">
      <Navbar />

      <main className="lg:ml-64 flex-1 p-4 sm:p-6 lg:p-8 pt-24 lg:pt-8 relative">

        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-62.5 sm:w-125 h-62.5 sm:h-125 bg-indigo-500/10 blur-[120px] rounded-full" />

        <div className="absolute bottom-0 left-0 w-62.5 sm:w-100 h-62.5 sm:h-100 bg-violet-500/10 blur-[120px] rounded-full" />

        {/* Header */}
        <div className="relative z-10 mb-8 sm:mb-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              Deep Work Intelligence
            </h1>

            <p className="text-gray-400 text-sm sm:text-base">
              AI-powered productivity insights for focused remote work.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-4 sm:px-5 py-3 rounded-2xl shadow-2xl w-fit">

            <Sparkles
              className="text-indigo-400"
              size={18}
            />

            <span className="text-xs sm:text-sm text-gray-300">
              Powered by Groq + Llama AI
            </span>
          </div>
        </div>

        {loading ? (
          <div className="relative z-10 flex items-center justify-center h-[60vh]">

            <div className="flex flex-col items-center gap-4">

              <div className="w-14 h-14 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />

              <p className="text-indigo-300 animate-pulse text-sm sm:text-base text-center">
                Analyzing your deep work patterns...
              </p>
            </div>
          </div>
        ) : (
          <div className="relative z-10 grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* LEFT MAIN SCORE */}
            <div className="xl:col-span-1 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[28px] sm:rounded-4xl p-5 sm:p-8 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">

              <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 to-violet-500/10" />

              <div className="relative z-10 flex items-center gap-2 mb-6">

                <Brain
                  className="text-indigo-400"
                  size={22}
                />

                <p className="text-gray-300 text-xs sm:text-sm uppercase tracking-[0.2em]">
                  Deep Work Score
                </p>
              </div>

              {/* SCORE RING */}
              <div className="relative w-52 h-52 sm:w-64 sm:h-64 mb-6">

                <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-3xl" />

                <svg
                  className="w-full h-full -rotate-90"
                  viewBox="0 0 100 100"
                >

                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="8"
                  />

                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke={
                      data?.score >= 80
                        ? '#34d399'
                        : data?.score >= 50
                        ? '#facc15'
                        : '#f87171'
                    }
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 42}`}
                    strokeDashoffset={`${2 * Math.PI * 42 * (1 - data?.score / 100)}`}
                    className="transition-all duration-1000 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">

                  <span className={`text-5xl sm:text-6xl font-bold ${getScoreColor(data?.score)}`}>
                    {data?.score}
                  </span>

                  <span className="text-gray-400 text-xs sm:text-sm mt-1">
                    out of 100
                  </span>
                </div>
              </div>

              <p className={`text-lg sm:text-xl font-semibold text-center ${getScoreColor(data?.score)}`}>
                {getScoreLabel(data?.score)}
              </p>

              <p className="text-gray-400 text-sm text-center mt-3 max-w-xs leading-relaxed">
                Your productivity intelligence score is generated using focus time,
                task completion, and deep work consistency.
              </p>
            </div>

            {/* RIGHT CONTENT */}
            <div className="xl:col-span-2 space-y-6">

              {/* INSIGHT CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                {/* CARD 1 */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-xl hover:-translate-y-1 transition-all duration-300">

                  <div className="flex items-center justify-between mb-4">

                    <Timer className="text-indigo-400" />

                    <span className="text-xs text-emerald-400">
                      +18%
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm">
                    Focus Time
                  </p>

                  <h2 className="text-3xl font-bold text-white mt-1">
                    {data?.focus_minutes}
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    minutes today
                  </p>
                </div>

                {/* CARD 2 */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-xl hover:-translate-y-1 transition-all duration-300">

                  <div className="flex items-center justify-between mb-4">

                    <CheckCircle2 className="text-emerald-400" />

                    <span className="text-xs text-emerald-400">
                      Completed
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm">
                    Tasks Done
                  </p>

                  <h2 className="text-3xl font-bold text-white mt-1">
                    {data?.completed_tasks}
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    of {data?.total_tasks} tasks
                  </p>
                </div>

                {/* CARD 3 */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-xl hover:-translate-y-1 transition-all duration-300">

                  <div className="flex items-center justify-between mb-4">

                    <Flame className="text-orange-400" />

                    <span className="text-xs text-orange-400">
                      Strong
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm">
                    Consistency
                  </p>

                  <h2 className="text-3xl font-bold text-white mt-1">
                    {data?.consistency_score}
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    consistency points
                  </p>
                </div>

                {/* CARD 4 */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-xl hover:-translate-y-1 transition-all duration-300">

                  <div className="flex items-center justify-between mb-4">

                    <TrendingUp className="text-violet-400" />

                    <span className="text-xs text-violet-400">
                      Stable
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm">
                    Performance
                  </p>

                  <h2 className="text-3xl font-bold text-white mt-1">
                    High
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    productivity trend
                  </p>
                </div>
              </div>

              {/* SCORE BREAKDOWN */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] sm:rounded-4xl p-5 sm:p-8 shadow-2xl">

                <div className="flex items-center gap-3 mb-8">

                  <Activity className="text-indigo-400" />

                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Score Breakdown
                  </h2>
                </div>

                <div className="space-y-6">

                  {/* FOCUS */}
                  <div>

                    <div className="flex justify-between gap-4 mb-2">

                      <span className="text-gray-300 text-sm sm:text-base">
                        Focus Time Contribution
                      </span>

                      <span className="text-white font-semibold text-sm sm:text-base">
                        {data?.focus_score}/40
                      </span>
                    </div>

                    <div className="w-full h-3 bg-[#1e293b] rounded-full overflow-hidden">

                      <div
                        className="h-full bg-linear-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-1000"
                        style={{
                          width: `${(data?.focus_score / 40) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* TASKS */}
                  <div>

                    <div className="flex justify-between gap-4 mb-2">

                      <span className="text-gray-300 text-sm sm:text-base">
                        Task Completion Contribution
                      </span>

                      <span className="text-white font-semibold text-sm sm:text-base">
                        {data?.task_score}/40
                      </span>
                    </div>

                    <div className="w-full h-3 bg-[#1e293b] rounded-full overflow-hidden">

                      <div
                        className="h-full bg-linear-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-1000"
                        style={{
                          width: `${(data?.task_score / 40) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* CONSISTENCY */}
                  <div>

                    <div className="flex justify-between gap-4 mb-2">

                      <span className="text-gray-300 text-sm sm:text-base">
                        Consistency Contribution
                      </span>

                      <span className="text-white font-semibold text-sm sm:text-base">
                        {data?.consistency_score}/20
                      </span>
                    </div>

                    <div className="w-full h-3 bg-[#1e293b] rounded-full overflow-hidden">

                      <div
                        className="h-full bg-linear-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-1000"
                        style={{
                          width: `${(data?.consistency_score / 20) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* AI ANALYSIS */}
              <div className="bg-linear-to-br from-indigo-500/10 to-violet-500/10 backdrop-blur-xl border border-indigo-500/20 rounded-[28px] sm:rounded-4xl p-5 sm:p-8 shadow-2xl relative overflow-hidden">

                <div className="absolute top-0 right-0 w-40 sm:w-48 h-40 sm:h-48 bg-indigo-500/10 blur-3xl rounded-full" />

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4 mb-5">

                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                    <Brain className="text-indigo-300" />
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      AI Productivity Analysis
                    </h2>

                    <p className="text-gray-400 text-sm">
                      Personalized deep work insights generated by AI
                    </p>
                  </div>
                </div>

                <p className="relative z-10 text-gray-300 leading-relaxed text-sm sm:text-[15px]">
                  {data?.analysis}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default DeepWork