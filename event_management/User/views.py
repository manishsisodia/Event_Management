from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth.hashers import make_password,check_password
from .models import Registered_Users,ChangePassword,Chats
from django.core.mail import send_mail
from django.conf import settings
from .serializers import RegistrationSerializer,ForgotPasswordSerializer,LoginSerializer,NotificationSerializer,ChatSerializer
import uuid
from Event.models import Role
# from rest_framework_jwt.serializers import jwt_payload_handler, jwt_encode_handler
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import AllowAny
from datetime import datetime, timedelta
import datetime
import pytz
from django.utils import timezone
now = timezone.now()
utc=pytz.UTC
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ViewSet


class RegistrationViewSet(ViewSet):

    permission_classes = [AllowAny]  # Allow unauthenticated users to access this view

    def send_registration_email(self,email):
        subject="Registration Successful"
        message="Thanks " + email +  ".You have successfully registered.Thanks for registering on the event management website."
        email_from=settings.EMAIL_HOST_USER
        recipient_list=[email]
        send_mail(subject,message,email_from,recipient_list)


    def list(self,request):
        print("registration get api hit")
        return Response({"welcome to the registration page"},status=status.HTTP_202_ACCEPTED)
    
    def create(self,request):
        user_data=request.data
        print(user_data)
        serializer=RegistrationSerializer(data=user_data)
        if serializer.is_valid():
            serializer.save()
            print("valid serializer---",serializer.data["password"])
            self.send_registration_email(user_data["email"])
            return Response({"status":200,"data":serializer.data},status=status.HTTP_201_CREATED)
        else:
            return Response({"status":"failed","msg":serializer.errors},status=status.HTTP_400_BAD_REQUEST)
        

class Registration(APIView):

    permission_classes = [AllowAny]  # Allow unauthenticated users to access this view

    def send_registration_email(self,email):
        subject="Registration Successful"
        message="Thanks " + email +  ".You have successfully registered.Thanks for registering on the event management website."
        email_from=settings.EMAIL_HOST_USER
        recipient_list=[email]
        send_mail(subject,message,email_from,recipient_list)


    def get(self,request):
        print("registration get api hit")
        return Response({"welcome to the registration page"},status=status.HTTP_202_ACCEPTED)
    
    def post(self,request):
        user_data=request.data
        print(user_data)
        serializer=RegistrationSerializer(data=user_data)
        if serializer.is_valid():
            serializer.save()
            print("valid serializer---",serializer.data["password"])
            self.send_registration_email(user_data["email"])
            return Response({"status":200,"data":serializer.data},status=status.HTTP_201_CREATED)
        else:
            return Response({"status":"failed","msg":serializer.errors},status=status.HTTP_400_BAD_REQUEST)
        




class LoginViewSet(ViewSet):

    permission_classes = [AllowAny]  # Allow unauthenticated users to access this view

    def list(self,request):
        print("login get request hit")
        return Response({"status":200,"msg":"login get api"})
    
    def create(self,request):
        user_data=request.data
        serializer=LoginSerializer(data=user_data)
        try:
            registered_User=Registered_Users.objects.get(email=user_data["email"])
            flag=check_password(user_data["password"],registered_User.password)  # returns true/false
            if flag:
                refresh = RefreshToken.for_user(registered_User)

                print(refresh)

                
                return Response({
                    'email':user_data["email"],
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                })
                
                return Response({"msg":"login successful"},status=status.HTTP_202_ACCEPTED)
            else:
                return Response({"msg":"invalid credentials 1"},status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"msg":"invalid credentials 2"},status=status.HTTP_400_BAD_REQUEST)


class Login(APIView):

    permission_classes = [AllowAny]  # Allow unauthenticated users to access this view

    def get(self,request):
        print("login get request hit")
        return Response({"status":200,"msg":"login get api"})
    
    def post(self,request):
        user_data=request.data
        serializer=LoginSerializer(data=user_data)
        try:
            registered_User=Registered_Users.objects.get(email=user_data["email"])
            flag=check_password(user_data["password"],registered_User.password)  # returns true/false
            if flag:
                refresh = RefreshToken.for_user(registered_User)

                print(refresh)

                # request.session["email"]=user_data["email"]
                # request.session.save()
                # print(request.session["email"])
                # print("items---",request.session.items())
                
                return Response({
                    'email':user_data["email"],
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                })
                
                # request.session["customer_id"]=customer.id
                # request.session["email"]=customer.email
                return Response({"msg":"login successful"},status=status.HTTP_202_ACCEPTED)
            else:
                return Response({"msg":"invalid credentials 1"},status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"msg":"invalid credentials 2"},status=status.HTTP_400_BAD_REQUEST)





class ForgotPasswordViewSet(ViewSet):

    def send_forgot_email(self,email,token):
        subject="Forgot Password Link"
        message=email + "Please click on http://localhost:3000/event_management/change_password/" + token +"/"
        email_from=settings.EMAIL_HOST_USER
        recipient_list=[email]
        send_mail(subject,message,email_from,recipient_list)


    def list(self,request):
        # provide a form for forget password having email input field and a button submit
        print("get api of forgot password")
        return Response({"welcome to get api of forgot password"},status=status.HTTP_200_OK)
    
    def create(self,request):
        user_data=request.data
        print(user_data)
        serializer=ForgotPasswordSerializer(data=user_data)
        if serializer.is_valid():
            token=str(uuid.uuid4())
            print(token)
            expiration_time = datetime.datetime.now(tz=utc) + datetime.timedelta(minutes=5)
            print(expiration_time)
            changepassword=ChangePassword(email=user_data["email"],token=token,expiration_time=expiration_time)
            changepassword.save()
            self.send_forgot_email(user_data["email"],token)
            return Response({"status":200,"msg":"email has sent"},status=status.HTTP_202_ACCEPTED)
        else:
            return Response({"status":400,"msg":"BAD REQUEST","data":serializer.errors},status=status.HTTP_400_BAD_REQUEST)


class ForgotPassword(APIView):

    def send_forgot_email(self,email,token):
        subject="Forgot Password Link"
        message=email + "Please click on http://localhost:3000/event_management/change_password/" + token +"/"
        email_from=settings.EMAIL_HOST_USER
        recipient_list=[email]
        send_mail(subject,message,email_from,recipient_list)


    def get(self,request):
        # provide a form for forget password having email input field and a button submit
        print("get api of forgot password")
        return Response({"welcome to get api of forgot password"},status=status.HTTP_200_OK)
    
    def post(self,request):
        user_data=request.data
        print(user_data)
        serializer=ForgotPasswordSerializer(data=user_data)
        if serializer.is_valid():
            token=str(uuid.uuid4())
            print(token)
            expiration_time = datetime.datetime.now(tz=utc) + datetime.timedelta(minutes=5)
            print(expiration_time)
            changepassword=ChangePassword(email=user_data["email"],token=token,expiration_time=expiration_time)
            changepassword.save()
            self.send_forgot_email(user_data["email"],token)
            return Response({"status":200,"msg":"email has sent"},status=status.HTTP_202_ACCEPTED)
        else:
            return Response({"status":400,"msg":"BAD REQUEST","data":serializer.errors},status=status.HTTP_400_BAD_REQUEST)




class ChangePasswordLogic(APIView):

    def send_change_password_email(self,email):
        subject="Update Password Successful"
        message="Thanks " + email +  ".You have updated password successfully"
        email_from=settings.EMAIL_HOST_USER
        recipient_list=[email]
        send_mail(subject,message,email_from,recipient_list)


    def get(self,request,token):
        print(token)
        return Response({"msg":"change password get api hit"},status=status.HTTP_200_OK)
    
    def post(self,request,token):
        print(token)
        user_data=request.data
        if len(user_data["password"].strip())==0:
            return Response({"password can't be empty"})
        if user_data["password"]!=user_data["Re_password"]:
            return Response({"invalid re-password"})
        try:
            user_profile_token=ChangePassword.objects.filter(token=token).first()
            print(user_profile_token)
            if user_profile_token:
                expiration=user_profile_token.expiration_time
                print("ex---",expiration)
                if datetime.datetime.now(tz=utc)>expiration:
                    return Response({"msg":"token expired"},status=status.HTTP_408_REQUEST_TIMEOUT)
                print(datetime.datetime.now(tz=utc))
                email=user_profile_token.email
                user_detail=Registered_Users.objects.filter(email=email).first()
                print(email)
                if user_detail:
                    password=make_password(user_data["password"])
                    user_detail.password=password
                    user_detail.save()
                    print(user_detail,user_detail.password)
                    self.send_change_password_email(email)
                    return Response({"msg":"Password Updated Successfully"})
                else:
                    return Response({"msg":"user not found"},status=status.HTTP_404_NOT_FOUND)
                
                # update_password=user_detail(password=password)
                # update_password.save()
                print(email)
            # print(user_profile_token.values())
                # user_data=request.data
            else:
                return Response({"invalid token"},status=status.HTTP_401_UNAUTHORIZED)
            #print(user_token)
            return Response({token})
        except:
            return Response({"error"})



class ChatLogicViewSet(ViewSet):

    
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def list(self,request):
        chat_data=Chats.filter(request.user.email)
        serializer=ChatSerializer(chat_data,many=True)
        return Response({"data":serializer.data},status=status.HTTP_200_OK)
    
    def create(self,request):
        message_data=request.data
        message_details={
            "sender_email":request.user.email,
            "send_to":message_data["send_to"],
            "chat_time":datetime.datetime.now(),
            "message":message_data["message"]
        }
        serializer=ChatSerializer(data=message_details)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class ChatLogic(APIView):

    
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request):
        # chat_data=Chats.objects.filter(send_to=request.user.email)
        chat_data=Chats.getChats(request.user.email)
        serializer=ChatSerializer(chat_data,many=True)
        return Response({"data":serializer.data},status=status.HTTP_200_OK)
    
    def post(self,request):
        message_data=request.data
        message_details={
            "sender_email":request.user.email,
            "send_to":message_data["send_to"],
            "chat_time":datetime.datetime.now(),
            "message":message_data["message"]
        }
        serializer=ChatSerializer(data=message_details)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)



class Userinfo(APIView):

    def get(self,request):
        try:
            user_email=request.user.email
            return Response({"data":user_email},status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_401_UNAUTHORIZED)