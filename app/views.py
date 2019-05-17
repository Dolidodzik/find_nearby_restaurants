from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

# Importing "header" file  of
import app.scripts_for_api_control.main as SFAC

def test(request):
    print("type of data:", type(SFAC.data))
    return HttpResponse(SFAC.data)
