from django.urls import path
from app.views import *


urlpatterns = [
    path('test/', test, name='home'),
    path('', test, name='home'),
]
