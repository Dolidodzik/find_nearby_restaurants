from django.urls import path
from app.views import *


urlpatterns = [
    #path('', home, name='home'),
    #path('place/<slug:place_id>', place_details, name="place_details"),
    path('image_gallery/<slug:place_id>', image_gallery, name="image_gallery"),

    # New, rest_framework based urls
    path('api/home', list_of_places.as_view(), name="places_list"),
    path('api/details/<slug:place_id>', place_details.as_view(), name="place_details"),
    path('api/image_gallery/<slug:place_id>', image_gallery.as_view(), name="image_gallery"),
]
