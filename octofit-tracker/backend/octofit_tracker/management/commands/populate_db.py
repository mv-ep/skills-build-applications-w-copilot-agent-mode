from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        # Create Teams
        marvel = Team.objects.create(name='Marvel', description='Marvel superheroes')
        dc = Team.objects.create(name='DC', description='DC superheroes')

        # Create Users
        tony = User.objects.create(email='tony@stark.com', name='Tony Stark', team='Marvel')
        steve = User.objects.create(email='steve@rogers.com', name='Steve Rogers', team='Marvel')
        bruce = User.objects.create(email='bruce@wayne.com', name='Bruce Wayne', team='DC')
        clark = User.objects.create(email='clark@kent.com', name='Clark Kent', team='DC')

        # Create Workouts
        w1 = Workout.objects.create(name='Super Strength', description='Heavy lifting', suggested_for='Marvel')
        w2 = Workout.objects.create(name='Flight Training', description='Aerial maneuvers', suggested_for='DC')

        # Create Activities
        Activity.objects.create(user=tony, activity_type='Running', duration=30, date=timezone.now().date())
        Activity.objects.create(user=steve, activity_type='Cycling', duration=45, date=timezone.now().date())
        Activity.objects.create(user=bruce, activity_type='Martial Arts', duration=60, date=timezone.now().date())
        Activity.objects.create(user=clark, activity_type='Flying', duration=120, date=timezone.now().date())

        # Create Leaderboard
        Leaderboard.objects.create(user=tony, points=150, rank=1)
        Leaderboard.objects.create(user=steve, points=120, rank=2)
        Leaderboard.objects.create(user=clark, points=110, rank=3)
        Leaderboard.objects.create(user=bruce, points=100, rank=4)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))
