from django.urls import path
from .views import AICoachView, DashboardStatsView, DeepWorkScoreView,WeeklyReportView

urlpatterns = [
    path('feedback/', AICoachView.as_view(), name='ai-feedback'),
    path('dashboard/', DashboardStatsView.as_view(), name='dashboard-stats'),
    path('deepwork/', DeepWorkScoreView.as_view(), name='deep-work-score'),
    path(
    'weekly-report/',
    WeeklyReportView.as_view(),
    name='weekly-report'
),
]