from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

# Importing scripts for api control files
import app.scripts_for_api_control.main as SFAC
from app.scripts_for_api_control.high_level_code import *

def home(request):

    # Getting ajax request
    if request.is_ajax():

        # Storing location data from request
        location = {}
        location['Latitude'] = request.POST['location[Latitude]']
        location['Longitude'] = request.POST['location[Longitude]']

        print("location that ajax sent: ", location)

        # This should be replaced with data about found placess
        return HttpResponse("JD KRASNOLUDA")
    else:
        return render(request, "home.html", {"places": SFAC.places})


def place_details(request, place_id):
    #data = places_info.get_place_details("ChIJN1t_tDeuEmsRUsoyG83frY4")
    data = places_info.get_place_details( str(place_id) )
    return HttpResponse(data)
