from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth.models import Group
from .models import Event,Ticket,Role,CreateTicket,InviteModel,Messages,Feedback,SessionModel,ImageAfterEvent,Photos
from .serializers import EventSerializer,InviteSerializer,CreateTicketSerializer,RunningEventSerializer,UpcomingEventSerializer,PastEventSerializer,TicketSerializer,NotificationSerializer,MessagesSerializer,FeedbackSerializer,MyEventSerializer,SessionModelSerializer,ImageAfterEventSerializer,PhotosSerializer
import datetime  # Import datetime module
import pytz
from django.utils import timezone
now = timezone.now()
utc=pytz.UTC
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.conf import settings
from django.core.mail import send_mail
from django.contrib.auth.hashers import make_password,check_password
from User.models import Registered_Users
from django.core.files.uploadedfile import InMemoryUploadedFile
import os
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
import base64
import qrcode
from io import BytesIO
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
import jwt
from rest_framework.pagination import PageNumberPagination
from rest_framework.pagination import PageNumberPagination


# -------------------ViewSets-----------------------

from rest_framework.viewsets import ViewSet


# class EventPagination(PageNumberPagination):
#     page_size = 5
#     page_size_query_param = 'page_size'
#     max_page_size = 100

# class CurrentEventLogic(APIView):
#     pagination_class = EventPagination

#     def get(self, request):
#         event_details = Event.objects.filter(type="Public", start_datetime__lte=datetime.datetime.now(tz=utc), end_datetime__gte=datetime.datetime.now(tz=utc))
#         paginator = self.pagination_class()
#         result_page = paginator.paginate_queryset(event_details, request)
#         serializer = RunningEventSerializer(result_page, many=True)
#         return paginator.get_paginated_response(serializer.data)

# class PastEventLogic(APIView):
#     pagination_class = EventPagination

#     def get(self, request):
#         event_details = Event.objects.filter(type="Public", end_datetime__lt=datetime.datetime.now(tz=utc))
#         paginator = self.pagination_class()
#         result_page = paginator.paginate_queryset(event_details, request)
#         serializer = PastEventSerializer(result_page, many=True)
#         return paginator.get_paginated_response(serializer.data)

# class UpcomingEventLogic(APIView):
#     pagination_class = EventPagination

#     def get(self, request):
#         event_details = Event.objects.filter(type="Public", start_datetime__gt=datetime.datetime.now(tz=utc))
#         paginator = self.pagination_class()
#         result_page = paginator.paginate_queryset(event_details, request)
#         serializer = UpcomingEventSerializer(result_page, many=True)
#         return paginator.get_paginated_response(serializer.data)


class TicketBookingViewSet(ViewSet):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

    def send_ticket_email(self, email, event_id,qr_image):
        subject = "Booked Ticket"
        message = f"Hello {email}. Your ticket has been booked for the event. Check event details on the given link: "
        message += f"http://localhost:3000/event/{event_id}/ It will be great fun there.Please find attached QR code below here"
        # email_from = settings.EMAIL_HOST_USER
        # recipient_list = [email]
        
        # Convert the QR code image to bytes
        img_buffer = BytesIO()
        qr_image.save(img_buffer, format="PNG")
        img_data = img_buffer.getvalue()


        # Convert the InMemoryUploadedFile to a temporary file
        temp_file_path = os.path.join(settings.BASE_DIR, f"{email}_{event_id}_qr.png")
        # with open(temp_file_path, 'wb') as temp_file:
        #     temp_file.write(qr_image.read())

        # Write the image data to the temporary file
        with open(temp_file_path, 'wb') as temp_file:  # wb=write binary i.e, write binary data to temp_file_path.it is a mode
            temp_file.write(img_data)

        # Attach the QR code image to the email
        email = EmailMultiAlternatives(subject, message, settings.EMAIL_HOST_USER, [email])
        email.attach_file(temp_file_path)

        # Send email
        email.send()

        # Delete the temporary file
        os.remove(temp_file_path)
        
        #send_mail(subject, message, email_from, recipient_list)

    def list(self,request):
        ticket_details=Ticket.objects.all()
        paginator=PageNumberPagination()
        paginator.page_size=2
        result_page=paginator.paginate_queryset(ticket_details,request)
        serializer=TicketSerializer(result_page,many=True)
        return Response({"data":serializer.data},status=status.HTTP_200_OK)
    
    def create(self,request,event_id):
        # img=qrcode.make(f"{request.data["email"]}+{event_id}")   # here f is formatted string literal which converts {x} in value of x
        # fname=img.save(f"{request.data["email"]}_{event_id}_qr.png")
        ticket_id=request.GET.get("ticket_id")
        
        qrcode_data=f"Hello {request.user.email} your event is scheduled from {request.user.email}.Your passkey={request.user.email}_{event_id}_{ticket_id} for starting the event"
        qr_image=qrcode.make(qrcode_data)
        # # Now i have to convert the image in binary format that can be stored in db
        # # save img to bytes buffer
        img_buffer=BytesIO()
        qr_image.save(img_buffer,format="PNG")
        img_data=img_buffer.getvalue()

        # convert img data InMemoryUploadedFile

        img_file=InMemoryUploadedFile(BytesIO(img_data), None, f"{request.user.email}_{event_id}_qr.png", 'image/png', len(img_data), None)


        ticket_data={
            "event_id":event_id,
            "email":request.user.email,
            "ticket_id":ticket_id,
            # "cost":request.data["cost"],
            "qr_code":img_file
        }
        print(ticket_data)
        serializer=TicketSerializer(data=ticket_data)
        if serializer.is_valid():
            serializer.save()
            self.send_ticket_email(request.user.email,ticket_data["event_id"],qr_image)
            return Response({"msg":"ticket-booking successful"},status=status.HTTP_201_CREATED)
        else:
            return Response({"msg":"failed","error":serializer.errors},status=status.HTTP_400_BAD_REQUEST)


class TicketLogic(APIView):
        


    # def send_ticket_email(self,email,event_id):
    #     subject="Booked Ticket"
    #     message="Hello " + email +  ". Your ticket has booked for the event.Check event details on the given link. "
    #     + " http:localhost:3000/event/"+"event_id/"+"It will be a great fun there"
    #     email_from=settings.EMAIL_HOST_USER
    #     recipient_list=[email]
    #     send_mail(subject,message,email_from,recipient_list)


    
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def send_ticket_email(self, email, event_id,qr_image):
        subject = "Booked Ticket"
        message = f"Hello {email}. Your ticket has been booked for the event. Check event details on the given link: "
        message += f"http://localhost:3000/event/{event_id}/ It will be great fun there.Please find attached QR code below here"
        # email_from = settings.EMAIL_HOST_USER
        # recipient_list = [email]
        
        # Convert the QR code image to bytes
        img_buffer = BytesIO()
        qr_image.save(img_buffer, format="PNG")
        img_data = img_buffer.getvalue()


        # Convert the InMemoryUploadedFile to a temporary file
        temp_file_path = os.path.join(settings.BASE_DIR, f"{email}_{event_id}_qr.png")
        # with open(temp_file_path, 'wb') as temp_file:
        #     temp_file.write(qr_image.read())

        # Write the image data to the temporary file
        with open(temp_file_path, 'wb') as temp_file:  # wb=write binary i.e, write binary data to temp_file_path.it is a mode
            temp_file.write(img_data)

        # Attach the QR code image to the email
        email = EmailMultiAlternatives(subject, message, settings.EMAIL_HOST_USER, [email])
        email.attach_file(temp_file_path)

        # Send email
        email.send()

        # Delete the temporary file
        os.remove(temp_file_path)
        
        #send_mail(subject, message, email_from, recipient_list)


    def get(self,request):
        return Response({"msg":"welcome to the ticket booking get api"},status=status.HTTP_200_OK)
    
    def post(self,request,event_id):
        # img=qrcode.make(f"{request.data["email"]}+{event_id}")   # here f is formatted string literal which converts {x} in value of x
        # fname=img.save(f"{request.data["email"]}_{event_id}_qr.png")
        ticket_id=request.GET.get("ticket_id")
        
        qrcode_data=f"Hello {request.user.email} your event is scheduled from {request.user.email}.Your passkey={request.user.email}_{event_id}_{ticket_id} for starting the event"
        qr_image=qrcode.make(qrcode_data)
        # # Now i have to convert the image in binary format that can be stored in db
        # # save img to bytes buffer
        img_buffer=BytesIO()
        qr_image.save(img_buffer,format="PNG")
        img_data=img_buffer.getvalue()

        # convert img data InMemoryUploadedFile

        img_file=InMemoryUploadedFile(BytesIO(img_data), None, f"{request.user.email}_{event_id}_qr.png", 'image/png', len(img_data), None)


        ticket_data={
            "event_id":event_id,
            "email":request.user.email,
            "ticket_id":ticket_id,
            # "cost":request.data["cost"],
            "qr_code":img_file
        }
        print(ticket_data)
        serializer=TicketSerializer(data=ticket_data)
        if serializer.is_valid():
            serializer.save()
            self.send_ticket_email(request.user.email,ticket_data["event_id"],qr_image)
            return Response({"msg":"ticket-booking successful"},status=status.HTTP_201_CREATED)
        else:
            return Response({"msg":"failed","error":serializer.errors},status=status.HTTP_400_BAD_REQUEST)





class UpcomingEventsViewset(ViewSet):

    def list(self,request):
        event_details=Event.objects.Upcoming_events()
        paginator=PageNumberPagination()
        paginator.page_size=2
        result_page=paginator.paginate_queryset(event_details,request)
        serializer=UpcomingEventSerializer(result_page,many=True)
        return Response({"data":serializer.data},status=status.HTTP_200_OK)


class UpcomingEventLogic(APIView):

    def get(self, request):

        event_details=Event.objects.Upcoming_events()
        paginator=PageNumberPagination()
        paginator.page_size=10
        result_page=paginator.paginate_queryset(event_details,request)
        serializer = UpcomingEventSerializer(result_page, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)





class RSVPViewSet(ViewSet):
    def create(self,request,event_id):
        user_data=request.data
        # invitee_email=user_data["invitee_email"]
        invitee_email=request.GET.get("invitee_email")
        # role=user_data["role"]
        role=request.GET.get("role")
        print(user_data)
        print(invitee_email,role)


        if not Registered_Users.objects.filter(email=invitee_email).exists():
            return Response({"error": "User is not registered"}, status=status.HTTP_404_NOT_FOUND)

        # if not Registered_Users.objects.filter(email=invitee_email).exists():
        #     return Response(status=status.HTTP_401_UNAUTHORIZED)

        try:
            invitee_details=InviteModel.objects.filter(
                event_id=user_data["event_id"],
                invitee_email=user_data["invitee_email"],
                role=user_data["role"]
            ).first()

            print(invitee_details)

            if invitee_details:
                print("1")
                invitee_details.rsvp=user_data["rsvp"]
                invitee_details.save()
                print("save")
                return Response({"status":202},status=status.HTTP_202_ACCEPTED)
            else:
                print("2")
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except:
            print("3")
            return Response(status=status.HTTP_400_BAD_REQUEST)


class RSVP(APIView):
    
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

    def post(self,request,event_id):

        user_data=request.data
        # invitee_email=user_data["invitee_email"]
        invitee_email=request.GET.get("invitee_email")
        # role=user_data["role"]
        role=request.GET.get("role")
        print(user_data)
        print(invitee_email,role)


        if not Registered_Users.objects.filter(email=invitee_email).exists():
            return Response({"error": "User is not registered"}, status=status.HTTP_404_NOT_FOUND)

        # if not Registered_Users.objects.filter(email=invitee_email).exists():
        #     return Response(status=status.HTTP_401_UNAUTHORIZED)

        try:
            invitee_details=InviteModel.objects.filter(
                event_id=user_data["event_id"],
                invitee_email=user_data["invitee_email"],
                role=user_data["role"]
            ).first()

            print(invitee_details)

            if invitee_details:
                print("1")
                invitee_details.rsvp=user_data["rsvp"]
                invitee_details.save()
                print("save")
                return Response({"status":202},status=status.HTTP_202_ACCEPTED)
            else:
                print("2")
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except:
            print("3")
            return Response(status=status.HTTP_400_BAD_REQUEST)





class PastEventViewSet(ViewSet):

    def list(self,request):

        event_details=Event.objects.Past_events()
        paginator=PageNumberPagination()
        paginator.page_size=2
        result_page=paginator.paginate_queryset(event_details,request)
        serializer=PastEventSerializer(result_page,many=True)
        return Response({"data":serializer.data},status=status.HTTP_200_OK)


class PastEventLogic(APIView):

    def get(self, request):

        event_details=Event.objects.Past_events()
        paginator=PageNumberPagination()
        paginator.page_size=2
        result_page=paginator.paginate_queryset(event_details,request)
        serializer = PastEventSerializer(result_page, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)





class NotificationViewSet(ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def send_update_email(self,emails,message):
        subject="UPDATES!!"
        message=message
        email_from=settings.EMAIL_HOST_USER
        recipient_list=emails
        send_mail(subject,message,email_from,recipient_list)

    def create(self,request):
        notification_details=request.data
        print(notification_details)
        serializer=NotificationSerializer(data=notification_details)
        if serializer.is_valid():
            emails=[]
            all_invitee_email=InviteModel.objects.filter(event_id=notification_details["event_id"])
            for invitee in all_invitee_email:
                emails.append(invitee.invitee_email)
                # self.send_update_email(invitee.invitee_email,notification_details["message"])
            self.send_update_email(emails,notification_details["message"])
            print("valid serializer")
            return Response({"msg":200,"data":serializer.data},status=status.HTTP_200_OK)
        else:
            return Response({"msg":400,"error":serializer.errors},status=status.HTTP_400_BAD_REQUEST)
        

class NotificationLogic(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def send_update_email(self,emails,message):
        subject="UPDATES!!"
        message=message
        email_from=settings.EMAIL_HOST_USER
        recipient_list=emails
        send_mail(subject,message,email_from,recipient_list)

    def post(self,request):
        notification_details=request.data
        print(notification_details)
        serializer=NotificationSerializer(data=notification_details)
        if serializer.is_valid():
            emails=[]
            all_invitee_email=InviteModel.objects.filter(event_id=notification_details["event_id"])
            for invitee in all_invitee_email:
                emails.append(invitee.invitee_email)
                # self.send_update_email(invitee.invitee_email,notification_details["message"])
            self.send_update_email(emails,notification_details["message"])
            print("valid serializer")
            return Response({"msg":200,"data":serializer.data},status=status.HTTP_200_OK)
        else:
            return Response({"msg":400,"error":serializer.errors},status=status.HTTP_400_BAD_REQUEST)
        
            
            


class InviteViewSet(ViewSet):
    authentication_classes = [JWTAuthentication]  # Add JWTAuthentication
    permission_classes = [IsAuthenticated]
    

    def send_invite_email(self, email, event_id,role):
        subject = "Invitation"
        message = f"Hello {email}. You are invited to an event for the role. HAVE GREAT FUN. RSVP=http://localhost:3000/event_management/rsvp/{event_id}/?invitee_email={email}&role={role}"
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [email]
        send_mail(subject, message, email_from, recipient_list)

    def list(self,request):
        event_id=request.GET.get("event_id")
        # Get team members for the event where RSVP is confirmed
        team_members = InviteModel.objects.filter(event_id=event_id, rsvp=True)
        paginator=PageNumberPagination()
        paginator.page_size=2
        result_page=paginator.paginate_queryset(team_members,request)
        serializer = InviteSerializer(result_page, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    def create(self,request):
        # user_data=request.data
        user_data = request.data.copy()  # Create a mutable copy of request.data
        print(user_data)
        log_in_email=request.user.email
        user_data["host_email"]=log_in_email
        user_data["rsvp"]=False
        print("again--",user_data)
        print("log---",log_in_email)
        try:
            print("1")
            event_details=Event.objects.filter(id=user_data["event_id"],host_email=log_in_email)
            print("2")
            if event_details:
                print("yes",event_details)
                serializer=InviteSerializer(data=user_data)
                if serializer.is_valid():
                    print("work")
                    if InviteModel.objects.filter(event_id=user_data["event_id"],role=user_data["role"],invitee_email=user_data["invitee_email"]).exists():
                        return Response({"status":429},status=status.HTTP_429_TOO_MANY_REQUESTS)
                    print("3")
                    serializer.save()
                    print("4")
                    self.send_invite_email(user_data["invitee_email"],user_data["event_id"],user_data["role"])
                    print("5")
                    return Response({"status":200},status=status.HTTP_200_OK)
                else:
                    return Response({"status":400},status=status.HTTP_400_BAD_REQUEST)
            else:
                print(" not present")
                return Response({"status":404},status=status.HTTP_404_NOT_FOUND)
        
        except:
            print("no event")
            return Response({"status":404},status=status.HTTP_404_NOT_FOUND)
        

class Invite(APIView):

    authentication_classes = [JWTAuthentication]  # Add JWTAuthentication
    permission_classes = [IsAuthenticated]
    

    def send_invite_email(self, email, event_id,role):
        subject = "Invitation"
        message = f"Hello {email}. You are invited to an event for the role. HAVE GREAT FUN. RSVP=http://localhost:3000/event_management/rsvp/{event_id}/?invitee_email={email}&role={role}"
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [email]
        send_mail(subject, message, email_from, recipient_list)


    def get(self, request):
        event_id=request.GET.get("event_id")
        # Get team members for the event where RSVP is confirmed
        team_members = InviteModel.objects.filter(event_id=event_id, rsvp=True)
        paginator=PageNumberPagination()
        paginator.page_size=2
        result_page=paginator.paginate_queryset(team_members,request)
        serializer = InviteSerializer(result_page, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        


    # def send_invite_email(self,email,event_id):
    #     subject="Invitation"
    #     message="Hello " + email +  ".You are invited to an event  for the role.HAVE GREAT FUN. RSVP=http://localhost:3000/event_management/rsvp/{event_id}?/invitee_email={email}/"
    #     email_from=settings.EMAIL_HOST_USER
    #     recipient_list=[email]
    #     send_mail(subject,message,email_from,recipient_list)


    def post(self, request):
        user_data = request.data.copy()  # Create a mutable copy of request.data
        print(user_data)
        log_in_email = request.user.email
        user_data["host_email"] = log_in_email
        user_data["rsvp"] = False
        print("again--", user_data)
        print("log---", log_in_email)
        
        try:
            print("1")
            event_details = Event.objects.filter(id=user_data["event_id"], host_email=log_in_email)
            print("2")
            if event_details:
                print("yes", event_details)
                serializer = InviteSerializer(data=user_data)
                if serializer.is_valid():
                    print("work")
                    if InviteModel.objects.filter(event_id=user_data["event_id"], role=user_data["role"], invitee_email=user_data["invitee_email"]).exists():
                        return Response({"status": 429}, status=status.HTTP_429_TOO_MANY_REQUESTS)
                    print("3")
                    invite_instance = serializer.save()
                    print("4")
                    self.send_invite_email(user_data["invitee_email"], user_data["event_id"], user_data["role"])
                    print("5")
                    
                    # Check if the invitee needs to be added to the group
                    if user_data["rsvp"]:
                        self.add_invitee_to_group(user_data["invitee_email"], user_data["role"])
                    
                    return Response({"status": 200}, status=status.HTTP_200_OK)
                else:
                    return Response({"status": 400}, status=status.HTTP_400_BAD_REQUEST)
            else:
                print(" not present")
                return Response({"status": 404}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            print("no event", e)
            return Response({"status": 404}, status=status.HTTP_404_NOT_FOUND)
    
    def send_invite_email(self, invitee_email, event_id, role):
        # Implement your email sending logic here
        pass
    
    def add_invitee_to_group(self, invitee_email, role_name):
        try:
            invitee_user = Registered_Users.objects.get(email=invitee_email)
            group, created = Group.objects.get_or_create(name=role_name)
            invitee_user.groups.add(group)
        except Registered_Users.DoesNotExist:
            pass


    # def post(self,request):
    #     # user_data=request.data
    #     user_data = request.data.copy()  # Create a mutable copy of request.data
    #     # user_input=request.data
    #     # user_data={
    #     #     "host_email":user_input["host_email"],
    #     #     "invitee_email":user_input["invitee_email"],
    #     #     "event_id":user_input["event_id"],
    #     #     "role":user_input["role"],
    #     #     "rsvp":True
    #     # }
    #     print(user_data)
    #     log_in_email=request.user.email
    #     user_data["host_email"]=log_in_email
    #     user_data["rsvp"]=False
    #     print("again--",user_data)
    #     print("log---",log_in_email)
    #     try:
    #         print("1")
    #         event_details=Event.objects.filter(id=user_data["event_id"],host_email=log_in_email)
    #         print("2")
    #         if event_details:
    #             print("yes",event_details)
    #             serializer=InviteSerializer(data=user_data)
    #             if serializer.is_valid():
    #                 print("work")
    #                 if InviteModel.objects.filter(event_id=user_data["event_id"],role=user_data["role"],invitee_email=user_data["invitee_email"]).exists():
    #                     return Response({"status":429},status=status.HTTP_429_TOO_MANY_REQUESTS)
    #                 print("3")
    #                 serializer.save()
    #                 print("4")
    #                 self.send_invite_email(user_data["invitee_email"],user_data["event_id"],user_data["role"])
    #                 print("5")
    #                 return Response({"status":200},status=status.HTTP_200_OK)
    #             else:
    #                 return Response({"status":400},status=status.HTTP_400_BAD_REQUEST)
    #         else:
    #             print(" not present")
    #             return Response({"status":404},status=status.HTTP_404_NOT_FOUND)
        
    #     except:
    #         print("no event")
    #         return Response({"status":404},status=status.HTTP_404_NOT_FOUND)
            
    



class EventLogicViewSet(ViewSet):
    authentication_classes = [JWTAuthentication]  # Add JWTAuthentication
    permission_classes = [IsAuthenticated]

    def send_even_email(self,email,event_data):
        subject="Congratulations!!"
        message="Hello " + email +  ".You are selected as a host for the event.click here to visit http://localhost:3000/"
        email_from=settings.EMAIL_HOST_USER
        recipient_list=[email]
        send_mail(subject,message,email_from,recipient_list)

    def list(self,request):
        event_id=request.GET.get("id")
        if event_id:
            event_details=Event.objects.filter(id=event_id)
        else:
            event_details=Event.objects.all()
        print("eeee--",event_id)
        paginator=PageNumberPagination()
        paginator.page_size=2
        result_page=paginator.paginate_queryset(event_details,request)
        serializer=EventSerializer(result_page,many=True)
        
        return Response({"data":serializer.data},status=status.HTTP_200_OK)
    

    def create(self,request):
        token = request.headers.get('Authorization').split()[1]  # Extract the token from the Authorization header
        print("token",token)

        log_in_email=request.user.email
        event_data=request.data
        if Event.objects.filter(name=event_data["name"],location=event_data["location"],start_datetime=event_data["start_datetime"],end_datetime=event_data["end_datetime"]).exists():
            print("event having same name and location and date already exists")
            return Response({"msg":"event have same name and local already exists"},status=status.HTTP_409_CONFLICT)
        # event_data["host_email"]=log_in_email
        host=Role.objects.get(role="host")
        host_id=host.id
        # event_data["role"]=host_id
        print(event_data)
        serializer=EventSerializer(data=event_data)
        if serializer.is_valid():
            print("coming")
            serializer.save()
            self.send_even_email(event_data["host_email"],event_data)
            return Response({"status":200,"msg":"event created successfully","data":serializer.data},status=status.HTTP_201_CREATED)
        else:
            return Response({"status":400,"msg":"Bad Request","data":serializer.errors},status=status.HTTP_400_BAD_REQUEST)

    def update(self,request):
        event_id = request.GET.get("id")
        host_email=request.user.email
        print(event_id)
        event_data = request.data
        event_data["host_email"]=host_email
        print(event_data)
        try:
            event_obj = Event.objects.get(id=event_id)
            print(event_obj.host_email)
            host = event_obj.host_email
            print("hostmail--", host)
            print("data---", event_obj)
            if host != host_email:
                return Response({"status": 401}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                serializer = EventSerializer(event_obj, data=event_data)
                if serializer.is_valid():
                    serializer.save()
                    return Response({"status": 205}, status=status.HTTP_205_RESET_CONTENT)
                else:
                    return Response({"status": 500, "msg": serializer.errors}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except:
            return Response({"status": 404, "msg": "Event not found"}, status=status.HTTP_404_NOT_FOUND)

    def destroy(self,request):
        event_id=request.GET.get("id")
        user_data=request.data.get("host_email")
        user_data=request.user.email
        if not user_data:
            return Response({"status":401},status=status.HTTP_401_UNAUTHORIZED)
        event_host=Event.objects.get(id=event_id)
        event_host_email=event_host.host_email
        print(event_host_email)
        print(user_data)
        if user_data!=event_host_email:
            return Response({"status": 401}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            print(user_data)
            print(event_id)
            event_obj=Event.objects.get(id=event_id)
            event_obj.delete()
            return Response({"status":200},status=status.HTTP_200_OK)


class EventLogic(APIView):
    # pass

    
    authentication_classes = [JWTAuthentication]  # Add JWTAuthentication
    permission_classes = [IsAuthenticated]

    # def get_permissions(self):
    #     if self.request.method == 'GET':
    #         return [AllowAny()]
    #     return super().get_permissions()

    # print("1")

    def send_even_email(self,email,event_data):
        subject="Congratulations!!"
        message="Hello " + email +  ".You are selected as a host for the event.click here to visit http://localhost:3000/"
        email_from=settings.EMAIL_HOST_USER
        recipient_list=[email]
        send_mail(subject,message,email_from,recipient_list)


    def get(self,request):
        event_id=request.GET.get("id")
        if event_id:
            event_details=Event.objects.filter(id=event_id)
        else:
            event_details=Event.objects.all()
        print("eeee--",event_id)
        paginator=PageNumberPagination()
        paginator.page_size=2
        result_page=paginator.paginate_queryset(event_details,request)
        serializer=EventSerializer(result_page,many=True)
        
        return Response({"data":serializer.data},status=status.HTTP_200_OK)
    
    
    

    def post(self,request):
        token = request.headers.get('Authorization').split()[1]  # Extract the token from the Authorization header
        print("token",token)

        log_in_email=request.user.email
        event_data=request.data
        if Event.objects.filter(name=event_data["name"],location=event_data["location"],start_datetime=event_data["start_datetime"],end_datetime=event_data["end_datetime"]).exists():
            print("event having same name and location and date already exists")
            return Response({"msg":"event have same name and local already exists"},status=status.HTTP_409_CONFLICT)
        # event_data["host_email"]=log_in_email

         # Fetch or create the host group
        host_group, created = Group.objects.get_or_create(name='Host')

        try:
            host_user = Registered_Users.objects.get(email=log_in_email)
            host_user.groups.add(host_group)
        except Registered_Users.DoesNotExist:
            return Response({"status": 400, "msg": "Host user does not exist"}, status=status.HTTP_400_BAD_REQUEST)




        host=Role.objects.get(role="host")
        host_id=host.id
        # event_data["role"]=host_id
        print(event_data)
        serializer=EventSerializer(data=event_data)
        if serializer.is_valid():
            print("coming")
            serializer.save()
            self.send_even_email(event_data["host_email"],event_data)
            return Response({"status":200,"msg":"event created successfully","data":serializer.data},status=status.HTTP_201_CREATED)
        else:
            return Response({"status":400,"msg":"Bad Request","data":serializer.errors},status=status.HTTP_400_BAD_REQUEST)


    def put(self, request):
        event_id = request.GET.get("id")
        host_email=request.user.email
        print(event_id)
        event_data = request.data
        event_data["host_email"]=host_email
        print(event_data)
        try:
            event_obj = Event.objects.get(id=event_id)
            print(event_obj.host_email)
            host = event_obj.host_email
            print("hostmail--", host)
            print("data---", event_obj)
            if host != host_email:
                return Response({"status": 401}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                serializer = EventSerializer(event_obj, data=event_data)
                if serializer.is_valid():
                    serializer.save()
                    return Response({"status": 205}, status=status.HTTP_205_RESET_CONTENT)
                else:
                    return Response({"status": 500, "msg": serializer.errors}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except:
            return Response({"status": 404, "msg": "Event not found"}, status=status.HTTP_404_NOT_FOUND)

    
    def delete(self,request):
        event_id=request.GET.get("id")
        user_data=request.data.get("host_email")
        user_data=request.user.email
        if not user_data:
            return Response({"status":401},status=status.HTTP_401_UNAUTHORIZED)
        event_host=Event.objects.get(id=event_id)
        event_host_email=event_host.host_email
        print(event_host_email)
        print(user_data)
        if user_data!=event_host_email:
            return Response({"status": 401}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            print(user_data)
            print(event_id)
            # event_data=request.data
            # print(event_data)
            event_obj=Event.objects.get(id=event_id)
            event_obj.delete()
            return Response({"status":200},status=status.HTTP_200_OK)


    


class CreateTicketLogicViewSet(ViewSet):
    authentication_classes = [JWTAuthentication]  # Add JWTAuthentication
    permission_classes = [IsAuthenticated]
    

    def list(self,request):
        event_id=request.GET.get("id")
        
        if event_id:
            print("id",event_id)
            ticket_data=CreateTicket.objects.filter(event_id=event_id)
            paginator=PageNumberPagination()
            paginator.page_size=2
            result_page=paginator.paginate_queryset(ticket_data,request)
            serializer=CreateTicketSerializer(result_page,many=True)
            return Response({"data":serializer.data},status=status.HTTP_200_OK)
        print("no id",event_id)
        return Response({"status":204},status=status.HTTP_204_NO_CONTENT)
        
        # ticket_data=request.data
        # ticket_data=CreateTicket.objects.all()
        
    def create(self,request):
        user_data=request.data
        print(user_data)
        log_in_email=request.user.email
        print("email--",log_in_email)
        if Event.objects.filter(id=user_data["event_id"],host_email=log_in_email):
            print(user_data)
            ticket_data={
                "type":user_data["type"],
                "event_id":user_data["event_id"],
                "cost":user_data["cost"]
            }
            print(ticket_data)
            serializer=CreateTicketSerializer(data=ticket_data)
            if serializer.is_valid():
                serializer.save()
                return Response({"status":201},status=status.HTTP_201_CREATED)
            else:
                return Response({"status":400},status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"status":401},status=status.HTTP_401_UNAUTHORIZED)
    

class CreateTicketLogic(APIView):

    authentication_classes = [JWTAuthentication]  # Add JWTAuthentication
    permission_classes = [IsAuthenticated]
    

    def get(self,request):
        event_id=request.GET.get("id")
        
        if event_id:
            print("id",event_id)
            ticket_data=CreateTicket.objects.filter(event_id=event_id)
            paginator=PageNumberPagination()
            paginator.page_size=2
            result_page=paginator.paginate_queryset(ticket_data,request)
            serializer=CreateTicketSerializer(result_page,many=True)
            return Response({"data":serializer.data},status=status.HTTP_200_OK)
        print("no id",event_id)
        return Response({"status":204},status=status.HTTP_204_NO_CONTENT)
        
        # ticket_data=request.data
        # ticket_data=CreateTicket.objects.all()
        
    def post(self,request):
        user_data=request.data
        print(user_data)
        log_in_email=request.user.email
        print("email--",log_in_email)
        if Event.objects.filter(id=user_data["event_id"],host_email=log_in_email):
            print(user_data)
            ticket_data={
                "type":user_data["type"],
                "event_id":user_data["event_id"],
                "cost":user_data["cost"]
            }
            print(ticket_data)
            serializer=CreateTicketSerializer(data=ticket_data)
            if serializer.is_valid():
                serializer.save()
                return Response({"status":201},status=status.HTTP_201_CREATED)
            else:
                return Response({"status":400},status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"status":401},status=status.HTTP_401_UNAUTHORIZED)
        




class RunningEventViewset(ViewSet):
    def list(self,request):
        event_details=Event.objects.Running_events()
        paginator=PageNumberPagination()
        paginator.page_size=2
        result_page=paginator.paginate_queryset(event_details,request)
        serializer=RunningEventSerializer(result_page,many=True)
        return Response({"data":serializer.data},status=status.HTTP_200_OK)

class CurrentEventLogic(APIView):

    def get(self, request):

        event_details=Event.objects.Running_events()
        paginator=PageNumberPagination()
        paginator.page_size=2
        result_page=paginator.paginate_queryset(event_details,request)
        serializer = RunningEventSerializer(result_page, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)





class EventByIdViewSet(ViewSet):

    def retrieve(self,request,pk=None):
        event_details=Event.objects.filter(id=pk)
        paginator=PageNumberPagination()
        paginator.page_size=2
        result_page=paginator.paginate_queryset(event_details,request)
        serializer=EventSerializer(result_page,many=True)
        return Response({"data":serializer.data},status=status.HTTP_200_OK)
    
class EventById(APIView):

    def get(self,request,id):
        print(id)
        event_details=Event.objects.filter(id=id)
        paginator=PageNumberPagination()
        paginator.page_size=2
        result_page=paginator.paginate(event_details,request)
        serializer=EventSerializer(result_page,many=True)
        return Response({"data":serializer.data},status=status.HTTP_200_OK)
    




class MessagesLogicViewSet(ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def list(self,request):
        message_data=Messages.objects.all()
        paginator=PageNumberPagination()
        paginator.page_size=2
        result_page=paginator.paginate(message_data,request)
        serializer=MessagesSerializer(result_page,many=True)
        return Response({"data":serializer.data},status=status.HTTP_200_OK)
    
    def create(self,request):
        message_data=request.data
        message_details={
            "sender_email":request.user.email,
            "message_datetime":datetime.datetime.now(),
            "message":message_data["message"]
        }
        serializer=MessagesSerializer(data=message_details)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class MessagesLogic(APIView):

    
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request):
        message_data=Messages.objects.all()
        paginator=PageNumberPagination()
        paginator.page_size=2
        result_page=paginator.paginate(message_data,request)
        serializer=MessagesSerializer(result_page,many=True)
        return Response({"data":serializer.data},status=status.HTTP_200_OK)
    
    def post(self,request):
        message_data=request.data
        message_details={
            "sender_email":request.user.email,
            "message_datetime":datetime.datetime.now(),
            "message":message_data["message"]
        }
        serializer=MessagesSerializer(data=message_details)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)





class FeedbackLogicViewSet(ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def list(self,request):
        event_id=request.GET.get("id")
        # feedback_data=Feedback.objects.filter(event_id=event_id)
        feedback_data=Feedback.objects.get_feedback(event_id)
        paginator=PageNumberPagination()
        paginator.page_size=2
        result_page=paginator.paginate(feedback_data,request)
        serializer=FeedbackSerializer(result_page,many=True)
        return Response({"data":serializer.data},status=status.HTTP_200_OK)
    
    def create(self,request):
        event_id=request.GET.get("id")
        user_data=request.data
        feedback_data={
            "event_id":event_id,
            "email":request.user.email,
            "feedback":user_data["feedback"],
            "feedback_datetime":datetime.datetime.now()
        }
        serializer=FeedbackSerializer(data=feedback_data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response({"error":serializer.errors},status=status.HTTP_400_BAD_REQUEST)
    

class FeedbackLogic(APIView):

    
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request):
        event_id=request.GET.get("id")
        # feedback_data=Feedback.objects.filter(event_id=event_id)
        feedback_data=Feedback.objects.get_feedback(event_id)
        paginator=PageNumberPagination()
        paginator.page_size=2
        result_page=paginator.paginate(feedback_data,request)
        serializer=FeedbackSerializer(result_page,many=True)
        return Response({"data":serializer.data},status=status.HTTP_200_OK)
    
    def post(self,request):
        event_id=request.GET.get("id")
        user_data=request.data
        feedback_data={
            "event_id":event_id,
            "email":request.user.email,
            "feedback":user_data["feedback"],
            "feedback_datetime":datetime.datetime.now()
        }
        serializer=FeedbackSerializer(data=feedback_data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response({"error":serializer.errors},status=status.HTTP_400_BAD_REQUEST)
        




class MyEventsViewSet(ViewSet):
        
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

    def list(self,request):
        user_email=request.POST.get("email")
        # user_email=request.user.email
        invite_events=InviteModel.objects.filter(invitee_email=user_email,rsvp=True)
        event_ids=[]
        
        for invite in invite_events:
            print(invite.event_id)
            event_ids.append(invite.event_id)

        user_events=Event.objects.filter(id__in=event_ids)   
        paginator=PageNumberPagination()
        paginator.page_size=2
        result_page=paginator.paginate_queryset(user_events,request) 
        serializer=EventSerializer(user_events,many=True)
        return Response({"data":serializer.data},status=status.HTTP_200_OK)
     

class MyEvents(APIView):
        
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request):
        user_email=request.user.email
        invite_events=InviteModel.objects.filter(invitee_email=user_email,rsvp=True)
        event_ids=[]
        
        for invite in invite_events:
            print(invite.event_id)
            event_ids.append(invite.event_id)

        user_events=Event.objects.filter(id__in=event_ids)   
        paginator=PageNumberPagination()
        paginator.page_size=2
        result_page=paginator.paginate_queryset(user_events,request) 
        serializer=EventSerializer(user_events,many=True)
        return Response({"data":serializer.data},status=status.HTTP_200_OK)





class SessionView(APIView):

    authentication_classes = [JWTAuthentication]  # Add JWTAuthentication
    permission_classes = [IsAuthenticated]
    # permission_classes = [IsAuthenticatedOrReadOnly]  # Apply IsAuthenticatedOrReadOnly permission
    # def get_permissions(self):
    #     if self.request.method == 'GET':
    #         return [AllowAny()]
    #     return super().get_permissions()



    def get(self,request):
        event_id=request.GET.get("event_id")
        print(event_id)
        session_data=SessionModel.objects.filter(event_id=event_id)
        serializer=SessionModelSerializer(session_data,many=True)
        print(serializer.data)
        return Response({"data":serializer.data},status=status.HTTP_200_OK)
    
    def post(self,request):
        event_id=request.GET.get("event_id")
        print(event_id)
        user_data=request.data
        print(user_data)
        serializer=SessionModelSerializer(data=user_data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response({"data":serializer.errors},status=status.HTTP_400_BAD_REQUEST)
        
    def patch(self,request):
        session_id=request.GET.get("id")
        user_data=request.data
        print(user_data)
        # if request.user.is_authenticated:  # Check if user is authenticated
        #     log_in_email = request.user.email
        #     print("log---", log_in_email)
        # else:
        #     log_in_email = None  # Set email to None if user is not authenticated
        
        log_in_email=request.user.email
        print("log---",log_in_email)
        update_obj=SessionModel.objects.get(id=session_id)
        if update_obj.host_email!=log_in_email:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        serializer=SessionModelSerializer(update_obj,data=user_data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        
    def delete(self,request):
        session_id=request.GET.get("id")
        print(session_id)
        print("aaaa")
        log_in_email=request.user.email
        print("aa")
        print("req",log_in_email)
        if not SessionModel.objects.filter(host_email=log_in_email):
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        session_obj=SessionModel.objects.get(id=session_id)
        session_obj.delete()
        return Response(status=status.HTTP_200_OK)


class EventImagesView(APIView):
    
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]


    def get(self, request):
        event_id = request.GET.get("event_id")
        imageafterevent = ImageAfterEvent.objects.filter(event_id=event_id)
        serializer = ImageAfterEventSerializer(imageafterevent, many=True)
        print("---------",serializer.data)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)
    
    
    def post(self, request):
        event_id = request.GET.get("event_id")
        uploaded_file = request.FILES.get("photos")
        print("event_id--", event_id)
        print("user_data--", uploaded_file)

        if not uploaded_file:
            return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        user_data = {'photo': uploaded_file}

        serializer = PhotosSerializer(data=user_data)
        if serializer.is_valid():
            photo_instance = serializer.save()

            image_after_event = ImageAfterEvent.objects.create(event_id=event_id)
            image_after_event.image.add(photo_instance)

            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response({"msg": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class Createbyme(APIView):

    authentication_classes = [JWTAuthentication]  # Add JWTAuthentication
    permission_classes = [IsAuthenticated]
    
    def get(self,request):
        event_data=Event.objects.filter(host_email=request.user.email)
        serializer=EventSerializer(event_data,many=True)
        print("1")
        return Response({"data":serializer.data},status=status.HTTP_200_OK)


class SearchView(APIView):
    def get(self, request):
        query = request.GET.get("query")
        location = request.GET.get("location")
        start_datetime = request.GET.get("start_datetime")
        end_datetime = request.GET.get("end_datetime")

        print("query--", query)
        print("location--", location)
        print("start_datetime--", start_datetime)
        print("end_datetime--", end_datetime)
        
        event_details = Event.objects.filter(name__startswith=query)
        
        if location:
            event_details = event_details.filter(location__icontains=location)
        
        if start_datetime:
            event_details = event_details.filter(start_datetime__gte=start_datetime)
        
        if end_datetime:
            event_details = event_details.filter(end_datetime__lte=end_datetime)
        
        serializer = EventSerializer(event_details, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)


class ExpiredEventsViewset(ViewSet):

    def list(self,request):
        event_details=Event.objects.expired().filter(id__gte=1)
        paginator=PageNumberPagination()
        paginator.page_size=2
        result_page=paginator.paginate_queryset(event_details,request)
        serializer=UpcomingEventSerializer(result_page,many=True)
        return Response({"data":serializer.data},status=status.HTTP_200_OK)






class MyBookingsView(APIView):

    def get(self,request):
        email=request.POST.get("email")
        details=Ticket.objects.filter(email=email)
        serializer=TicketSerializer(details,many=True)
        return Response(serializer.data)


from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import render
from .models import Ticket

@staff_member_required
def my_bookings_admin_view(request):
    bookings = Ticket.objects.filter(email=request.user.email)
    # print("bookings---email",bookings,request.user.email)
    return render(request, 'admin/my_bookings.html', {'bookings': bookings})











# class SearchView(APIView):
#     def get(self, request):
#         query = request.GET.get("query")
#         location = request.GET.get("location")
#         print("query--", query)
#         print("location--", location)
        
#         event_details = Event.objects.filter(name__startswith=query)
#         if location:
#             event_details = event_details.filter(location__icontains=location)
        
#         serializer = EventSerializer(event_details, many=True)
#         return Response({"data": serializer.data}, status=status.HTTP_200_OK)






# class SearchView(APIView):

#     def get(self,request):
#         query=request.GET.get("query")
#         print("query--",query)
#         event_details=Event.objects.filter(name__startswith=query)
#         serializer=EventSerializer(event_details,many=True)
#         return Response({"data":serializer.data},status=status.HTTP_200_OK)








{
            "id": 3,
            "type": "Public",
            "host_email": "sisodia1605@gmail.com",
            "name": "test",
            "start_datetime": "2024-04-15T14:21:00Z",
            "end_datetime": "2024-04-16T14:21:00Z",
            "location": "test",
            "description": "test",
            "image": "https://res.cloudinary.com/ddictvne4/raw/upload/v1/image/static/event_banner/academic_conference_shutterstock_481869205.jpg",
            "role": {
                        "id":1,
                        "name":"host"
            }
           
        }