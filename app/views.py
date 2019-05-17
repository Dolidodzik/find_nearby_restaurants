from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

# Importing "header" file  of
import app.scripts_for_api_control.main as SFAC

def test(request):

    if request.is_ajax():
        #do something
        request_data = request.POST
        print("JDJD")
        return HttpResponse("OK")
    else:
        print("type of data:", type(SFAC.data))
        return render(request, "home.html", {"data": SFAC.data})
