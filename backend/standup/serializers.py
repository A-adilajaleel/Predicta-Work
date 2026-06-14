from rest_framework import serializers
from .models import StandupEntry

class StandupSerializer(serializers.ModelSerializer):
    class Meta:
        model = StandupEntry
        fields = ['id', 'yesterday', 'today', 'blockers', 'date', 'created_at']