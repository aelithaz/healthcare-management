from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    ROLE_CHOICES = (
        ('patient', 'Patient'),
        ('doctor', 'Doctor'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='patient')

    def __str__(self):
        return f"{self.user.username} ({self.role})"

class Appointment(models.Model):
    patient = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='appointments_as_patient')
    doctor = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='appointments_as_doctor')
    date = models.DateField()
    time = models.TimeField()
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"Appt: {self.patient.user.username} with {self.doctor.user.username} on {self.date} at {self.time}"

class MedicalRecord(models.Model):
    patient = models.ForeignKey(Profile, on_delete=models.CASCADE)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Record for {self.patient.user.username} at {self.created_at}"

