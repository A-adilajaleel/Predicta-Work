from django.db import models

# Create your models here.
from django.db import models
from django.conf import settings

class StandupEntry(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    yesterday = models.TextField()
    today = models.TextField()
    blockers = models.TextField(blank=True, default='None')
    date = models.DateField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.date}"