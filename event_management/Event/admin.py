from django.contrib import admin
from . models import Event,Ticket,Role,CreateTicket,InviteModel,Messages,Feedback,SessionModel,ImageAfterEvent,Photos


# Register your models here.

class AdminEvent(admin.ModelAdmin):
   list_display=["id","type","host_email","name","start_datetime","end_datetime" ,"location","description"]

   list_filter=["type","start_datetime"]

   search_fields=["name","location"]

   list_per_page=2



class AdminCreateTicket(admin.ModelAdmin):
    list_display=["type","cost","event"]

    list_filter=["event","cost"]

    list_per_page=2




class AdminTicket(admin.ModelAdmin):
    list_display=["event","email","ticket"]

    list_filter=["event","email"]

    list_per_page=2


class AdminUserRole(admin.ModelAdmin):
    list_display=["role"]

    list_per_page=2



class AdminInvite(admin.ModelAdmin):
    list_display=["host_email","invitee_email","event","role","rsvp"]

    list_filter=["event","role"]

    search_fields=["host_email","invitee_email"]

    list_per_page=2


class AdminMessage(admin.ModelAdmin):
    list_display=["sender_email","message_datetime","message"]

    list_per_page=2


class AdminFeedback(admin.ModelAdmin):
    list_display=["event","email","feedback","feedback_datetime"]

    list_filter=["event"]

    search_fields=["email"]

    list_per_page=2


class AdminSession(admin.ModelAdmin):
   list_display=["event_id","name","speaker","start_datetime","end_datetime" ,"location","host_email"]

   list_per_page=2

class AdminImagesAfterEvent(admin.ModelAdmin):
    list_display=["event"]

    list_filter=["event"]

    list_per_page=2

class AdminPhotos(admin.ModelAdmin):
    list_display=["photo"]

    list_per_page=2



admin.site.register(Event,AdminEvent)
admin.site.register(Ticket,AdminTicket)
admin.site.register(Role,AdminUserRole)
# admin.site.register(CreateTicket,AdminCreateTicket)
admin.site.register(InviteModel,AdminInvite)
admin.site.register(Messages,AdminMessage)
admin.site.register(Feedback,AdminFeedback)
admin.site.register(SessionModel,AdminSession)
admin.site.register(ImageAfterEvent,AdminImagesAfterEvent)
admin.site.register(Photos,AdminPhotos)





# app_name/admin.py
from django.contrib import admin
from django.urls import path
from django.shortcuts import render, redirect, get_object_or_404
from django.utils.html import format_html
from .models import Ticket, Event, CreateTicket
from .forms import TicketBookingForm

# class TicketAdmin(admin.ModelAdmin):
#     list_display = ['event', 'email', 'ticket', 'book_ticket_button']

#     def my_bookings_link(self, obj):
#         return format_html('<a href="/admin/my-bookings/">My Bookings</a>')
#     my_bookings_link.short_description = 'My Bookings'


#     def book_ticket_button(self, obj):
#         return format_html('<a class="button" href="{}">Book Ticket</a>', 
#                            f'/admin/Event/ticket/{obj.pk}/book/')
#     book_ticket_button.short_description = 'Book Tickets'
#     book_ticket_button.allow_tags = True

#     def get_urls(self):
#         urls = super().get_urls()
#         custom_urls = [
#             path(
#                 '<int:ticket_id>/book/',
#                 self.admin_site.admin_view(self.book_ticket),
#                 name='ticket-book',
#             ),
#         ]
#         return custom_urls + urls

#     def book_ticket(self, request, ticket_id, *args, **kwargs):
#         ticket = get_object_or_404(Ticket, pk=ticket_id)
#         if request.method == 'POST':
#             form = TicketBookingForm(request.POST, request.FILES, instance=ticket)
#             if form.is_valid():
#                 form.save()
#                 self.message_user(request, "Ticket booked successfully.")
#                 return redirect('..')
#         else:
#             form = TicketBookingForm(instance=ticket)

#         context = self.admin_site.each_context(request)
#         context['form'] = form
#         context['title'] = 'Book Ticket'

#         return render(request, 'admin/book_ticket.html', context)

# admin.site.register(Ticket, TicketAdmin)

class CreateTicketAdmin(admin.ModelAdmin):
    list_display = ['type', 'event', 'cost', 'book_ticket_button']

    def book_ticket_button(self, obj):
        return format_html('<a class="button" href="{}">Book Ticket</a>', 
                           f'/admin/Event/createticket/{obj.pk}/book/')
    book_ticket_button.short_description = 'Book Tickets'
    book_ticket_button.allow_tags = True

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                '<int:ticket_id>/book/',
                self.admin_site.admin_view(self.book_ticket),
                name='createticket-book',
            ),
        ]
        return custom_urls + urls

    def book_ticket(self, request, ticket_id, *args, **kwargs):
        create_ticket = get_object_or_404(CreateTicket, pk=ticket_id)
        if request.method == 'POST':
            form = TicketBookingForm(request.POST, request.FILES, initial={'ticket': create_ticket}, hide_qr_code=True)
            if form.is_valid():
                form.save()
                self.message_user(request, "Ticket booked successfully.")
                return redirect('..')
        else:
            form = TicketBookingForm(initial={'ticket': create_ticket}, hide_qr_code=True)

        context = self.admin_site.each_context(request)
        context['form'] = form
        context['title'] = 'Book Ticket'

        return render(request, 'admin/book_ticket.html', context)

admin.site.register(CreateTicket, CreateTicketAdmin)





































































# # app_name/admin.py
# from django.contrib import admin
# from django.urls import path
# from django.shortcuts import render, redirect, get_object_or_404
# from django.utils.html import format_html
# from .models import Ticket, Event, CreateTicket
# from .forms import TicketBookingForm

# class TicketAdmin(admin.ModelAdmin):
#     list_display = ['event', 'email', 'ticket', 'qr_code', 'book_ticket_button']

#     def book_ticket_button(self, obj):
#         return format_html('<a class="button" href="{}">Book Ticket</a>', 
#                            f'/admin/Event/ticket/{obj.pk}/book/')
#     book_ticket_button.short_description = 'Book Tickets'
#     book_ticket_button.allow_tags = True

#     def get_urls(self):
#         urls = super().get_urls()
#         custom_urls = [
#             path(
#                 '<int:ticket_id>/book/',
#                 self.admin_site.admin_view(self.book_ticket),
#                 name='ticket-book',
#             ),
#         ]
#         return custom_urls + urls

#     def book_ticket(self, request, ticket_id, *args, **kwargs):
#         ticket = get_object_or_404(Ticket, pk=ticket_id)
#         if request.method == 'POST':
#             form = TicketBookingForm(request.POST, request.FILES, instance=ticket)
#             if form.is_valid():
#                 form.save()
#                 self.message_user(request, "Ticket booked successfully.")
#                 return redirect('..')
#         else:
#             form = TicketBookingForm(instance=ticket)

#         context = self.admin_site.each_context(request)
#         context['form'] = form
#         context['title'] = 'Book Ticket'

#         return render(request, 'admin/book_ticket.html', context)

# admin.site.register(Ticket, TicketAdmin)

# class CreateTicketAdmin(admin.ModelAdmin):
#     list_display = ['type', 'event', 'cost', 'book_ticket_button']

#     def book_ticket_button(self, obj):
#         return format_html('<a class="button" href="{}">Book Ticket</a>', 
#                            f'/admin/Event/createticket/{obj.pk}/book/')
#     book_ticket_button.short_description = 'Book Tickets'
#     book_ticket_button.allow_tags = True

#     def get_urls(self):
#         urls = super().get_urls()
#         custom_urls = [
#             path(
#                 '<int:ticket_id>/book/',
#                 self.admin_site.admin_view(self.book_ticket),
#                 name='createticket-book',
#             ),
#         ]
#         return custom_urls + urls

#     def book_ticket(self, request, ticket_id, *args, **kwargs):
#         create_ticket = get_object_or_404(CreateTicket, pk=ticket_id)
#         if request.method == 'POST':
#             form = TicketBookingForm(request.POST, request.FILES, initial={'ticket': create_ticket})
#             if form.is_valid():
#                 form.save()
#                 self.message_user(request, "Ticket booked successfully.")
#                 return redirect('..')
#         else:
#             form = TicketBookingForm(initial={'ticket': create_ticket})

#         context = self.admin_site.each_context(request)
#         context['form'] = form
#         context['title'] = 'Book Ticket'

#         return render(request, 'admin/book_ticket.html', context)

# admin.site.register(CreateTicket, CreateTicketAdmin)








































































# # app_name/admin.py
# from django.contrib import admin
# from django.urls import path
# from django.shortcuts import render, redirect, get_object_or_404
# from django.utils.html import format_html
# from .models import Ticket
# from .forms import TicketBookingForm

# class TicketAdmin(admin.ModelAdmin):
#     list_display = ['event', 'email', 'ticket', 'qr_code', 'book_ticket_button']

#     def book_ticket_button(self, obj):
#         return format_html('<a class="button" href="{}">Book Ticket</a>', 
#                            f'/admin/Event/ticket/{obj.pk}/book/')
#     book_ticket_button.short_description = 'Book Tickets'
#     book_ticket_button.allow_tags = True

#     def get_urls(self):
#         urls = super().get_urls()
#         custom_urls = [
#             path(
#                 '<int:ticket_id>/book/',
#                 self.admin_site.admin_view(self.book_ticket),
#                 name='ticket-book',
#             ),
#         ]
#         return custom_urls + urls

#     def book_ticket(self, request, ticket_id, *args, **kwargs):
#         ticket = get_object_or_404(Ticket, pk=ticket_id)
#         if request.method == 'POST':
#             form = TicketBookingForm(request.POST, request.FILES, instance=ticket)
#             if form.is_valid():
#                 form.save()
#                 self.message_user(request, "Ticket booked successfully.")
#                 return redirect('..')
#         else:
#             form = TicketBookingForm(instance=ticket)

#         context = self.admin_site.each_context(request)
#         context['form'] = form
#         context['title'] = 'Book Ticket'

#         return render(request, 'admin/book_ticket.html', context)

# admin.site.register(Ticket, TicketAdmin)
















































# # admin.py
# from django.contrib import admin
# from .models import Ticket
# from .forms import TicketBookingForm

# class TicketAdmin1(admin.ModelAdmin):
#     list_display = ['id', 'event', 'quantity', 'price', 'book_ticket']
    
#     def book_ticket(self, obj):
#         return format_html('<a class="button" href="{}">Book Ticket</a>', reverse('admin:book_ticket', args=[obj.id]))

#     book_ticket.short_description = 'Book Ticket'

#     def get_urls(self):
#         urls = super().get_urls()
#         custom_urls = [
#             path('book_ticket/<int:ticket_id>/', self.admin_site.admin_view(self.book_ticket_view), name='book_ticket'),
#         ]
#         return custom_urls + urls

#     def book_ticket_view(self, request, ticket_id):
#         ticket = Ticket.objects.get(id=ticket_id)
#         if request.method == 'POST':
#             form = TicketBookingForm(request.POST)
#             if form.is_valid():
#                 # Process the form data and book the ticket
#                 # Redirect to success page or back to the admin page
#                 pass
#         else:
#             form = TicketBookingForm()
#         context = {
#             'form': form,
#             'ticket': ticket
#         }
#         return render(request, 'admin/book_ticket.html', context)

# admin.site.register(Ticket, TicketAdmin1)

