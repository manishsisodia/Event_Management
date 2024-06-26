from rest_framework import serializers
from .models import Event,CreateTicket,InviteModel,Ticket,Role,Messages,Feedback,SessionModel,ImageAfterEvent,Photos
import datetime
import pytz
from django.utils import timezone
now = timezone.now()
utc=pytz.UTC




class RoleSerializer(serializers.Serializer):
    role=serializers.CharField(required=True)
# class RoleSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=Role
#         fields=["id","role"]


class EventSerializer(serializers.Serializer):

    type=serializers.CharField(required=True)
    host_email=serializers.EmailField(required=True)
    name=serializers.CharField(required=True)
    start_datetime=serializers.DateTimeField(required=True)
    end_datetime=serializers.DateTimeField(required=True)
    location=serializers.CharField(required=True)
    description=serializers.CharField(required=True)
    image=serializers.ImageField(required=True)

    def validate_start_datetime(self,value):
        print("start")
        if value<timezone.now():
            raise serializers.ValidationError("start date of the event can not be in the past")
        return value
    
    def validate_end_datetime(self,value):
        print("end")
        start_datetime=self.initial_data.get("start_datetime")
        if start_datetime:
            start_datetime=serializers.DateTimeField().to_internal_value(start_datetime)
            if value<start_datetime:
                raise serializers.ValidationError("end date time must be after the start date time")           
        return value
    
    def create(self,validated_data):
        return Event.objects.create(**validated_data)
        
    






    # role=RoleSerializer(many=True,read_only=True)

    # class Meta:
    #     model=Event
    #     fields=["host_email","image","role"]


    # def validate(self,data):
    #     # data["start_datetime"]=utc.localize(data["start_datetime"])
    #     # data["end_datetime"]=utc.localize(data["end_datetime"])
    #     # start_date=data["start_datetime"].replace(tzinfo=utc)
    #     # end_date=data["end_datetime"].replace(tzinfo=utc)
    #     if not data["type"]:
    #         print("1")
    #         raise serializers.ValidationError("invalid type!!")
    #     if not data["name"]:
    #         print("2")
    #         raise serializers.ValidationError("invalid name!!")
    #     if not data["start_datetime"]:
    #         print("3")
    #         raise serializers.ValidationError("inavlid start date-time")
    #     if not data["end_datetime"]:
    #         print("3")
    #         raise serializers.ValidationError("inavlid end date-time")
    #     if data["start_datetime"]<datetime.datetime.now(tz=utc):
    #         raise serializers.ValidationError("start date-time can not be in the past") 
    #     if data["start_datetime"]>data["end_datetime"]:
    #         raise serializers.ValidationError("invalid start date-time")
    #     if not data["location"]:
    #         print("4")
    #         raise serializers.ValidationError("invalid location")
    #     if not data["description"]:
    #         print("5")
    #         raise serializers.ValidationError("invalid description")
    #     if not data["image"]:
    #         print("6")
    #         raise serializers.ValidationError("invalid image")
    #     print("7")
    #     return data
    


class InviteSerializer(serializers.Serializer):
    host_email=serializers.EmailField(required=True)
    invitee_email=serializers.EmailField(required=True)
    # event = serializers.PrimaryKeyRelatedField(many=True,read_only=True)
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())
    role=serializers.PrimaryKeyRelatedField(queryset=Role.objects.all())
    # role=serializers.PrimaryKeyRelatedField(many=True,read_only=True)
    rsvp=serializers.BooleanField(default=False)


    def create(self,validated_data):
        return InviteModel.objects.create(**validated_data)
    
# class InviteSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=InviteModel
#         fields="__all__"



class CreateTicketSerializer(serializers.Serializer):


    type=serializers.CharField(required=True)
    event=serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())
    # event = serializers.PrimaryKeyRelatedField(many=True,read_only=True)
    cost = serializers.DecimalField(max_digits=10,decimal_places=2,required=True)

    def create(self,validated_data):
        return CreateTicket.objects.create(**validated_data)
    
    # class Meta:
    #     model=CreateTicket
    #     fields="__all__"

    # def validate(self,data):

    #     try:
    #         event_data=Event.objects.get(id=data["event_id"])
    #         event_start_date=event_data.start_datetime
    #         print(event_data)
    #     except:    
    #         raise serializers.ValidationError("event does not exists")
        
    #     print("1")

    #     if not Event.objects.filter(id=data["event_id"]).exists():
    #         print("2")
    #         raise serializers.ValidationError("event does not exists")
        
    #     if CreateTicket.objects.filter(type=data["type"],event_id=data["event_id"]):
    #         print("3")
    #         raise serializers.ValidationError("Ticket Already exists")
        
    #     if event_start_date<datetime.datetime.now(tz=utc):
    #         print("4")
    #         raise serializers.ValidationError("Event has already occured") 
        
        
    #     print("5")
    #     return data


class RunningEventSerializer(serializers.Serializer):
    type=serializers.CharField(required=True)
    host_email=serializers.CharField(required=True)
    name=serializers.CharField(required=True)
    start_datetime=serializers.DateTimeField(required=True)
    end_datetime=serializers.DateTimeField(required=True)
    location=serializers.DateTimeField(required=True)
    description=serializers.CharField(required=True)
    image=serializers.ImageField(required=True)
    
    # class Meta:
    #     model=Event
    #     fields="__all__"

class UpcomingEventSerializer(serializers.Serializer):
    type=serializers.CharField(required=True)
    host_email=serializers.CharField(required=True)
    name=serializers.CharField(required=True)
    start_datetime=serializers.DateTimeField(required=True)
    end_datetime=serializers.DateTimeField(required=True)
    location=serializers.DateTimeField(required=True)
    description=serializers.CharField(required=True)
    image=serializers.ImageField(required=True)
    
    # class Meta:
    #     model=Event
    #     fields="__all__"

class PastEventSerializer(serializers.Serializer):
    type=serializers.CharField(required=True)
    host_email=serializers.CharField(required=True)
    name=serializers.CharField(required=True)
    start_datetime=serializers.DateTimeField(required=True)
    end_datetime=serializers.DateTimeField(required=True)
    location=serializers.DateTimeField(required=True)
    description=serializers.CharField(required=True)
    image=serializers.ImageField(required=True)
    
    # class Meta:
    #     model=Event
    #     fields="__all__"




# class RunningEventSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=Event
#         fields="__all__"

# class UpcomingEventSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=Event
#         fields="__all__"

# class PastEventSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=Event
#         fields="__all__"

class TicketSerializer(serializers.Serializer):
    event=serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())
    # event = serializers.PrimaryKeyRelatedField(many=True,read_only=True)
    email=serializers.EmailField(required=True)
    ticket=serializers.PrimaryKeyRelatedField(queryset=CreateTicket.objects.all())
    # ticket = serializers.PrimaryKeyRelatedField(many=True,read_only=True)
    qr_code=serializers.ImageField(required=True)

    def create(self,validated_data):
        return Ticket.objects.create(**validated_data)
    

# class TicketSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=Ticket
#         fields="__all__"

#     def validate(self,data):
#         if Ticket.objects.filter(email=data["email"],event_id=data["event_id"],ticket_id=data["ticket_id"]).exists():
#             print("already booked this ticket from this email")
#             raise serializers.ValidationError("email is already used for ticket booking")
#         return data
    
class NotificationSerializer(serializers.Serializer):
    # host_email=serializers.CharField(max_length=200)
    event_id=serializers.CharField(max_length=100)
    message=serializers.CharField(max_length=500)

class MessagesSerializer(serializers.Serializer):
    sender_email=serializers.EmailField(required=True)
    message_datetime=serializers.DateTimeField(required=True)
    message=serializers.CharField(required=True)

    def create(self,validated_data):
        return Messages.objects.create(**validated_data)
# class MessagesSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=Messages
#         fields="__all__"

class FeedbackSerializer(serializers.Serializer):
    event=serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())
    # event = serializers.PrimaryKeyRelatedField(many=True,read_only=True)
    email=serializers.EmailField(required=True)
    feedback=serializers.CharField(required=True)
    feedback_datetime=serializers.DateTimeField(required=True)
    # class Meta:
    #     model=Feedback
    #     fields="__all__"

    def create(self,validated_data):
        return Feedback.objects.create(**validated_data)


class MyEventSerializer(serializers.Serializer):
    type=serializers.CharField(required=True)
    host_email=serializers.CharField(required=True)
    name=serializers.CharField(required=True)
    start_datetime=serializers.DateTimeField(required=True)
    end_datetime=serializers.DateTimeField(required=True)
    location=serializers.DateTimeField(required=True)
    description=serializers.CharField(required=True)
    image=serializers.ImageField(required=True)

    
    # class Meta:
    #     model=Event
    #     fields="__all__"



# class MyEventSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=Event
#         fields="__all__"


class SessionModelSerializer(serializers.Serializer):
    event=serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())
    # event = serializers.PrimaryKeyRelatedField(many=True,read_only=True)
    name=serializers.CharField(required=True)
    speaker=serializers.CharField(required=True)
    start_datetime=serializers.DateTimeField(required=True)
    end_datetime=serializers.DateTimeField(required=True)
    location=serializers.CharField(required=True)
    host_email=serializers.EmailField(required=True)

    def create(self, validated_data):
        return SessionModel.objects.create(**validated_data)


    # class Meta:
    #     model=SessionModel
    #     fields="__all__"

# class ImageAfterEventSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=ImageAfterEvent
#         fields="__all__"


class ImageAfterEventSerializer(serializers.Serializer):
    image_urls = serializers.SerializerMethodField()
    event = serializers.PrimaryKeyRelatedField(many=True,read_only=True)
    images = serializers.PrimaryKeyRelatedField(read_only=True, many=True, required=False)

    
    def get_image_urls(self, obj):
        return [photo.photo.url for photo in obj.image.all()]



# class ImageAfterEventSerializer(serializers.ModelSerializer):
#     image_urls = serializers.SerializerMethodField()

#     class Meta:
#         model = ImageAfterEvent
#         fields = ['id', 'event_id', 'image_urls']

#     def get_image_urls(self, obj):
#         return [photo.photo.url for photo in obj.image.all()]

class PhotosSerializer(serializers.Serializer):
    photo=serializers.ImageField(required=True)
# class PhotosSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=Photos
#         fields="__all__"

