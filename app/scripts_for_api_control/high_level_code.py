# This file contain code, fucntions, classes that can be called in "main.py" from here only.
# This file contains "high level" code, and use another python files that contain "low level code"

import requests
import json
from collections import namedtuple

import app.scripts_for_api_control.settings as settings
import app.scripts_for_api_control.low_level_code as low_level_code


from django.core import files
from io import BytesIO
import requests
from app.models import *
from django.core.files import File
import os
from urllib.request import urlopen
from tempfile import NamedTemporaryFile

import datetime
from django.utils import timezone


class places_info():

    # This function return places in radius from location
    # radius is just intiger (1 = 1 meter),
    # location should be formated like this:   location = {'Latitude': '50.140408099999995', 'Longitude': '22.0593805'}
    # if open_now == True function will return only places openned now. If open_now == false or None it won't change anythnig
    # max_number_of_places_to_return control how much places will be returned. If == None, every place will be returned
    def get_places_in_circle(location, radius, open_now=None, keyword=None, minprice=None, maxprice=None):

        # Setting up URL
        URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+ location['Latitude'] +","+ location['Longitude'] +"&radius="+ str(radius) +"&type=restaurant&key=" + settings.KEY

        # Adding open_now if its sepcified as argument
        if open_now == True:
            URL += "&opennow="+str(open_now)

        # Adding keyword if its sepcified as argument
        if keyword != None:
            URL += "&keyword="+str(keyword)

        # Adding min and max price if passed
        if minprice != None:
            URL += "&minprice="+str(minprice)

        if maxprice != None:
            URL += "&maxprice="+str(maxprice)

        # Getting response from URL (.results to just get results as list of objects, I dont care about html_attributions and next_page_token here)
        places = low_level_code.get_data_from_URL(URL)

        # Returning placess
        return places


    # This function returns details of place with passed ID (That is taken from Place Search (get_places_in_circle function in my case))
    # Fields is just list of strings names that can be taken from here: https://developers.google.com/places/web-service/place-data-fields
    # Default value of fields is taken from settings.fields
    def get_place_details(place_id, fields = settings.fields):

        #URL = "https://maps.googleapis.com/maps/api/place/details/json?placeid="+ place_id +"&fields=name,rating,formatted_phone_number&key="+settings.KEY
        URL = "https://maps.googleapis.com/maps/api/place/details/json?placeid="+ place_id +"&key="+settings.KEY
        print("DETAILS", URL)

        if fields != None:
            # Adding fields parameter with simple loop
            URL += "&fields="
            # First field is the only that dont need come
            URL += fields[0]

            # Loop through list to add every field to URL
            for field in fields:
                URL += "," + field

        # Getting response from URL (.results to just get results as object, I dont care about html_attributions and next_page_token here)
        place_details = low_level_code.get_data_from_URL(URL)

        return place_details


    def get_place_photo_by_reference(photo_reference):

        # Getting instace of Cached_Image and checking if this instance exists
        Cached_Image_Instance = Cached_Image.objects.filter(reference=photo_reference)

        # Checking if got image exists
        if Cached_Image_Instance.exists():

            # Getting a real instance of object instead of queryset
            Cached_Image_Instance = Cached_Image_Instance.first()

            # Setting up date
            cached_image_expire_date = timezone.now() + timezone.timedelta(days=settings.cache_time)

            # Check if image is old enough
            if Cached_Image_Instance.updated_at < cached_image_expire_date:
                low_level_code.get_image_from_URL_and_save_to_DB(photo_reference)

        # If this image doesn't exist, I have to simply get it
        else:
            low_level_code.get_image_from_URL_and_save_to_DB(photo_reference)

        # Retruning newly added image/or previously cached image
        image = Cached_Image.objects.filter(reference=photo_reference).first()
        return image
