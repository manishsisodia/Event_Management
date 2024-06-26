from rest_framework import serializers
from django.contrib.auth.hashers import make_password,check_password
from .models import ChangePassword,Registered_Users,Chats


class RegistrationSerializer(serializers.Serializer):

    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    phone_number = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)

    def validate_phone_number(self,value):
        if not value.isdigit():
            raise serializers.ValidationError("Phone number must contains digits only")
        if len(value)!=10:
            raise serializers.ValidationError("length of the phone number must be 10")
        return value
    

    def create(self,validated_data):
        return Registered_Users.objects.create(**validated_data)


# class RegistrationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=Registered_Users
#         fields="__all__"

#     def validate(self,data):
#         if len(data["first_name"])<3:
#             raise serializers.ValidationError("first_name must be 3 characters long")
#         if not data["phone_number"].isdigit():
#             raise serializers.ValidationError("phone number must contain digits only")
#         if len(data["phone_number"])<10:
#             raise serializers.ValidationError("phone number must be 10 characters long")
#         if data["email"]:
#             if Registered_Users.objects.filter(email=data["email"]).exists():
#                 raise serializers.ValidationError("email alreay taken")
#         data["password"]=make_password(data["password"])
#         return data
    


class ForgotPasswordSerializer(serializers.Serializer):
    email=serializers.CharField(max_length=100)

class LoginSerializer(serializers.Serializer):
    email=serializers.CharField(max_length=100)
    password=serializers.CharField(max_length=500)


class NotificationSerializer(serializers.Serializer):
    host_email=serializers.CharField(max_length=200)
    event_id=serializers.CharField(max_length=100)
    message=serializers.CharField(max_length=500)
    

class ChatSerializer(serializers.Serializer):
    sender_email=serializers.EmailField(required=True)
    send_to=serializers.EmailField(required=True)
    message=serializers.CharField(required=True)
    chat_time=serializers.DateTimeField(required=True)

    def create(self,validated_data):
        return Chats.objects.create(**validated_data)

    # class Meta:
    #     model=Chats
    #     fields="__all__"


# class ChatSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=Chats
#         fields="__all__"