from django.urls import path
from .views import TeamCreateView, AddMemberView, TeamDashboardView

urlpatterns = [
    path('', TeamCreateView.as_view(), name='team-create'),
    path('dashboard/', TeamDashboardView.as_view(), name='team-dashboard'),
    path('<int:team_id>/add-member/', AddMemberView.as_view(), name='add-member'),
]