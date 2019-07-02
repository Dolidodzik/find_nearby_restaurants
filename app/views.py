from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

# Importing scripts for api control files
import app.scripts_for_api_control.main as SFAC
from app.scripts_for_api_control.high_level_code import places_info
import ast

from rest_framework import views
from rest_framework.response import Response
from .serializers import *


# NEW REST FRAMEWORK VIEWS
class list_of_places(views.APIView):
    def get(self, request):

        # Getting location from request
        '''location = {}
        location['Latitude'] = request.GET['location[Latitude]']
        location['Longitude'] = request.GET['location[Longitude]']'''
        location = {'Latitude': '50.143232', 'Longitude': '22.067609599999997'}

        # Other data should be also taken from request (like open_now, keyword etc)


        data= [ {"json_data":
            places_info.get_places_in_circle(location, 99999, open_now=True, keyword="pizza", maxprice=4, minprice=2
        )}]

        results = places_list_serializer(data, many=True).data

        return Response(results)



# OLD ONLY DJANGO VIEWS
def home(request):

    # Getting ajax request
    if request.is_ajax():

        # Storing location data from request
        location = {}
        location['Latitude'] = request.POST['location[Latitude]']
        location['Longitude'] = request.POST['location[Longitude]']

        print("location that ajax sent: ", location)

        # This should be replaced with data about found places
        return HttpResponse("JD KRASNOLUDA")
    else:
        print(SFAC.places)
        return render(request, "home.html", {"places": SFAC.places})


def place_details(request, place_id):

    '''session_name = 'place_details' + str(place_id)

    if not request.session[session_name] == None:
        request.session[session_name] = places_info.get_place_details(place_id)
    print("Data:", request.session[session_name])
    request.session[session_name] = places_info.get_place_details(place_id)'''

    details = places_info.get_place_details(place_id)

    # Rendering template with place details data
    return render(request, "place_details.html", {"details": details})


# This view returns JSON of images to template
def image_gallery(request, place_id):

    # Getting object of place details
    details = places_info.get_place_details(place_id)
    details = details["result"]

    photos = details["photos"]

    photo_list = []

    for photo in photos:
        photo_reference = photo["photo_reference"]
        photo_list.extend( [ places_info.get_place_photo_by_reference(photo_reference).image_file.url ] )

    return JsonResponse(photo_list, safe=False)
