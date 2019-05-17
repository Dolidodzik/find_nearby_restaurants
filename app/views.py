from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

# Importing "header" file  of
import app.scripts_for_api_control.main as SFAC

def test(request):

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
        print("type of data:", type(SFAC.data))
        return render(request, "home.html", {"data": SFAC.data})
