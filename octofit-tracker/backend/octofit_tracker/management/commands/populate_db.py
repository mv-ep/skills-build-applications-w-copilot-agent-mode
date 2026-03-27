from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        today = timezone.now().date()

        # Reset data in dependency order using raw deletes to handle malformed legacy rows.
        Leaderboard.objects.all()._raw_delete(Leaderboard.objects.db)
        Activity.objects.all()._raw_delete(Activity.objects.db)
        Workout.objects.all()._raw_delete(Workout.objects.db)
        User.objects.all()._raw_delete(User.objects.db)
        Team.objects.all()._raw_delete(Team.objects.db)

        # Create teams and users with explicit numeric IDs.
        Team.objects.create(id=1, name='Marvel', description='Marvel superheroes')
        Team.objects.create(id=2, name='DC', description='DC superheroes')

        User.objects.create(id=1, email='tony@stark.com', name='Tony Stark', team='Marvel', is_active=True)
        User.objects.create(id=2, email='steve@rogers.com', name='Steve Rogers', team='Marvel', is_active=True)
        User.objects.create(id=3, email='bruce@wayne.com', name='Bruce Wayne', team='DC', is_active=True)
        User.objects.create(id=4, email='clark@kent.com', name='Clark Kent', team='DC', is_active=True)

        Workout.objects.create(id=1, name='Super Strength', description='Heavy lifting', suggested_for='Marvel')
        Workout.objects.create(id=2, name='Flight Training', description='Aerial maneuvers', suggested_for='DC')

        # Use user_id assignments to avoid ObjectId conversion issues.
        Activity.objects.create(id=1, user_id=1, activity_type='Running', duration=30, date=today)
        Activity.objects.create(id=2, user_id=2, activity_type='Cycling', duration=45, date=today)
        Activity.objects.create(id=3, user_id=3, activity_type='Martial Arts', duration=60, date=today)
        Activity.objects.create(id=4, user_id=4, activity_type='Flying', duration=120, date=today)

        Leaderboard.objects.create(id=1, user_id=1, points=150, rank=1)
        Leaderboard.objects.create(id=2, user_id=2, points=120, rank=2)
        Leaderboard.objects.create(id=3, user_id=4, points=110, rank=3)
        Leaderboard.objects.create(id=4, user_id=3, points=100, rank=4)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))
