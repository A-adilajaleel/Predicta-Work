from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import StandupEntry
from .serializers import StandupSerializer
from datetime import date
import requests as http_requests
import os


def send_slack_standup(username, yesterday, today, blockers):
    webhook_url = os.getenv('SLACK_WEBHOOK_URL')
    if not webhook_url:
        return
    
    message = {
        "text": f"📝 *Daily Standup — {username}*\n\n✅ *Yesterday:* {yesterday}\n🎯 *Today:* {today}\n⚠️ *Blockers:* {blockers}"
    }
    
    try:
        http_requests.post(webhook_url, json=message)
    except Exception as e:
        print(f"Slack error: {e}")


class StandupView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Check if already submitted today
        today = date.today()
        existing = StandupEntry.objects.filter(
            user=request.user,
            date=today
        ).first()

        if existing:
            return Response(
                {'message': 'Standup already submitted today!'},
                status=status.HTTP_200_OK
            )

        serializer = StandupSerializer(data=request.data)
        if serializer.is_valid():
            entry = serializer.save(user=request.user)
            
            # Send to Slack
            send_slack_standup(
                request.user.username,
                entry.yesterday,
                entry.today,
                entry.blockers
            )
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        # Check if submitted today
        today = date.today()
        existing = StandupEntry.objects.filter(
            user=request.user,
            date=today
        ).first()

        if existing:
            return Response({
                'submitted': True,
                'data': StandupSerializer(existing).data
            })
        
        return Response({'submitted': False})


class TeamStandupView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_manager:
            return Response(
                {'error': 'Only managers can view team standups'},
                status=status.HTTP_403_FORBIDDEN
            )

        today = date.today()
        from django.contrib.auth import get_user_model
        from teams.models import Team
        
        User = get_user_model()
        teams = Team.objects.filter(manager=request.user)
        
        if not teams.exists():
            return Response({'error': 'No teams found'}, status=status.HTTP_404_NOT_FOUND)

        team = teams.first()
        members = User.objects.filter(team=team)

        standup_data = []
        for member in members:
            entry = StandupEntry.objects.filter(
                user=member,
                date=today
            ).first()

            standup_data.append({
                'username': member.username,
                'email': member.email,
                'submitted': entry is not None,
                'data': StandupSerializer(entry).data if entry else None
            })

        return Response({
            'team_name': team.name,
            'date': today,
            'standup_data': standup_data
        })