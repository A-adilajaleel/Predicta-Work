# 🚀 Predicta Work — Ethical AI Productivity Platform

A full-stack remote workforce productivity tracker built with Django REST Framework and React. Designed with ethical AI principles — no spying, no surveillance, just intelligent insights.

---

## 🌐 Live Demo

- **Live:** https://predicta-work.vercel.app

---

## 👥 Role-Based System

| Role | Capabilities |
|------|-------------|
| **Manager** | Create multiple teams, add employees, assign team leaders, view all team dashboards |
| **Team Leader** | View team members, assign tasks to employees, track task progress |
| **Employee** | View assigned tasks, focus timer, daily standup, AI coach, weekly report |

---

## ✨ Features

- 🔐 JWT Authentication with role-based access control
- 👔 3-tier hierarchy: Manager → Team Leader → Employee
- 📋 Task assignment system (TL assigns to employees)
- ⏱️ Focus session timer with productivity tracking
- 🤖 AI Coach powered by Groq + LLaMA
- 📊 Weekly productivity analytics
- 🧘 Daily standup system (once per day)
- 🔥 Burnout detection with Slack webhook alerts
- 🌙 Dark/Light mode
- 📱 Fully responsive design

---

## 🛠️ Tech Stack

**Frontend:**
- React 18 + Vite
- Redux Toolkit
- Tailwind CSS
- Recharts
- Framer Motion
- Axios

**Backend:**
- Django 6 + Django REST Framework
- PostgreSQL
- JWT (SimpleJWT)
- Groq API (LLaMA)
- Slack Webhook

**Deployment:**
- Frontend → Vercel
- Backend → Render
- Database → PostgreSQL (Render)

---

## 🚀 Local Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 👤 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Manager | sarah.johnson@predictawork.com | Manager@123 |
| Team Leader | alex.kumar@predictawork.com | Leader@123 |
| Employee | john.doe@predictawork.com | Emp@123 |

---

## 📁 Project Structure

Predicta-Work/

├── backend/

│   ├── users/          # Auth, roles

│   ├── tasks/          # Task management

│   ├── teams/          # Team hierarchy

│   ├── focus_sessions/ # Timer tracking

│   ├── standup/        # Daily standups

│   └── ai_coach/       # Groq AI integration

└── frontend/

└── src/

├── pages/      # All pages

├── components/ # Reusable components

├── api/        # API calls

└── store/      # Redux store


---

## 🧠 Why Ethical Productivity?

Most employee tracking tools spy on workers — screenshots, keyloggers, mouse tracking. Predicta Work is different:

- ✅ Employees submit their OWN updates
- ✅ Focus time is self-reported
- ✅ Burnout alerts HELP employees, not punish them
- ✅ No surveillance, only support

---

## 👩‍💻 Developer

**Adila Jaleel** — Full Stack Developer
