from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    
    ROLE_CHOICES = [
        ('manager', 'Manager'),
        ('team_leader', 'Team Leader'),  
        ('employee', 'Employee'),
    ]
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='employee')  # ✅ max_length 10 → 20
    team = models.ForeignKey(
        'teams.Team',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='members'
    )
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __str__(self):
        return self.email
    
    @property
    def is_manager(self):
        return self.role == 'manager'

    @property
    def is_team_leader(self): 
        return self.role == 'team_leader'

    @property
    def is_employee(self):  
        return self.role == 'employee'