from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Appointment, Profile

# Create your views here.

def home_view(request):
    """
    A simple homepage to welcome users. 
    We can add logic to show different content if the user is logged in or not.
    """
    return render(request, 'core/home.html')

@login_required
def my_appointments_view(request):
    """
    If the logged-in user has a profile, check if they’re a patient or doctor 
    and display the relevant appointments.
    """
    return render(request, 'core/my_appointments.html')

    profile = Profile.objects.get(user=request.user)
    if profile.role == 'patient':
        appointments = Appointment.objects.filter(patient=profile)
    else:
        appointments = Appointment.objects.filter(doctor=profile)
    return render(request, 'core/my_appointments.html', {'appointments': appointments})

