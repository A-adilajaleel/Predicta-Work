from django.urls import path
from .views import FocusSessionView

urlpatterns = [
    path('', FocusSessionView.as_view(), name='focus-sessions'),
]