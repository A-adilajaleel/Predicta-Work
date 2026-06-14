from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    assigned_to_username = serializers.CharField(source='assigned_to.username', read_only=True)
    assigned_by_username = serializers.CharField(source='assigned_by.username', read_only=True)

    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'priority', 'status',
            'is_completed', 'due_date', 'created_at',
            'assigned_to', 'assigned_to_username',
            'assigned_by', 'assigned_by_username',
        ]
        read_only_fields = ['assigned_by', 'assigned_by_username', 'assigned_to_username']