from django.urls import path
from .views import StandupView, TeamStandupView

urlpatterns = [
    path('', StandupView.as_view(), name='standup'),
    path('team/', TeamStandupView.as_view(), name='team-standup'),
]