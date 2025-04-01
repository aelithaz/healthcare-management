from django.contrib import admin
from .models import Profile, Appointment, MedicalRecord

# Register your models here.

admin.site.register(Profile)
admin.site.register(Appointment)
admin.site.register(MedicalRecord)
