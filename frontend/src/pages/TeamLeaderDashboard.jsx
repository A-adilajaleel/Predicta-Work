import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getTeamLeaderDashboardAPI } from '../api/team'
import { assignTaskAPI, getTLMembersAPI, getTLAssignedTasksAPI } from '../api/tasks'
import { Activity, Sparkles, Plus, Users, CheckCircle2, Clock3, AlertTriangle, ClipboardList, User } from 'lucide-react'

const TeamLeaderDashboard = () => {
  const [teamData, setTeamData] = useState(null)
  const [members, setMembers] = useState([])
  const [assignedTasks, setAssignedTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  const [form, setForm] = useState({
    employee_id: '',
    title: '',
    description: '',
    priority: 'medium',
    due_date: '',
  })
  const [assigning, setAssigning] = useState(false)
  const [assignMsg, setAssignMsg] = useState('')

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [dashRes, membersRes, tasksRes] = await Promise.all([
        getTeamLeaderDashboardAPI(),
        getTLMembersAPI(),
        getTLAssignedTasksAPI(),
      ])
      setTeamData(dashRes.data)
      setMembers(membersRes.data.members || [])
      setAssignedTasks(tasksRes.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [])

  const handleAssign = async () => {
    if (!form.employee_id || !form.title) {
      setAssignMsg('Please select an employee and enter a task title.')
      return
    }
    setAssigning(true)
    setAssignMsg('')
    try {
      await assignTaskAPI(form)
      setForm({ employee_id: '', title: '', description: '', priority: 'medium', due_date: '' })
      setAssignMsg('Task assigned successfully!')
      fetchAll()
    } catch (err) {
      setAssignMsg('Failed to assign task.')
    } finally {
      setAssigning(false)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400'
    if (score >= 50) return 'text-yellow-400'
    return 'text-red-400'
  }

  const priorityStyles = {
    high: 'bg-red-500/10 text-red-400 border-red-500/20',
    medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  }

  const statusStyles = {
    todo: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    in_progress: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    done: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  }

  return (
    <div className="flex min-h-screen bg-[#0B1120] overflow-hidden">
      <Navbar />
      <main className="lg:ml-72 flex-1 p-4 sm:p-6 lg:p-8 pt-24 lg:pt-8 relative">

        <div className="absolute top-0 right-0 w-75 sm:w-125 h-75 sm:h-125 bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-62.5 sm:w-100 h-62.5 sm:h-100 bg-violet-500/10 blur-[120px] rounded-full" />

        {/* Header */}
        <div className="relative z-10 mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {teamData?.team_name || 'Team Leader Dashboard'}
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
              Manage your team, assign tasks, and track performance.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-3 rounded-2xl shadow-2xl w-fit">
            <Sparkles className="text-indigo-400" size={18} />
            <span className="text-sm text-gray-300">Team Leader View</span>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Users className="text-indigo-400" size={18} />
              <span className="text-xs text-gray-400">Members</span>
            </div>
            <h2 className="text-3xl font-bold text-white">{teamData?.total_members ?? '—'}</h2>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl">
            <div className="flex items-center gap-2 mb-3">
              <ClipboardList className="text-violet-400" size={18} />
              <span className="text-xs text-gray-400">Assigned Tasks</span>
            </div>
            <h2 className="text-3xl font-bold text-white">{assignedTasks.length}</h2>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="text-emerald-400" size={18} />
              <span className="text-xs text-gray-400">Completed</span>
            </div>
            <h2 className="text-3xl font-bold text-white">
              {assignedTasks.filter(t => t.is_completed).length}
            </h2>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="text-red-400" size={18} />
              <span className="text-xs text-gray-400">Burnout Risk</span>
            </div>
            <h2 className="text-3xl font-bold text-white">
              {teamData?.team_data?.filter(m => m.burnout_risk).length ?? '—'}
            </h2>
          </div>
        </div>

        {/* Tabs */}
        <div className="relative z-10 flex gap-2 mb-6">
          {['overview', 'assign', 'tasks'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all capitalize ${
                activeTab === tab
                  ? 'bg-indigo-500 text-white shadow-lg'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:border-indigo-500/40'
              }`}
            >
              {tab === 'assign' ? 'Assign Task' : tab === 'tasks' ? 'Assigned Tasks' : 'Team Overview'}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="relative z-10 flex items-center justify-center h-60">
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
              <p className="text-indigo-300 animate-pulse">Loading team data...</p>
            </div>
          </div>
        ) : (
          <div className="relative z-10">

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-4xl p-6 sm:p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <Activity className="text-indigo-400" size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Team Members</h2>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {teamData?.team_data?.map(member => (
                    <div key={member.id} className="bg-[#111827]/70 border border-white/5 rounded-[28px] p-5 sm:p-6">
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg">
                          {member.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{member.username}</h3>
                          <p className="text-gray-500 text-sm">{member.email}</p>
                        </div>
                        {member.burnout_risk && (
                          <span className="ml-auto px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                            ⚠ Burnout Risk
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="bg-white/5 rounded-2xl p-3 text-center">
                          <p className="text-gray-400 text-xs mb-1">Focus</p>
                          <h4 className="text-xl font-bold text-white">{member.focus_minutes}m</h4>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-3 text-center">
                          <p className="text-gray-400 text-xs mb-1">Score</p>
                          <h4 className={`text-xl font-bold ${getScoreColor(member.score)}`}>{member.score}</h4>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-3 text-center">
                          <p className="text-gray-400 text-xs mb-1">Tasks</p>
                          <h4 className="text-xl font-bold text-white">{member.completed_tasks}/{member.total_tasks}</h4>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-white/5 rounded-xl p-3">
                          <p className="text-xs text-gray-400 mb-1">Today's Standup</p>
                          <p className="text-sm text-white">{member.standup_today}</p>
                        </div>
                        {member.standup_blockers !== 'None' && (
                          <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-3">
                            <p className="text-xs text-red-400 mb-1">Blocker</p>
                            <p className="text-sm text-red-300">{member.standup_blockers}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {(!teamData?.team_data || teamData.team_data.length === 0) && (
                    <div className="col-span-2 text-center py-16 text-gray-500">
                      No employees in your team yet.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ASSIGN TASK TAB */}
            {activeTab === 'assign' && (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-4xl p-6 sm:p-8 shadow-2xl max-w-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                    <Plus className="text-violet-400" size={20} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Assign Task</h2>
                    <p className="text-gray-400 text-sm">Delegate work to your team members.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">Select Employee</label>
                    <select
                      value={form.employee_id}
                      onChange={e => setForm({ ...form, employee_id: e.target.value })}
                      className="w-full bg-[#111827] border border-white/10 text-white px-4 py-3 rounded-2xl outline-none focus:border-indigo-500 transition-all"
                    >
                      <option value="">-- Choose employee --</option>
                      {members.map(m => (
                        <option key={m.id} value={m.id}>{m.username} ({m.email})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">Task Title *</label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={e => setForm({ ...form, title: e.target.value })}
                      placeholder="e.g. Fix login bug on mobile"
                      className="w-full bg-[#111827] border border-white/10 text-white px-4 py-3 rounded-2xl outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">Description</label>
                    <textarea
                      value={form.description}
                      onChange={e => setForm({ ...form, description: e.target.value })}
                      placeholder="Additional context..."
                      rows={3}
                      className="w-full bg-[#111827] border border-white/10 text-white px-4 py-3 rounded-2xl outline-none focus:border-indigo-500 transition-all resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-400 mb-2 block">Priority</label>
                      <select
                        value={form.priority}
                        onChange={e => setForm({ ...form, priority: e.target.value })}
                        className="w-full bg-[#111827] border border-white/10 text-white px-4 py-3 rounded-2xl outline-none focus:border-indigo-500 transition-all"
                      >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-2 block">Due Date</label>
                      <input
                        type="date"
                        value={form.due_date}
                        onChange={e => setForm({ ...form, due_date: e.target.value })}
                        className="w-full bg-[#111827] border border-white/10 text-white px-4 py-3 rounded-2xl outline-none focus:border-indigo-500 transition-all"
                      />
                    </div>
                  </div>
                  {assignMsg && (
                    <p className={`text-sm ${assignMsg.startsWith('Task assigned') ? 'text-emerald-400' : 'text-red-400'}`}>
                      {assignMsg}
                    </p>
                  )}
                  <button
                    onClick={handleAssign}
                    disabled={assigning}
                    className="w-full py-4 rounded-2xl bg-linear-to-r from-indigo-500 to-violet-500 text-white font-semibold hover:scale-[1.02] transition-all shadow-2xl disabled:opacity-50"
                  >
                    {assigning ? 'Assigning...' : 'Assign Task'}
                  </button>
                </div>
              </div>
            )}

            {/* ASSIGNED TASKS TAB */}
            {activeTab === 'tasks' && (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-4xl p-6 sm:p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <ClipboardList className="text-emerald-400" size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Tasks You've Assigned</h2>
                </div>
                <div className="space-y-3">
                  {assignedTasks.length === 0 && (
                    <div className="text-center py-16 text-gray-500">
                      No tasks assigned yet. Go to "Assign Task" tab.
                    </div>
                  )}
                  {assignedTasks.map(task => (
                    <div key={task.id} className="bg-[#111827]/70 border border-white/5 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-indigo-500/20 transition-all">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <p className="text-white font-medium">{task.title}</p>
                          <span className={`px-2 py-0.5 rounded-full border text-xs ${priorityStyles[task.priority]}`}>
                            {task.priority}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full border text-xs ${statusStyles[task.status]}`}>
                            {task.status?.replace('_', ' ')}
                          </span>
                        </div>
                        {task.description && (
                          <p className="text-gray-400 text-sm mb-2">{task.description}</p>
                        )}
                        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <User size={12} /> {task.assigned_to_username}
                          </span>
                          {task.due_date && (
                            <span className="flex items-center gap-1">
                              <Clock3 size={12} /> Due: {task.due_date}
                            </span>
                          )}
                          {task.is_completed && (
                            <span className="text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 size={12} /> Completed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default TeamLeaderDashboard