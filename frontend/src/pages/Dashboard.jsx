import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import Navbar from '../components/Navbar'
import StandupModal from '../components/StandupModal'

import {
  getDashboardStatsAPI,
  getAIFeedbackAPI,
} from '../api/dashboard'

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

import {
  Brain,
  Flame,
  CheckCircle2,
  Clock3,
  Sparkles,
  TrendingUp,
} from 'lucide-react'

const Dashboard = () => {

  const { user } = useSelector(
    (state) => state.auth
  )

  const [stats, setStats] =
    useState(null)

  const [feedback, setFeedback] =
    useState('')

  const [loading, setLoading] =
    useState(true)

  const [showStandup, setShowStandup] =
    useState(false)

  useEffect(() => {

    if (user?.role === 'employee') {

      setShowStandup(true)

    }

    const fetchData = async () => {

      try {

        const [
          statsRes,
          feedbackRes
        ] = await Promise.all([
          getDashboardStatsAPI(),
          getAIFeedbackAPI(),
        ])

        setStats(statsRes.data)

        setFeedback(
          feedbackRes.data.feedback
        )

      } catch (err) {

        console.error(err)

      } finally {

        setLoading(false)

      }
    }

    fetchData()

  }, [user])

  const chartData = [
    {
      day: 'Mon',
      minutes: 30,
    },
    {
      day: 'Tue',
      minutes: 50,
    },
    {
      day: 'Wed',
      minutes: 70,
    },
    {
      day: 'Thu',
      minutes: 40,
    },
    {
      day: 'Fri',
      minutes: 90,
    },
    {
      day: 'Sat',
      minutes: 20,
    },
    {
      day: 'Sun',
      minutes: 60,
    },
  ]

  return (

    <div className="flex min-h-screen bg-[#0B1120] overflow-hidden">

      <Navbar />

      <main className="lg:ml-72 flex-1 p-4 lg:p-8 pt-24 lg:pt-8 relative">

        <div className="absolute top-0 right-0 w-125 h-125 bg-indigo-500/10 blur-[120px] rounded-full" />

        <div className="absolute bottom-0 left-0 w-100 h-100 bg-violet-500/10 blur-[120px] rounded-full" />

        <div className="relative z-10 mb-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>

            <h1 className="text-4xl font-bold tracking-tight text-white">

              Welcome back, {user?.username} 👋

            </h1>

            <p className="text-gray-400 mt-2 text-lg">

              Your productivity intelligence overview for today.

            </p>

          </div>

          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl shadow-2xl">

            <Sparkles className="text-indigo-400" size={18} />

            <span className="text-sm text-gray-300">

              AI Productivity Insights

            </span>

          </div>

        </div>

        {loading ? (

          <div className="relative z-10 flex items-center justify-center h-[70vh]">

            <div className="flex flex-col items-center gap-4">

              <div className="w-14 h-14 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />

              <p className="text-indigo-300 animate-pulse">

                Loading productivity dashboard...

              </p>

            </div>

          </div>

        ) : (

          <>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-6 shadow-2xl hover:-translate-y-1 transition-all duration-300">

                <div className="flex items-center justify-between mb-5">

                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">

                    <Clock3 className="text-indigo-400" />

                  </div>

                  <span className="text-xs text-emerald-400">

                    +12%

                  </span>

                </div>

                <p className="text-gray-400 text-sm">

                  Focus Time

                </p>

                <h2 className="text-5xl font-bold text-white mt-2">

                  {stats?.today_focus_minutes}

                  <span className="text-lg text-gray-500 ml-1">

                    min

                  </span>

                </h2>

                <p className="text-gray-500 text-xs mt-2">

                  Deep work today

                </p>

              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-6 shadow-2xl hover:-translate-y-1 transition-all duration-300">

                <div className="flex items-center justify-between mb-5">

                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">

                    <CheckCircle2 className="text-emerald-400" />

                  </div>

                  <span className="text-xs text-emerald-400">

                    Completed

                  </span>

                </div>

                <p className="text-gray-400 text-sm">

                  Tasks Completed

                </p>

                <h2 className="text-5xl font-bold text-white mt-2">

                  {stats?.completed_tasks}

                </h2>

                <p className="text-gray-500 text-xs mt-2">

                  Great consistency

                </p>

              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-6 shadow-2xl hover:-translate-y-1 transition-all duration-300">

                <div className="flex items-center justify-between mb-5">

                  <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">

                    <TrendingUp className="text-yellow-400" />

                  </div>

                  <span className="text-xs text-yellow-400">

                    Active

                  </span>

                </div>

                <p className="text-gray-400 text-sm">

                  Pending Tasks

                </p>

                <h2 className="text-5xl font-bold text-white mt-2">

                  {stats?.pending_tasks}

                </h2>

                <p className="text-gray-500 text-xs mt-2">

                  Stay focused

                </p>

              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-6 shadow-2xl hover:-translate-y-1 transition-all duration-300">

                <div className="flex items-center justify-between mb-5">

                  <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">

                    <Flame className="text-orange-400" />

                  </div>

                  <span className="text-xs text-orange-400">

                    Strong

                  </span>

                </div>

                <p className="text-gray-400 text-sm">

                  Productivity Streak

                </p>

                <h2 className="text-5xl font-bold text-white mt-2">

                {stats?.streak}

                  <span className="text-lg text-gray-500 ml-1">

                    days

                  </span>

                </h2>

                <p className="text-gray-500 text-xs mt-2">

                  Keep the momentum

                </p>

              </div>

            </div>

            <div className="relative z-10 grid grid-cols-1 xl:grid-cols-3 gap-6">

              <div className="xl:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[36px] p-8 shadow-2xl">

                <div className="flex items-center gap-4 mb-8">

                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">

                    <TrendingUp className="text-indigo-400" />

                  </div>

                  <div>

                    <h2 className="text-3xl font-bold text-white">

                      Weekly Focus Analytics

                    </h2>

                    <p className="text-gray-400 mt-1">

                      Your deep work activity over the last 7 days.

                    </p>

                  </div>

                </div>

                <div className="h-87.5">

                  <ResponsiveContainer width="100%" height="100%">

                    <BarChart data={chartData}>

                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#1E293B"
                      />

                      <XAxis
                        dataKey="day"
                        stroke="#94A3B8"
                      />

                      <Tooltip />

                      <Bar
                        dataKey="minutes"
                        radius={[12, 12, 0, 0]}
                        fill="#8B5CF6"
                      />

                    </BarChart>

                  </ResponsiveContainer>

                </div>

              </div>

              <div className="bg-linear-to-br from-indigo-500/20 to-violet-500/10 backdrop-blur-xl border border-white/10 rounded-[36px] p-8 shadow-2xl">

                <div className="flex items-center gap-4 mb-8">

                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">

                    <Brain className="text-indigo-300" />

                  </div>

                  <div>

                    <h2 className="text-3xl font-bold text-white">

                      AI Coach

                    </h2>

                    <p className="text-gray-300 mt-1">

                      Personalized productivity insights

                    </p>

                  </div>

                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

                  <p className="text-gray-200 leading-relaxed text-lg">

                    {feedback}

                  </p>

                </div>

              </div>

            </div>

          </>

        )}

        {
          showStandup && (
            <StandupModal
              onClose={() =>
                setShowStandup(false)
              }
              onSubmit={() => {}}
            />
          )
        }

      </main>

    </div>
  )
}

export default Dashboard