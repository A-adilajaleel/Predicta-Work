from django.urls import path
from .views import (
    TaskListCreateView, TaskDetailView,
    AssignTaskView, TeamLeaderTasksView, TeamLeaderMembersView
)

urlpatterns = [
    path('', TaskListCreateView.as_view(), name='task-list-create'),
    path('<int:pk>/', TaskDetailView.as_view(), name='task-detail'),
    path('assign/', AssignTaskView.as_view(), name='task-assign'),
    path('tl/assigned/', TeamLeaderTasksView.as_view(), name='tl-assigned-tasks'),
    path('tl/members/', TeamLeaderMembersView.as_view(), name='tl-members'),
]