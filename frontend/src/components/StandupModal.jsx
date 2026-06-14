import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ClipboardList, X, Send, CheckCircle2 } from 'lucide-react'
import API from '../api/axios'

const StandupModal = ({ onClose, onSubmit }) => {

  const [yesterday, setYesterday] = useState('')
  const [today, setToday] = useState('')
  const [blockers, setBlockers] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showModal, setShowModal] = useState(true)

  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)

    try {

      await API.post('/standup/', {
        yesterday,
        today,
        blockers: blockers || 'None',
      })

      setSubmitted(true)

      setTimeout(() => {
        onSubmit()
        setShowModal(false)
      }, 2000)

    } catch (err) {

      console.error(err)

    } finally {

      setLoading(false)
    }
  }

  return (
    <AnimatePresence>

      {showModal && (

        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => {
              setShowModal(false)
              onClose()
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative z-10 w-full max-w-lg bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-white/10 rounded-4xl p-6 sm:p-8 shadow-2xl transition-colors duration-300"
          >

            {submitted ? (

              <div className="flex flex-col items-center justify-center py-10 gap-4">

                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">

                  <CheckCircle2 className="text-emerald-500" size={40} />

                </div>

                <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white">

                  Standup Submitted!

                </h2>

                <p className="text-slate-600 dark:text-gray-400 text-center">

                  Your update has been sent successfully 🎉

                </p>

              </div>

            ) : (

              <>

                <div className="flex items-center justify-between mb-6">

                  <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">

                      <ClipboardList className="text-indigo-500" />

                    </div>

                    <div>

                      <h2 className="text-xl font-bold text-[#0F172A] dark:text-white">

                        Daily Standup

                      </h2>

                      <p className="text-slate-500 dark:text-gray-400 text-sm">

                        Share your daily update

                      </p>

                    </div>

                  </div>

                  <button
                    onClick={() => {
                      setShowModal(false)
                      onClose()
                    }}
                    className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
                  >

                    <X size={18} />

                  </button>

                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                  <div>

                    <label className="text-sm text-slate-600 dark:text-gray-400 mb-2 block">

                      ✅ What did you complete yesterday?

                    </label>

                    <textarea
                      value={yesterday}
                      onChange={(e) => setYesterday(e.target.value)}
                      placeholder="I completed the login page UI..."
                      required
                      rows={3}
                      className="w-full bg-slate-100 dark:bg-[#111827] border border-slate-200 dark:border-white/10 text-[#0F172A] dark:text-white px-4 py-3 rounded-2xl outline-none focus:border-indigo-500 transition resize-none"
                    />

                  </div>

                  <div>

                    <label className="text-sm text-slate-600 dark:text-gray-400 mb-2 block">

                      🎯 What are you working on today?

                    </label>

                    <textarea
                      value={today}
                      onChange={(e) => setToday(e.target.value)}
                      placeholder="Working on Slack integration..."
                      required
                      rows={3}
                      className="w-full bg-slate-100 dark:bg-[#111827] border border-slate-200 dark:border-white/10 text-[#0F172A] dark:text-white px-4 py-3 rounded-2xl outline-none focus:border-indigo-500 transition resize-none"
                    />

                  </div>

                  <div>

                    <label className="text-sm text-slate-600 dark:text-gray-400 mb-2 block">

                      ⚠️ Any blockers? (optional)

                    </label>

                    <textarea
                      value={blockers}
                      onChange={(e) => setBlockers(e.target.value)}
                      placeholder="None"
                      rows={2}
                      className="w-full bg-slate-100 dark:bg-[#111827] border border-slate-200 dark:border-white/10 text-[#0F172A] dark:text-white px-4 py-3 rounded-2xl outline-none focus:border-indigo-500 transition resize-none"
                    />

                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-2xl bg-linear-to-r from-[#7C3AED] to-[#8B5CF6] text-white font-semibold flex items-center justify-center gap-3 hover:scale-[1.02] transition-all disabled:opacity-50"
                  >

                    {loading ? (
                      'Submitting...'
                    ) : (
                      <>
                        <Send size={18} />
                        Submit Standup
                      </>
                    )}

                  </button>

                </form>

              </>

            )}

          </motion.div>

        </div>

      )}

    </AnimatePresence>
  )
}

export default StandupModal