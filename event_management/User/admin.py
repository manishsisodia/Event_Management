from django.contrib import admin
from .models import Registered_Users,ChangePassword,Chats,access_attempts

# Register your models here.

class AdminRegistered_Users(admin.ModelAdmin):
    list_display=["first_name","last_name","phone_number","email"]

    list_filter=["email"]

    search_fields=["first_name","last_name"]


class AdminChangePassword(admin.ModelAdmin):
    list_display=["email","token","expiration_time"]



class AdminChats(admin.ModelAdmin):
    list_display=["sender_email","send_to","message","chat_time"]

    list_filter=["sender_email","send_to"]



class AdminAccessAttempts(admin.ModelAdmin):
    list_display=["id","user","first_attempt_time","attempt_time","login_time","logout_time","failed_login"]

    list_filter=["user"]


admin.site.register(Registered_Users,AdminRegistered_Users)
admin.site.register(ChangePassword,AdminChangePassword)
admin.site.register(Chats,AdminChats)
admin.site.register(access_attempts,AdminAccessAttempts)

