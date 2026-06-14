import { useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import { createSessionAPI } from '../api/sessions'

import { useSelector, useDispatch } from 'react-redux'

import {
  setMode,
  setTimeLeft,
  setIsRunning,
  setSessions,
  setBurnoutWarning,
  setTotalFocusMinutes,
} from '../store/timerSlice'

import {
  Play,
  Pause,
  RotateCcw,
  Brain,
  Flame,
  Coffee,
  Sparkles,
  Clock3,
} from 'lucide-react'

const Timer = () => {

  const dispatch = useDispatch()

  const {
    mode,
    timeLeft,
    isRunning,
    sessions,
    burnoutWarning,
    totalFocusMinutes,
  } = useSelector((state) => state.timer)

  const intervalRef = useRef(null)

  const FOCUS_TIME = 25 * 60
  const BREAK_TIME = 5 * 60

  useEffect(() => {

    if (isRunning) {

      intervalRef.current = setInterval(() => {

        if (timeLeft <= 1) {
          clearInterval(intervalRef.current)
          handleTimerComplete()
          return
        }

        dispatch(setTimeLeft(timeLeft - 1))

      }, 1000)

    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)

  }, [isRunning, timeLeft])

  const handleTimerComplete = async () => {

    if (mode === 'focus') {

      const newTotal = totalFocusMinutes + 25

      dispatch(setTotalFocusMinutes(newTotal))

      dispatch(setSessions(sessions + 1))

      try {

        await createSessionAPI({
          duration_minutes: 25,
        })

      } catch (err) {
        console.error(err)
      }

      if (newTotal >= 180) {
        dispatch(setBurnoutWarning(true))
      }

      dispatch(setMode('break'))
      dispatch(setTimeLeft(BREAK_TIME))

    } else {

      dispatch(setMode('focus'))
      dispatch(setTimeLeft(FOCUS_TIME))

    }

    dispatch(setIsRunning(false))
  }

  const handleStart = () => {
    dispatch(setIsRunning(true))
  }

  const handlePause = () => {
    dispatch(setIsRunning(false))
  }

  const handleReset = () => {

    dispatch(setIsRunning(false))

    dispatch(
      setTimeLeft(
        mode === 'focus'
          ? FOCUS_TIME
          : BREAK_TIME
      )
    )
  }

  const formatTime = (seconds) => {

    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0')

    const s = (seconds % 60)
      .toString()
      .padStart(2, '0')

    return `${m}:${s}`
  }

  const progress =
    mode === 'focus'
      ? ((FOCUS_TIME - timeLeft) / FOCUS_TIME) * 100
      : ((BREAK_TIME - timeLeft) / BREAK_TIME) * 100

  return (
    <div className="flex min-h-screen bg-[#0B1120] overflow-hidden">

      <Navbar />

      <main className="lg:ml-72 flex-1 p-4 lg:p-8 pt-24 lg:pt-8 relative">

        <div className="absolute top-0 right-0 w-75 sm:w-125 h-75 sm:h-125 bg-indigo-500/10 blur-[120px] rounded-full" />

        <div className="absolute bottom-0 left-0 w-62.5 sm:w-100 h-62.5 sm:h-100 bg-violet-500/10 blur-[120px] rounded-full" />

        <div className="relative z-10 mb-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Focus Timer
            </h1>

            <p className="text-gray-400 mt-2 text-sm">
              Deep work sessions designed for focused productivity.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl shadow-2xl w-fit">

            <Sparkles className="text-indigo-400" size={18} />

            <span className="text-sm text-gray-300">
              Deep Work Mode
            </span>
          </div>
        </div>

        {burnoutWarning && (

          <div className="relative z-10 bg-red-500/10 border border-red-500/20 backdrop-blur-xl rounded-3xl p-5 mb-6 flex items-start gap-4 shadow-2xl">

            <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center shrink-0">
              <Flame className="text-red-400" />
            </div>

            <div className="flex-1">

              <h2 className="text-red-400 font-semibold text-lg">
                Burnout Risk Detected
              </h2>

              <p className="text-red-300/80 text-sm mt-1 leading-relaxed">
                You’ve been in deep work mode for more than 3 hours.
              </p>
            </div>

            <button
              onClick={() =>
                dispatch(setBurnoutWarning(false))
              }
              className="text-red-400 hover:text-red-300 transition"
            >
              ✕
            </button>
          </div>
        )}

        <div className="relative z-10 grid grid-cols-1 xl:grid-cols-3 gap-6">

          <div className="xl:col-span-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[36px] p-5 sm:p-10 shadow-2xl flex flex-col items-center relative overflow-hidden">

            <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 to-violet-500/10" />

            <div className="relative z-10 flex flex-wrap justify-center gap-3 mb-10 bg-white/5 p-2 rounded-2xl border border-white/10">

              <button
                onClick={() => {
                  dispatch(setMode('focus'))
                  dispatch(setTimeLeft(FOCUS_TIME))
                  dispatch(setIsRunning(false))
                }}
                className={`px-6 sm:px-8 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  mode === 'focus'
                    ? 'bg-linear-to-r from-indigo-500 to-violet-500 text-white shadow-xl'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Focus
              </button>

              <button
                onClick={() => {
                  dispatch(setMode('break'))
                  dispatch(setTimeLeft(BREAK_TIME))
                  dispatch(setIsRunning(false))
                }}
                className={`px-6 sm:px-8 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  mode === 'break'
                    ? 'bg-linear-to-r from-emerald-500 to-green-500 text-white shadow-xl'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Break
              </button>
            </div>

            <div className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 mb-10">

              <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-3xl" />

              <div className="absolute inset-0 flex flex-col items-center justify-center">

                <span className="text-5xl sm:text-7xl font-bold text-white tracking-tight">
                  {formatTime(timeLeft)}
                </span>

                <span className="text-gray-400 mt-3 uppercase tracking-[0.3em] text-xs sm:text-sm text-center">
                  {mode} session
                </span>
              </div>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">

              <button
                onClick={handleReset}
                className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              >
                <RotateCcw size={20} />
              </button>

              {isRunning ? (

                <button
                  onClick={handlePause}
                  className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold transition-all duration-300 shadow-2xl flex items-center justify-center gap-3"
                >
                  <Pause size={20} />
                  Pause Session
                </button>

              ) : (

                <button
                  onClick={handleStart}
                  className={`w-full sm:w-auto px-8 sm:px-10 py-4 rounded-2xl text-white font-semibold transition-all duration-300 shadow-2xl flex items-center justify-center gap-3 ${
                    mode === 'focus'
                      ? 'bg-linear-to-r from-indigo-500 to-violet-500'
                      : 'bg-linear-to-r from-emerald-500 to-green-500'
                  }`}
                >
                  <Play size={20} />
                  Start Session
                </button>

              )}
            </div>
          </div>

          <div className="space-y-5">

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-6 shadow-2xl">

              <p className="text-gray-400 text-sm">
                Deep Work Sessions
              </p>

              <h2 className="text-4xl sm:text-5xl font-bold text-white mt-2">
                {sessions}
              </h2>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-6 shadow-2xl">

              <p className="text-gray-400 text-sm">
                Focus Minutes
              </p>

              <h2 className="text-4xl sm:text-5xl font-bold text-white mt-2">
                {totalFocusMinutes}
              </h2>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Timer