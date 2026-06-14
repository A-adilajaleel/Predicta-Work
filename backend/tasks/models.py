from django.db import models
from django.conf import settings

class Task(models.Model):
    PRIORITY_CHOICES = [
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    ]

    STATUS_CHOICES = [
        ('todo', 'To Do'),
        ('in_progress', 'In Progress'),
        ('done', 'Done'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='personal_tasks'  
    )
    assigned_to = models.ForeignKey(  
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name='assigned_tasks'
    )
    assigned_by = models.ForeignKey( 
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name='tasks_assigned_by_me'
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, default='')  # ✅ NEW
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='todo')  # ✅ NEW
    is_completed = models.BooleanField(default=False)
    due_date = models.DateField(null=True, blank=True)  # ✅ NEW
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title