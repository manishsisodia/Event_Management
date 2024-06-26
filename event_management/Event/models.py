from django.db import models
from django.contrib.auth.models import Group, Permission
from django.core.exceptions import ValidationError
import datetime
import pytz
from django.utils import timezone
now = timezone.now()
utc=pytz.UTC
from cloudinary_storage.storage import RawMediaCloudinaryStorage
# from cloudinary.models import CloudinaryField



# class Event(models.Model):
#     type = models.CharField(max_length=500)
#     host_email = models.EmailField(max_length=200, blank=True)
#     name = models.CharField(max_length=200)
#     start_datetime = models.DateTimeField(default=datetime.datetime.now())
#     end_datetime = models.DateTimeField(default=datetime.datetime.now())
#     location = models.CharField(max_length=200)
#     description = models.TextField()
#     banner_image = models.ImageField(upload_to="static/event_banner", storage=RawMediaCloudinaryStorage())

# class EventImage(models.Model):
#     event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='images')
#     images = models.ManyToManyField('Image', blank=True)

# class Image(models.Model):
#     image = models.ImageField(upload_to="static/event_images", storage=RawMediaCloudinaryStorage())


class EventManager(models.Manager):

    def Upcoming_events(self):
        return self.filter(type="Public",start_datetime__gte=timezone.now())
    
    def Past_events(self):
        return self.filter(type="Public",end_datetime__lt=timezone.now())
    
    def Running_events(self):
        return self.filter(type="Public",start_datetime__lte=timezone.now(),end_datetime__gte=timezone.now())
    
    def expired(self):
        return self.filter(end_datetime__lt=timezone.now())


class Event(models.Model):
    type=models.CharField(max_length=500)
    host_email=models.EmailField(max_length=200)
    name=models.CharField(max_length=200)
    # start_datetime=models.DateTimeField(default=datetime.datetime.now())
    # end_datetime=models.DateTimeField(default=datetime.datetime.now())
    start_datetime=models.DateTimeField(default=timezone.now)
    end_datetime=models.DateTimeField(default=timezone.now)
    location=models.CharField(max_length=200)
    description=models.TextField()
    # image = CloudinaryField('image')
    image=models.ImageField(upload_to="static/event_banner",storage=RawMediaCloudinaryStorage())
    # role=models.ManyToManyField('Role',blank=True)

    objects=EventManager()


    # role_manager=models.ManyToManyField(through="RoleManager")
    

    class Meta:
        verbose_name = "Event"
        verbose_name_plural="Events"
        db_table="Events"
        unique_together=["host_email","name"]

    def clean(self):
        if self.start_datetime<timezone.now():
            raise ValidationError("start date cannot be in the past")
        if self.start_datetime>self.end_datetime:
            raise ValidationError("start date cannot be after the end date")

    def __str__(self) -> str:
        return self.name



class CreateTicket(models.Model):
    type=models.CharField(max_length=100)
    event=models.ForeignKey(Event,on_delete=models.DO_NOTHING)
    cost=models.DecimalField(max_digits=10,decimal_places=2)
    
    # event_id=models.CharField(max_length=100)
    # cost=models.CharField(max_length=100)

    class Meta:
        verbose_name="Tickets_of_Event"
        verbose_name_plural="Tickets_of_Events"
        db_table="Tickets_of_Events"
        unique_together=["type","event"]

    def __str__(self) -> str:
        return f"{self.type} - {self.event}"
    


class ImageAfterEvent(models.Model):
    event=models.ForeignKey(Event,on_delete=models.DO_NOTHING)
    # event_id=models.CharField(max_length=100)
    image=models.ManyToManyField("Photos",blank=True)

    class Meta:
        verbose_name="Image_After_Event"
        verbose_name_plural="Images_After_Events"
        db_table="Images_After_Event"

class Photos(models.Model):
    photo=models.ImageField(upload_to="static/event_images",storage=RawMediaCloudinaryStorage())

    class Meta:
        verbose_name="Photo"
        verbose_name_plural="Photos"
        db_table="Photos"

    def __str__(self):
        return self.photo.url
    
class Role(models.Model):
    role=models.CharField(max_length=100)
    # role_to_user=models.ManyToManyField("User.Registered_Users",blank=True)  #bcz circular import ho rha tha to 1 dusre pr depend the isliye usko resolve krne k liye ye syntax use kiya

    class Meta:
        verbose_name="Role"
        verbose_name_plural="Roles"
        db_table="Roles"

    def __str__(self):
        return self.role



# class InviteModel(models.Model):
#     host_email=models.CharField(max_length=200)
#     invitee_email=models.CharField(max_length=200)
#     event=models.ForeignKey(Event,on_delete=models.DO_NOTHING)
#     # event_id=models.CharField(max_length=100)
#     role=models.ForeignKey(Role,on_delete=models.DO_NOTHING)
#     # role=models.CharField(max_length=100)
#     rsvp=models.BooleanField(default=False)


class InviteModel(models.Model):
    host_email = models.CharField(max_length=200)
    invitee_email = models.CharField(max_length=200)
    event = models.ForeignKey(Event, on_delete=models.DO_NOTHING)
    role = models.ForeignKey(Group, on_delete=models.DO_NOTHING)  # Use Group for roles
    rsvp = models.BooleanField(default=False)


    class Meta:
        verbose_name="Invite_list"
        verbose_name_plural="Invite_list"
        db_table="Invite_list"
        unique_together=["invitee_email","event","role"]


class Ticket(models.Model):
    event=models.ForeignKey(Event,on_delete=models.DO_NOTHING)
    # event_id=models.CharField(max_length=100)
    email=models.EmailField()
    ticket=models.ForeignKey(CreateTicket,on_delete=models.DO_NOTHING)
    # ticket_id=models.CharField(max_length=100)
    qr_code=models.ImageField(upload_to="QRcodes",storage=RawMediaCloudinaryStorage())

    class Meta:
        verbose_name="Booked_Tickets"
        verbose_name_plural="Booked_Tickets"
        db_table="Booked_Tickets"
        unique_together=["email","event"]


    
class Messages(models.Model):
    sender_email=models.EmailField()
    message_datetime=models.DateTimeField(default=timezone.now)
    message=models.CharField(max_length=500)

    class Meta:
        verbose_name="Message"
        verbose_name_plural="Messages"
        db_table="Messages"

class FeedbackManager(models.Manager):

    def get_feedback(self,event_id):
        return self.filter(event_id=event_id)

class Feedback(models.Model):
    event=models.ForeignKey(Event,on_delete=models.DO_NOTHING)
    # event_id=models.CharField(max_length=100)
    email=models.EmailField()
    feedback=models.CharField(max_length=500)
    feedback_datetime=models.DateTimeField(default=timezone.now)

    objects=FeedbackManager()

    class Meta:
        verbose_name="Feedback_of_Event"
        verbose_name_plural="Feedback_of_Events"
        db_table="Feedback_of_Events"

class SessionModel(models.Model):
    event=models.ForeignKey(Event,on_delete=models.DO_NOTHING)
    # event_id=models.CharField(max_length=200)
    name=models.CharField(max_length=500)
    speaker=models.CharField(max_length=500)
    start_datetime=models.DateTimeField(default=timezone.now)
    end_datetime=models.DateTimeField(default=timezone.now)
    location=models.CharField(max_length=200)
    host_email=models.EmailField()

    class Meta:
        verbose_name="Session"
        verbose_name_plural="Sessions"
        db_table="Session"
    