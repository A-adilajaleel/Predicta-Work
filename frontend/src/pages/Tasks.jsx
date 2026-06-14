import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import {
  getTasksAPI, createTaskAPI, updateTaskAPI, deleteTaskAPI,
} from '../api/tasks'
import {
  setTasks, addTask, updateTask, deleteTask,
} from '../store/taskSlice'
import {
  Plus, CheckCircle2, Trash2, Sparkles, Clock3, Flag, Layers3,
} from 'lucide-react'

const Tasks = () => {
  const dispatch = useDispatch()
  const { tasks } = useSelector((state) => state.tasks)
  const { user } = useSelector((state) => state.auth)

  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getTasksAPI()
        dispatch(setTasks(res.data))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchTasks()
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    setAdding(true)
    try {
      const res = await createTaskAPI({ title, priority })
      dispatch(addTask(res.data))
      setTitle('')
      setPriority('medium')
    } catch (err) {
      console.error(err)
    } finally {
      setAdding(false)
    }
  }

  const handleComplete = async (task) => {
    try {
      const res = await updateTaskAPI(task.id, { is_completed: !task.is_completed })
      dispatch(updateTask(res.data))
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTaskAPI(id)
      dispatch(deleteTask(id))
    } catch (err) {
      console.error(err)
    }
  }

  const priorityStyles = {
    high: 'bg-red-500/10 text-red-400 border-red-500/20',
    medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  }

  const pendingTasks = tasks.filter((t) => !t.is_completed)
  const completedTasks = tasks.filter((t) => t.is_completed)
  const completionRate = tasks.length > 0
    ? Math.round((completedTasks.length / tasks.length) * 100) : 0

  // Employee only sees assigned tasks, cannot create
  const isEmployee = user?.role === 'employee'

  return (
    <div className="flex min-h-screen bg-[#0B1120] overflow-hidden">
      <Navbar />
      <main className="lg:ml-64 flex-1 p-4 sm:p-6 lg:p-8 pt-24 lg:pt-8 relative">

        <div className="absolute top-0 right-0 w-75 sm:w-125 h-75 sm:h-125 bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-62.5 sm:w-100 h-62.5 sm:h-100 bg-violet-500/10 blur-[120px] rounded-full" />

        {/* Header */}
        <div className="relative z-10 mb-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Task Workspace
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
              {isEmployee
                ? 'View and complete tasks assigned to you by your Team Leader.'
                : 'Organize tasks, track priorities, and stay productive.'}
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-3 rounded-2xl shadow-2xl w-fit">
            <Sparkles className="text-indigo-400" size={18} />
            <span className="text-sm text-gray-300">AI Productivity Workflow</span>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-5 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Layers3 className="text-indigo-400" />
              </div>
              <span className="text-xs text-indigo-300">Total</span>
            </div>
            <p className="text-gray-400 text-sm">All Tasks</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mt-2">{tasks.length}</h2>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-5 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                <Clock3 className="text-yellow-400" />
              </div>
              <span className="text-xs text-yellow-300">Active</span>
            </div>
            <p className="text-gray-400 text-sm">Pending Tasks</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mt-2">{pendingTasks.length}</h2>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-5 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="text-emerald-400" />
              </div>
              <span className="text-xs text-emerald-300">Done</span>
            </div>
            <p className="text-gray-400 text-sm">Completed</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mt-2">{completedTasks.length}</h2>
          </div>
          <div className="bg-linear-to-br from-indigo-500/10 to-violet-500/10 backdrop-blur-xl border border-indigo-500/20 rounded-[28px] p-5 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                <Flag className="text-indigo-300" />
              </div>
              <span className="text-xs text-indigo-300">Progress</span>
            </div>
            <p className="text-gray-400 text-sm">Completion Rate</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mt-2">{completionRate}%</h2>
          </div>
        </div>

        {/* Create Task — Employee-ന് കാണണ്ട */}
        {!isEmployee && (
          <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-4xl p-4 sm:p-6 lg:p-8 shadow-2xl mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Plus className="text-indigo-400" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Create New Task</h2>
                <p className="text-gray-400 text-sm">Add productivity goals and work items.</p>
              </div>
            </div>
            <form onSubmit={handleAdd} className="flex flex-col lg:flex-row gap-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What are you working on?"
                className="flex-1 bg-[#111827]/80 border border-white/10 text-white px-5 py-4 rounded-2xl outline-none focus:border-indigo-500 transition-all"
              />
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full lg:w-auto bg-[#111827]/80 border border-white/10 text-white px-5 py-4 rounded-2xl outline-none focus:border-indigo-500 transition-all"
              >
                <option value="high">🔴 High</option>
                <option value="medium">🟡 Medium</option>
                <option value="low">🟢 Low</option>
              </select>
              <button
                type="submit"
                disabled={adding}
                className="w-full lg:w-auto px-8 py-4 rounded-2xl bg-linear-to-r from-indigo-500 to-violet-500 text-white font-semibold shadow-2xl hover:scale-[1.02] transition-all duration-300"
              >
                {adding ? 'Adding...' : 'Add Task'}
              </button>
            </form>
          </div>
        )}

        {/* Tasks */}
        {loading ? (
          <div className="relative z-10 flex items-center justify-center h-60">
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
              <p className="text-indigo-300 animate-pulse">Loading tasks...</p>
            </div>
          </div>
        ) : (
          <div className="relative z-10 grid grid-cols-1 xl:grid-cols-2 gap-6">

            {/* Pending */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-4xl p-4 sm:p-6 lg:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white">Pending Tasks</h2>
                <span className="px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm">
                  {pendingTasks.length}
                </span>
              </div>
              <div className="space-y-4">
                {pendingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-[#111827]/70 border border-white/5 rounded-3xl p-4 sm:p-5 flex items-start sm:items-center gap-4 hover:border-indigo-500/20 transition-all duration-300"
                  >
                    <button
                      onClick={() => handleComplete(task)}
                      className="w-7 h-7 rounded-full border-2 border-gray-600 hover:border-indigo-500 transition-all shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium wrap-break-word">{task.title}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className={`inline-flex px-3 py-1 rounded-full border text-xs ${priorityStyles[task.priority]}`}>
                          {task.priority}
                        </span>
                        {task.assigned_by_username && (
                          <span className="inline-flex px-3 py-1 rounded-full border text-xs bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                            Assigned by {task.assigned_by_username}
                          </span>
                        )}
                        {task.due_date && (
                          <span className="inline-flex px-3 py-1 rounded-full border text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                            Due: {task.due_date}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="w-11 h-11 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all shrink-0"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                {pendingTasks.length === 0 && (
                  <p className="text-gray-500 text-center py-8">No pending tasks</p>
                )}
              </div>
            </div>

            {/* Completed */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-4xl p-4 sm:p-6 lg:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white">Completed Tasks</h2>
                <span className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                  {completedTasks.length}
                </span>
              </div>
              <div className="space-y-4">
                {completedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-[#111827]/60 border border-white/5 rounded-3xl p-4 sm:p-5 flex items-start sm:items-center gap-4 opacity-70"
                  >
                    <button
                      onClick={() => handleComplete(task)}
                      className="w-7 h-7 rounded-full bg-emerald-500 border-2 border-emerald-500 flex items-center justify-center shrink-0"
                    >
                      <CheckCircle2 size={14} className="text-white" />
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-400 font-medium line-through wrap-break-word">{task.title}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className={`inline-flex px-3 py-1 rounded-full border text-xs ${priorityStyles[task.priority]}`}>
                          {task.priority}
                        </span>
                        {task.assigned_by_username && (
                          <span className="inline-flex px-3 py-1 rounded-full border text-xs bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                            Assigned by {task.assigned_by_username}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="w-11 h-11 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all shrink-0"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                {completedTasks.length === 0 && (
                  <p className="text-gray-500 text-center py-8">No completed tasks yet</p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Tasks