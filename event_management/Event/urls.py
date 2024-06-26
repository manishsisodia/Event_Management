from django.urls import path,include
from .views import EventLogic,CreateTicketLogic,PastEventLogic,TicketLogic,UpcomingEventLogic,CurrentEventLogic,Invite,NotificationLogic,RSVP,MessagesLogic,FeedbackLogic,MyEvents,SessionView,EventImagesView,Createbyme,SearchView,MyBookingsView,my_bookings_admin_view



# -----------ViewSet--------------
from Event import views
from rest_framework.routers import DefaultRouter

router=DefaultRouter()    #  create object of DefaultRouter

#-------------ViewSet urls-------------------------

router.register("runningevents",views.RunningEventViewset,basename="runningevents")
router.register("pastevents",views.PastEventViewSet,basename="pastevents")
router.register("upcomingevents",views.UpcomingEventsViewset,basename="upcomingevents")
router.register("bookticket",views.TicketBookingViewSet,basename="ticket_booking")
router.register("rsvp",views.RSVPViewSet,basename="rsvp")
router.register("notification",views.NotificationViewSet,basename="notification")
router.register("invite",views.InviteViewSet,basename="invite")
router.register("events",views.EventLogicViewSet,basename="events")
router.register("eventbyid",views.EventByIdViewSet,basename="eventbyid")
router.register("messages",views.MessagesLogicViewSet,basename="messages")
router.register("feedback",views.FeedbackLogicViewSet,basename="feedback")
router.register("myevents",views.MyEventsViewSet,basename="myevents")
router.register("expired_events",views.ExpiredEventsViewset,basename="expiredevents")







urlpatterns=[
    path("event/",EventLogic.as_view(),name="event"),
    path("book_ticket/<event_id>/",TicketLogic.as_view(),name="ticket_booking"),
    path("create_ticket/",CreateTicketLogic.as_view(),name="create_ticket"),
    path("past_events/",PastEventLogic.as_view(),name="pastevent"),
    path("upcoming_events/",UpcomingEventLogic.as_view(),name="upcomingevent"),
    path("current_events/",CurrentEventLogic.as_view(),name="currentevent"),
    path("invite/",Invite.as_view(),name="invite"),
    path("notification/",NotificationLogic.as_view(),name="notification"),
    path("rsvp/<event_id>/",RSVP.as_view(),name="rsvp"),
    path("messages/",MessagesLogic.as_view(),name="messages"),
    path("feedback/",FeedbackLogic.as_view(),name="feedback"),
    path("my_events/",MyEvents.as_view(),name="myevents"),
    path("session/",SessionView.as_view(),name="session"),
    path("upload_image/",EventImagesView.as_view(),name="upload_event_image"),
    path("events_create_by_me/",Createbyme.as_view(),name="createbyme"),
    path("search/",SearchView.as_view(),name="search"),

    path('mybookings/', MyBookingsView.as_view(), name='admin-my-bookings'),


    path('admin/my-bookings/', my_bookings_admin_view, name='admin-my-bookings'),

    


    
    # ---------ViewSet ----------------

    path("viewset/",include(router.urls)),
]