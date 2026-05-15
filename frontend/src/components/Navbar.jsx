import { useState } from 'react'

import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import {
  useDispatch,
  useSelector,
} from 'react-redux'

import { logout } from '../store/authSlice'

import { useTheme } from '../context/ThemeContext'

import {
  LayoutDashboard,
  CheckSquare,
  Timer,
  Brain,
  Users,
  Menu,
  X,
  Sparkles,
  LogOut,
  Moon,
  Sun,
} from 'lucide-react'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { user } = useSelector(
    (state) => state.auth
  )

  const { theme, toggleTheme } = useTheme()

  const [mobileOpen, setMobileOpen] =
    useState(false)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  // EMPLOYEE LINKS
  const employeeLinks = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      path: '/tasks',
      label: 'Tasks',
      icon: <CheckSquare size={20} />,
    },
    {
      path: '/timer',
      label: 'Timer',
      icon: <Timer size={20} />,
    },
    {
      path: '/deepwork',
      label: 'Deep Work',
      icon: <Brain size={20} />,
    },
    {
      path: '/weekly-report',
      label: 'Weekly Report',
      icon: <Sparkles size={20} />,
    },
  ]

  // MANAGER LINKS
  const managerLinks = [
   
    {
      path: '/team',
      label: 'Team Dashboard',
      icon: <Users size={20} />,
    },
    {
      path: '/weekly-report',
      label: 'Weekly Report',
      icon: <Sparkles size={20} />,
    },
  ]

  const navItems =
    user?.role === 'manager'
      ? managerLinks
      : employeeLinks

  return (
    <>
      {/* MOBILE TOPBAR */}
      <div
        className="
          lg:hidden
          fixed top-0 left-0 right-0
          z-60

          h-16

          bg-white/80
          dark:bg-[#0B1120]/90

          backdrop-blur-2xl

          border-b
          border-gray-200
          dark:border-white/10

          flex items-center justify-between

          px-4
        "
      >

        {/* LOGO */}
        <div className="flex items-center gap-3">

          <div
            className="
              w-10 h-10

              rounded-2xl

              bg-linear-to-br
              from-indigo-500
              via-violet-500
              to-purple-500

              flex items-center justify-center

              shadow-2xl
            "
          >
            <Sparkles
              size={18}
              className="text-white"
            />
          </div>

          <div>

            <h1
              className="
                font-bold
                text-sm

                text-[#0F172A]
                dark:text-white
              "
            >
              Predicta Work
            </h1>

            <p
              className="
                text-[10px]

                text-gray-500
                dark:text-gray-400
              "
            >
              AI Productivity
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">

          {/* THEME SWITCH */}
          <button
            onClick={toggleTheme}
            className="
              w-10 h-10

              rounded-xl

              bg-white
              dark:bg-white/5

              border
              border-gray-200
              dark:border-white/10

              flex items-center justify-center

              text-[#0F172A]
              dark:text-white

              hover:scale-105

              transition-all duration-300
            "
          >
            {
              theme === 'dark'
                ? <Sun size={18} />
                : <Moon size={18} />
            }
          </button>

          {/* MENU */}
          <button
            onClick={() =>
              setMobileOpen(true)
            }
            className="
              w-10 h-10

              rounded-xl

              bg-white
              dark:bg-white/5

              border
              border-gray-200
              dark:border-white/10

              flex items-center justify-center

              text-[#0F172A]
              dark:text-white
            "
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* OVERLAY */}
      {mobileOpen && (
        <div
          className="
            lg:hidden
            fixed inset-0
            z-40

            bg-black/50
            backdrop-blur-sm
          "
          onClick={() =>
            setMobileOpen(false)
          }
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50

          h-screen

          w-[85%]
          max-w-[320px]
          lg:w-72

          bg-[#FFFFFF]/95
          dark:bg-[#0B1120]/95

          backdrop-blur-2xl

          border-r
          border-gray-200
          dark:border-white/10

          flex flex-col

          transition-all duration-300

          ${
            mobileOpen
              ? 'translate-x-0'
              : '-translate-x-full'
          }

          lg:translate-x-0
        `}
      >

        {/* HEADER */}
        <div
          className="
            p-5 sm:p-6

            border-b
            border-gray-200
            dark:border-white/10

            flex items-center justify-between
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                w-12 h-12

                rounded-2xl

                bg-linear-to-br
                from-indigo-500
                via-violet-500
                to-purple-500

                flex items-center justify-center

                shadow-2xl
              "
            >
              <Sparkles
                className="text-white"
                size={20}
              />
            </div>

            <div>

              <h1
                className="
                  font-bold
                  text-lg

                  text-[#0F172A]
                  dark:text-white
                "
              >
                Predicta Work
              </h1>

              <p
                className="
                  text-xs

                  text-gray-500
                  dark:text-gray-400
                "
              >
                AI Productivity
              </p>
            </div>
          </div>

          {/* CLOSE */}
          <button
            onClick={() =>
              setMobileOpen(false)
            }
            className="
              lg:hidden

              w-10 h-10

              rounded-xl

              bg-gray-100
              dark:bg-white/5

              border
              border-gray-200
              dark:border-white/10

              flex items-center justify-center

              text-[#0F172A]
              dark:text-white
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* NAV ITEMS */}
        <nav
          className="
            flex-1

            overflow-y-auto

            p-4

            space-y-2
          "
        >

          {navItems.map((item) => (

            <Link
              key={item.path}
              to={item.path}

              onClick={() =>
                setMobileOpen(false)
              }

              className={`
                group

                flex items-center gap-4

                px-5 py-4

                rounded-2xl

                transition-all duration-300

                ${
                  location.pathname === item.path
                    ? `
                      bg-linear-to-r
                      from-indigo-500
                      via-violet-500
                      to-purple-500

                      text-white

                      shadow-2xl
                    `
                    : `
                      text-gray-600
                      dark:text-gray-400

                      hover:bg-gray-100
                      dark:hover:bg-white/5

                      hover:text-[#0F172A]
                      dark:hover:text-white
                    `
                }
              `}
            >

              {item.icon}

              <span className="font-medium">
                {item.label}
              </span>
            </Link>
          ))}

          {/* THEME BUTTON */}
          <button
            onClick={toggleTheme}
            className="
              w-full

              mt-4

              flex items-center gap-4

              px-5 py-4

              rounded-2xl

              bg-gray-100
              dark:bg-white/5

              border
              border-gray-200
              dark:border-white/10

              text-[#0F172A]
              dark:text-gray-300

              hover:scale-[1.02]

              transition-all duration-300
            "
          >

            {
              theme === 'dark'
                ? <Sun size={20} />
                : <Moon size={20} />
            }

            <span className="font-medium">
              {
                theme === 'dark'
                  ? 'Light Mode'
                  : 'Dark Mode'
              }
            </span>
          </button>
        </nav>

        {/* USER SECTION */}
        <div
          className="
            p-4

            border-t
            border-gray-200
            dark:border-white/10
          "
        >

          {/* USER */}
          <div
            className="
              flex items-center gap-3

              mb-4
            "
          >

            <div
              className="
                w-12 h-12

                rounded-full

                bg-linear-to-br
                from-indigo-500
                to-violet-500

                flex items-center justify-center

                text-white
                font-bold

                shadow-xl
              "
            >
              {
                user?.username
                  ?.charAt(0)
                  .toUpperCase()
              }
            </div>

            <div className="min-w-0">

              <p
                className="
                  font-semibold

                  truncate

                  text-[#0F172A]
                  dark:text-white
                "
              >
                {user?.username}
              </p>

              <p
                className="
                  text-xs

                  truncate

                  text-gray-500
                  dark:text-gray-400
                "
              >
                {user?.email}
              </p>

              <p
                className="
                  text-[10px]

                  uppercase
                  tracking-widest

                  text-indigo-500
                "
              >
                {user?.role}
              </p>
            </div>
          </div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="
              w-full

              flex items-center justify-center gap-3

              px-5 py-4

              rounded-2xl

              bg-red-50
              dark:bg-red-500/10

              border
              border-red-200
              dark:border-red-500/20

              text-red-500
              dark:text-red-400

              hover:bg-red-100
              dark:hover:bg-red-500/20

              transition-all duration-300
            "
          >

            <LogOut size={18} />

            <span className="font-medium">
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default Navbar