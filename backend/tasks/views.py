from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .models import Task
from .serializers import TaskSerializer

User = get_user_model()


class TaskListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        personal = Task.objects.filter(user=request.user, assigned_to__isnull=True)
        assigned = Task.objects.filter(assigned_to=request.user)
        all_tasks = (personal | assigned).distinct()
        serializer = TaskSerializer(all_tasks, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        try:
            task = Task.objects.get(pk=pk)

            if task.user != request.user and task.assigned_to != request.user:
                return Response({'error': 'Not authorized'}, status=status.HTTP_403_FORBIDDEN)
        except Task.DoesNotExist:
            return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = TaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            task = Task.objects.get(pk=pk)
            if task.user != request.user and task.assigned_by != request.user:
                return Response({'error': 'Not authorized'}, status=status.HTTP_403_FORBIDDEN)
        except Task.DoesNotExist:
            return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AssignTaskView(APIView):
   
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        if not (user.is_team_leader or user.is_manager):
            return Response(
                {'error': 'Only Team Leaders or Managers can assign tasks'},
                status=status.HTTP_403_FORBIDDEN
            )

        employee_id = request.data.get('employee_id')
        title = request.data.get('title')
        description = request.data.get('description', '')
        priority = request.data.get('priority', 'medium')
        due_date = request.data.get('due_date', None)

        if not employee_id or not title:
            return Response({'error': 'employee_id and title required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            employee = User.objects.get(id=employee_id, role='employee')
        except User.DoesNotExist:
            return Response({'error': 'Employee not found'}, status=status.HTTP_404_NOT_FOUND)

 
        if user.is_team_leader and employee.team != user.team:
            return Response(
                {'error': 'You can only assign tasks to your own team members'},
                status=status.HTTP_403_FORBIDDEN
            )

        task = Task.objects.create(
            user=user,
            assigned_to=employee,
            assigned_by=user,
            title=title,
            description=description,
            priority=priority,
            due_date=due_date,
        )
        return Response(TaskSerializer(task).data, status=status.HTTP_201_CREATED)


class TeamLeaderTasksView(APIView):
   
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not (request.user.is_team_leader or request.user.is_manager):
            return Response({'error': 'Not authorized'}, status=status.HTTP_403_FORBIDDEN)
        tasks = Task.objects.filter(assigned_by=request.user)
        return Response(TaskSerializer(tasks, many=True).data)


class TeamLeaderMembersView(APIView):
    
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_team_leader:
            return Response({'error': 'Not authorized'}, status=status.HTTP_403_FORBIDDEN)
        if not request.user.team:
            return Response({'error': 'Not assigned to a team'}, status=status.HTTP_404_NOT_FOUND)
        members = User.objects.filter(team=request.user.team, role='employee')
        data = [{'id': m.id, 'username': m.username, 'email': m.email} for m in members]
        return Response({'team': request.user.team.name, 'members': data})