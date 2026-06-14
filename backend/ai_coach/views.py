from collections import defaultdict
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from tasks.models import Task
from focus_sessions.models import FocusSession

from groq import Groq
import os
from datetime import date, timedelta
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class AICoachView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = date.today()

        tasks = Task.objects.filter(user=request.user)
        completed = tasks.filter(is_completed=True).count()
        pending = tasks.filter(is_completed=False).count()
        sessions = FocusSession.objects.filter(user=request.user, date=today)
        total_minutes = sum(s.duration_minutes for s in sessions)

        prompt = f"""
        You are a productivity coach. Give short, motivating feedback based on this data:
        - Focus time today: {total_minutes} minutes
        - Tasks completed: {completed}
        - Tasks pending: {pending}
        
        Give 2-3 sentences of personalized advice. Be encouraging and specific.
        """

        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama-3.3-70b-versatile",
        )

        feedback = chat_completion.choices[0].message.content

        return Response({
            'completed_tasks': completed,
            'pending_tasks': pending,
            'focus_minutes': total_minutes,
            'feedback': feedback
        })


class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = date.today()

        today_sessions = FocusSession.objects.filter(
            user=request.user, date=today
        )
        today_minutes = sum(s.duration_minutes for s in today_sessions)

        all_tasks = Task.objects.filter(user=request.user)
        completed_tasks = all_tasks.filter(is_completed=True).count()
        pending_tasks = all_tasks.filter(is_completed=False).count()

        weekly_data = []
        for i in range(6, -1, -1):
            day = today - timedelta(days=i)
            day_sessions = FocusSession.objects.filter(
                user=request.user, date=day
            )
            day_minutes = sum(s.duration_minutes for s in day_sessions)
            weekly_data.append({
                'date': day.strftime('%a'),
                'minutes': day_minutes
            })

        streak = 0
        check_day = today
        while True:
            day_sessions = FocusSession.objects.filter(
                user=request.user, date=check_day
            )
            if day_sessions.exists():
                streak += 1
                check_day -= timedelta(days=1)
            else:
                break

        return Response({
            'today_focus_minutes': today_minutes,
            'completed_tasks': completed_tasks,
            'pending_tasks': pending_tasks,
            'weekly_data': weekly_data,
            'streak': streak,
        })


class DeepWorkScoreView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = date.today()

        tasks = Task.objects.filter(user=request.user)
        completed = tasks.filter(is_completed=True).count()
        total = tasks.count()

        sessions = FocusSession.objects.filter(user=request.user, date=today)
        total_minutes = sum(s.duration_minutes for s in sessions)

        # Score calculation
        focus_score = min(total_minutes / 240 * 40, 40)
        task_score = (completed / total * 40) if total > 0 else 0
        consistency_score = min(sessions.count() * 5, 20)
        total_score = round(focus_score + task_score + consistency_score)

        prompt = f"""
        You are a productivity analyst. Based on this data give a brief analysis:
        - Deep Work Score: {total_score}/100
        - Focus time: {total_minutes} minutes
        - Tasks completed: {completed}/{total}
        - Pomodoro sessions: {sessions.count()}
        
        Give 2 sentences of analysis. Be specific and encouraging.
        """

        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama-3.3-70b-versatile",
        )

        analysis = chat_completion.choices[0].message.content

        return Response({
            'score': total_score,
            'focus_score': round(focus_score),
            'task_score': round(task_score),
            'consistency_score': round(consistency_score),
            'focus_minutes': total_minutes,
            'completed_tasks': completed,
            'total_tasks': total,
            'analysis': analysis
        })
class WeeklyReportView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = date.today()
        last_week = today - timedelta(days=6)

        sessions = FocusSession.objects.filter(
            user=request.user,
            date__range=[last_week, today]
        )

        tasks = Task.objects.filter(
            user=request.user,
            created_at__date__range=[last_week, today]
        )

        total_focus_minutes = sum(
            s.duration_minutes for s in sessions
        )

        completed_tasks = tasks.filter(
            is_completed=True
        ).count()

        total_tasks = tasks.count()

        # Productivity per day
        daily_focus = defaultdict(int)

        for session in sessions:
            day = session.date.strftime('%A')
            daily_focus[day] += session.duration_minutes

        best_day = (
            max(daily_focus, key=daily_focus.get)
            if daily_focus
            else "No data"
        )

        avg_focus = round(
            total_focus_minutes / 7,
            1
        )

        burnout_risk = (
            "High"
            if avg_focus > 240
            else "Medium"
            if avg_focus > 120
            else "Low"
        )

        prompt = f"""
        You are an AI productivity analyst.

        Analyze this employee's weekly productivity:

        - Total focus time: {total_focus_minutes} minutes
        - Tasks completed: {completed_tasks}/{total_tasks}
        - Average daily focus: {avg_focus} minutes
        - Most productive day: {best_day}
        - Burnout risk: {burnout_risk}

        Give:
        1. Weekly productivity summary
        2. Burnout observations
        3. Productivity recommendations

        Keep response professional and concise.
        """

        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            model="llama-3.3-70b-versatile",
        )

        report = chat_completion.choices[0].message.content

        return Response({
            "total_focus_minutes": total_focus_minutes,
            "completed_tasks": completed_tasks,
            "total_tasks": total_tasks,
            "average_focus": avg_focus,
            "best_day": best_day,
            "burnout_risk": burnout_risk,
            "weekly_report": report
        })    