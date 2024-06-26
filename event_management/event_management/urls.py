"""
URL configuration for event_management project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from . import settings
from django.conf.urls.static import static

admin.site.site_header="Event-Management"
admin.site.index_title="Admin"

from django.urls import re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


# -----------ViewSet--------------
# from Event import views
# from rest_framework.routers import DefaultRouter

# router=DefaultRouter()    #  create object of DefaultRouter

# #-------------ViewSet urls-------------------------

# router.register("runningevents",views.RunningEventViewset,basename="runningevents")
# router.register("pastevents",views.PastEventViewSet,basename="pastevents")
# router.register("upcomingevents",views.UpcomingEventsViewset,basename="upcomingevents")
# router.register("bookticket",views.TicketBookingViewSet,basename="ticket_booking")
# router.register("rsvp",views.RSVPViewSet,basename="rsvp")
# router.register("notification",views.NotificationViewSet,basename="notification")
# router.register("invite",views.InviteViewSet,basename="invite")
# router.register("events",views.EventLogicViewSet,basename="events")



schema_view = get_schema_view(
   openapi.Info(
      title="API Documentation of Event Management",
      default_version='v1',
      description="Event Management",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@Manish.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path("event_management/",include("User.urls")),
    path("event_management/",include("Event.urls")),

    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    # path("__debug__/", include("debug_toolbar.urls")),

    # ---------ViewSet ----------------

    # path("event_management/",include(router.urls)),
    

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
