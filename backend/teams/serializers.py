from rest_framework import serializers
from .models import Team
from django.contrib.auth import get_user_model

User = get_user_model()

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role']

class TeamSerializer(serializers.ModelSerializer):
    members = TeamMemberSerializer(many=True, read_only=True)
    manager_name = serializers.CharField(source='manager.username', read_only=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'manager_name', 'members', 'created_at']