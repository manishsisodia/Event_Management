# app_name/forms.py
from django import forms
from .models import Ticket, CreateTicket

class TicketBookingForm(forms.ModelForm):
    class Meta:
        model = Ticket
        fields = ['event', 'email', 'ticket', 'qr_code']

    def __init__(self, *args, **kwargs):
        hide_qr_code = kwargs.pop('hide_qr_code', False)
        super().__init__(*args, **kwargs)
        self.fields['ticket'].queryset = CreateTicket.objects.all()
        if hide_qr_code:
            self.fields.pop('qr_code')








































# # app_name/forms.py
# from django import forms
# from .models import Ticket, CreateTicket

# class TicketBookingForm(forms.ModelForm):
#     class Meta:
#         model = Ticket
#         fields = ['event', 'email', 'ticket', 'qr_code']

#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         self.fields['ticket'].queryset = CreateTicket.objects.all()






















# from django import forms
# from .models import Ticket

# class TicketBookingForm(forms.ModelForm):
#     class Meta:
#         model = Ticket
#         fields = ['event', 'email', 'ticket', 'qr_code']


