import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import {
  getTeamDashboardAPI, createTeamAPI,
  addMemberAPI, assignTeamLeaderAPI
} from '../api/team'
import { Activity, Sparkles, Plus, UserPlus, Crown, Users, ChevronDown, ChevronUp } from 'lucide-react'

const TeamDashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTeamId, setActiveTeamId] = useState(null)

  const [teamName, setTeamName] = useState('')
  const [memberEmail, setMemberEmail] = useState('')
  const [memberTeamId, setMemberTeamId] = useState('')
  const [leaderEmail, setLeaderEmail] = useState('')
  const [leaderTeamId, setLeaderTeamId] = useState('')

  const fetchDashboard = async () => {
    try {
      const res = await getTeamDashboardAPI()
      setData(res.data)
      if (res.data?.teams?.length > 0 && !activeTeamId) {
        setActiveTeamId(res.data.teams[0].team_id)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchDashboard() }, [])

  const handleCreateTeam = async () => {
    if (!teamName.trim()) return
    try {
      await createTeamAPI({ name: teamName })
      setTeamName('')
      fetchDashboard()
    } catch (err) { console.error(err) }
  }

  const handleAddMember = async () => {
    if (!memberEmail || !memberTeamId) return
    try {
      await addMemberAPI(memberTeamId, { email: memberEmail })
      setMemberEmail('')
      fetchDashboard()
    } catch (err) { console.error(err) }
  }

  const handleAssignLeader = async () => {
    if (!leaderEmail || !leaderTeamId) return
    try {
      await assignTeamLeaderAPI(leaderTeamId, { email: leaderEmail })
      setLeaderEmail('')
      fetchDashboard()
    } catch (err) { console.error(err) }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400'
    if (score >= 50) return 'text-yellow-400'
    return 'text-red-400'
  }

  const teams = data?.teams || []

  return (
    <div className="flex min-h-screen bg-[#0B1120] overflow-hidden">
      <Navbar />
      <main className="lg:ml-72 flex-1 p-4 lg:p-8 pt-24 lg:pt-8 relative">
        <div className="absolute top-0 right-0 w-75 sm:w-125 h-75 sm:h-125 bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-62.5 sm:w-100 h-62.5 sm:h-100 bg-violet-500/10 blur-[120px] rounded-full" />

        {/* Header */}
        <div className="relative z-10 mb-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Team Intelligence Dashboard</h1>
            <p className="text-gray-400 mt-2 text-sm">Manage all your teams from one place.</p>
          </div>
          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl shadow-2xl w-fit">
            <Sparkles className="text-indigo-400" size={18} />
            <span className="text-sm text-gray-300">Ethical Productivity Analytics</span>
          </div>
        </div>

        {/* Summary */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl">
            <p className="text-gray-400 text-xs mb-2">Total Teams</p>
            <h2 className="text-3xl font-bold text-white">{teams.length}</h2>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl">
            <p className="text-gray-400 text-xs mb-2">Total Members</p>
            <h2 className="text-3xl font-bold text-white">
              {teams.reduce((acc, t) => acc + t.total_members, 0)}
            </h2>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl">
            <p className="text-gray-400 text-xs mb-2">Burnout Risk</p>
            <h2 className="text-3xl font-bold text-red-400">
              {teams.reduce((acc, t) => acc + (t.team_data?.filter(m => m.burnout_risk).length || 0), 0)}
            </h2>
          </div>
        </div>

        {/* Action Cards */}
        <div className="relative z-10 grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

          {/* Create Team */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[30px] p-6 shadow-2xl">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Plus className="text-indigo-400" size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">Create Team</h2>
            </div>
            <input
              type="text"
              placeholder="e.g. Frontend Team"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full bg-[#111827] border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-indigo-500 transition-all mb-3"
            />
            <button onClick={handleCreateTeam} className="w-full py-3 rounded-2xl bg-linear-to-r from-indigo-500 to-violet-500 text-white font-semibold hover:scale-[1.02] transition-all">
              Create Team
            </button>
          </div>

          {/* Add Employee */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[30px] p-6 shadow-2xl">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <UserPlus className="text-emerald-400" size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">Add Employee</h2>
            </div>
            <select
              value={memberTeamId}
              onChange={(e) => setMemberTeamId(e.target.value)}
              className="w-full bg-[#111827] border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-emerald-500 transition-all mb-3"
            >
              <option value="">-- Select Team --</option>
              {teams.map(t => <option key={t.team_id} value={t.team_id}>{t.team_name}</option>)}
            </select>
            <input
              type="email"
              placeholder="employee@email.com"
              value={memberEmail}
              onChange={(e) => setMemberEmail(e.target.value)}
              className="w-full bg-[#111827] border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-emerald-500 transition-all mb-3"
            />
            <button onClick={handleAddMember} className="w-full py-3 rounded-2xl bg-linear-to-r from-emerald-500 to-green-500 text-white font-semibold hover:scale-[1.02] transition-all">
              Add Employee
            </button>
          </div>

          {/* Assign Team Leader */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[30px] p-6 shadow-2xl">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                <Crown className="text-yellow-400" size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">Assign Team Leader</h2>
            </div>
            <select
              value={leaderTeamId}
              onChange={(e) => setLeaderTeamId(e.target.value)}
              className="w-full bg-[#111827] border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-yellow-500 transition-all mb-3"
            >
              <option value="">-- Select Team --</option>
              {teams.map(t => <option key={t.team_id} value={t.team_id}>{t.team_name}</option>)}
            </select>
            <input
              type="email"
              placeholder="leader@email.com"
              value={leaderEmail}
              onChange={(e) => setLeaderEmail(e.target.value)}
              className="w-full bg-[#111827] border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-yellow-500 transition-all mb-3"
            />
            <button onClick={handleAssignLeader} className="w-full py-3 rounded-2xl bg-linear-to-r from-yellow-500 to-orange-500 text-white font-semibold hover:scale-[1.02] transition-all">
              Assign as Leader
            </button>
          </div>
        </div>

        {/* Teams List */}
        {loading ? (
          <div className="relative z-10 flex items-center justify-center h-[40vh]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
              <p className="text-indigo-300 animate-pulse">Loading team analytics...</p>
            </div>
          </div>
        ) : (
          <div className="relative z-10 space-y-6">
            {teams.map(team => (
              <div key={team.team_id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-4xl p-6 sm:p-8 shadow-2xl">
                <button
                  className="w-full flex items-center justify-between"
                  onClick={() => setActiveTeamId(activeTeamId === team.team_id ? null : team.team_id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                      <Users className="text-indigo-400" size={20} />
                    </div>
                    <div className="text-left">
                      <h2 className="text-xl font-bold text-white">{team.team_name}</h2>
                      <p className="text-gray-400 text-sm">{team.total_members} members</p>
                    </div>
                  </div>
                  {activeTeamId === team.team_id
                    ? <ChevronUp className="text-gray-400" size={20} />
                    : <ChevronDown className="text-gray-400" size={20} />
                  }
                </button>

                {activeTeamId === team.team_id && (
                  <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-5">
                    {team.team_data?.map(member => (
                      <div key={member.id} className="bg-[#111827]/70 border border-white/5 rounded-[26px] p-5">
                        <div className="flex items-center gap-4 mb-5">
                          <div className="w-12 h-12 rounded-full bg-linear-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold">
                            {member.username.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold truncate">{member.username}</h3>
                            <p className="text-gray-500 text-sm truncate">{member.email}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs capitalize">
                              {member.role?.replace('_', ' ')}
                            </span>
                            {member.burnout_risk && (
                              <span className="px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                                ⚠ Risk
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <div className="bg-white/5 rounded-xl p-3 text-center">
                            <p className="text-gray-400 text-xs mb-1">Focus</p>
                            <h4 className="text-lg font-bold text-white">{member.focus_minutes}m</h4>
                          </div>
                          <div className="bg-white/5 rounded-xl p-3 text-center">
                            <p className="text-gray-400 text-xs mb-1">Score</p>
                            <h4 className={`text-lg font-bold ${getScoreColor(member.score)}`}>{member.score}</h4>
                          </div>
                          <div className="bg-white/5 rounded-xl p-3 text-center">
                            <p className="text-gray-400 text-xs mb-1">Tasks</p>
                            <h4 className="text-lg font-bold text-white">{member.completed_tasks}/{member.total_tasks}</h4>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="bg-white/5 rounded-xl p-3">
                            <p className="text-xs text-gray-400 mb-1">Today</p>
                            <p className="text-sm text-white">{member.standup_today}</p>
                          </div>
                          <div className="bg-white/5 rounded-xl p-3">
                            <p className="text-xs text-gray-400 mb-1">Blockers</p>
                            <p className="text-sm text-red-300">{member.standup_blockers}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {(!team.team_data || team.team_data.length === 0) && (
                      <div className="col-span-2 text-center py-10 text-gray-500">
                        No members in this team yet.
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            {teams.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                No teams yet. Create one above!
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default TeamDashboard