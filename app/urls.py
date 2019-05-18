from django.urls import path
from app.views import *


urlpatterns = [
    path('', home, name='home'),
    path('place/<slug:place_id>', place_details, name="place_details"),
]
