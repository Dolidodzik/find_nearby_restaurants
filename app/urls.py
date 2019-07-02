from django.urls import path
from app.views import *


urlpatterns = [
    path('', home, name='home'),
    path('place/<slug:place_id>', place_details, name="place_details"),
    path('image_gallery/<slug:place_id>', image_gallery, name="image_gallery"),

    # New, rest_framework based urls
    path('REST/home', list_of_places.as_view(), name="places_list"),
]
