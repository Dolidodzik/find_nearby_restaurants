from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

# Importing scripts for api control files
import app.scripts_for_api_control.main as SFAC
from app.scripts_for_api_control.high_level_code import places_info
import ast

from rest_framework import views
from rest_framework.response import Response
from .serializers import *

from django.utils.html import escape
import json


# NEW REST FRAMEWORK VIEWS

# Home view (not really, bcs first i want to show user some form, but its frontend thing) that returns list of places
class list_of_places(views.APIView):
    def post(self, request):

        # Taking data from frontend request, to call google api
        data = json.loads(request.body.decode('utf-8'))

        location = {'Latitude': '50.143232', 'Longitude': '22.067609599999997'}
        print(data["location_coords"])

        # Getting places list json
        places_list = places_info.get_places_in_circle(location, 99999, open_now=True, keyword="pizza", maxprice=4, minprice=2)

        data= [{
            "json_data": places_list["results"]
        }]

        # Getting serializer data
        results = places_list_serializer(data, many=True).data

        response = {"data": results}

        return JsonResponse(response)

# This view should be linked in places_list view. This view returns details data about place with given id
class place_details(views.APIView):
    def get(self, request, place_id):

        # Getting places list json
        details = places_info.get_place_details(place_id)

        data= [{
            "json_data": details["result"]
        }]

        results = places_list_serializer(data, many=True).data

        return Response(results)


# This view returns JSON that contains links to (/media/) cached images (connected with this place in google api)
# (if desired images haven't been chaced in SFAC.settings cache_time they will be re-requested from google api)
class image_gallery(views.APIView):
    def get(self, request, place_id):
        print(places_info.get_place_images_gallery(places_info, place_id))
        photo_list = 0
        places_info.get_place_details(place_id)
        data= [{
            "json_data": photo_list
        }]

        results = places_list_serializer(data, many=True).data
        return Response(results)
