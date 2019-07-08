# This file contain code, fucntions, classes that can be called in "main.py" from here only.
# This file contains "high level" code, and use another python files that contain "low level code"


import app.scripts_for_api_control.settings as settings
import app.scripts_for_api_control.low_level_code as low_level_code
from app.models import *
from django.utils import timezone
from django.core.cache import cache
from django.conf import settings as django_settings

from django.core.files import File
import os
from urllib.request import urlopen
from tempfile import NamedTemporaryFile
import urllib

class places_info():

    # This function return places in radius from location
    # radius is just intiger (1 = 1 meter),
    # location should be formated like this:   location = {'Latitude': '50.140408099999995', 'Longitude': '22.0593805'}
    # if open_now == True function will return only places openned now. If open_now == false or None it won't change anythnig
    # max_number_of_places_to_return control how much places will be returned. If == None, every place will be returned
    def get_places_in_circle(location, radius, open_now=None, keyword=None, minprice=None, maxprice=None):

        # Setting up URL
        URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+ str(location['latitude']) +","+ str(location['longitude']) +"&radius="+ str(radius) +"&type=restaurant&key=" + settings.KEY

        # Adding open_now if its sepcified as argument
        if open_now == True:
            URL += "&opennow="+str(open_now)

        # Adding keyword if its sepcified as argument
        if keyword != None and keyword != "":
            URL += "&keyword="+str(keyword)


        # Adding min and max price if passed
        if minprice != None:
            URL += "&minprice="+str(minprice)

        if maxprice != None:
            URL += "&maxprice="+str(maxprice)


        # Setting up cache key
        cache_key = "PLACE_DETAILS_CACHE_"+str(location)+str(radius)

        # Getting previous cache
        cached_data = cache.get(cache_key)

        # Checking if previously cached data exists
        if cached_data != None:
            # Returning cached data
            return cached_data
        else:
            # Saving cache
            places_data = low_level_code.get_data_from_URL(URL)
            cache.set(cache_key, places_data, django_settings.CACHES["default"]["TIMEOUT"])
            return places_data



    # This function simply returns detail data got from google api by given place_id
    # This function returns details of place with passed ID (That is taken from Place Search (get_places_in_circle function in my case))
    # Fields is just list of strings names that can be taken from here: https://developers.google.com/places/web-service/place-data-fields
    # Default value of fields is taken from settings.fields
    def get_place_details(place_id, fields = settings.fields):

        # Setting up URL to sending requests
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

        # Setting up cache key
        cache_key = "PLACE_DETAILS_CACHE_"+place_id

        # Getting previous cache
        cached_data = cache.get(cache_key)

        # Checking if previously cached data exists
        if cached_data != None:
            # Returning cached data
            return cached_data
        else:
            # Saving cache
            details_data = low_level_code.get_data_from_URL(URL)
            cache.set(cache_key, details_data, django_settings.CACHES["default"]["TIMEOUT"])
            return details_data

    # This function returns all of the images connected with given place
    def get_place_images_gallery(self, place_id):
        print("CALL")
        # Getting photos connected with given place
        details = self.get_place_details(place_id)
        photos = details["result"]["photos"]

        # Setting up list
        photos_urls_list = []

        # Looping over photos
        for photo in photos:
            # Shorting later syntaxes
            photo_ref = photo["photo_reference"]
            # Setting up cache key
            cache_key = "PHOTO_IMAGE" + photo_ref
            # Getting previous cache
            cached_data = cache.get(cache_key)

            # Checking if previously cached data exists
            if cached_data != None:
                # Returning cached data
                return cached_data
            else:
                image = "IMAGE NONE"

                # Getting temp image
                URL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&key=" + settings.KEY
                URL += "&photoreference=" + photo_ref
                result = urllib.request.urlretrieve(URL)
                img_temp = NamedTemporaryFile(delete = True)
                img_temp.write(urlopen(URL).read())
                img_temp.flush()

                # Saving new data to cache
                cache.set(cache_key, File(img_temp), django_settings.CACHES["default"]["TIMEOUT"])
                return img_temp



        return photos_urls_list
