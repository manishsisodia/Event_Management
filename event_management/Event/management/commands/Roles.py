from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from Event.models import InviteModel  # Ensure this import matches your actual InviteModel location

class Command(BaseCommand):
    help = 'Create default roles and permissions'

    def handle(self, *args, **kwargs):
        # Define your roles
        roles = ['Host', 'Invitee','Attendee','organizer','volunteer','crew_member']

        # Define your permissions
        permissions = {
            'can_host_event': 'Can host event',
            'can_rsvp': 'Can RSVP to event',
        }

        # Create permissions
        for codename, name in permissions.items():
            Permission.objects.get_or_create(
                codename=codename,
                name=name,
                content_type=ContentType.objects.get_for_model(InviteModel)
            )

        # Create roles and assign permissions
        for role_name in roles:
            group, created = Group.objects.get_or_create(name=role_name)
            if role_name == 'Host':
                group.permissions.add(Permission.objects.get(codename='can_host_event'))
            elif role_name == 'Invitee':
                group.permissions.add(Permission.objects.get(codename='can_rsvp'))
            self.stdout.write(self.style.SUCCESS(f'Role {role_name} created or updated'))
