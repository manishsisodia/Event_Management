from django.core.management.base import BaseCommand
from django.contrib.auth.models import  Group
from User.models import Registered_Users

class Command(BaseCommand):
    help="Assign roles to the users"

    def handle(self, *args, **kwargs):
        # Example of assigning a user to the 'Invitee' role
        user = Registered_Users.objects.get(email="event@gmail.com")
        invitee_group = Group.objects.get(name='Attendee')
        user.groups.add(invitee_group)

        #print the users in different groups

        # invitee_group = Group.objects.get(name='Invitee')
        # invitee_users = invitee_group.user_set.all()

        # # Now you can iterate through invitee_users to see the users
        # for user in invitee_users:
        #     print(user.email)  



        self.stdout.write(self.style.SUCCESS("Successful"))

