# core/urls.py
from django.urls import path, include 
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('my-appointments/', views.my_appointments_view, name='my_appointments'),
]
