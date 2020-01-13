# This file contains accutal code that works with google api
import app.scripts_for_api_control.settings as settings
from app.models import *
from django.utils import timezone
from django.core.cache import cache
from django.conf import settings as django_settings

from django.core.files import File
import os
from urllib.request import urlopen
from tempfile import NamedTemporaryFile
import urllib
import requests
import json

# This function returns response JSON data represented as python object
# If JSON is true, JSON data will be returned instead of JSON converted to dict
def get_data_from_URL(URL, JSON=False):
    response = requests.get(URL)
    if JSON == False:
        # Getting request json
        data = json.loads(response.text)
    else:
        data = response.text
    return data

class places_info():

    # This function return places in radius from location
    # radius is just intiger (1 = 1 meter),
    # location should be formated like this:   location = {'Latitude': '50.140408099999995', 'Longitude': '22.0593805'}
    # if open_now == True function will return only places openned now. If open_now == false or None it won't change anythnig
    # max_number_of_places_to_return control how much places will be returned. If == None, every place will be returned
    def get_places_in_circle(location, radius, open_now=None, keyword=None, minprice=None, maxprice=None):

        # Setting up URL
        # URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+ str(location['latitude']) +","+ str(location['longitude']) +"&radius="+ str(radius) +"&type=restaurant&key=" + settings.KEY

        # For a docs writting time, lets use melbourne coordinates
        URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+ str(-37.821107) +","+ str(144.927824) +"&radius="+ str(radius) +"&type=restaurant&key=" + settings.KEY

        # Adding values to request, if they were passed
        if open_now == True:
            URL += "&opennow="+str(open_now)
        if keyword != None and keyword != "":
            URL += "&keyword="+str(keyword)
        if minprice != None:
            URL += "&minprice="+str(minprice)
        if maxprice != None:
            URL += "&maxprice="+str(maxprice)

        # Cache things
        cache_key = "PLACE_DETAILS_CACHE_"+str(location)+str(radius)
        cached_data = cache.get(cache_key)

        if cached_data != None:
            return cached_data
        else:
            # Saving to cache
            places_data = get_data_from_URL(URL)
            cache.set(cache_key, places_data, django_settings.CACHES["default"]["TIMEOUT"])
            return places_data



    # This function simply returns detail data got from google api by given place_id
    # This function returns details of place with passed ID (That is taken from Place Search (get_places_in_circle function in my case))
    # Fields is just list of strings names that can be taken from here: https://developers.google.com/places/web-service/place-data-fields
    # Default value of fields is taken from settings.fields
    def get_place_details(place_id, fields = settings.fields):

        URL = "https://maps.googleapis.com/maps/api/place/details/json?placeid="+ place_id +"&key="+settings.KEY

        if fields != None:
            # Adding fields parameter with simple loop
            URL += "&fields="
            # First field is the only that dont need come
            URL += fields[0]

            # Loop through list to add every field to URL
            for field in fields:
                URL += "," + field

        # Cache things
        cache_key = "PLACE_DETAILS_CACHE_"+place_id
        cached_data = cache.get(cache_key)

        if cached_data != None:
            return cached_data
        else:
            details_data = get_data_from_URL(URL)
            cache.set(cache_key, details_data, django_settings.CACHES["default"]["TIMEOUT"])
            return details_data

    # This function returns all of the images connected with given place
    def get_place_images_gallery(self, place_id):
        # Getting photos connected with given place
        details = self.get_place_details(place_id)
        photos = details["result"]["photos"]

        # Setting up list
        photos_urls_list = []

        # Looping over photos
        for photo in photos:
            # setting up list that represents one photo and will be pushed to photos_urls_list
            this_image_data = {"width": None, "height": None, "img_url": None}

            photo_ref = photo["photo_reference"]
            this_image_data["height"] = photo["height"]
            this_image_data["width"] = photo["width"]

            cached_image_queryset = Cached_Image.objects.filter(reference=photo_ref)

            if cached_image_queryset.exists():
                this_image_data["img_url"] = cached_image_queryset.first().image_file.url
            else:
                instance = Cached_Image(reference=photo_ref)
                instance.save()
                instance.save_image()
                this_image_data["img_url"] = instance.image_file.url
            photos_urls_list.extend([ this_image_data ])

        return photos_urls_list
