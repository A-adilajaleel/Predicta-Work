import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getTeamDashboardAPI, createTeamAPI, addMemberAPI } from '../api/team'
import { Activity, Sparkles, Plus, UserPlus } from 'lucide-react'

const TeamDashboard = () => {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [teamName, setTeamName] = useState('')
  const [memberEmail, setMemberEmail] = useState('')

  const fetchDashboard = async () => {

    try {

      const res = await getTeamDashboardAPI()

      setData(res.data)

    } catch (err) {

      console.error(err)

    } finally {

      setLoading(false)

    }
  }

  useEffect(() => {

    fetchDashboard()

  }, [])

  const handleCreateTeam = async () => {

    try {

      await createTeamAPI({
        name: teamName,
      })

      setTeamName('')

      fetchDashboard()

    } catch (err) {

      console.error(err)

    }
  }

  const handleAddMember = async () => {

    try {

      await addMemberAPI(
        data?.team_id,
        {
          email: memberEmail,
        }
      )

      setMemberEmail('')

      fetchDashboard()

    } catch (err) {

      console.error(err)

    }
  }

  const getScoreColor = (score) => {

    if (score >= 80) return 'text-emerald-400'

    if (score >= 50) return 'text-yellow-400'

    return 'text-red-400'
  }

  return (

    <div className="flex min-h-screen bg-[#0B1120] overflow-hidden">

      <Navbar />

      <main className="lg:ml-72 flex-1 p-4 lg:p-8 pt-24 lg:pt-8 relative">

        <div className="absolute top-0 right-0 w-75 sm:w-125 h-75 sm:h-125 bg-indigo-500/10 blur-[120px] rounded-full" />

        <div className="absolute bottom-0 left-0 w-62.5 sm:w-100 h-62.5 sm:h-100 bg-violet-500/10 blur-[120px] rounded-full" />

        <div className="relative z-10 mb-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">

              {data?.team_name || 'Team Intelligence Dashboard'}

            </h1>

            <p className="text-gray-400 mt-2 text-sm">

              AI-powered insights for remote workforce productivity.

            </p>

          </div>

          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl shadow-2xl w-fit">

            <Sparkles className="text-indigo-400" size={18} />

            <span className="text-sm text-gray-300">

              Ethical Productivity Analytics

            </span>

          </div>

        </div>

        <div className="relative z-10 grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[30px] p-6 shadow-2xl">

            <div className="flex items-center gap-4 mb-6">

              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">

                <Plus className="text-indigo-400" />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-white">

                  Create Team

                </h2>

                <p className="text-gray-400 text-sm">

                  Create your remote team.

                </p>

              </div>

            </div>

            <input
              type="text"
              placeholder="Frontend Team"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full bg-[#111827] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-indigo-500 transition-all"
            />

            <button
              onClick={handleCreateTeam}
              className="mt-5 w-full py-4 rounded-2xl bg-linear-to-r from-indigo-500 to-violet-500 text-white font-semibold hover:scale-[1.02] transition-all"
            >

              Create Team

            </button>

          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[30px] p-6 shadow-2xl">

            <div className="flex items-center gap-4 mb-6">

              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">

                <UserPlus className="text-emerald-400" />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-white">

                  Add Employee

                </h2>

                <p className="text-gray-400 text-sm">

                  Add employees to your team.

                </p>

              </div>

            </div>

            <input
              type="email"
              placeholder="employee@email.com"
              value={memberEmail}
              onChange={(e) => setMemberEmail(e.target.value)}
              className="w-full bg-[#111827] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-emerald-500 transition-all"
            />

            <button
              onClick={handleAddMember}
              className="mt-5 w-full py-4 rounded-2xl bg-linear-to-r from-emerald-500 to-green-500 text-white font-semibold hover:scale-[1.02] transition-all"
            >

              Add Employee

            </button>

          </div>

        </div>

        {loading ? (

          <div className="relative z-10 flex items-center justify-center h-[70vh]">

            <div className="flex flex-col items-center gap-4">

              <div className="w-14 h-14 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />

              <p className="text-indigo-300 animate-pulse">

                Loading team analytics...

              </p>

            </div>

          </div>

        ) : (

          <>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-6 shadow-2xl">

                <p className="text-gray-400 text-sm">

                  Total Members

                </p>

                <h2 className="text-4xl sm:text-5xl font-bold text-white mt-2">

                  {data?.total_members}

                </h2>

              </div>

            </div>

            <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[36px] p-4 sm:p-8 shadow-2xl">

              <div className="flex items-center gap-4 mb-8">

                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">

                  <Activity className="text-indigo-400" />

                </div>

                <div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-white">

                    Team Members

                  </h2>

                </div>

              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {data?.team_data?.map((member) => (

                  <div
                    key={member.id}
                    className="bg-[#111827]/70 border border-white/5 rounded-[30px] p-4 sm:p-6"
                  >

                    <div className="flex items-center gap-4 mb-6">

                      <div className="w-14 h-14 rounded-full bg-linear-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-lg font-bold">

                        {member.username.charAt(0).toUpperCase()}

                      </div>

                      <div>

                        <h3 className="text-white font-semibold text-lg">

                          {member.username}

                        </h3>

                        <p className="text-gray-500 text-sm">

                          {member.email}

                        </p>

                      </div>

                    </div>

                    <div className="grid grid-cols-3 gap-4">

                      <div className="bg-white/5 rounded-2xl p-4">

                        <p className="text-gray-400 text-xs mb-2">

                          Focus

                        </p>

                        <h4 className="text-2xl font-bold text-white">

                          {member.focus_minutes}

                        </h4>

                      </div>

                      <div className="bg-white/5 rounded-2xl p-4">

                        <p className="text-gray-400 text-xs mb-2">

                          Score

                        </p>

                        <h4 className={`text-2xl font-bold ${getScoreColor(member.score)}`}>

                          {member.score}

                        </h4>

                      </div>

                      <div className="bg-white/5 rounded-2xl p-4">

                        <p className="text-gray-400 text-xs mb-2">

                          Tasks

                        </p>

                        <h4 className="text-2xl font-bold text-white">

                          {member.completed_tasks}

                        </h4>

                      </div>

                    </div>

                    <div className="mt-6 space-y-3">

                      <div className="bg-white/5 rounded-2xl p-4">

                        <p className="text-xs text-gray-400 mb-2">

                          Yesterday

                        </p>

                        <p className="text-sm text-white">

                          {member.standup_yesterday}

                        </p>

                      </div>

                      <div className="bg-white/5 rounded-2xl p-4">

                        <p className="text-xs text-gray-400 mb-2">

                          Today

                        </p>

                        <p className="text-sm text-white">

                          {member.standup_today}

                        </p>

                      </div>

                      <div className="bg-white/5 rounded-2xl p-4">

                        <p className="text-xs text-gray-400 mb-2">

                          Blockers

                        </p>

                        <p className="text-sm text-red-300">

                          {member.standup_blockers}

                        </p>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </>

        )}

      </main>

    </div>
  )
}

export default TeamDashboard