from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Team
from .serializers import TeamSerializer

from django.contrib.auth import get_user_model

from focus_sessions.models import FocusSession
from tasks.models import Task

from standup.models import StandupEntry
from datetime import date

import requests as http_requests
import os

User = get_user_model()


class TeamCreateView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        if not request.user.is_manager:

            return Response(
                {'error': 'Only managers can create teams'},
                status=status.HTTP_403_FORBIDDEN
            )

        name = request.data.get('name')

        if not name:

            return Response(
                {'error': 'Team name required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        team = Team.objects.create(
            name=name,
            manager=request.user
        )

        return Response(
            TeamSerializer(team).data,
            status=status.HTTP_201_CREATED
        )

    def get(self, request):

        if not request.user.is_manager:

            return Response(
                {'error': 'Only managers can view teams'},
                status=status.HTTP_403_FORBIDDEN
            )

        teams = Team.objects.filter(
            manager=request.user
        )

        return Response(
            TeamSerializer(teams, many=True).data
        )


class AddMemberView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, team_id):

        if not request.user.is_manager:

            return Response(
                {'error': 'Only managers can add members'},
                status=status.HTTP_403_FORBIDDEN
            )

        try:

            team = Team.objects.get(
                id=team_id,
                manager=request.user
            )

        except Team.DoesNotExist:

            return Response(
                {'error': 'Team not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        email = request.data.get('email')

        if not email:

            return Response(
                {'error': 'Employee email required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:

            user = User.objects.get(
                email=email
            )

            user.team = team

            user.save()

            return Response({
                'message':
                    f'{user.username} added to team!'
            })

        except User.DoesNotExist:

            return Response(
                {'error': 'User not found'},
                status=status.HTTP_404_NOT_FOUND
            )


def send_slack_burnout_alert(
    username,
    focus_minutes
):

    webhook_url = os.getenv(
        'SLACK_WEBHOOK_URL'
    )

    if not webhook_url:
        return

    message = {
        "text": (
            f"⚠️ *Burnout Alert!*\n\n"
            f"*{username}* has been working for "
            f"*{focus_minutes} minutes* today!\n\n"
            f"Please check in with them and "
            f"suggest a break 🧠"
        )
    }

    try:

        http_requests.post(
            webhook_url,
            json=message
        )

    except Exception as e:

        print(f"Slack error: {e}")


class TeamDashboardView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        if not request.user.is_manager:

            return Response(
                {
                    'error':
                    'Only managers can view team dashboard'
                },
                status=status.HTTP_403_FORBIDDEN
            )

        teams = Team.objects.filter(
            manager=request.user
        )

        if not teams.exists():

            return Response(
                {'error': 'No teams found'},
                status=status.HTTP_404_NOT_FOUND
            )

        team = teams.first()

        members = User.objects.filter(
            team=team
        )

        team_data = []

        for member in members:

            sessions = FocusSession.objects.filter(
                user=member
            )

            focus_minutes = sum(
                s.duration_minutes
                for s in sessions
            )

            tasks = Task.objects.filter(
                user=member
            )

            standup = StandupEntry.objects.filter(
                user=member,
                date=date.today()
            ).first()

            completed = tasks.filter(
                is_completed=True
            ).count()

            total = tasks.count()

            focus_score = min(
                focus_minutes / 240 * 40,
                40
            )

            task_score = (
                completed / total * 40
            ) if total > 0 else 0

            consistency_score = min(
                sessions.count() * 5,
                20
            )

            score = round(
                focus_score +
                task_score +
                consistency_score
            )

            burnout_risk = (
                focus_minutes >= 180
            )

            if burnout_risk:

                send_slack_burnout_alert(
                    member.username,
                    focus_minutes
                )

            team_data.append({

                'id': member.id,

                'username':
                    member.username,

                'email':
                    member.email,

                'focus_minutes':
                    focus_minutes,

                'completed_tasks':
                    completed,

                'total_tasks':
                    total,

                'score':
                    score,

                'burnout_risk':
                    burnout_risk,

                'standup_yesterday':
                    standup.yesterday
                    if standup
                    else 'No update',

                'standup_today':
                    standup.today
                    if standup
                    else 'No update',

                'standup_blockers':
                    standup.blockers
                    if standup
                    else 'None',
            })

        return Response({

            'team_id':
                team.id,

            'team_name':
                team.name,

            'total_members':
                members.count(),

            'team_data':
                team_data,
        })