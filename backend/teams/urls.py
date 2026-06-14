from django.urls import path
from .views import (
    TeamCreateView, AddMemberView, TeamDashboardView,
    SingleTeamDashboardView, AssignTeamLeaderView,
    TeamLeaderDashboardView
)

urlpatterns = [
    path('', TeamCreateView.as_view(), name='team-create'),
    path('dashboard/', TeamDashboardView.as_view(), name='team-dashboard'),
    path('tl/dashboard/', TeamLeaderDashboardView.as_view(), name='tl-dashboard'),  # ✅ moved up
    path('<int:team_id>/', SingleTeamDashboardView.as_view(), name='single-team-dashboard'),
    path('<int:team_id>/add-member/', AddMemberView.as_view(), name='add-member'),
    path('<int:team_id>/assign-leader/', AssignTeamLeaderView.as_view(), name='assign-team-leader'),
]