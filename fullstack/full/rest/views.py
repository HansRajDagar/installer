from django.shortcuts import render
from rest_framework import viewsets
from .models import Movement, PersonalDetail


from .serializer import PersonalDetailSerializer, MovementSerializer

# Create your views here.
class PersonalDetailViewset(viewsets.ModelViewSet):
    serializer_class = PersonalDetailSerializer
    queryset = PersonalDetail.objects.all()


class MovementViewset(viewsets.ModelViewSet):
    serializer_class = MovementSerializer
    queryset = Movement.objects.all()

