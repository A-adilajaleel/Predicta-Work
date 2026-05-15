import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

import { getWeeklyReportAPI } from '../api/dashboard'

import {
  Brain,
  Flame,
  CalendarDays,
  Clock3,
  CheckCircle2,
  Sparkles,
  TrendingUp,
} from 'lucide-react'

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

import { motion } from 'framer-motion'

const WeeklyReport = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await getWeeklyReportAPI()
        setData(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchReport()
  }, [])

  const weeklyChartData = [
    {
      name: 'Focus',
      value: data?.total_focus_minutes || 0,
    },
    {
      name: 'Tasks',
      value: data?.completed_tasks || 0,
    },
    {
      name: 'Average',
      value: data?.average_focus || 0,
    },
  ]

  return (
    <div className="flex min-h-screen bg-[#0B1120] overflow-x-hidden">
      <Navbar />

      <main className="lg:ml-64 flex-1 p-4 sm:p-6 lg:p-8 pt-24 lg:pt-8 relative">

        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-62.5 sm:w-125 h-62.5 sm:h-125 bg-indigo-500/10 blur-[120px] rounded-full" />

        <div className="absolute bottom-0 left-0 w-62.5 sm:w-100 h-62.5 sm:h-100 bg-violet-500/10 blur-[120px] rounded-full" />

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mb-8 sm:mb-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
        >

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Weekly AI Report
            </h1>

            <p className="text-gray-400 mt-2 text-sm sm:text-base">
              AI-generated productivity intelligence for your work week.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl shadow-2xl w-fit">

            <Sparkles
              className="text-indigo-400"
              size={18}
            />

            <span className="text-sm text-gray-300">
              AI Productivity Insights
            </span>
          </div>
        </motion.div>

        {/* LOADING */}
        {loading ? (
          <div className="flex items-center justify-center h-[60vh] relative z-10">

            <div className="flex flex-col items-center gap-4">

              <div className="w-14 h-14 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />

              <p className="text-indigo-300 animate-pulse">
                Generating weekly report...
              </p>
            </div>
          </div>
        ) : (
          <div className="relative z-10 space-y-6">

            {/* TOP STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

              {/* Focus */}
              <motion.div
                whileHover={{ y: -6 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-6 shadow-2xl"
              >

                <div className="flex items-center justify-between mb-5">

                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <Clock3 className="text-indigo-400" />
                  </div>

                  <span className="text-xs text-emerald-400">
                    Weekly
                  </span>
                </div>

                <p className="text-gray-400 text-sm">
                  Focus Time
                </p>

                <h2 className="text-4xl font-bold text-white mt-2">
                  {data?.total_focus_minutes}
                </h2>

                <p className="text-gray-500 text-xs mt-2">
                  total focus minutes
                </p>
              </motion.div>

              {/* Tasks */}
              <motion.div
                whileHover={{ y: -6 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-6 shadow-2xl"
              >

                <div className="flex items-center justify-between mb-5">

                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="text-emerald-400" />
                  </div>

                  <span className="text-xs text-emerald-400">
                    Completed
                  </span>
                </div>

                <p className="text-gray-400 text-sm">
                  Tasks Done
                </p>

                <h2 className="text-4xl font-bold text-white mt-2">
                  {data?.completed_tasks}
                </h2>

                <p className="text-gray-500 text-xs mt-2">
                  completed this week
                </p>
              </motion.div>

              {/* Best Day */}
              <motion.div
                whileHover={{ y: -6 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-6 shadow-2xl"
              >

                <div className="flex items-center justify-between mb-5">

                  <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                    <CalendarDays className="text-yellow-400" />
                  </div>

                  <span className="text-xs text-yellow-400">
                    Best Day
                  </span>
                </div>

                <p className="text-gray-400 text-sm">
                  Most Productive
                </p>

                <h2 className="text-2xl font-bold text-white mt-2">
                  {data?.best_day}
                </h2>

                <p className="text-gray-500 text-xs mt-2">
                  highest productivity
                </p>
              </motion.div>

              {/* Burnout */}
              <motion.div
                whileHover={{ y: -6 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-6 shadow-2xl"
              >

                <div className="flex items-center justify-between mb-5">

                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <Flame className="text-red-400" />
                  </div>

                  <span className="text-xs text-red-400">
                    Risk
                  </span>
                </div>

                <p className="text-gray-400 text-sm">
                  Burnout Risk
                </p>

                <h2 className="text-3xl font-bold text-white mt-2">
                  {data?.burnout_risk}
                </h2>

                <p className="text-gray-500 text-xs mt-2">
                  based on activity
                </p>
              </motion.div>
            </div>

            {/* CHART + REPORT */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

              {/* CHART */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="xl:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-4xl p-5 sm:p-8 shadow-2xl"
              >

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">

                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <TrendingUp className="text-indigo-400" />
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      Weekly Analytics
                    </h2>

                    <p className="text-gray-400 text-sm">
                      AI-analyzed productivity trends
                    </p>
                  </div>
                </div>

                <div className="w-full overflow-x-auto">
                  <div className="min-w-75 h-75">

                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                    >
                      <BarChart data={weeklyChartData}>

                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#1e293b"
                        />

                        <XAxis
                          dataKey="name"
                          stroke="#64748b"
                        />

                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#0f172a',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '16px',
                            color: '#fff',
                          }}
                        />

                        <Bar
                          dataKey="value"
                          fill="#6366f1"
                          radius={[10, 10, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>

              {/* AI REPORT */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="bg-linear-to-br from-indigo-500/10 to-violet-500/10 backdrop-blur-xl border border-indigo-500/20 rounded-4xl p-5 sm:p-8 shadow-2xl relative overflow-hidden"
              >

                <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 blur-3xl rounded-full" />

                <div className="relative z-10">

                  <div className="flex items-center gap-4 mb-6">

                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                      <Brain className="text-indigo-300" />
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        AI Analysis
                      </h2>

                      <p className="text-gray-400 text-sm">
                        Weekly productivity insights
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-3xl p-5">

                    <p className="text-gray-300 leading-relaxed text-sm sm:text-[15px] whitespace-pre-line">
                      {data?.weekly_report}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-xs text-indigo-300">

                    <Sparkles size={14} />

                    <span>
                      Generated by Groq + Llama AI
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default WeeklyReport