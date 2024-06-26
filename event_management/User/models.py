from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.core.exceptions import ValidationError
import datetime
from django.utils import timezone

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class Registered_Users(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'phone_number']

    class Meta:
        verbose_name="Registered_User"
        verbose_name_plural="Registered_Users"
        db_table="Registered_Users"
        unique_together=["first_name","last_name"]
        ordering=["first_name"]

    def clean(self):
        if not self.phone_number.isdigit():
            raise ValidationError("Phone number must be digits only")
        if len(self.phone_number)<10:
            raise ValidationError("Phone number must be 10 digits long")

    def __str__(self):
        return self.email

    # Implement has_perm and has_module_perms methods
    def has_perm(self, perm, obj=None):
        return True  # Implement  permission logic here

    def has_module_perms(self, app_label):
        return True  # Implement  permission logic here




class ChangePassword(models.Model):
    email=models.CharField(max_length=100)
    token=models.CharField(max_length=500)
    expiration_time=models.DateTimeField(default=timezone.now)

    class Meta:
        verbose_name="Change_Password_Token"
        verbose_name_plural="Change_Password_Tokens"
        db_table="Change_Password_Tokens"


class ChatsManager(models.Manager):

    def getChats(self,send_to):
        return self.filter(send_to=send_to)

class Chats(models.Model):
    sender_email=models.EmailField()
    send_to=models.EmailField()
    message=models.CharField(max_length=500)
    chat_time=models.DateTimeField(default=timezone.now)

    objects=ChatsManager()

    class Meta:
        verbose_name="Chat"
        verbose_name_plural="Chats"
        db_table="Chats"
        unique_together=["sender_email","send_to"]


# class AccessAttempt(models.Model):
#     user = models.ForeignKey(Registered_Users, on_delete=models.CASCADE)
#     first_attempt_time = models.DateTimeField()
#     attempt_time = models.DateTimeField()
#     login_time = models.DateTimeField(null=True, blank=True)
#     logout_time = models.DateTimeField(null=True, blank=True)
#     failed_logins = models.IntegerField(default=0)

#     # class Meta:
#     #     db_table = 'access_attempts'
    
class access_attempts(models.Model):
    user=models.ForeignKey(Registered_Users,on_delete=models.DO_NOTHING,null=True,blank=True)
    first_attempt_time=models.DateTimeField(null=True,blank=True)
    attempt_time=models.DateTimeField(null=True,blank=True)
    login_time=models.DateTimeField(null=True,blank=True)
    logout_time=models.DateTimeField(null=True,blank=True)
    failed_login=models.IntegerField(default=0)

    class Meta:
        verbose_name="Access_Attempt"
        verbose_name_plural="Access_Attempts"
        db_table="Access_Attempts"