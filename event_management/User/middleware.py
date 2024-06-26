import datetime
from django.utils.deprecation import MiddlewareMixin
from django.contrib.auth import user_logged_in, user_logged_out, user_login_failed
from django.dispatch import receiver
from .models import access_attempts, Registered_Users

class LoginTrackingMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if request.user.is_authenticated:
            # print("authenticated")
            request.login_time = datetime.datetime.now()

@receiver(user_logged_in)
def user_logged_in_handler(sender, request, user, **kwargs):
    now = datetime.datetime.now()
    first_attempt = getattr(request, 'first_attempt_time', now)
    access_attempt, created = access_attempts.objects.get_or_create(
        user=user, 
        first_attempt_time=first_attempt,
        defaults={'attempt_time': now, 'login_time': now, 'failed_login': 0}
    )
    if not created:
        access_attempt.login_time = now
        access_attempt.save()

@receiver(user_logged_out)
def user_logged_out_handler(sender, request, user, **kwargs):
    now = datetime.datetime.now()
    access_attempts.objects.filter(user=user, login_time__isnull=False, logout_time__isnull=True).update(logout_time=now)

@receiver(user_login_failed)
def user_login_failed_handler(sender, credentials, request, **kwargs):
    now = datetime.datetime.now()
    email = credentials.get('username', None)
    # email = credentials.get('email', None)
    if email:
        user = Registered_Users.objects.filter(email=email).first()
        if user:
            access_attempt, created = access_attempts.objects.get_or_create(
                user=user, 
                first_attempt_time=now,
                defaults={'attempt_time': now, 'failed_login': 0}
            )
            if not created:
                access_attempt.failed_login += 1
                access_attempt.attempt_time = now
                access_attempt.save()





















# from .models import Registered_Users
# class LoginTrackingMiddleware:

#     def __init__(self,get_response):
#         self.get_response=get_response

#     def __call__(self,request):
#         if request.path=="/admin/login/" and request.method=="POST":

#             print("data---",request.POST)

#             email=request.POST.get("username")
#             password=request.POST.get("password")
#             print("email-----pass-----",email,password)

#             flag=request.user.is_authenticated

#             if request.user.is_authenticated:

#                 print("email",request.user.email)

#             print("middleware",flag)

#         response=self.get_response(request)
#         # print("response----",response)

#         return response



# import datetime
# from django.utils.deprecation import MiddlewareMixin
# from django.contrib.auth import user_logged_in, user_logged_out, user_login_failed
# from django.dispatch import receiver
# from django.contrib.auth.hashers import check_password
# from .models import access_attempts, Registered_Users

# class LoginTrackingMiddleware(MiddlewareMixin):
#     def process_request(self, request):
#         if request.user.is_authenticated:
#             email = request.user.email
#             password = request.user.password
#             print("authenticate")
#             try:
#                 registered_user = Registered_Users.objects.get(email=email)
#                 if check_password(password, registered_user.password):
#                     request.login_time = datetime.datetime.now()
#             except Registered_Users.DoesNotExist:
#                 pass

# @receiver(user_logged_in)
# def user_logged_in_handler(sender, request, user, **kwargs):
#     now = datetime.datetime.now()
#     first_attempt = getattr(request, 'first_attempt_time', now)
#     access_attempt, created = access_attempts.objects.get_or_create(
#         user=user,
#         first_attempt_time=first_attempt,
#         defaults={'attempt_time': now, 'login_time': now, 'failed_logins': 0}
#     )
#     if not created:
#         access_attempt.login_time = now
#         access_attempt.save()

# @receiver(user_logged_out)
# def user_logged_out_handler(sender, request, user, **kwargs):
#     now = datetime.datetime.now()
#     if request.user.is_authenticated:
#         access_attempts.objects.filter(user=user, login_time__isnull=False, logout_time__isnull=True).update(logout_time=now)

# @receiver(user_login_failed)
# def user_login_failed_handler(sender, credentials, request, **kwargs):
#     now = datetime.datetime.now()
#     if 'email' in credentials:
#         email = credentials['email']
#         user = Registered_Users.objects.filter(email=email).first()
#         if user:
#             access_attempt, created = access_attempts.objects.get_or_create(
#                 user=user,
#                 first_attempt_time=now,
#                 defaults={'attempt_time': now, 'failed_logins': 0}
#             )
#             if not created:
#                 access_attempt.failed_logins += 1
#                 access_attempt.attempt_time = now
#                 access_attempt.save()




















































# import datetime
# from django.utils.deprecation import MiddlewareMixin
# from django.contrib.auth import user_logged_in, user_logged_out, user_login_failed
# from django.dispatch import receiver
# from django.contrib.auth.hashers import check_password
# from .models import AccessAttempt, Registered_Users

# class LoginTrackingMiddleware(MiddlewareMixin):
#     def process_request(self, request):
#         if request.user.is_authenticated:
#             email = request.user.email
#             password = request.user.password
#             try:
#                 registered_user = Registered_Users.objects.get(email=email)
#                 if check_password(password, registered_user.password):
#                     request.login_time = datetime.datetime.now()
#             except Registered_Users.DoesNotExist:
#                 pass

# @receiver(user_logged_in)
# def user_logged_in_handler(sender, request, user, **kwargs):
#     now = datetime.datetime.now()
#     first_attempt = getattr(request, 'first_attempt_time', now)
#     access_attempt, created = AccessAttempt.objects.get_or_create(
#         user=user,
#         first_attempt_time=first_attempt,
#         defaults={'attempt_time': now, 'login_time': now, 'failed_logins': 0}
#     )
#     if not created:
#         access_attempt.login_time = now
#         access_attempt.save()

# @receiver(user_logged_out)
# def user_logged_out_handler(sender, request, user, **kwargs):
#     now = datetime.datetime.now()
#     if request.user.is_authenticated:
#         AccessAttempt.objects.filter(user=user, login_time__isnull=False, logout_time__isnull=True).update(logout_time=now)

# @receiver(user_login_failed)
# def user_login_failed_handler(sender, credentials, request, **kwargs):
#     now = datetime.datetime.now()
#     if 'email' in credentials:
#         email = credentials['email']
#         user = Registered_Users.objects.filter(email=email).first()
#         if user:
#             access_attempt, created = AccessAttempt.objects.get_or_create(
#                 user=user,
#                 first_attempt_time=now,
#                 defaults={'attempt_time': now, 'failed_logins': 0}
#             )
#             if not created:
#                 access_attempt.failed_logins += 1
#                 access_attempt.attempt_time = now
#                 access_attempt.save()


































# import datetime
# from django.utils.deprecation import MiddlewareMixin
# from django.contrib.auth import user_logged_in, user_logged_out, user_login_failed
# from django.dispatch import receiver
# from django.contrib.auth.hashers import check_password
# from .models import access_attempts, Registered_Users

# class LoginTrackingMiddleware(MiddlewareMixin):
#     def process_request(self, request):
#         if request.user.is_authenticated:
#             email = request.user.email
#             password = request.user.password
#             try:
#                 registered_user = Registered_Users.objects.get(email=email)
#                 if check_password(password, registered_user.password):
#                     request.login_time = datetime.datetime.now()
#             except Registered_Users.DoesNotExist:
#                 pass

# @receiver(user_logged_in)
# def user_logged_in_handler(sender, request, user, **kwargs):
#     now = datetime.datetime.now()
#     first_attempt = getattr(request, 'first_attempt_time', now)
#     access_attempt, created = access_attempts.objects.get_or_create(
#         user=user,
#         first_attempt_time=first_attempt,
#         defaults={'attempt_time': now, 'login_time': now, 'failed_logins': 0}
#     )
#     if not created:
#         access_attempt.login_time = now
#         access_attempt.save()

# @receiver(user_logged_out)
# def user_logged_out_handler(sender, request, user, **kwargs):
#     now = datetime.datetime.now()
#     if request.user.is_authenticated:
#         access_attempts.objects.filter(user=user, login_time__isnull=False, logout_time__isnull=True).update(logout_time=now)

# @receiver(user_login_failed)
# def user_login_failed_handler(sender, credentials, request, **kwargs):
#     now = datetime.datetime.now()
#     if 'email' in credentials:
#         email = credentials['email']
#         user = Registered_Users.objects.filter(email=email).first()
#         if user:
#             access_attempt, created = access_attempts.objects.get_or_create(
#                 user=user,
#                 first_attempt_time=now,
#                 defaults={'attempt_time': now, 'failed_logins': 0}
#             )
#             if not created:
#                 access_attempt.failed_logins += 1
#                 access_attempt.attempt_time = now
#                 access_attempt.save()



































# import datetime
# from django.utils.deprecation import MiddlewareMixin
# from django.contrib.auth import user_logged_in, user_logged_out, user_login_failed
# from django.dispatch import receiver
# from .models import access_attempts, Registered_Users

# class LoginTrackingMiddleware(MiddlewareMixin):
#     def process_request(self, request):
#         if request.user.is_authenticated:
#             request.login_time = datetime.datetime.now()

# @receiver(user_logged_in)
# def user_logged_in_handler(sender, request, user, **kwargs):
#     now = datetime.datetime.now()
#     first_attempt = getattr(request, 'first_attempt_time', now)
#     access_attempt, created = access_attempts.objects.get_or_create(
#         user=user, 
#         first_attempt_time=first_attempt,
#         defaults={'attempt_time': now, 'login_time': now, 'failed_logins': 0}
#     )
#     if not created:
#         access_attempt.login_time = now
#         access_attempt.save()

# @receiver(user_logged_out)
# def user_logged_out_handler(sender, request, user, **kwargs):
#     now = datetime.datetime.now()
#     access_attempts.objects.filter(user=user, login_time__isnull=False, logout_time__isnull=True).update(logout_time=now)

# @receiver(user_login_failed)
# def user_login_failed_handler(sender, credentials, request, **kwargs):
#     now = datetime.datetime.now()
#     email = credentials.get('email', None)
#     if email:
#         user = Registered_Users.objects.filter(email=email).first()
#         if user:
#             access_attempt, created = access_attempts.objects.get_or_create(
#                 user=user, 
#                 first_attempt_time=now,
#                 defaults={'attempt_time': now, 'failed_logins': 0}
#             )
#             if not created:
#                 access_attempt.failed_logins += 1
#                 access_attempt.attempt_time = now
#                 access_attempt.save()
