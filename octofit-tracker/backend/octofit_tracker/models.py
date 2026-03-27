from django.db import models

class User(models.Model):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    team = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.email

class Team(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Activity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=50)
    duration = models.PositiveIntegerField(help_text="Duration in minutes")
    date = models.DateField()

    def __str__(self):
        return f"{self.user.email} - {self.activity_type}"

class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    suggested_for = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Leaderboard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    points = models.PositiveIntegerField(default=0)
    rank = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.user.email} - {self.points} pts"
